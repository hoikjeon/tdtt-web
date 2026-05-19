"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const Highlight = ({ children, color = "#FF5733" }: { children: React.ReactNode; color?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <span className="relative inline-block whitespace-nowrap" ref={ref}>
      <motion.span
        className="absolute inset-0 z-0 rounded-[3px]"
        style={{ backgroundColor: color, originX: 0 }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 0.22 } : {}}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
};

export default function AgitationSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemFadeRight: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section className="relative bg-white py-24 md:py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left: Agitation Text (Desktop: Order 1, Mobile: Order 2) */}
        <motion.div
          ref={containerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1"
        >
          <motion.div variants={itemFadeRight} className="space-y-4">
            <p className="text-[#FF5733] font-bold tracking-tight text-lg">THE DIGITAL SHIFT</p>
            <h3 className="text-3xl md:text-5xl font-extrabold text-[#121212] leading-[1.2] tracking-tight">
              "아프다고 아무 병원이나<br />
              가는 시대는 끝났습니다."
            </h3>
          </motion.div>

          <motion.div variants={itemFadeRight} className="space-y-6 text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
            <p>
              환자는 더 이상 '가까운 병원'을 찾지 않습니다.<br />
              <Highlight color="#FF5733">ChatGPT가 '추천하는 병원'</Highlight>을 찾습니다.
            </p>
            <p>
              단순히 파워링크만 걸어두고, 영혼 없는 포스팅을 올리던<br />
              과거의 방식은 더 이상 환자들의 지갑을 열지 못합니다.
            </p>
            <p className="pt-4 text-gray-900 font-bold text-xl md:text-2xl leading-normal">
              현장을 모르는 외주 업체의 뻔한 마케팅으로는<br />
              다가오는 <Highlight>생존 위기</Highlight>를 돌파할 수 없습니다.
            </p>
          </motion.div>

          <motion.div variants={itemFadeRight} className="pt-6">
            <p className="text-sm md:text-base text-gray-500 font-semibold leading-relaxed border-l-2 border-[#FF5733] pl-4">
              5년 뒤, 옆 병원 원장님께<br className="md:hidden" /> '거기는 어떻게 그렇게 잘 되세요?'라고<br />
              묻고 싶지 않다면.
            </p>
          </motion.div>
        </motion.div>

        {/* Right: ChatGPT UI Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2 flex flex-col bg-[#212121]"
        >
          {/* ChatGPT Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                  <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.372L15.115 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.403-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#000"/>
                </svg>
              </div>
              <span className="text-white font-semibold text-sm">ChatGPT</span>
              <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-0.5 ml-1">
                <span className="text-gray-300 text-xs">GPT-4o</span>
                <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
            <button className="bg-white text-[#212121] text-xs font-bold px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
              새 채팅
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-6">

            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-[#2f2f2f] text-white rounded-3xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                <p className="text-sm md:text-base leading-relaxed">강남에서 <strong>허리디스크</strong> 치료 잘하는 병원 추천해줘. 비수술로도 가능한 곳이면 좋겠어.</p>
              </div>
            </div>

            {/* ChatGPT response */}
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-md">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                  <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.372L15.115 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.403-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#000"/>
                </svg>
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                  강남 지역에서 허리디스크 비수술 치료로 높은 평가를 받는 병원을 알려드릴게요.
                </p>

                {/* Hospital recommendation card */}
                <div className="bg-[#2f2f2f] border border-white/10 rounded-2xl p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">✦ 최우선 추천</span>
                      </div>
                      <p className="text-white font-bold text-base md:text-lg">연세 정형외과의원</p>
                      <p className="text-gray-400 text-xs mt-0.5">서울 강남구 · 척추·관절 전문</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-yellow-400 font-black text-lg">4.9</p>
                      <div className="flex gap-0.5 justify-end">
                        {[1,2,3,4,5].map(i => (
                          <svg key={i} className="w-2.5 h-2.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-500 text-[10px] mt-0.5">리뷰 324건</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {["비수술 치료", "도수치료", "체외충격파", "당일 예약 가능"].map(tag => (
                      <span key={tag} className="text-[10px] md:text-xs text-gray-300 bg-white/10 border border-white/10 rounded-full px-2.5 py-0.5">{tag}</span>
                    ))}
                  </div>

                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed border-t border-white/10 pt-3">
                    초진 환자의 <span className="text-white font-semibold">91%</span>가 수술 없이 호전되었으며, 척추 전문의가 직접 비수술 맞춤 치료를 진행합니다.
                  </p>
                </div>

                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  위 병원은 AI 학습 데이터 기준 허리디스크 <span className="text-white font-medium">비수술 치료 만족도</span> 상위 1%에 해당합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div className="px-4 md:px-6 pb-4 flex-shrink-0">
            <div className="bg-[#2f2f2f] rounded-2xl px-4 py-3 flex items-center gap-3 border border-white/10">
              <p className="flex-1 text-gray-500 text-sm">메시지 ChatGPT</p>
              <button className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
            <p className="text-center text-gray-600 text-[10px] mt-2">ChatGPT는 실수를 할 수 있습니다. 중요한 정보는 확인하세요.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
