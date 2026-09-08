export function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) return null;

  const href = `https://wa.me/${number}?text=${encodeURIComponent(
    "Hola, me gustaría platicar sobre fotografía para mi boda."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-full border border-bronze bg-ivory px-5 py-3 shadow-lg md:right-12 md:bottom-12"
      aria-label="Escríbenos por WhatsApp"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 12a8 8 0 1 1 3.2 6.4L4 20l1.3-3.6A7.96 7.96 0 0 1 4 12Z"
          stroke="#A67C3D"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[11px] font-medium tracking-[2px] text-ink uppercase">WhatsApp</span>
    </a>
  );
}
