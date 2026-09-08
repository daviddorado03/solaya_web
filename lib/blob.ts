import { put, del, list } from "@vercel/blob";

export type Category =
  | "hero"
  | "studio"
  | "portfolio-bodas"
  | "portfolio-compromisos"
  | "portfolio-destino";

export const CATEGORIES: { value: Category; label: string; singleton: boolean }[] = [
  { value: "hero", label: "Home — foto principal", singleton: true },
  { value: "studio", label: "Studio — foto del equipo", singleton: true },
  { value: "portfolio-bodas", label: "Portafolio — Bodas", singleton: false },
  { value: "portfolio-compromisos", label: "Portafolio — Compromisos", singleton: false },
  { value: "portfolio-destino", label: "Portafolio — Destino", singleton: false },
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
    const { blobs } = await list({ prefix: MANIFEST_PATH, limit: 1 });
    const manifestBlob = blobs.find((b) => b.pathname === MANIFEST_PATH);
    if (!manifestBlob) return emptyManifest;

    const res = await fetch(manifestBlob.url, { cache: "no-store" });
    if (!res.ok) return emptyManifest;
    const data = (await res.json()) as Partial<Manifest>;
    return { photos: data.photos ?? [], leads: data.leads ?? [] };
  } catch {
    return emptyManifest;
  }
}

async function writeManifest(manifest: Manifest): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(manifest, null, 2), {
    access: "public",
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
    access: "public",
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
