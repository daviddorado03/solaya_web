import { put, del, get } from "@vercel/blob";

// This project's Blob store is configured as PRIVATE (Vercel's current
// default for new stores) — reads and writes must both use access:
// "private". Photos are never served from the Blob domain directly;
// app/photos/[...path]/route.ts proxies them publicly. See photoPublicUrl().
const ACCESS = "private" as const;

export function photoPublicUrl(pathname: string): string {
  return "/" + pathname;
}

export type Category =
  | "hero"
  | "studio"
  | "portfolio-ceremonia"
  | "portfolio-sesion"
  | "portfolio-detalles"
  | "portfolio-fiesta";

export const CATEGORIES: { value: Category; label: string; singleton: boolean }[] = [
  { value: "hero", label: "Home — foto principal", singleton: true },
  { value: "studio", label: "Studio — foto del equipo", singleton: true },
  { value: "portfolio-ceremonia", label: "Portafolio — Ceremonia", singleton: false },
  { value: "portfolio-sesion", label: "Portafolio — Sesión", singleton: false },
  { value: "portfolio-detalles", label: "Portafolio — Detalles", singleton: false },
  { value: "portfolio-fiesta", label: "Portafolio — Fiesta", singleton: false },
];

export type Photo = {
  id: string;
  url: string;
  pathname: string;
  category: Category;
  caption: string;
  order: number;
  uploadedAt: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  venue: string;
  budget: string;
  message: string;
  createdAt: string;
};

type Manifest = {
  photos: Photo[];
  leads: Lead[];
};

const MANIFEST_PATH = "data/manifest.json";
const emptyManifest: Manifest = { photos: [], leads: [] };

async function readManifest(): Promise<Manifest> {
  // If Blob isn't configured yet (no BLOB_READ_WRITE_TOKEN — e.g. local dev
  // before the Vercel Blob store is created), fail soft: the public pages
  // then render their placeholder tiles instead of crashing.
  try {
    const result = await get(MANIFEST_PATH, { access: ACCESS, useCache: false });
    if (!result || result.statusCode !== 200) return emptyManifest;

    const text = await new Response(result.stream).text();
    const data = JSON.parse(text) as Partial<Manifest>;
    return { photos: data.photos ?? [], leads: data.leads ?? [] };
  } catch {
    return emptyManifest;
  }
}

async function writeManifest(manifest: Manifest): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(manifest, null, 2), {
    access: ACCESS,
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function getPhotos(): Promise<Photo[]> {
  const { photos } = await readManifest();
  return photos.sort((a, b) => a.order - b.order);
}

export async function getPhotosByCategory(category: Category): Promise<Photo[]> {
  const photos = await getPhotos();
  return photos.filter((p) => p.category === category);
}

/** For singleton slots (hero, studio): the lowest-order photo in that category, or null. */
export async function getSingletonPhoto(category: Category): Promise<Photo | null> {
  const photos = await getPhotosByCategory(category);
  return photos[0] ?? null;
}

export async function addPhoto(
  file: File,
  category: Category,
  caption: string
): Promise<Photo> {
  const id = crypto.randomUUID();
  const ext = file.name.split(".").pop() || "jpg";
  const pathname = `photos/${category}/${id}.${ext}`;

  const blob = await put(pathname, file, {
    access: ACCESS,
    addRandomSuffix: false,
  });

  const manifest = await readManifest();
  const order =
    manifest.photos.filter((p) => p.category === category).length > 0
      ? Math.max(...manifest.photos.filter((p) => p.category === category).map((p) => p.order)) + 1
      : 0;

  const photo: Photo = {
    id,
    url: blob.url,
    pathname: blob.pathname,
    category,
    caption,
    order,
    uploadedAt: new Date().toISOString(),
  };

  manifest.photos.push(photo);
  await writeManifest(manifest);
  return photo;
}

export async function deletePhoto(id: string): Promise<void> {
  const manifest = await readManifest();
  const photo = manifest.photos.find((p) => p.id === id);
  if (!photo) return;

  await del(photo.pathname);
  manifest.photos = manifest.photos.filter((p) => p.id !== id);
  await writeManifest(manifest);
}

export async function updatePhotoOrder(id: string, order: number): Promise<void> {
  const manifest = await readManifest();
  const photo = manifest.photos.find((p) => p.id === id);
  if (!photo) return;
  photo.order = order;
  await writeManifest(manifest);
}

export async function addLead(lead: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const manifest = await readManifest();
  const newLead: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  manifest.leads.unshift(newLead);
  await writeManifest(manifest);
  return newLead;
}

export async function getLeads(): Promise<Lead[]> {
  const { leads } = await readManifest();
  return leads;
}
