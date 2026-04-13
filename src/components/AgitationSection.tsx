"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const Highlight = ({ children, color = "#FF5733" }: { children: React.ReactNode; color?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <span className="relative inline-block whitespace-nowrap" ref={ref}>
      <span className="relative z-10">{children}</span>
      <motion.svg
        viewBox="0 0 100 20"
        className="absolute -bottom-1 left-0 w-full h-3 z-0 overflow-visible"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 10 Q 50 15 100 10"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.7 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        />
      </motion.svg>
    </span>
  );
};

export default function AgitationSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemFadeLeft: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  const itemFadeRight: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section className="relative bg-white py-24 md:py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left: Agitation Text (Desktop: Order 1, Mobile: Order 2) */}
        <motion.div
          ref={containerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1"
        >
          <motion.div variants={itemFadeRight} className="space-y-4">
            <p className="text-[#FF5733] font-bold tracking-tight text-lg">THE DIGITAL SHIFT</p>
            <h3 className="text-3xl md:text-5xl font-extrabold text-[#121212] leading-[1.2] tracking-tight">
              "아프다고 아무 병원이나<br />
              가는 시대는 끝났습니다."
            </h3>
          </motion.div>

          <motion.div variants={itemFadeRight} className="space-y-6 text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
            <p>
              단순히 파워링크만 걸어두고, 영혼 없는 포스팅을 올리던<br />
              과거의 방식은 더 이상 환자들의 지갑을 열지 못합니다.
            </p>
            <p>
              게다가 네이버 검색을 넘어 ChatGPT 등<br />
              <Highlight>'AI 검색 시대'</Highlight>가 도래했습니다.
            </p>
            <p className="pt-4 text-gray-900 font-bold text-xl md:text-2xl leading-normal">
              현장을 모르는 외주 업체의 뻔한 마케팅으로는<br />
              다가오는 <Highlight>생존 위기</Highlight>를 돌파할 수 없습니다.
            </p>
          </motion.div>

          <motion.div variants={itemFadeRight} className="pt-6">
            <div className="inline-flex items-center gap-2 text-sm text-gray-400 font-semibold tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-gray-300" />
              Old ways don't open new doors
            </div>
          </motion.div>
        </motion.div>

        {/* Right: AI Shift Image (Desktop: Order 2, Mobile: Order 1) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 group order-1 lg:order-2"
        >
          <Image
            src="/images/ai_digital_shift.png"
            alt="Digital AI workspace representing the shift in search era"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
          <div className="absolute bottom-6 right-6 text-white/50 text-xs tracking-widest font-light pointer-events-none uppercase">
            Future of Search : AI
          </div>
        </motion.div>

      </div>
    </section>
  );
}
