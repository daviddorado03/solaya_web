"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { photoPublicUrl, type Photo } from "@/lib/blob";
import { PhotoTile } from "./PhotoTile";

export function PortfolioGallery({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, prev, next]);

  const active = openIndex === null ? null : photos[openIndex];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 md:auto-rows-[220px]">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Ver foto ${i + 1} de ${photos.length}`}
            className={`aspect-square cursor-zoom-in md:aspect-auto ${
              i % 3 === 1 ? "md:row-span-2" : ""
            }`}
          >
            <PhotoTile photo={photo} fallbackLabel="" sizes="(min-width: 768px) 33vw, 50vw" />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute top-5 right-5 text-3xl leading-none text-ivory/80 transition hover:text-ivory"
          >
            &times;
          </button>

          <span className="absolute top-6 left-6 text-xs tracking-[2px] text-ivory/60">
            {openIndex! + 1} / {photos.length}
          </span>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Foto anterior"
                className="absolute left-2 text-4xl leading-none text-ivory/70 transition hover:text-ivory md:left-6"
              >
                &#8249;
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Foto siguiente"
                className="absolute right-2 text-4xl leading-none text-ivory/70 transition hover:text-ivory md:right-6"
              >
                &#8250;
              </button>
            </>
          )}

          <div
            className="relative h-[80vh] w-[92vw] md:w-[85vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photoPublicUrl(active.pathname)}
              alt=""
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
