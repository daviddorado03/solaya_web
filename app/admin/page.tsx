import Image from "next/image";
import { AdminNav } from "@/components/AdminNav";
import { UploadForm } from "./UploadForm";
import { deletePhotoAction, updateOrderAction } from "./actions";
import { getPhotos, photoPublicUrl, CATEGORIES } from "@/lib/blob";

// Admin data changes from user actions (uploads, deletes) — never serve a
// cached/static snapshot here.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const photos = await getPhotos();

  return (
    <>
      <AdminNav current="fotos" />

      <div className="flex flex-col gap-10 px-8 py-10 md:px-16">
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-2xl">Fotos del sitio</h1>
          <p className="text-sm text-ink/65">
            Sube una foto, elige en qué sección aparece y listo — se ve reflejada en el sitio en
            un momento, sin tocar código. &ldquo;Estudio&rdquo; muestra solo una foto (la de menor
            orden); &ldquo;Home&rdquo; las usa todas como carrusel (en el orden que definas) y en
            Portafolio puedes subir varias por categoría.
          </p>
        </div>

        <UploadForm />

        <div className="flex flex-col gap-12">
          {CATEGORIES.map((cat) => {
            const items = photos.filter((p) => p.category === cat.value);
            return (
              <div key={cat.value} className="flex flex-col gap-4">
                <h2 className="text-sm font-medium tracking-[1px] text-bronze uppercase">
                  {cat.label} {cat.singleton && items.length > 1 ? "(se muestra la de menor orden)" : ""}
                </h2>

                {items.length === 0 ? (
                  <p className="text-sm text-ink/45">Sin fotos todavía.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                    {items.map((photo) => (
                      <div key={photo.id} className="flex flex-col gap-2 border border-taupe p-2">
                        <div className="relative aspect-square w-full overflow-hidden bg-panel">
                          <Image
                            src={photoPublicUrl(photo.pathname)}
                            alt={photo.caption || cat.label}
                            fill
                            sizes="200px"
                            className="object-cover"
                          />
                        </div>
                        {photo.caption && (
                          <p className="truncate text-[11px] text-ink/60">{photo.caption}</p>
                        )}

                        <form action={updateOrderAction} className="flex items-center gap-2">
                          <input type="hidden" name="id" value={photo.id} />
                          <span className="text-[10px] text-ink/50 uppercase">Orden</span>
                          <input
                            type="number"
                            name="order"
                            defaultValue={photo.order}
                            className="h-7 w-14 border border-taupe bg-ivory px-1 text-xs"
                          />
                          <button
                            type="submit"
                            className="text-[10px] tracking-[1px] text-bronze uppercase"
                          >
                            Guardar
                          </button>
                        </form>

                        <form action={deletePhotoAction.bind(null, photo.id)}>
                          <button
                            type="submit"
                            className="text-[10px] tracking-[1px] text-red-700 uppercase"
                          >
                            Eliminar
                          </button>
                        </form>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
