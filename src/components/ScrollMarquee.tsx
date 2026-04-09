"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

const marqueeWords = [
  "Creative Intelligence",
  "Brand Strategy",
  "Digital Experience",
  "UX Innovation",
  "Data-Driven Design",
  "AI Solutions",
  "Web Development",
  "Visual Storytelling",
];

const marqueeText = marqueeWords.join(" · ") + " · ";

export default function ScrollMarquee() {
  const baseX = useMotionValue(0);
  const [scrollDirection, setScrollDirection] = useState(1); // 1 = down, -1 = up
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current) {
        setScrollDirection(1);
      } else if (currentY < lastScrollY.current) {
        setScrollDirection(-1);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useAnimationFrame(() => {
    const speed = 1.5;
    let newX = baseX.get() + speed * scrollDirection;

    // 텍스트 한 세트의 폭(대략적으로 추정)을 기준으로 순환
    const resetPoint = marqueeText.length * 14; // 글자 수 × 대략적인 폭
    if (newX > 0) {
      newX = -resetPoint;
    } else if (newX < -resetPoint) {
      newX = 0;
    }

    baseX.set(newX);
  });

  return (
    <section className="bg-white text-black overflow-hidden pt-0 pb-6">
      <motion.div
        className="flex whitespace-nowrap"
        style={{ x: baseX }}
      >
        {/* 텍스트를 4번 반복하여 끊김 없는 마퀴 효과 생성 */}
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-7xl md:text-9xl font-bold tracking-tight mr-4 select-none"
          >
            {marqueeText}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
