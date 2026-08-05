"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.12,
    },
  },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Intro() {
  return (
    <section
      id="intro"
      className="relative overflow-hidden bg-[#f4f1eb] px-5 pb-12 pt-24 text-[#171816] sm:px-8 sm:pb-16 sm:pt-32 lg:px-16 lg:pt-40"
    >
      <motion.div
        variants={container}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="mx-auto max-w-7xl"
      >
        <motion.h2
          variants={reveal}
          className="max-w-[11ch] text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.045em] [word-break:keep-all] md:text-5xl"
        >
          검색을 넘어,
          <span className="block text-black/38">선택되는 병원으로.</span>
        </motion.h2>

        <motion.div
          variants={reveal}
          className="mt-8 max-w-3xl border-t border-black/12 pt-5 sm:mt-12 sm:pt-7"
        >
          <p className="max-w-2xl text-pretty text-base font-medium leading-[1.65] text-black/68 sm:text-lg [word-break:keep-all]">
            환자가 찾는 순간부터 예약하는 순간까지,
            <br className="hidden sm:block" /> 하나의 브랜드 경험으로 설계합니다.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
