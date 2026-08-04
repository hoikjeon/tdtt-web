"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Users, Rocket, LayoutDashboard, ChevronRight, ChevronDown } from "lucide-react";
import ScrollRevealText from "@/components/ui/ScrollRevealText";

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  labelEn: string;
  description: React.ReactNode;
  icon: any;
}

const steps: ProcessStep[] = [
  {
    id: "diagnostic",
    number: "01",
    title: "사전 진단",
    labelEn: "DIAGNOSTIC",
    description: "타겟 병원의 현재 마케팅 상태 분석 및 무료 환경 진단 리포트 제공",
    icon: Search
  },
  {
    id: "meeting",
    number: "02",
    title: "대면 미팅",
    labelEn: "MEETING",
    description: <>원내 방문을 통한<br />맞춤형 전략 수립 및 계약</>,
    icon: Users
  },
  {
    id: "on-site",
    number: "03",
    title: "현장 투입",
    labelEn: "ON-SITE",
    description: <>매주 1회 정기 출근 및 25가지 실무 즉각 실행<br />(촬영/디자인/마케팅 등)</>,
    icon: Rocket
  },
  {
    id: "monitoring",
    number: "04",
    title: "투명한 공유",
    labelEn: "MONITORING",
    description: <>앱을 통한<br />실시간 데이터 성과 모니터링</>,
    icon: LayoutDashboard
  }
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <section className="relative bg-[#fbfbfb] py-24 md:py-40 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center space-y-4 mb-12 md:mb-24">

          <div className="flex justify-center overflow-hidden">
            {/* Mobile */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="md:hidden text-2xl font-black text-[#121212] tracking-tighter"
            >
              계약 후, 이렇게 진행됩니다.
            </motion.h2>
            {/* Desktop: fill 애니메이션 */}
            <ScrollRevealText
              wrapperClassName="hidden md:inline-block"
              className="text-5xl font-black tracking-tighter"
            >
              계약 후, 이렇게 진행됩니다.
            </ScrollRevealText>
          </div>
        </div>

        {/* Mobile: 1열 카드 + 탭 확장 */}
        <div className="md:hidden">
          <div className="grid grid-cols-4 gap-2 mb-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === step.id;
              return (
                <motion.button
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveStep(isActive ? null : step.id)}
                  className={`relative flex flex-col items-center gap-2 rounded-2xl p-3 border transition-all duration-200 ${
                    isActive
                      ? "bg-[#FF5733]/5 border-[#FF5733]/30 shadow-md"
                      : "bg-white border-gray-100 shadow-sm"
                  }`}
                >
                  {/* Number badge */}
                  <div className={`absolute -top-2 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black shadow text-white transition-colors ${isActive ? "bg-[#FF5733]" : "bg-gray-300"}`}>
                    {step.number}
                  </div>
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all ${isActive ? "border-[#FF5733] bg-[#FF5733]/5" : "border-gray-100 bg-white"}`}>
                    <step.icon size={18} className={isActive ? "text-[#FF5733]" : "text-gray-400"} />
                  </div>
                  {/* Title */}
                  <span className={`text-[10px] font-black leading-tight text-center transition-colors ${isActive ? "text-[#FF5733]" : "text-[#121212]"}`}>
                    {step.title}
                  </span>
                  {/* Expand indicator */}
                  <ChevronDown
                    size={10}
                    className={`transition-transform duration-200 ${isActive ? "rotate-180 text-[#FF5733]" : "text-gray-300"}`}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Expanded detail panel */}
          <AnimatePresence mode="wait">
            {activeStep && (() => {
              const step = steps.find(s => s.id === activeStep)!;
              return (
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-2xl border border-[#FF5733]/15 p-5 shadow-md flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FF5733]/5 border-2 border-[#FF5733]/20 flex items-center justify-center shrink-0">
                      <step.icon size={22} className="text-[#FF5733]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base font-black text-[#121212]">{step.title}</span>
                        <span className="text-[10px] font-bold text-gray-400 tracking-widest">({step.labelEn})</span>
                      </div>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

        {/* Desktop: 기존 4열 레이아웃 */}
        <div className="relative hidden md:grid grid-cols-4 gap-8">
          {/* Connecting Line */}
          <div className="absolute top-[74px] left-[10%] right-[10%] h-[2px] bg-gray-100 z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-[#FF5733]/20 via-[#FF5733] to-[#FF5733]/20 origin-left"
            />
          </div>

          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="relative pt-6">
                <div className="absolute top-4 right-0 translate-x-1/4 w-12 h-12 bg-[#FF5733] text-white rounded-full flex items-center justify-center text-base font-black shadow-lg z-20 border-4 border-white">
                  {step.number}
                </div>
                <motion.div
                  initial={{ boxShadow: "0 0 0px rgba(255, 87, 51, 0)" }}
                  whileInView={{ boxShadow: "0 0 30px rgba(255, 87, 51, 0.4)" }}
                  transition={{ delay: idx * 0.2 + 0.5, duration: 1 }}
                  className="w-28 h-28 bg-white rounded-full flex items-center justify-center border-2 border-gray-100 relative z-10 transition-colors group-hover:border-[#FF5733]"
                >
                  <step.icon size={36} className="text-gray-400 group-hover:text-[#FF5733] transition-colors" />
                </motion.div>
              </div>

              <div className="space-y-4 mt-8 px-4">
                <h4 className="text-3xl font-black text-[#121212] group-hover:text-[#FF5733] transition-colors uppercase tracking-tight leading-tight">
                  {step.title}
                  <span className="text-lg font-medium text-gray-400 block mt-1 tracking-widest normal-case">
                    ({step.labelEn})
                  </span>
                </h4>
                <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-[280px] mx-auto">
                  {step.description}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="absolute top-[78px] -right-4 translate-x-1/2 text-gray-100">
                  <ChevronRight size={32} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-24 md:mt-32 p-8 md:p-12 bg-white rounded-[3rem] border border-gray-100 shadow-xl text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF5733]/5 text-[#FF5733] rounded-full text-sm font-bold">
            <span className="w-2 h-2 bg-[#FF5733] rounded-full animate-pulse" />
            실시간 프로젝트 현황
          </div>
          <h3 className="text-2xl md:text-4xl font-black text-[#121212] leading-tight">
            어디서든 내 병원의 성과를 한눈에.<br />
            <span className="text-[#FF5733]">전용 앱</span>으로 투명하게 공유합니다.
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-gray-400 font-medium text-sm md:text-base">
            <span>#실시간리포트</span>
            <span>#광고ROI추적</span>
            <span>#홈페이지광고추적</span>
            <span>#광고보고서</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
