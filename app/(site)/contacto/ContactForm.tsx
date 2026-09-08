"use client";

import { useActionState } from "react";
import { submitContactAction, type ContactState } from "./actions";

const BUDGETS = ["$75,000 – $100,000", "$100,000 – $150,000", "$150,000+"];

const initialState: ContactState = { ok: false };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactAction, initialState);

  if (state.ok) {
    return (
      <div className="flex flex-col gap-3 border border-bronze bg-panel px-8 py-10 text-center">
        <span className="font-display text-2xl">Gracias por escribirnos.</span>
        <p className="text-sm text-ink/70">
          Recibimos tu solicitud — respondemos en menos de 24 horas para agendar una llamada
          breve.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      <div className="flex flex-col gap-5 md:flex-row">
        <label className="flex flex-1 flex-col gap-2">
          <span className="text-[11px] tracking-[1.5px] text-ink/60 uppercase">Nombre completo</span>
          <input
            name="name"
            required
            className="h-11 border-b border-taupe bg-transparent outline-none focus:border-bronze"
          />
        </label>
        <label className="flex flex-1 flex-col gap-2">
          <span className="text-[11px] tracking-[1.5px] text-ink/60 uppercase">Correo electrónico</span>
          <input
            type="email"
            name="email"
            required
            className="h-11 border-b border-taupe bg-transparent outline-none focus:border-bronze"
          />
        </label>
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        <label className="flex flex-1 flex-col gap-2">
          <span className="text-[11px] tracking-[1.5px] text-ink/60 uppercase">
            Fecha aproximada del evento
          </span>
          <input
            name="eventDate"
            placeholder="ej. octubre 2027"
            className="h-11 border-b border-taupe bg-transparent outline-none focus:border-bronze"
          />
        </label>
        <label className="flex flex-1 flex-col gap-2">
          <span className="text-[11px] tracking-[1.5px] text-ink/60 uppercase">Lugar / venue</span>
          <input
            name="venue"
            className="h-11 border-b border-taupe bg-transparent outline-none focus:border-bronze"
          />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[11px] tracking-[1.5px] text-ink/60 uppercase">
          Presupuesto aproximado
        </span>
        <div className="flex flex-wrap gap-3">
          {BUDGETS.map((b) => (
            <label key={b} className="cursor-pointer">
              <input type="radio" name="budget" value={b} className="peer sr-only" />
              <span className="block border border-taupe px-4.5 py-2.5 text-xs text-ink/60 peer-checked:border-bronze peer-checked:text-bronze">
                {b}
              </span>
            </label>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-[11px] tracking-[1.5px] text-ink/60 uppercase">
          Cuéntanos sobre ustedes
        </span>
        <textarea
          name="message"
          rows={4}
          className="border border-taupe bg-transparent p-3 outline-none focus:border-bronze"
        />
      </label>

      {state.error && <p className="text-sm text-red-700">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-fit border border-bronze px-10 py-4 text-[13px] font-medium tracking-[3px] text-bronze uppercase disabled:opacity-50"
      >
        {pending ? "Enviando…" : "Enviar solicitud"}
      </button>
    </form>
  );
}
