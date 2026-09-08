"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { addPhoto, deletePhoto, updatePhotoOrder, CATEGORIES, type Category } from "@/lib/blob";

export type LoginState = { error?: string };

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  let valid: boolean;
  try {
    valid = checkPassword(password);
  } catch {
    return {
      error:
        "El servidor no tiene configurada la contraseña de administrador (falta ADMIN_PASSWORD).",
    };
  }

  if (!valid) {
    return { error: "Contraseña incorrecta." };
  }

  const token = await createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logoutAction(_formData: FormData): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/admin/login");
}

export type UploadState = { error?: string; success?: boolean };

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/portafolio");
  revalidatePath("/studio");
  revalidatePath("/admin");
}

export async function uploadPhotoAction(
  _prevState: UploadState,
  formData: FormData
): Promise<UploadState> {
  const file = formData.get("file");
  const category = String(formData.get("category") ?? "");
  const caption = String(formData.get("caption") ?? "");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "Selecciona una imagen." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "El archivo debe ser una imagen." };
  }

  const validCategories = CATEGORIES.map((c) => c.value) as string[];
  if (!validCategories.includes(category)) {
    return { error: "Categoría inválida." };
  }

  try {
    await addPhoto(file, category as Category, caption);
  } catch (err) {
    console.error("uploadPhotoAction failed:", err);
    return {
      error: "No se pudo subir la foto. Revisa que BLOB_READ_WRITE_TOKEN esté configurado.",
    };
  }

  revalidatePublicPages();
  return { success: true };
}

export async function deletePhotoAction(id: string, _formData: FormData): Promise<void> {
  await deletePhoto(id);
  revalidatePublicPages();
}

export async function updateOrderAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  const order = Number(formData.get("order"));
  if (!id || !Number.isFinite(order)) return;
  await updatePhotoOrder(id, order);
  revalidatePublicPages();
}
