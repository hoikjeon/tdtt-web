"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const HOSPITAL_PHOTOS = [
  { src: "/images/doctor1.webp", label: "의료진 프로필" },
  { src: "/images/doctor2.webp", label: "원내 촬영" },
];

function HospitalPhotoSlider({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!isInView) return; // 화면에서 안보이면 작동 중지

    const id = setInterval(() => {
      setIdx(i => (i + 1) % HOSPITAL_PHOTOS.length);
    }, 3800);
    return () => clearInterval(id);
  }, [isInView]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="sync">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <motion.img
            src={HOSPITAL_PHOTOS[idx].src}
            alt={HOSPITAL_PHOTOS[idx].label}
            animate={{ scale: [1, 1.06] }}
            transition={{ duration: 3.8, ease: "linear" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      {/* Label overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${idx}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-4 left-3 z-10"
        >
          <span className="text-white text-[9px] font-semibold">{HOSPITAL_PHOTOS[idx].label}</span>
        </motion.div>
      </AnimatePresence>
      {/* Slide dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {HOSPITAL_PHOTOS.map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full transition-all duration-500"
            style={{ backgroundColor: i === idx ? "#fff" : "rgba(255,255,255,0.4)" }}
          />
        ))}
      </div>
    </div>
  );
}

export default HospitalPhotoSlider;
