"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Search, Users, Rocket, LayoutDashboard, ChevronRight } from "lucide-react";

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  labelEn: string;
  description: string;
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
    description: "원내 방문을 통한 맞춤형 전략 수립 및 계약",
    icon: Users
  },
  {
    id: "on-site",
    number: "03",
    title: "현장 투입",
    labelEn: "ON-SITE",
    description: "매주 1회 정기 출근 및 25가지 실무 즉각 실행 (촬영/디자인/마케팅 등)",
    icon: Rocket
  },
  {
    id: "monitoring",
    number: "04",
    title: "투명한 공유",
    labelEn: "MONITORING",
    description: "자체 개발 전용 앱을 통한 실시간 데이터 성과 모니터링",
    icon: LayoutDashboard
  }
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="relative bg-[#fbfbfb] py-24 md:py-40 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#FF5733] font-bold tracking-[.3em] text-xs uppercase"
          >
            HOW IT WORKS
          </motion.p>
          <div className="flex justify-center">
            <div className="relative inline-block overflow-hidden">
               <span className="text-3xl md:text-5xl font-black text-gray-200 tracking-tighter block whitespace-nowrap">
                결제 후, 이렇게 진행됩니다.
              </span>
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as any }}
                className="absolute top-0 left-0 text-3xl md:text-5xl font-black text-[#121212] tracking-tighter overflow-hidden block border-r-[3px] border-[#FF5733] pr-[2px] whitespace-nowrap"
              >
                결제 후, 이렇게 진행됩니다.
              </motion.span>
            </div>
          </div>
        </div>

        {/* Steps Grid - Vertical on mobile, Horizontal on desktop */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[50px] left-[10%] right-[10%] h-[2px] bg-gray-100 z-0">
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
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center text-center space-y-8 group"
            >
              {/* Step Icon with Glow */}
              <div className="relative pt-6">
                {/* Step Number Dot - Overlapping the icon circle but in front */}
                <div className="absolute top-4 right-0 translate-x-1/4 w-10 h-10 md:w-12 md:h-12 bg-[#FF5733] text-white rounded-full flex items-center justify-center text-base font-black shadow-lg z-20 border-4 border-[#fbfbfb]">
                  {step.number}
                </div>

                <motion.div 
                  initial={{ boxShadow: "0 0 0px rgba(255, 87, 51, 0)" }}
                  whileInView={{ boxShadow: "0 0 40px rgba(255, 87, 51, 0.5)" }}
                  transition={{ delay: idx * 0.2 + 0.5, duration: 1 }}
                  className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-full flex items-center justify-center border-2 border-gray-100 relative z-10 transition-colors group-hover:border-[#FF5733]"
                >
                  <step.icon size={36} className="text-gray-400 group-hover:text-[#FF5733] transition-colors" />
                </motion.div>
              </div>

              {/* Step Text */}
              <div className="space-y-4 px-4 overflow-visible">
                <h4 className="text-2xl md:text-3xl font-black text-[#121212] group-hover:text-[#FF5733] transition-colors uppercase tracking-tight leading-tight">
                  {step.title} <br className="hidden md:block lg:hidden" />
                  <span className="text-base md:text-lg font-medium text-gray-400 block mt-1 tracking-widest">
                    ({step.labelEn})
                  </span>
                </h4>
                <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed max-w-[280px] mx-auto">
                  {step.description}
                </p>
              </div>

              {/* Progress Arrow (Desktop, hide for last item) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex absolute top-[54px] -right-4 translate-x-1/2 text-gray-100">
                  <ChevronRight size={32} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Final CTA/Info */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-32 p-8 md:p-12 bg-white rounded-[3rem] border border-gray-100 shadow-xl text-center space-y-6"
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
