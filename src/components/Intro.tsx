"use client";

import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section id="intro" className="relative bg-white text-black pt-24 md:pt-32 pb-4 md:pb-6 px-6 md:px-16">
      <div className="max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[21px] font-medium tracking-wider mb-8"
        >
          ThatDayTime
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
            "AI 검색 시대의 병원 마케팅,",
            "생존을 넘어 압도적 1위로.",
            "미래의 환자 유입까지 선제적으로 확보하는",
            "가장 확실한 온라인 환경 최적화 전략입니다."
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
