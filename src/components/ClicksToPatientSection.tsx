"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ClicksToPatientSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const lines = sectionRef.current!.querySelectorAll(".ctp-fill-text");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "+=300",
          pin: true,
          scrub: 1,
        },
      });
      lines.forEach((line) => {
        tl.to(line, { backgroundPositionX: "0%", ease: "none", duration: 1 });
      });
      tl.to({}, { duration: 0.5 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative bg-white flex flex-col items-center justify-center py-20 md:py-28 px-6"
    >
      <div className="max-w-2xl w-full flex flex-col items-center text-center mx-auto">
        <h2 className="text-[3.5rem] md:text-[5rem] font-bold mb-8 leading-[1.1] tracking-tighter text-center">
          {["클릭이", "환자로", "이어지다"].map((line, idx) => (
            <span
              key={idx}
              className="ctp-fill-text block w-fit mx-auto"
              style={{
                backgroundImage: "linear-gradient(to right, #000 50%, #d1d5db 50%)",
                backgroundSize: "200% 100%",
                backgroundPositionX: "100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {line}
            </span>
          ))}
        </h2>
        <h3 className="text-xs font-bold text-gray-400 mb-6 tracking-widest uppercase text-center">
          TDTT MEDICAL LANDING
        </h3>
        <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed break-keep font-medium text-center max-w-sm opacity-80">
          원장님은 진료에만 집중하세요. 병원 맞춤형 랜딩페이지로 광고 클릭을 실제
          내원 환자로 전환하는 확실한 시스템을 지금 도입하세요.
        </p>
      </div>
    </div>
  );
}
