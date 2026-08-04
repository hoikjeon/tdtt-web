"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  CheckCircle2,
  Hospital,
  Megaphone,
  Share2,
  Stethoscope,
  Users,
} from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

const EASE = [0.22, 1, 0.36, 1] as const;

const partners = [
  {
    name: "척추·관절",
    category: "정형외과 파트너",
    position: "left-[9%] top-[9%]",
  },
  {
    name: "안과 진료",
    category: "안과 파트너",
    position: "right-[9%] top-[9%]",
  },
  {
    name: "뇌·신경",
    category: "신경외과 파트너",
    position: "left-[2%] top-1/2 -translate-y-1/2",
  },
  {
    name: "피부 진료",
    category: "피부과 파트너",
    position: "right-[2%] top-1/2 -translate-y-1/2",
  },
  {
    name: "구강 진료",
    category: "치과 파트너",
    position: "left-[13%] bottom-[7%]",
  },
  {
    name: "내과 진료",
    category: "내과 파트너",
    position: "right-[13%] bottom-[7%]",
  },
];

const connections = [
  { x: 180, y: 82, direction: "in", emphasis: false },
  { x: 820, y: 82, direction: "out", emphasis: false },
  { x: 105, y: 230, direction: "out", emphasis: true },
  { x: 895, y: 230, direction: "in", emphasis: true },
  { x: 225, y: 380, direction: "in", emphasis: false },
  { x: 775, y: 380, direction: "out", emphasis: false },
] as const;

const benefits = [
  {
    icon: Users,
    title: "지역 환자 상호 의뢰",
  },
  {
    icon: Share2,
    title: "진료과별 콘텐츠 협업",
  },
  {
    icon: Megaphone,
    title: "공동 브랜드 프로모션",
  },
];

