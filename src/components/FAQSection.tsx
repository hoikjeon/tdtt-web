"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    id: "q1",
    number: "Q1",
    category: "서비스 소개",
    question: "정확히 어떤 서비스인가요?",
    answer: (
      <p>
        <strong>직원 1명 채용 비용(월 350~500만 원)</strong>으로 디자인·영상·IT·마케팅·의료광고 심의까지
        <strong>25가지 병원 마케팅 실무를 한 번에 대행</strong>하는 현장 밀착형 병원 전담 파트너입니다.
        핵심은 <strong>① AI 검색(AIO) 최적화 콘텐츠 선점</strong>, <strong>② 주 1회 현장 방문으로 만드는 리얼리티 콘텐츠</strong>, <strong>③ 성과를 실시간으로 확인하는 자체 모니터링 앱</strong>입니다. 외주 대행사의
        소통 단절과 직원 직고용의 부담, 그 사이의 빈틈을 메웁니다.
      </p>
    ),
  },
  {
    id: "q2",
    number: "Q2",
    category: "비용·가격",
    question: "월 350만 원, 직원을 직접 뽑는 것보다 정말 이득인가요?",
    answer: (
      <p>
        저희의 핵심 고객은 신규 개원 예정의와 경쟁이 치열한 중소형 병의원입니다.
        마케팅은 꼭 필요하지만, 직원을 직접 뽑자니 퇴사·관리 공백 같은 HR 리스크가
        부담되는 분들이죠. 직원 1명의 급여에 4대 보험·퇴직금·식비·PC 및 Adobe
        라이선스, 퇴사 시 구인·교육 공백 비용, 여기에 부분적으로 맡기는 외주비까지
        합치면 <strong>실질 부담은 월 500만 원</strong>을 훌쩍 넘깁니다. 차라리 검증된 전문가 한 곳에
        맡기면 <strong>월 350만 원으로 30% 이상 비용을 줄이면서</strong>, 담당자 교체로 인한 공백 없이
        <strong>업무의 연속성까지 유지</strong>할 수 있습니다.
      </p>
    ),
  },
  {
    id: "q3",
    number: "Q3",
    category: "킬러 서비스",
    question: "25가지를 다 한다는데, 가장 강력한 핵심 서비스 3가지는 무엇인가요?",
    answer: (
      <div className="space-y-5">
        <p>
          그날그때의 본질은 <strong>병원 인하우스 마케팅팀의 완전 대체</strong>입니다. 그만큼 폭넓은
          실무를 다루지만, 시장에서 가장 큰 힘을 발휘하는 <strong>3대 핵심 서비스</strong>는 다음과 같습니다.
        </p>
        <ol className="space-y-4">
          <li className="flex gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-[#FF5733]/10 text-[#FF5733] text-xs font-black flex items-center justify-center mt-0.5">
              1
            </span>
            <div>
              <span className="font-black text-[#121212] text-sm md:text-base">
                AI 검색 최적화(AIO) 콘텐츠 선점
              </span>
              <span className="text-gray-400 mx-1.5">—</span>
              ChatGPT·네이버 큐(CUE:) 등이 출처로 인용하기 좋은, 맥락 중심의
              <strong>블로그·유튜브 스크립트를 설계해 AI 검색 시대를 선점</strong>합니다.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-[#FF5733]/10 text-[#FF5733] text-xs font-black flex items-center justify-center mt-0.5">
              2
            </span>
            <div>
              <span className="font-black text-[#121212] text-sm md:text-base">
                주 1회 현장 밀착 콘텐츠 &amp; 실무
              </span>
              <span className="text-gray-400 mx-1.5">—</span>
              원장님은 진료에만 집중하셔도 <strong>유튜브 숏폼과 생동감 있는 원내 사진이 매주 업데이트</strong>됩니다. 타 부서 협업 요청 조율, 인테리어·원내 포스터
              업데이트처럼 직접 방문해야만 가능한 <strong>현장 실무까지 함께 처리</strong>합니다.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-[#FF5733]/10 text-[#FF5733] text-xs font-black flex items-center justify-center mt-0.5">
              3
            </span>
            <div>
              <span className="font-black text-[#121212] text-sm md:text-base">
                자체 개발 모니터링 앱
              </span>
              <span className="text-gray-400 mx-1.5">—</span>
              내원율 등 핵심 지표와 마케팅 진행 상황을 원장님이 실시간으로 확인하는,
              <strong>투명한 데이터 관리 도구</strong>입니다.
            </div>
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: "q4",
    number: "Q4",
    category: "성과·투명성",
    question: "마케팅 성과를 보장하나요? 어떻게 관리되는지 알 수 있나요?",
    answer: (
      <p>
        마케팅은 결과를 100% 보장할 수 없기에, 저희는 '성과 약속' 대신 <strong>과정과 데이터의 완전 공개로 신뢰</strong>를 드립니다. <strong>자체 모니터링 앱</strong>으로 내원 수·채널별 유입 등
        핵심 지표를 실시간으로 투명하게 공유하며,
        <strong>주 1회 현장 방문으로 원장님과 직접 방향을 조율</strong>합니다. 원격 대행사처럼 소통이 끊겨 갑자기 해지되는 일이 없습니다.
      </p>
    ),
  },
  {
    id: "q5",
    number: "Q5",
    category: "차별점",
    question: "다른 마케팅 대행사와 무엇이 다른가요?",
    answer: (
      <p>
        가장 큰 차이는 <strong>'밀착도'</strong>입니다. 일반 대행사가 원격으로 특정 플랫폼만 관리한다면,
        그날그때는 <strong>주 1회 이상 직접 병원에 출근해 원내 상황을 100% 파악하고 전략을 설계</strong>합니다. 여기에 병원 내부 5년 실무에서 나온 <strong>의료 도메인 이해</strong>와 <strong>AI 검색 시대에 맞춘 콘텐츠 전략</strong>이 더해져, 단순 외주가 아닌 <strong>'병원 인하우스 마케팅팀의 완전 대체'</strong>를 제공합니다.
      </p>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export default function FAQSection() {
  const [openId, setOpenId] = useState<string>("q1");

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? "" : id));

  return (
    <section className="relative bg-white py-24 md:py-40 px-6 md:px-16 overflow-hidden">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center space-y-4 mb-12 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            viewport={{ once: true }}
            className="text-[#FF5733] font-bold tracking-[.3em] text-xs uppercase"
          >
            FREQUENTLY ASKED
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-[#121212] tracking-tighter"
          >
            궁금한점, 솔직하게 답해드립니다.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-sm md:text-base text-gray-400 leading-relaxed"
          >
            병원 마케팅을 맡기기 전, 가장 많이 물어보시는 다섯 가지를 모았습니다.
          </motion.p>
        </div>

        {/* Accordion list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-3"
        >
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isOpen
                    ? "border-[#FF5733]/30 shadow-md shadow-[#FF5733]/5"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
                } bg-white`}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-start gap-4 p-6 md:p-8 text-left group"
                >
                  <span className="shrink-0 text-xs font-black text-[#FF5733] tracking-[.15em] w-7 mt-1 md:mt-1.5">
                    {faq.number}
                  </span>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-1">
                    {/* Category Badge */}
                    <span className="inline-flex shrink-0 items-center justify-center px-3 py-1.5 rounded-md bg-gray-50 border border-gray-100 text-xs font-bold text-gray-500 whitespace-nowrap">
                      {faq.category}
                    </span>
                    {/* Question Text */}
                    <span
                      className={`text-sm md:text-base font-black tracking-tight transition-colors duration-200 ${
                        isOpen ? "text-[#FF5733]" : "text-[#121212] group-hover:text-[#FF5733]/80"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className={`shrink-0 transition-colors duration-200 mt-1 md:mt-1.5 ${
                      isOpen ? "text-[#FF5733]" : "text-gray-300 group-hover:text-gray-400"
                    }`}
                  >
                    <ChevronDown size={18} strokeWidth={2.5} />
                  </motion.span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-7 md:pb-9 pl-[calc(1.5rem+1.75rem+1rem)] md:pl-[calc(2rem+1.75rem+1rem)] text-sm md:text-base text-gray-500 leading-relaxed [&_strong]:text-gray-900 [&_strong]:font-bold">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
