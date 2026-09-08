"use client";

import { useActionState, useRef } from "react";
import { uploadPhotoAction, type UploadState } from "./actions";
import { CATEGORIES } from "@/lib/blob";

const initialState: UploadState = {};

export function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(async (prev: UploadState, formData: FormData) => {
    const result = await uploadPhotoAction(prev, formData);
    if (result.success) formRef.current?.reset();
    return result;
  }, initialState);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-4 border border-bronze bg-panel p-6 md:flex-row md:items-end md:gap-6"
    >
      <label className="flex flex-1 flex-col gap-2">
        <span className="text-[11px] tracking-[1.5px] text-ink/60 uppercase">Foto</span>
        <input
          type="file"
          name="file"
          accept="image/*"
          required
          className="text-sm file:mr-3 file:border file:border-bronze file:bg-transparent file:px-3 file:py-1.5 file:text-xs file:text-bronze file:uppercase"
        />
      </label>

      <label className="flex flex-1 flex-col gap-2">
        <span className="text-[11px] tracking-[1.5px] text-ink/60 uppercase">Categoría</span>
        <select
          name="category"
          required
          className="h-10 border border-taupe bg-ivory px-2 text-sm"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-1 flex-col gap-2">
        <span className="text-[11px] tracking-[1.5px] text-ink/60 uppercase">
          Descripción (opcional)
        </span>
        <input name="caption" className="h-10 border border-taupe bg-ivory px-2 text-sm" />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="h-10 shrink-0 border border-bronze px-6 text-[12px] font-medium tracking-[2px] text-bronze uppercase disabled:opacity-50"
      >
        {pending ? "Subiendo…" : "Subir foto"}
      </button>

      {state.error && <p className="w-full text-sm text-red-700">{state.error}</p>}
    </form>
  );
}
