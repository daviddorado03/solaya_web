import { ContactForm } from "./ContactForm";

export const metadata = { title: "Contacto — Solaya Estudio" };

export default function ContactoPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "[correo de contacto]";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || "[número de contacto]";
  const city = process.env.NEXT_PUBLIC_CITY || "[Ciudad]";

  return (
    <>
      <section className="flex flex-col items-center gap-3 px-6 pt-16 pb-4 text-center md:px-16 md:pt-20">
        <span className="text-xs tracking-[4px] text-bronze uppercase">Contacto</span>
        <h1 className="font-display text-3xl md:text-5xl">Cuéntanos tu historia.</h1>
        <p className="max-w-md text-sm text-ink/70">
          Respondemos cada solicitud en menos de 24 horas para agendar una llamada breve.
        </p>
      </section>

      <section className="flex flex-col gap-14 px-6 py-16 md:flex-row md:gap-20 md:px-16">
        <div className="flex w-full flex-col gap-8 md:w-72 md:flex-shrink-0">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] tracking-[2px] text-bronze uppercase">Correo</span>
            <span className="text-sm">{email}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] tracking-[2px] text-bronze uppercase">WhatsApp</span>
            <span className="text-sm">{whatsapp}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] tracking-[2px] text-bronze uppercase">Con base en</span>
            <span className="text-sm">{city} · disponible para destino</span>
          </div>
        </div>

        <ContactForm />
      </section>
    </>
  );
}
