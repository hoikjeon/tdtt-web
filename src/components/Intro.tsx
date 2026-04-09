"use client";

import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="relative bg-white text-black pt-24 md:pt-32 pb-4 md:pb-6 px-6 md:px-16">
      <div className="max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-sm font-medium tracking-wider mb-8"
        >
          Keep Exploring
        </motion.p>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="text-3xl md:text-5xl font-bold leading-tight"
        >
          {[
            "AI 시대에 걸맞은 디지털 웹 스튜디오 —",
            "경험과 기술력, 그리고 AI와 데이터 활용",
            "역량으로 사용자 경험(UX)을 혁신적으로",
            "향상시키는 파트너입니다."
          ].map((line, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </motion.h2>
      </div>
    </section>
  );
}
