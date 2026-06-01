"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const Highlight = ({ children, color = "#FF5733" }: { children: React.ReactNode; color?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <span className="relative inline-block whitespace-nowrap" ref={ref}>
      <motion.span
        className="absolute inset-0 z-0 rounded-[3px]"
        style={{ backgroundColor: color, originX: 0 }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 0.22 } : {}}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
};

export default function ProblemSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [isHovered, setIsHovered] = useState(false);

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
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
        {/* Left: Interactive Cross-fade Image (hs-1 / hs-2) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 group cursor-pointer"
        >
          {/* hs-1 Image */}
          <motion.div
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 z-10"
          >
            <Image
              src="/images/hs-1.png"
              alt="Before marketing shift"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </motion.div>

          {/* hs-2 Image */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 z-20"
          >
            <Image
              src="/images/hs-2.png"
              alt="After marketing shift"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </motion.div>
        </motion.div>

        {/* Right: Problem Statement Text */}
        <motion.div
          ref={containerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-6 md:gap-8"
        >
          <motion.div variants={itemFadeRight} className="space-y-4">
            <p className="text-[#FF5733] font-bold tracking-tight text-lg">PROBLEM & EMPATHY</p>
            <h3 className="text-3xl md:text-5xl font-extrabold text-[#121212] leading-[1.3] tracking-tight">
              아프다고 아무 병원이나<br className="hidden md:inline" /> 가는 시대는 끝났습니다.
            </h3>
          </motion.div>

          <motion.div variants={itemFadeRight} className="space-y-6 text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
            <p className="text-xl md:text-2xl font-bold text-gray-900">
              우리 병원은 지금 <Highlight color="#FF5733">'생존'</Highlight>하고 있습니까?
            </p>
            <p>
              장기적인 경기 침체로 환자들의 지갑이 닫히면서,<br />
              병원을 선택하는 환자들의 기준은 그 어느 때보다 까다로워졌습니다.
            </p>
            <p>
              아직도 과거 방식에 머물러, 영혼 없는 <Highlight>공장형 블로그 포스팅</Highlight>이나<br />
              단순 <Highlight>파워링크 유지</Highlight>에 피 같은 예산을 버리고 계시진 않습니까?
            </p>
            <p className="pt-4 text-black font-bold text-xl md:text-2xl italic border-l-4 border-[#FF5733] pl-6 leading-normal">
              "타겟 맞춤형 브랜딩이 빠진 기계적 홍보는 이제 '도태'를<br />
              의미합니다.<br />
              지금은 뼈를 깎는 혁신이 필요한 골든타임입니다."
            </p>
          </motion.div>

          <motion.div 
            variants={itemFadeRight}
            className="pt-6"
          >
            <div className="inline-flex items-center gap-2 text-sm text-gray-400 font-semibold tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-gray-300" />
              ThatDayTime Solution is coming
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
