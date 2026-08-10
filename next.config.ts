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
};

export default nextConfig;
