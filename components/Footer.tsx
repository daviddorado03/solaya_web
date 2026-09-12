export function Footer() {
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
  const pinterest = process.env.NEXT_PUBLIC_PINTEREST_URL;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "[correo de contacto]";

  return (
    <div className="flex flex-col items-center gap-6 border-t border-bronze px-8 py-16 md:px-16">
      <span className="font-display text-center text-2xl text-ink md:text-3xl">
        ¿Lista para contarnos tu historia?
      </span>
      <a
        href="/contacto"
        className="border border-bronze px-10 py-4 text-[13px] font-medium tracking-[3px] text-bronze uppercase"
      >
        Agenda una consulta
      </a>
      <div className="mt-2 flex flex-wrap justify-center gap-8">
        {instagram ? (
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] tracking-[2px] text-ink/60 uppercase"
          >
            Instagram
          </a>
        ) : (
          <span className="text-[11px] tracking-[2px] text-ink/40 uppercase">Instagram</span>
        )}
        {pinterest ? (
          <a
            href={pinterest}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] tracking-[2px] text-ink/60 uppercase"
          >
            Pinterest
          </a>
        ) : (
          <span className="text-[11px] tracking-[2px] text-ink/40 uppercase">Pinterest</span>
        )}
        <span className="text-[11px] tracking-[2px] text-ink/60 uppercase">{email}</span>
      </div>
      <span className="mt-2 text-[10px] text-ink/45">© Solaya Estudio</span>
    </div>
  );
}
