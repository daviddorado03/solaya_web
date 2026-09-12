"use server";

import { revalidatePath } from "next/cache";
import { addLead } from "@/lib/blob";

export type ContactState = { ok: boolean; error?: string };

export async function submitContactAction(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phoneLada = String(formData.get("phoneLada") ?? "").trim();
  const phoneNumber = String(formData.get("phoneNumber") ?? "").trim();
  const phone = phoneNumber ? `${phoneLada} ${phoneNumber}` : "";
  const eventDate = String(formData.get("eventDate") ?? "").trim();
  const venue = String(formData.get("venue") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email) {
    return { ok: false, error: "Nombre y correo son obligatorios." };
  }

  try {
    await addLead({ name, email, phone, eventDate, venue, message });
    revalidatePath("/admin/leads");
  } catch {
    return {
      ok: false,
      error: "No se pudo enviar la solicitud — el sitio aún no tiene el almacenamiento configurado.",
    };
  }

  return { ok: true };
}
