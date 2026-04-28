import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "@react-three/drei"],
  },
};

export default nextConfig;
