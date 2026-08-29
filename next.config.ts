import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mmzurbsrpbmfkqufwejd.supabase.co",
        pathname: "/storage/v1/object/public/room-photos/**",
      },
    ],
  },
  // The redesign folded /about into the homepage and /rukost into /rooms.
  // Keep old links (and the portfolio case study) alive.
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/rukost", destination: "/rooms#rukost", permanent: true },
    ];
  },
};

export default nextConfig;
