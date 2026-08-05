"use client";

import { motion, type Variants } from "framer-motion";

const stages = [
  { number: "01", title: "발견", description: "검색에서 보이고" },
  { number: "02", title: "신뢰", description: "콘텐츠로 확신하고" },
  { number: "03", title: "예약", description: "망설임 없이 선택합니다" },
];

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ScrollMarquee() {
  return (
    <section className="bg-[#f4f1eb] px-5 pb-16 text-[#171816] sm:px-8 sm:pb-24 lg:px-16">
      <motion.ol
        variants={list}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
        className="mx-auto grid max-w-7xl grid-cols-3 border-y border-black/12"
      >
        {stages.map((stage, index) => (
          <motion.li
            key={stage.number}
            variants={item}
            className={`min-w-0 py-5 sm:flex sm:items-center sm:gap-5 sm:py-7 ${
              index > 0 ? "border-l border-black/12 pl-3 sm:pl-6" : "pr-3"
            }`}
          >
            <span className="mb-2 block text-[10px] font-semibold tracking-[0.16em] text-[#c85039] sm:mb-0 sm:text-xs">
              {stage.number}
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold [word-break:keep-all] sm:text-lg">{stage.title}</h3>
              <p className="mt-1 hidden text-sm text-black/48 [word-break:keep-all] md:block">
                {stage.description}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
