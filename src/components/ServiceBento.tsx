"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { 
  Video, 
  Newspaper, 
  MessageSquare, 
  Globe, 
  Share2, 
  Search, 
  Star, 
  Camera, 
  Plane, 
  Code, 
  Target,
  Smartphone,
  ChevronRight,
  X
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  detail: string;
  icon: any;
  color: string;
  size: "small" | "medium" | "large";
  isApp?: boolean;
}

const services: ServiceItem[] = [
  {
    id: "ai-search",
    title: "AI 검색 최적화",
    description: "ChatGPT, 네이버 등 AI 검색 시대 필수 전략",
    detail: "단순 키워드 노출을 넘어 AI가 학습하고 추천하는 병원이 되도록 알고리즘 최적화를 선점합니다.",
    icon: Search,
    color: "#FF5733",
    size: "large",
  },
  {
    id: "monitoring-app",
    title: "프로그램 개발",
    description: "병원 실무 효율을 높이는 맞춤 도구 제작",
    detail: "마케팅 효율 측정기부터 예약 연동 툴까지 필요한 모든 솔루션을 직접 개발해 드립니다.",
    icon: Code,
    color: "#2d3748",
    size: "large",
    isApp: true,
  },
  {
    id: "youtube",
    title: "유튜브 촬영 & 편집",
    description: "전문 장비와 기획으로 완성되는 고품질 영상",
    detail: "매주 현장 출근 시 직접 촬영하여 병원의 진심이 담긴 숏폼부터 롱폼까지 제작합니다.",
    icon: Video,
    color: "#ff0000",
    size: "medium",
  },
  {
    id: "hospital-photo",
    title: "병원 원내 촬영 및 프로필 촬영",
    description: "신뢰감을 주는 의료진 프로필과 생동감 넘치는 원내 시설 촬영",
    detail: "매주 현장 출근 시 전문 장비를 활용하여 환자들에게 신뢰를 주는 고퀄리티 프로필 이미지와 병원의 생생한 현장감을 담아냅니다.",
    icon: Camera,
    color: "#6b46c1",
    size: "medium",
  },
  {
    id: "blog",
    title: "브랜드 블로그 개발",
    description: "기계적인 공장형이 아닌 진료 철학을 담은 글",
    detail: "원장님의 진료 스타일을 가장 잘 이해하는 팀장이 직접 원고의 완성도를 검수하고 발행합니다.",
    icon: MessageSquare,
    color: "#2db400",
    size: "small",
  },
  {
    id: "news",
    title: "뉴스 기사 배포",
    description: "신뢰도 높은 언론 보도를 통한 브랜드 권위 형성",
    detail: "주요 포털 매거진 및 기획 기사 송출을 통해 병원의 신뢰도와 브랜딩을 강화합니다.",
    icon: Newspaper,
    color: "#4a5568",
    size: "small",
  },
  {
    id: "web",
    title: "홈페이지 제작",
    description: "전환율에 최적화된 고속 로딩 웹사이트",
    detail: "단순한 디자인을 넘어 예약 시스템과 데이터 추적이 완벽하게 결합된 웹 환경을 구축합니다.",
    icon: Globe,
    color: "#38b2ac",
    size: "small",
  },
  {
    id: "sns",
    title: "SNS 광고/운영",
    description: "인스타그램/페이스북 맞춤형 타겟 전략",
    detail: "지역 타겟팅과 관심사 분석을 통해 잠재 환자에게 가장 효과적으로 브랜드를 노출합니다.",
    icon: Share2,
    color: "#e1306c",
    size: "small",
  },
  {
    id: "review",
    title: "리뷰 관리 솔루션",
    description: "부정 리뷰 방지 및 긍정 리뷰 활성화",
    detail: "내부 직원처럼 환자의 피드백을 모니터링하고 신속하게 대응하여 평판을 철저히 관리합니다.",
    icon: Star,
    color: "#ecc94b",
    size: "small",
  },
  {
    id: "program",
    title: "전용 모니터링 앱",
    description: "실시간 데이터 및 마케팅 현황 확인",
    detail: "직접 개발한 전용 앱을 통해 마케팅 성과와 환자 유입 현황을 언제 어디서나 투명하게 모니터링하세요.",
    icon: Smartphone,
    color: "#3385ff",
    size: "small",
  },
  {
    id: "db-ad",
    title: "DB 마케팅 광고",
    description: "최저가로 확보하는 유효 가망 고객 리스트",
    detail: "광고 매체별 데이터를 분석하여 가장 저렴한 비용으로 실제 내원 확률이 높은 고객을 발굴합니다.",
    icon: Target,
    color: "#f56565",
    size: "small",
  },
  {
    id: "drone",
    title: "드론 촬영",
    description: "전경 및 지역 조망 시각화",
    detail: "병원의 위치적 강점과 스케일을 보여주는 드론 4K 항공 촬영을 지원합니다.",
    icon: Plane,
    color: "#3182ce",
    size: "small",
  },
];

