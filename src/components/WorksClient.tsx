"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import { MoveDown } from "lucide-react";
import Projects, { Project } from "@/components/Projects";

interface WorksClientProps {
  projectData: Project[];
}

export default function WorksClient({ projectData }: WorksClientProps) {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden selection:bg-white selection:text-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Entrance Effect */}
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/Fractal Glass.jpg"
            alt="Fractal Glass Background"
            className="w-full h-full object-cover grayscale-[30%] brightness-[0.7]"
          />
        </motion.div>

        {/* Overlay Content */}
        <div className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-white/60 mb-6 block">
              Selected Projects
            </span>
            <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter leading-tight mb-8">
              CRAFTED<br/>
              <span className="italic font-light opacity-80 text-gray-300">WORKS.</span>
            </h1>
            <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-light px-4">
              Exploring the boundary between digital precision and artistic chaos. 
              Our collection showcases selected works that redefine interactive experiences.
            </p>
          </motion.div>
        </div>

        {/* Hero Marquee (Fills the bottom area) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/10 bg-black/20 backdrop-blur-sm py-4 md:py-6">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex whitespace-nowrap gap-10 items-center"
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-white text-xl md:text-2xl font-bold tracking-widest uppercase flex items-center gap-10">
                Selected Works <span className="w-2 h-2 bg-white rounded-full" /> 
                Brand Experience <span className="w-2 h-2 bg-white rounded-full" /> 
                Visual Design <span className="w-2 h-2 bg-white rounded-full" /> 
                Digital Essence <span className="w-2 h-2 bg-white rounded-full" />
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-32 px-6 md:px-20 lg:px-40 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-40">
          {/* Section 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-6"
          >
            <div className="w-12 h-px bg-white/30" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">VISIONARY<br/>CONCEPT</h2>
            <p className="text-gray-400 leading-relaxed font-light">
              We believe that every pixel tells a story. Our approach combines rigorous strategy with boundary-pushing design to create digital products that don't just work—they resonate. 
            </p>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col gap-6 pt-0 md:pt-40"
          >
            <div className="w-12 h-px bg-white/30" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">MASTERFUL<br/>EXECUTION</h2>
            <p className="text-gray-400 leading-relaxed font-light">
              From concept to launch, we meticulously refine every detail. Our technical expertise ensures that the most complex visions are translated into seamless, high-performance realities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section (Moved from Home Page) */}
      <Projects data={projectData} />

      {/* Full Width Quote Section */}
      <section className="py-20 border-y border-white/10 overflow-hidden">
        <div className="flex whitespace-nowrap gap-20 items-center overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="text-[12vw] font-black text-white/5 uppercase tracking-tighter select-none">
              EXPERIENCE THE FUTURE — NOW — 
            </div>
          ))}
        </div>
      </section>

      {/* Footer-like simple section */}
      <footer className="py-20 text-center flex flex-col items-center gap-10">
        <div className="w-px h-20 bg-gradient-to-b from-white/0 to-white/40" />
        <h3 className="text-2xl md:text-4xl font-light tracking-tight text-white/80">
          Interested in working with us?
        </h3>
        <button className="px-10 py-4 border border-white/20 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500">
          Get in Touch
        </button>
        <p className="text-white/20 text-[10px] tracking-[0.5em] mt-10 uppercase">
          © 2026 TDTT — All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
