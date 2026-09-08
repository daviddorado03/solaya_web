import Image from "next/image";
import type { Photo } from "@/lib/blob";
import { PlaceholderTile } from "./PlaceholderTile";

export function PhotoTile({
  photo,
  fallbackLabel,
  className = "",
  sizes = "33vw",
  priority = false,
}: {
  photo: Photo | null | undefined;
  fallbackLabel: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!photo) {
    return <PlaceholderTile label={fallbackLabel} className={className} />;
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image
        src={photo.url}
        alt={photo.caption || fallbackLabel}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
