"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { photoPublicUrl, type Photo } from "@/lib/blob";
import { PlaceholderTile } from "./PlaceholderTile";

const INTERVAL_MS = 5500;

export function HeroCarousel({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [photos.length]);

  if (photos.length === 0) {
    return <PlaceholderTile label="[Foto hero — pareja, luz natural]" className="h-full w-full" />;
  }

  return (
    <div className="relative h-full w-full">
      {photos.map((photo, i) => (
        <div
          key={photo.id}
          aria-hidden={i !== index}
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <Image
            src={photoPublicUrl(photo.pathname)}
            alt={photo.caption || ""}
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
