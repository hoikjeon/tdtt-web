"use client";

import { motion, AnimatePresence, animate } from "framer-motion";
import { useState, useEffect } from "react";
import { X, AlertCircle, TrendingDown, ShieldCheck } from "lucide-react";

const CountUp = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 1,
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
};

export default function CostComparison() {
  const [numPeople, setNumPeople] = useState(1);
  const [activeTab, setActiveTab] = useState<"direct" | "other" | "tdtt">("tdtt");
  
  // Pricing constants (Monthly KRW)
  const DIRECT_HIRE_PER_PERSON = 4000000;
  const OTHER_AGENCY_FIXED = 4750000;
  const TDTT_FIXED_PRICE = 3500000;

  const directTotal = DIRECT_HIRE_PER_PERSON * numPeople;
  const otherTotal = OTHER_AGENCY_FIXED; // Fixed as requested
  const tdttTotal = TDTT_FIXED_PRICE; 

  const maxCost = Math.max(directTotal, otherTotal, tdttTotal);
  
  const comparisonData = [
    { label: "직접 채용 (인하우스)", cost: directTotal, color: "#64748b", isWinning: false },
    { label: "일반 마케팅 회사", cost: otherTotal, color: "#94a3b8", isWinning: false },
    { label: "그날그때", cost: tdttTotal, color: "#FF5733", isWinning: true },
  ];

  return (
    <section className="relative bg-white py-24 md:py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-6 max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[#FF5733] font-bold tracking-[.4em] text-xs uppercase"
            >
              EFFICIENCY & ROI
            </motion.p>
            
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-black text-[#121212] leading-[1.3] tracking-tighter">
                직원 1명 채용 시 발생하는
              </h2>
              
              {/* Scroll Triggered Fill Text */}
              <div className="relative inline-block overflow-hidden">
                <span className="text-3xl md:text-5xl font-black text-gray-200 leading-[1.3] tracking-tighter block whitespace-nowrap">진짜 비용을 아시나요?</span>
                <motion.span 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: false, amount: 0.8 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as any }}
                  className="absolute top-0 left-0 text-3xl md:text-5xl font-black text-[#121212] leading-[1.3] tracking-tighter overflow-hidden block whitespace-nowrap"
                >진짜 비용을 아시나요?</motion.span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-center gap-6">
            <div className="space-y-1">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">채용 인원 설정 (비교군)</p>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={numPeople} 
                  onChange={(e) => setNumPeople(parseInt(e.target.value))}
                  className="accent-[#FF5733] w-32 md:w-48"
                />
                <span className="text-2xl font-black text-[#121212] w-14 shrink-0">{numPeople}명</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="grid grid-cols-3 gap-2 md:gap-8 items-end h-auto min-h-[200px] md:min-h-[400px]">
          {comparisonData.map((item, idx) => (
            <div key={item.label} className="flex flex-col gap-2 md:gap-6 group">
              <div className="flex flex-col items-center">
                <motion.div
                   initial={{ height: 0 }}
                   animate={{ height: `${(item.cost / maxCost) * 300}px` }}
                   transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  className="w-full max-w-[60px] md:max-w-[120px] rounded-xl md:rounded-2xl relative overflow-hidden shadow-lg group-hover:shadow-2xl transition-all"
                  style={{ backgroundColor: item.color }}
                >
                  {item.isWinning && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  )}
                </motion.div>
              </div>

              <div className="text-center flex flex-col items-center min-h-[80px] md:min-h-[140px]">
                <p className={`text-[10px] md:text-sm font-bold tracking-wide md:tracking-widest uppercase mb-1 md:mb-2 leading-tight ${item.isWinning ? "text-[#FF5733]" : "text-gray-400"}`}>
                  {item.label}
                </p>
                <h4 className={`text-sm md:text-3xl font-black mb-1 ${item.isWinning ? "text-[#121212]" : "text-gray-400"}`}>
                  월 <CountUp value={item.cost / 10000} />만원
                </h4>

                <div className="flex items-start justify-center">
                  {item.isWinning && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-1 px-2 md:px-4 py-1 md:py-2 bg-[#FF5733]/10 text-[#FF5733] rounded-xl md:rounded-2xl text-[9px] md:text-xs font-bold"
                    >
                      <div className="flex items-center gap-1">
                        <TrendingDown size={10} className="md:hidden" />
                        <TrendingDown size={14} className="hidden md:block" />
                        <span className="hidden md:inline">월 {((maxCost - item.cost) / 10000).toLocaleString()}만원 절감</span>
                        <span className="md:hidden">{((maxCost - item.cost) / 10000).toLocaleString()}만원↓</span>
                      </div>
                      <span className="hidden md:inline text-[10px] opacity-70">추가 비용 및 퇴사 리스크 제로</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        {(() => {
          const rows = [
            {
              category: "업무 범위",
              direct: "개인 역량에 따라 매우 제한적",
              other: "계약된 특정 플랫폼(블로그 등) 한정",
              tdtt: "디자인, 기획, 영상, 앱, 마케팅 분야 총괄",
            },
            {
              category: "현장 이해도",
              direct: "100% 파악 가능",
              other: "원격 관리, 병원 현장 소통 단절",
              tdtt: "주 1회 이상 방문으로 원내 상황 100% 파악",
            },
            {
              category: "인건비/리스크",
              direct: "4대보험, 퇴직금, 휴가 공백, 장비 구매 필수",
              other: "월 400이상 + 추가 옵션 시 비용 기하급수적으로 증가",
              tdtt: "월 350~400 (추가 비용 및 퇴사 리스크 제로)",
            },
            {
              category: "디자인발주비",
              direct: "가능하나 인쇄소 등 핸들링 경험 부족",
              other: "통상 1.3배 ~ 1.5배의 중간 마진 발생",
              tdtt: "거품 없는 실비 진행 (추가 마진 없음)",
            },
            {
              category: "AI 및 트렌드",
              direct: "트렌드 스터디 및 적용 현실적 불가",
              other: "기존 매뉴얼 방식 고수",
              tdtt: "AI 툴 활용 및 데이터 기반 추적 시스템 구축",
            },
          ];
          return (
            <>
              {/* Desktop Table */}
              <div className="pt-12 overflow-x-auto hidden md:block">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="py-8 px-6 text-gray-400 font-bold text-xs uppercase tracking-widest w-[16%]">구분</th>
                      <th className="py-8 px-6 text-gray-800 font-bold text-lg w-[28%]">내부직원채용 (인하우스)</th>
                      <th className="py-8 px-6 text-gray-800 font-bold text-lg w-[28%]">일반마케팅 회사</th>
                      <th className="py-8 px-6 text-[#FF5733] font-black text-xl w-[28%] bg-[#FF5733]/5 rounded-t-3xl border-x border-t border-[#FF5733]/10">그날그때</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-500 font-medium">
                    {rows.map((row, i) => (
                      <tr key={i} className="border-b border-gray-50 group transition-colors hover:bg-gray-50/50">
                        <td className="py-6 px-6 font-bold text-[#121212] bg-gray-50/10">{row.category}</td>
                        <td className="py-6 px-6 text-sm leading-relaxed">{row.direct}</td>
                        <td className="py-6 px-6 text-sm leading-relaxed">{row.other}</td>
                        <td className="py-6 px-6 font-bold text-gray-900 bg-[#FF5733]/5 border-x border-[#FF5733]/5">
                          <div className="flex items-start gap-2 text-[#FF5733]">
                            <ShieldCheck size={18} fill="#FF5733" className="text-white shrink-0 mt-1" />
                            <span>{row.tdtt}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Tabs */}
              <div className="pt-8 md:hidden">
                {/* Tab Header */}
                <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-2xl mb-6">
                  {(["direct", "other", "tdtt"] as const).map((tab) => {
                    const label = tab === "direct" ? "직접채용" : tab === "other" ? "일반회사" : "그날그때";
                    const isActive = activeTab === tab;
                    const isTdtt = tab === "tdtt";
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-2.5 px-1 rounded-xl text-xs font-bold transition-all duration-200 ${
                          isActive
                            ? isTdtt
                              ? "bg-[#FF5733] text-white shadow-md"
                              : "bg-white text-[#121212] shadow-md"
                            : "text-gray-400"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`rounded-2xl overflow-hidden border ${
                      activeTab === "tdtt" ? "border-[#FF5733]/20 bg-[#FF5733]/5" : "border-gray-100 bg-white"
                    } shadow-sm`}
                  >
                    {rows.map((row, i) => {
                      const content = activeTab === "direct" ? row.direct : activeTab === "other" ? row.other : row.tdtt;
                      const isTdtt = activeTab === "tdtt";
                      return (
                        <div
                          key={i}
                          className={`px-5 py-4 ${i < rows.length - 1 ? (isTdtt ? "border-b border-[#FF5733]/10" : "border-b border-gray-50") : ""}`}
                        >
                          <p className={`text-[10px] font-black uppercase tracking-widest mb-1.5 ${isTdtt ? "text-[#FF5733]/60" : "text-gray-400"}`}>
                            {row.category}
                          </p>
                          <div className="flex items-start gap-2">
                            {isTdtt && <ShieldCheck size={15} fill="#FF5733" className="text-white shrink-0 mt-0.5" />}
                            <p className={`text-sm leading-relaxed font-medium ${isTdtt ? "text-[#FF5733]" : "text-gray-600"}`}>
                              {content}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          );
        })()}

        {/* Final Catchphrase */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-[#121212] p-10 md:p-16 rounded-[3rem] text-center space-y-6 relative overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#FF5733]/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />
          
          <h3 className="text-lg md:text-5xl font-black text-white leading-tight relative z-10 mb-8">
            하나의 비용으로 각 분야 <br className="md:hidden" /> 전문가 팀을 고용하는 <br />
            압도적인 가성비를 <br className="md:hidden" /> <span className="text-[#FF5733]">숫자로 직접 확인하세요.</span>
          </h3>
          <div className="space-y-4 relative z-10">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-sm md:max-w-4xl mx-auto">
              {["주 1회 현장 출근", "25가지 올인원 실무", "부대비용·인쇄 마진 0원", "자체 모니터링 앱 제공"].map((tag) => (
                <span key={tag} className="px-3 md:px-6 py-1.5 md:py-3 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs md:text-xl font-semibold tracking-tight backdrop-blur-sm text-center">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
