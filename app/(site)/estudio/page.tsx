import { getSingletonPhoto } from "@/lib/blob";
import { PhotoTile } from "@/components/PhotoTile";

export const revalidate = 60;

const VALUES = [
  {
    title: "Edición de autor",
    text: "Cada galería se selecciona y edita a mano, con un estilo consistente pensado para cada pareja.",
  },
  {
    title: "Presencia discreta",
    text: "El día del evento nos movemos sin interrumpir — la mejor foto es la que nadie posó para tomar.",
  },
  {
    title: "Entrega sin prisa",
    text: "Preferimos tardar lo necesario a entregar algo que no representa el nivel del trabajo.",
  },
];

const STEPS = [
  { n: "01", title: "Consulta", text: "Platicamos sobre tu boda, fecha y visión antes de proponer nada." },
  { n: "02", title: "Cobertura", text: "El día del evento, con un plan claro y cero improvisación." },
  {
    n: "03",
    title: "Entrega",
    text: "Galería privada con opción de imprimir, ampliar y revivir cada momento.",
  },
];

export default async function EstudioPage() {
  const photo = await getSingletonPhoto("studio");

  return (
    <>
      <section className="flex flex-col items-center gap-12 px-6 py-16 md:flex-row md:items-center md:gap-16 md:px-16 md:py-20">
        <div className="h-[420px] w-full flex-shrink-0 md:h-[620px] md:w-[520px]">
          <PhotoTile photo={photo} fallbackLabel="[Foto del equipo en trabajo]" sizes="(min-width: 768px) 520px, 100vw" />
        </div>
        <div className="flex max-w-xl flex-col gap-5">
          <span className="text-xs tracking-[4px] text-bronze uppercase">El estudio</span>
          <h1 className="font-display text-3xl leading-tight md:text-5xl">
            La cámara como oficio, no como trámite.
          </h1>
          <p className="text-sm leading-loose text-ink/75 md:text-base">
            Solaya Estudio nace de una idea simple: cada boda merece ser fotografiada con la misma
            atención que una editorial de moda. Trabajamos pocos eventos al año, de manera
            consultiva, para que cada entrega tenga tiempo, criterio y una mirada propia — no una
            fórmula repetida.
          </p>
          <span className="font-display mt-2 text-lg text-bronze italic">
            — El equipo detrás de Solaya Estudio
          </span>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-10 border-t border-b border-taupe px-6 py-16 md:grid-cols-3 md:gap-12 md:px-16">
        {VALUES.map((v) => (
          <div key={v.title} className="flex flex-col gap-2.5">
            <span className="font-display text-xl">{v.title}</span>
            <p className="text-[13px] leading-relaxed text-ink/65">{v.text}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col items-center gap-10 px-6 py-16 md:px-16 md:py-20">
        <span className="text-xs tracking-[4px] text-bronze uppercase">Cómo trabajamos</span>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
          {STEPS.map((s) => (
            <div key={s.n} className="flex max-w-56 flex-col items-center gap-3 text-center">
              <span className="font-display text-2xl text-bronze">{s.n}</span>
              <span className="text-sm font-medium">{s.title}</span>
              <p className="text-xs leading-relaxed text-ink/65">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
