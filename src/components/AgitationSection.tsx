"use client";

import { ArrowUpRight, Search, ShieldCheck } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const journey = [
  {
    number: "01",
    title: "발견",
    description: "지역과 증상 검색에서",
    icon: Search,
  },
  {
    number: "02",
    title: "신뢰",
    description: "일관된 정보와 콘텐츠로",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "선택",
    description: "간결한 예약 동선까지",
    icon: ArrowUpRight,
  },
];

const copy: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const panel: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.18, staggerChildren: 0.13 } },
};

const panelItem: Variants = {
  hidden: { opacity: 0, x: 18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AgitationSection() {
  return (
    <section className="relative overflow-hidden bg-[#171816] px-5 py-16 text-white sm:px-8 sm:py-24 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 xl:gap-28">
        <motion.div
          variants={copy}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="min-w-0"
        >
          <motion.h3
            variants={reveal}
            className="max-w-[11ch] text-3xl font-semibold leading-[1.15] tracking-[-0.04em] [word-break:keep-all] md:text-5xl"
          >
            <span className="block">찾는 순간,</span>
            <span className="block text-white/52">선택할 이유가</span>
            <span className="block text-white/52">보여야 합니다.</span>
          </motion.h3>

          <motion.p
            variants={reveal}
            className="mt-6 max-w-lg text-pretty text-base font-medium leading-[1.75] text-white/56 sm:mt-8 sm:text-lg [word-break:keep-all]"
          >
            검색, 콘텐츠, 예약을 하나의 흐름으로 연결해 환자의 망설임을 줄입니다.
          </motion.p>

          <motion.ul variants={reveal} className="mt-8 flex flex-wrap gap-2 sm:mt-10">
            {["검색 최적화", "신뢰 콘텐츠", "예약 전환"].map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/12 px-3.5 py-2 text-xs font-medium text-white/62"
              >
                {tag}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          variants={panel}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#20221f] p-4 shadow-[0_32px_80px_rgba(0,0,0,0.24)] sm:p-6 lg:p-8"
        >
          <motion.header
            variants={panelItem}
            className="mb-3 flex items-center justify-between px-1 pb-4 sm:mb-5 sm:pb-5"
          >
            <div>
              <p className="text-sm font-semibold">환자 선택 여정</p>
            </div>
          </motion.header>

          <div className="overflow-hidden rounded-2xl border border-white/8 bg-black/12">
            {journey.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  variants={panelItem}
                  className={`grid grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-3 px-4 py-4 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-4 sm:px-5 sm:py-5 ${
                    index > 0 ? "border-t border-white/8" : ""
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/7 text-white/70 sm:h-11 sm:w-11">
                    <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] font-semibold text-[#e46b50]">{step.number}</span>
                      <h4 className="text-sm font-semibold sm:text-base">{step.title}</h4>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-white/42 [word-break:keep-all] sm:text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={panelItem}
            className="mt-4 flex items-center justify-between gap-4 rounded-2xl bg-[#f4f1eb] px-4 py-4 text-[#171816] sm:mt-5 sm:px-5 sm:py-5"
          >
            <div className="min-w-0">
              <p className="text-sm font-bold [word-break:keep-all] sm:text-base">
                망설임 없는 예약
              </p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#171816] text-white">
              <ArrowUpRight size={17} aria-hidden="true" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
