import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";

export function AdminNav({ current }: { current: "fotos" | "leads" }) {
  return (
    <div className="flex items-center justify-between border-b border-taupe px-8 py-5 md:px-16">
      <div className="flex items-center gap-10">
        <span className="font-display text-lg tracking-[2px]">SOLAYA — Admin</span>
        <Link
          href="/admin"
          className={`text-xs tracking-[1.5px] uppercase ${
            current === "fotos" ? "text-bronze" : "text-ink/60"
          }`}
        >
          Fotos
        </Link>
        <Link
          href="/admin/leads"
          className={`text-xs tracking-[1.5px] uppercase ${
            current === "leads" ? "text-bronze" : "text-ink/60"
          }`}
        >
          Solicitudes
        </Link>
      </div>
      <form action={logoutAction}>
        <button type="submit" className="text-xs tracking-[1.5px] text-ink/60 uppercase">
          Cerrar sesión
        </button>
      </form>
    </div>
  );
}
