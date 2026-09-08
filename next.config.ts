import type { NextConfig } from "next";

// Photos are served same-origin through app/photos/[...path]/route.ts
// (proxying the private Vercel Blob store), so next/image needs no
// remotePatterns.
const nextConfig: NextConfig = {};

export default nextConfig;