export default function VisionSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#f4f4f1] px-6 py-24 md:px-16 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-white blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl text-center" data-header-theme="light">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white/80 px-4 py-2 shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5733]" />
          <span className="text-[10px] font-bold tracking-[0.22em] text-[#686868] md:text-xs">
            MEDICAL EU NETWORK
          </span>
        </motion.div>

        <div className="flex flex-col items-center overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="px-2 text-center text-2xl font-black leading-snug tracking-tighter text-[#121212] md:hidden"
          >
            우리 병원도 지역 1등이
            <br />될 수 있습니다.
          </motion.h2>

          <ScrollRevealText
            wrapperClassName="hidden md:inline-block"
            className="text-5xl font-black leading-tight tracking-tighter lg:text-6xl"
            baseClassName="text-black/[0.07]"
            once
          >
            우리 병원도 지역 1등이 될 수 있습니다.
          </ScrollRevealText>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.8, ease: EASE }}
            className="mt-4 max-w-4xl text-xl font-black leading-tight tracking-tighter text-[#FF5733] md:mt-6 md:text-4xl lg:text-5xl"
          >
            혼자가 아닌, 함께 성장하는 의료 네트워크로.
          </motion.h3>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          className="mx-auto mt-7 max-w-2xl break-keep text-sm font-medium leading-relaxed text-[#777] md:text-xl"
        >
          부울경 진료과별 파트너가 환자와 콘텐츠를 서로 연결합니다.
          <br className="hidden md:block" /> 지역 안에서 함께 성장하는 새로운 의료 협력 구조를 만듭니다.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ delay: 0.15, duration: 1, ease: EASE }}
        className="relative z-10 mx-auto mt-14 max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#111315] shadow-[0_40px_100px_rgba(13,15,16,0.24)] md:mt-20 md:rounded-[3rem]"
        aria-label="Medical EU 지역 의료 파트너 네트워크"
        data-header-theme="dark"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(255,87,51,0.17),transparent_28%),radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.06),transparent_22%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:42px_42px]" />

        {/* Desktop hub-and-spoke network */}
        <div className="relative z-10 hidden h-[460px] md:block">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1000 460"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="network-line" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#ffffff" stopOpacity="0.08" />
                <stop offset="0.55" stopColor="#FF5733" stopOpacity="0.45" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0.08" />
              </linearGradient>
              <filter id="particle-glow" x="-200%" y="-200%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {connections.map((connection, index) => {
              const fromX = connection.direction === "in" ? connection.x : 500;
              const fromY = connection.direction === "in" ? connection.y : 230;
              const toX = connection.direction === "in" ? 500 : connection.x;
              const toY = connection.direction === "in" ? 230 : connection.y;

              return (
                <g key={`${connection.x}-${connection.y}`}>
                  <motion.line
                    x1={connection.x}
                    y1={connection.y}
                    x2="500"
                    y2="230"
                    stroke={connection.emphasis ? "#FF6547" : "url(#network-line)"}
                    strokeWidth={connection.emphasis ? 2 : 1.5}
                    strokeOpacity={connection.emphasis ? 0.48 : 1}
                    strokeLinecap="round"
                    filter={connection.emphasis ? "url(#particle-glow)" : undefined}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.25 + index * 0.1, ease: EASE }}
                  />
                  <motion.circle
                    r="3.5"
                    fill="#FF765A"
                    filter="url(#particle-glow)"
                    initial={{ cx: fromX, cy: fromY, opacity: 0 }}
                    animate={
                      reduceMotion
                        ? { cx: toX, cy: toY, opacity: 0.75 }
                        : {
                            cx: [fromX, toX],
                            cy: [fromY, toY],
                            opacity: [0, 1, 0],
                          }
                    }
                    transition={{
                      duration: 3.8,
                      repeat: reduceMotion ? 0 : Infinity,
                      delay: index * 0.65,
                      ease: "linear",
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.2 + index * 0.09, ease: EASE }}
              className={`absolute w-[190px] rounded-2xl border border-white/10 bg-white/[0.055] p-3.5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-colors duration-300 hover:border-[#FF5733]/35 hover:bg-white/[0.075] lg:w-[210px] ${partner.position}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-[#FF5733]/20 bg-[#FF5733]/10 text-[#FF765A]">
                  <Stethoscope size={17} strokeWidth={1.8} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-black text-white lg:text-sm">{partner.name}</p>
                  <p className="mt-0.5 truncate text-[9px] font-medium text-white/40 lg:text-[10px]">{partner.category}</p>
                </div>
                <CheckCircle2 size={13} className="flex-shrink-0 text-emerald-400/80" />
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="absolute left-1/2 top-1/2 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:h-52 lg:w-52"
          >
            <motion.div
              className="absolute inset-0 rounded-full border border-[#FF5733]/25"
              animate={reduceMotion ? undefined : { scale: [1, 1.17, 1], opacity: [0.5, 0.12, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-3 rounded-full border border-white/[0.08] bg-[#161819]/90 shadow-[0_0_70px_rgba(255,87,51,0.22)] backdrop-blur-xl" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF765A] to-[#FF3D1F] text-white shadow-[0_10px_28px_rgba(255,87,51,0.35)]">
                <Hospital size={23} strokeWidth={1.8} />
              </div>
              <p className="text-lg font-black tracking-[-0.03em] text-white lg:text-xl">MEDICAL EU</p>
            </div>
          </motion.div>
        </div>

        {/* Mobile: readable vertical flow */}
        <div className="relative z-10 px-4 py-6 md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center gap-3 rounded-2xl border border-[#FF5733]/25 bg-[#FF5733]/10 p-4"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF765A] to-[#FF3D1F] text-white shadow-[0_10px_28px_rgba(255,87,51,0.25)]">
              <Hospital size={23} strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <p className="text-base font-black text-white">MEDICAL EU</p>
              <p className="mt-0.5 text-[9px] font-semibold tracking-[0.14em] text-white/40">REGIONAL MEDICAL HUB</p>
            </div>
            <CheckCircle2 size={17} className="text-emerald-400" />
          </motion.div>

          <div className="flex h-14 flex-col items-center justify-center">
            <div className="h-5 w-px bg-gradient-to-b from-[#FF5733]/70 to-white/15" />
            <div className="flex items-center gap-2 text-[9px] font-bold text-white/45">
              <ArrowDown size={11} className="text-[#FF765A]" />
              양방향 진료 연계
            </div>
            <div className="h-5 w-px bg-gradient-to-b from-white/15 to-[#FF5733]/70" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
                className="rounded-xl border border-white/[0.08] bg-white/[0.05] p-3"
              >
                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF5733]/10 text-[#FF765A]">
                  <Stethoscope size={14} />
                </div>
                <p className="text-[11px] font-black text-white">{partner.name}</p>
                <p className="mt-0.5 truncate text-[8px] text-white/35">{partner.category}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-20 grid border-t border-white/[0.08] md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
              className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-5 last:border-b-0 md:border-b-0 md:border-r md:px-7 md:py-6 md:last:border-r-0"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[#FF765A]">
                <benefit.icon size={17} strokeWidth={1.8} />
              </div>
              <p className="text-xs font-black text-white md:text-sm">{benefit.title}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
