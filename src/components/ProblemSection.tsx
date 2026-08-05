"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const copy: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

const copyItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const choices = [
  { label: "과거", text: "가까운 병원" },
  { label: "지금", text: "믿을 이유가 보이는 병원" },
];

export default function ProblemSection() {
  return (
    <section className="relative overflow-hidden bg-[#f4f1eb] px-5 py-16 text-[#171816] sm:px-8 sm:py-24 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 xl:gap-28">
        <motion.figure
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group relative order-2 aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-[#ddd8ce] lg:order-1 lg:aspect-[4/5]"
        >
          <Image
            src="/images/patient-consultation-v2.png"
            alt="차분한 진료실에서 환자와 상담하는 의료진"
            fill
            sizes="(max-width: 1024px) calc(100vw - 40px), 42vw"
            className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025] lg:object-[50%_56%]"
          />
        </motion.figure>

        <motion.div
          variants={copy}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="order-1 min-w-0 lg:order-2"
        >
          <motion.h3
            variants={copyItem}
            className="max-w-[12ch] text-balance text-3xl font-semibold leading-[1.15] tracking-[-0.04em] [word-break:keep-all] md:text-5xl"
          >
            좋은 진료만으로는 발견되지 않습니다.
          </motion.h3>

          <motion.p
            variants={copyItem}
            className="mt-6 max-w-xl text-pretty text-base font-medium leading-[1.75] text-black/58 sm:mt-8 sm:text-xl [word-break:keep-all]"
          >
            환자는 방문 전에 검색하고, 비교하고, 믿을 이유를 확인합니다.
          </motion.p>

          <motion.dl
            variants={copyItem}
            className="mt-9 overflow-hidden rounded-2xl border border-black/10 bg-white/46 sm:mt-12"
          >
            {choices.map((choice, index) => (
              <div
                key={choice.label}
                className={`grid grid-cols-[3.5rem_1fr] items-center gap-4 px-5 py-4 sm:grid-cols-[5rem_1fr] sm:px-7 sm:py-5 ${
                  index > 0 ? "border-t border-black/10" : ""
                }`}
              >
                <dt className="text-xs font-semibold tracking-[0.12em] text-black/38 sm:text-sm">
                  {choice.label}
                </dt>
                <dd className="text-sm font-semibold [word-break:keep-all] sm:text-lg">
                  {choice.text}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
