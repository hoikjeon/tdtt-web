"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NextProjectCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 텍스트 한 줄씩 채워지는 효과 구현
      const lines = gsap.utils.toArray<HTMLElement>(".scroll-fill-line");
      
      lines.forEach((line) => {
        gsap.to(line, {
          backgroundPositionX: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top 85%", // 화면의 85% 지점에 닿으면 시작
            end: "top 55%",   // 화면의 55% 지점까지 스크롤 시 완료
            scrub: 1,         // 스크롤에 동기화
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white text-black py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      {/* 2. 대형 텍스트 영역 */}
      <div className="max-w-4xl mx-auto flex flex-col items-start">
        <h2 
          ref={textRef}
          className="text-[4rem] md:text-[6rem] lg:text-[7rem] font-bold leading-[1.05] tracking-tighter mb-12"
        >
          {["다음 작품이", "궁금하신가", "요?"].map((line, idx) => (
            <span 
              key={idx} 
              className="scroll-fill-line block w-fit"
              style={{
                backgroundImage: "linear-gradient(to right, #000 50%, #d1d5db 50%)",
                backgroundSize: "200% 100%",
                backgroundPositionX: "100%",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {line}
            </span>
          ))}
        </h2>

        {/* 3. 이동 링크 */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="group flex items-center gap-4 text-sm font-bold tracking-widest uppercase"
        >
          <span className="relative overflow-hidden">
            <span className="block transition-transform duration-500 group-hover:-translate-y-full">
              View All Works
            </span>
            <span className="absolute top-0 left-0 transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-black">
              View All Works
            </span>
          </span>
          <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center transition-all duration-500 group-hover:bg-black group-hover:text-white group-hover:scale-110">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M2.33331 7H11.6666M11.6666 7L6.99998 2.33334M11.6666 7L6.99998 11.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.a>
      </div>

      {/* 배경 장식 텍스트 */}
      <div className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 -z-10 opacity-[0.03] select-none pointer-events-none">
        <span className="text-[20vw] font-black whitespace-nowrap uppercase tracking-tighter">
          Next Work
        </span>
      </div>
    </section>
  );
}
