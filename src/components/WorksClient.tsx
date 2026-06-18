"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Projects, { Project } from "@/components/Projects";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import PatientInquirySection from "@/components/PatientInquirySection";

interface WorksClientProps {
  projectData: Project[];
}

export default function WorksClient({ projectData }: WorksClientProps) {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden selection:bg-white selection:text-black">
      <Header />
      
      {/* Hero Section */}
      <section data-header-theme="dark" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Shader Animation Background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] as any }}
          className="absolute inset-0 z-0"
        >
          <ShaderAnimation />
        </motion.div>

        {/* Overlay Content */}
        <div className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] as any }}
          >
            <span className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-white/60 mb-6 block">
              Selected Projects
            </span>
            <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter leading-tight mb-8">
              CRAFTED<br/>
              <span className="italic font-light opacity-80 text-gray-300">WORKS.</span>
            </h1>
            <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-light px-4 break-keep">
              정교한 마케팅 전략과 <br className="md:hidden" />신뢰감을 주는 시각적 디자인의 시너지.
              <br className="hidden md:block" />
              <span className="mt-2 md:mt-0 block md:inline">
                환자의 발걸음을 이끌어내고 <br className="md:hidden" />병원의 가치를 증명해 낸 확실한 작업물들을
                <br className="hidden md:block" />소개합니다.
              </span>
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
      <section data-header-theme="dark" className="py-32 px-6 md:px-20 lg:px-40 max-w-7xl mx-auto">
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
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">VISUAL &<br/>WEB DESIGN</h2>
            <p className="text-gray-400 leading-relaxed font-light break-keep">
              포토샵과 일러스트레이터를 활용해 병원만의 세련된 브랜드 아이덴티티를 구축합니다. 단순한 미적 아름다움을 넘어, 환자의 편의성과 마케팅 전환율까지 고려한 최적화된 웹디자인으로 신뢰감을 주는 첫인상을 설계합니다.
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
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">CINEMATIC<br/>PRODUCTION</h2>
            <p className="text-gray-400 leading-relaxed font-light break-keep">
              드론과 전문 장비를 활용한 생생한 현장 촬영부터, 프리미어 프로와 에프터 이펙트를 거치는 정교한 후반 작업까지. 퀄리티 높은 모션 그래픽이 더해진 하이엔드 영상으로 병원의 전문성과 가치를 시각적으로 증명합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section (Moved from Home Page) */}
      <div data-header-theme="light">
        <Projects data={projectData} />
      </div>

      <PatientInquirySection />

      {/* Full Width Quote Section */}
      <section data-header-theme="dark" className="py-20 border-y border-white/10 overflow-hidden">
        <div className="flex whitespace-nowrap gap-20 items-center overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="text-[12vw] font-black text-white/5 uppercase tracking-tighter select-none">
              THATDAYTIME — NOW —
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
