"use client";

import dynamic from "next/dynamic";

const GlassSphereScene = dynamic(
  () => import("@/components/ui/GlassSphereScene"),
  { ssr: false, loading: () => <div className="w-full h-screen bg-[#121212]" /> }
);

export default GlassSphereScene;
