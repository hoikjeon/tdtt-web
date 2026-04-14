"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Background Animations: 
  // 1. Scale from 0.8 to 1.0 (filling the screen)
  // 2. Grayscale from 100% to 0% (turning into color)
  // 3. Border radius from 40px to 0px
  const scale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1.2]);
  const grayscale = useTransform(scrollYProgress, [0.1, 0.4], ["grayscale(100%)", "grayscale(0%)"]);
  const borderRadius = useTransform(scrollYProgress, [0.1, 0.4], ["40px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Headline Animation: Expands from center
  // Headline Animation: Expands from center (increased range to 1.2)
  const headlineScale = useTransform(scrollYProgress, [0.3, 0.5], [0.5, 1.2]);
  const headlineOpacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[150vh] bg-white"
    >
      {/* Sticky Container for the Full Screen Effect */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Animated Background Wrapper */}
        <motion.div
          style={{
            scale,
            filter: grayscale,
            borderRadius,
            opacity,
          }}
          className="relative w-full h-full overflow-hidden shadow-2xl origin-center"
        >
          {/* POV Image */}
          <Image
            src="/images/solution_pov.png"
            alt="Entering hospital POV"
            fill
            className="object-cover"
            priority
          />
          
          {/* Overlay for Readability (Increased opacity) */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content Over the Background */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 text-center text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            
            <motion.div
              style={{
                scale: headlineScale,
                opacity: headlineOpacity,
              }}
              className="max-w-4xl space-y-8"
            >
              <h2 className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tighter">
                "그래서, 저희가 원장님 병원으로<br />
                <span className="text-[#FF5733]">직접 출근하겠습니다.</span>"
              </h2>

              <div className="space-y-6 max-w-2xl mx-auto">
                <p className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed">
                  내부 직원의 장점인 '현장감'과<br className="md:hidden" />
                  전문 에이전시의 노하우를 완벽하게 결합했습니다.
                </p>
                
                <div className="h-[1px] w-20 bg-[#FF5733] mx-auto opacity-50" />
                
                <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                  5년 이상의 병원 마케팅 실무 경험을 바탕으로,<br />
                  우리 병원 내부 사정을 누구보다 잘 아는<br />
                  <span className="text-white font-bold">'1.5인분 만능 마케팅 팀장'</span>이 되어 드립니다.
                </p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="pt-12"
              >
                <div className="inline-block px-8 py-4 border border-white/20 rounded-full backdrop-blur-md bg-white/5 text-sm tracking-[0.2em] font-light uppercase">
                  ThatDayTime : On-Site Partner
                </div>
              </motion.div>
            </motion.div>

          </div>
        </motion.div>

      </div>
      
      {/* Spacer to allow for scroll room for the sticky effect */}
      <div className="h-[50vh]" />
    </section>
  );
}
