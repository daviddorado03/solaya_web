"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-ivory px-6 py-16">
      <form
        action={formAction}
        className="flex w-full max-w-sm flex-col items-center gap-6 border border-bronze bg-panel px-10 py-12"
      >
        <span className="font-display text-2xl text-bronze">S</span>
        <span className="font-display text-lg tracking-[4px]">SOLAYA ESTUDIO</span>
        <p className="text-center text-xs tracking-[2px] text-ink/60 uppercase">Panel de administración</p>

        <label className="flex w-full flex-col gap-2">
          <span className="text-[11px] tracking-[1.5px] text-ink/60 uppercase">Contraseña</span>
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="h-11 border-b border-taupe bg-transparent outline-none focus:border-bronze"
          />
        </label>

        {state.error && <p className="text-sm text-red-700">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 w-full border border-bronze py-3 text-[12px] font-medium tracking-[3px] text-bronze uppercase disabled:opacity-50"
        >
          {pending ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
