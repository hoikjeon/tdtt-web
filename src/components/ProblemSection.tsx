"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
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
        {/* Left: Black & White Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 group"
        >
          <Image
            src="/images/empty_hospital_bw.png"
            alt="Empty hospital interior representing stagnation"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
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
            <h3 className="text-3xl md:text-5xl font-extrabold text-[#121212] leading-[1.2] tracking-tight">
              원장님, 매달 마케팅 비용은<br />
              나가는데,<br />
              왜 신환은 늘지 않을까요?
            </h3>
          </motion.div>

          <motion.div variants={itemFadeRight} className="space-y-6 text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
            <p>
              직원 1명을 뽑자니 4대 보험, 연차, 퇴직금에<br />
              <Highlight>갑작스러운 퇴사 리스크</Highlight>까지 너무 부담되시죠?
            </p>
            <p>
              외주 대행사에 맡겼더니, 우리 병원 진료 철학은 쏙 빠진 채<br />
              기계적인 <Highlight>공장형 블로그</Highlight>만 올라오고 있지 않으신가요?
            </p>
            <p className="pt-4 text-black font-bold text-xl md:text-2xl italic border-l-4 border-[#FF5733] pl-6 leading-normal">
              "소통은 안 되고, 결과물은 아쉬웠던 그 답답함,<br />
              누구보다 깊이 공감합니다."
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
