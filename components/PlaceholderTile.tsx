export function PlaceholderTile({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-taupe ${className}`}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-35"
      >
        <rect x="2" y="3" width="20" height="18" rx="1" stroke="#3B2C22" strokeWidth="1.3" />
        <circle cx="8" cy="9" r="1.6" stroke="#3B2C22" strokeWidth="1.3" />
        <path
          d="M3 17l5-5 3 3 4-5 6 7"
          stroke="#3B2C22"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="px-2 text-center text-[9px] tracking-wider text-ink/50 uppercase">
        {label}
      </span>
    </div>
  );
}
