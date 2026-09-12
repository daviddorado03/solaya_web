import Link from "next/link";
import { getPhotosByCategory, getSingletonPhoto } from "@/lib/blob";
import { PhotoTile } from "@/components/PhotoTile";

export const revalidate = 60;

export default async function HomePage() {
  const [hero, ceremonia, sesion, detalles, fiesta] = await Promise.all([
    getSingletonPhoto("hero"),
    getPhotosByCategory("portfolio-ceremonia"),
    getPhotosByCategory("portfolio-sesion"),
    getPhotosByCategory("portfolio-detalles"),
    getPhotosByCategory("portfolio-fiesta"),
  ]);

  const teaser = [...ceremonia, ...sesion, ...detalles, ...fiesta].slice(0, 7);

  return (
    <>
      <section className="relative h-[600px] w-full overflow-hidden md:h-[720px]">
        <PhotoTile photo={hero} fallbackLabel="[Foto hero — pareja, luz natural]" sizes="100vw" priority />
        <div className="absolute inset-0 bg-linear-to-b from-ink/15 to-ink/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
          <span className="text-[11px] tracking-[4px] text-ivory/85 uppercase md:text-[13px] md:tracking-[5px]">
            Fotografía de bodas de autor
          </span>
          <h1 className="font-display max-w-3xl text-4xl leading-tight text-ivory md:text-6xl">
            Momentos que se cuentan con elegancia.
          </h1>
          <p className="max-w-md text-sm text-ivory/85 md:text-base">
            Cobertura íntima y de autor para bodas que merecen algo más que un reportaje.
          </p>
          <Link
            href="/contacto"
            className="mt-2 border border-ivory px-8 py-4 text-[11px] tracking-[3px] text-ivory uppercase md:px-10 md:text-[13px]"
          >
            Agenda una consulta
          </Link>
        </div>
      </section>

      <section className="flex flex-col items-center gap-5 px-6 py-16 text-center md:px-16 md:py-24">
        <span className="text-xs tracking-[4px] text-bronze uppercase">El estudio</span>
        <p className="font-display max-w-2xl text-xl leading-relaxed md:text-3xl">
          Fotografiamos pocas bodas al año, a propósito — el tiempo que le damos a cada historia
          es lo que hace la diferencia.
        </p>
        <Link href="/estudio" className="mt-2 text-xs tracking-[2px] text-bronze uppercase">
          Conoce el estudio →
        </Link>
      </section>

      <section className="px-6 pb-16 md:px-16 md:pb-24">
        <div className="mb-8 flex items-baseline justify-between">
          <span className="text-xs tracking-[4px] text-bronze uppercase">Trabajo seleccionado</span>
          <Link href="/portafolio" className="text-xs tracking-[2px] text-ink/70 uppercase">
            Ver portafolio completo →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 md:auto-rows-[220px]">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square md:aspect-auto ${i % 3 === 0 ? "md:row-span-2" : ""}`}
            >
              <PhotoTile
                photo={teaser[i]}
                fallbackLabel={`[Foto ${i + 1}]`}
                sizes="(min-width: 768px) 25vw, 50vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-4 bg-panel px-6 py-16 text-center md:px-16 md:py-20">
        <p className="font-display max-w-2xl text-lg leading-relaxed md:text-2xl">
          &ldquo;[Testimonio breve de un cliente sobre la experiencia con el estudio.]&rdquo;
        </p>
        <span className="text-xs tracking-[2px] text-bronze uppercase">— [Nombre], [Ciudad]</span>
      </section>
    </>
  );
}
