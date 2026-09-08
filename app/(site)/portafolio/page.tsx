import Link from "next/link";
import { getPhotosByCategory, type Category } from "@/lib/blob";
import { PhotoTile } from "@/components/PhotoTile";

export const revalidate = 60;

const TABS: { value: Category; label: string }[] = [
  { value: "portfolio-bodas", label: "Bodas" },
  { value: "portfolio-compromisos", label: "Compromisos" },
  { value: "portfolio-destino", label: "Destino" },
];

export default async function PortafolioPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const params = await searchParams;
  const active = TABS.find((t) => t.value === params.categoria)?.value ?? "portfolio-bodas";
  const photos = await getPhotosByCategory(active);

  return (
    <>
      <section className="flex flex-col items-center gap-4 px-6 pt-16 pb-8 text-center md:px-16 md:pt-20">
        <span className="text-xs tracking-[4px] text-bronze uppercase">Portafolio</span>
        <h1 className="font-display text-3xl md:text-5xl">Bodas seleccionadas</h1>
        <div className="mt-4 flex flex-wrap justify-center gap-8">
          {TABS.map((tab) => (
            <Link
              key={tab.value}
              href={`/portafolio?categoria=${tab.value}`}
              className={`text-xs tracking-[2px] uppercase ${
                active === tab.value
                  ? "border-b border-bronze pb-1.5 text-bronze"
                  : "text-ink/60"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16 md:px-16 md:pb-20">
        {photos.length === 0 ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 md:auto-rows-[220px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`aspect-square md:aspect-auto ${i % 3 === 1 ? "md:row-span-2" : ""}`}>
                <PhotoTile photo={null} fallbackLabel={`[Foto ${i + 1} — próximamente]`} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 md:auto-rows-[220px]">
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                className={`aspect-square md:aspect-auto ${i % 3 === 1 ? "md:row-span-2" : ""}`}
              >
                <PhotoTile photo={photo} fallbackLabel="" sizes="(min-width: 768px) 33vw, 50vw" />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