export default function ServiceBento() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section className="relative bg-white py-24 md:py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#FF5733] font-bold tracking-[.2em] text-sm uppercase"
          >
            OUR ALL-IN-ONE OFFER
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-6xl font-black text-[#121212] tracking-tighter flex flex-col gap-4"
          >
            <span>현장 밀착형 병원 전담</span>
            
            {/* Scroll Triggered Fill Text */}
            <div className="relative inline-block overflow-hidden">
              <span className="text-3xl md:text-5xl font-black text-gray-200 tracking-tighter block whitespace-nowrap">
                All-in-One 파트너, 그날그때
              </span>
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: false, amount: 0.8 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as any }}
                  className="absolute top-0 left-0 text-3xl md:text-5xl font-black text-[#121212] tracking-tighter overflow-hidden block border-r-[3px] border-[#FF5733] pr-[2px] whitespace-nowrap"
                >
                  All-in-One 파트너, 그날그때
                </motion.span>
            </div>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed"
          >
            우리 병원 전담 직원이 매주 1회 직접 출근하여 기획, 촬영, 소통을 현장에서 끝냅니다. <br className="hidden md:block" />
            외주 없이 25가지 핵심 실무를 자체적으로 대행하는 완벽한 파트너십을 경험하세요.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-4 h-auto md:h-[1200px]">
          {services.map((service) => (
            <motion.div
              layoutId={service.id}
              key={service.id}
              onClick={() => setSelectedId(service.id)}
              className={`
                relative bg-[#f8f9fa] rounded-3xl p-8 cursor-pointer overflow-hidden border border-gray-100 group shadow-sm hover:shadow-xl transition-all duration-300
                ${service.size === "large" ? "md:col-span-2 md:row-span-2" : ""}
                ${service.size === "medium" ? "md:col-span-2 md:row-span-1" : ""}
                ${service.size === "small" ? "md:col-span-1 md:row-span-1" : ""}
              `}
              whileHover={{ scale: 1.01, y: -5 }}
              transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any } }}
            >
              {/* Icon & Label */}
              <div className="flex flex-col h-full justify-between relative z-10">
                <div className="space-y-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: service.color }}
                  >
                    <service.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-[#121212]">{service.title}</h4>
                    <p className="text-gray-500 font-medium text-sm mt-1">{service.description}</p>
                  </div>
                </div>

                {service.isApp ? (
                  <div className="mt-8 flex justify-center relative h-64 w-full">
                    {/* Simplified Phone Mockup */}
                    <div className="relative w-40 h-[300px] bg-[#121212] rounded-[2.5rem] border-[4px] border-gray-800 shadow-2xl overflow-hidden self-start">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#121212] rounded-b-xl z-20" />
                      <iframe 
                        src="https://yonsei-cheok-patient.vercel.app/" 
                        className="w-full h-full border-none pointer-events-none"
                        title="App Mockup"
                      />
                    </div>
                    {/* Background Light Effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#3385ff]/20 blur-[60px] rounded-full pointer-events-none" />
                  </div>
                ) : (
                  <div className="flex justify-end mt-4">
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-[#121212] group-hover:text-white transition-colors duration-300">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                )}
              </div>

              {/* Subtle Grid Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:20px_20px]" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Modal Overlay */}
      <AnimatePresence>
        {selectedId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-[#121212]/30 backdrop-blur-xl z-[100]"
            />
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[101] px-6">
              <motion.div
                layoutId={selectedId}
                className="bg-white rounded-[3rem] p-8 md:p-12 w-full max-w-4xl shadow-[0_32px_128px_rgba(0,0,0,0.1)] pointer-events-auto relative overflow-hidden"
              >
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-8 right-8 w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <X className="text-gray-400" />
                </button>

                {(() => {
                  const service = services.find(s => s.id === selectedId);
                  if (!service) return null;
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                      <div className="space-y-8">
                        <div 
                          className="w-16 h-16 rounded-[2rem] flex items-center justify-center text-white"
                          style={{ backgroundColor: service.color }}
                        >
                          <service.icon size={32} />
                        </div>
                        <div className="space-y-4">
                          <h2 className="text-4xl md:text-5xl font-black text-[#121212] tracking-tight">{service.title}</h2>
                          <p className="text-[#FF5733] font-bold text-lg">{service.description}</p>
                          <p className="text-gray-500 text-xl leading-relaxed">{service.detail}</p>
                        </div>
                        <div className="pt-8">
                          {/* Button removed as requested */}
                        </div>
                      </div>

                      <div className="relative">
                        {service.isApp ? (
                          <div className="relative w-full aspect-[9/16] bg-[#121212] rounded-[3rem] border-[8px] border-gray-900 shadow-3xl overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#121212] rounded-b-2xl z-20" />
                            <iframe 
                              src="https://yonsei-cheok-patient.vercel.app/" 
                              className="w-full h-full border-none"
                              title="Full App View"
                            />
                          </div>
                        ) : (
                          <div className="relative aspect-square rounded-[3rem] bg-gray-50 flex items-center justify-center overflow-hidden">
                             {/* Decorative graphics */}
                             <div 
                               className="absolute inset-0 opacity-10" 
                               style={{ backgroundColor: service.color }}
                             />
                             <service.icon size={120} className="relative z-10" style={{ color: service.color, opacity: 0.4 }} />
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 blur-[80px] rounded-full pointer-events-none" style={{ backgroundColor: service.color, opacity: 0.2 }} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
