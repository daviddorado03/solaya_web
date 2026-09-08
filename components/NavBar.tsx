"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/portafolio", label: "Portafolio" },
  { href: "/studio", label: "Studio" },
  { href: "/contacto", label: "Contacto" },
];

export function NavBar() {
  const current = usePathname();

  return (
    <div className="flex h-[88px] items-center justify-between border-b border-taupe px-8 md:px-16">
      <Link href="/" className="flex items-baseline gap-2">
        <span className="font-display text-xl text-bronze">S</span>
        <span className="font-display text-xl tracking-[3px] text-ink">SOLAYA</span>
      </Link>

      <div className="hidden gap-10 md:flex">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-xs tracking-[2px] uppercase ${
              current === link.href ? "font-medium text-bronze" : "text-ink/75"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        href="/contacto"
        className="border border-bronze px-6 py-2.5 text-[11px] tracking-[2px] text-bronze uppercase"
      >
        Agenda una consulta
      </Link>
    </div>
  );
}
