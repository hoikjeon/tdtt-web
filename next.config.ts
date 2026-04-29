import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // static export requires this
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@react-three/drei",
      "three",
      "gsap",
      "@tsparticles/slim",
      "@tsparticles/react",
    ],
  },
};

export default nextConfig;
