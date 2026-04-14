"use client";

import { motion } from "framer-motion";
import { Check, AlertCircle, TrendingUp, Clock } from "lucide-react";

export default function PromotionSection() {
  return (
    <section className="relative bg-[#121212] py-24 md:py-40 px-6 md:px-16 overflow-hidden">
      
      {/* Background Decorative Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-[#FF5733]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center space-y-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF5733]/10 text-[#FF5733] rounded-full text-sm font-bold border border-[#FF5733]/20"
          >
            <Clock size={16} className="animate-pulse" />
            실시간 모집 현황: 마감 임박
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-tight"
          >
            [가장 완벽한 조건, 기회는 <span className="text-[#FF5733]">단 3곳</span> 뿐입니다]
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto"
          >
            현장 밀착 케어의 퀄리티 유지를 위해 무한정 계약을 받지 않습니다.<br className="hidden md:block" />
            <span className="text-white">우수한 결과물을 위해 정해진 TO 내에서만 집중합니다.</span>
          </motion.p>
        </div>

        {/* Slot Selection Visual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { status: "closed", label: "계약 완료", date: "24.04.10" },
            { status: "open", label: "계약중", pulse: true },
            { status: "open", label: "계약중", pulse: false },
          ].map((slot, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className={`
                relative h-32 md:h-40 rounded-[2rem] border-2 flex flex-col items-center justify-center gap-2 transition-all overflow-hidden
                ${slot.status === "closed" 
                  ? "bg-white/5 border-white/10 grayscale opacity-60" 
                  : "bg-gradient-to-br from-white/10 to-transparent border-white/20 shadow-2xl"}
              `}
            >
              {slot.status === "closed" ? (
                <>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                    <span className="text-white/40 font-black text-xl rotate-[-10deg] border-2 border-white/20 px-4 py-1">SOLDOUT</span>
                  </div>
                  <Check className="text-white/20" size={32} />
                  <span className="text-white/20 font-bold">1번 병원 계약완료</span>
                </>
              ) : (
                <>
                  {slot.pulse && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-[#FF5733] text-white rounded-full text-[10px] font-black animate-bounce shadow-lg">
                      NOW <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${slot.pulse ? "border-[#FF5733] bg-[#FF5733]/10" : "border-white/20"}`}>
                    <span className={`font-black text-xl ${slot.pulse ? "text-[#FF5733]" : "text-white/40"}`}>{idx + 1}</span>
                  </div>
                  <span className={`font-bold ${slot.pulse ? "text-white" : "text-white/40"}`}>{slot.label}</span>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Pricing Detail Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#FF5733] to-[#e64a19] rounded-[3rem] p-1 shadow-[0_20px_60px_rgba(255,87,51,0.3)]"
        >
          <div className="bg-[#121212] rounded-[2.9rem] p-8 md:p-16 text-center space-y-8 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FF5733]/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="space-y-4">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">PROMOTION PRICE</p>
              <h3 className="text-4xl md:text-6xl font-black text-white">
                선착순 3개 병원 한정 <span className="text-[#FF5733]">월 350만 원</span>
                <span className="text-base md:text-xl text-gray-500 font-bold ml-2">(VAT 별도)</span>
              </h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 inline-flex items-center gap-4 max-w-2xl mx-auto">
              <AlertCircle className="text-[#FF5733] shrink-0" size={32} />
              <p className="text-left text-sm md:text-lg font-bold text-white leading-snug">
                (주의) <span className="text-[#FF5733]">3개 병원 T/O 마감 시,</span> 4번째 병원부터는 <br className="hidden md:block" />
                월 400만 원<span className="text-gray-500 text-xs ml-1">(VAT 별도)</span>으로 비용이 <span className="underline decoration-2 underline-offset-4">50만 원 즉시 인상</span>됩니다.
              </p>
            </div>

            <p className="text-gray-400 font-medium text-lg md:text-xl">
              가장 저렴하게, 가장 압도적인 마케팅 팀을 세팅할 마지막 기회를 놓치지 마세요.
            </p>

            <motion.div 
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex items-center justify-center gap-2 text-[#FF5733] font-black text-xl"
            >
              <TrendingUp size={24} />
              다음 계약부터 즉시 가격 인상 예정
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
