"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useRef } from "react";

const plans = [
  {
    name: "시그니처",
    description: "성공적인 비즈니스의 시작을 위한 핵심 솔루션",
    price: 350,
    originalPrice: 400,
    popular: true,
    buttonText: "시작하기",
    buttonVariant: "default" as const,
    includes: [
      "포함 사항:",
      "랜딩페이지 제작",
      "반응형 디자인",
      "기본 SEO 설정",
      "1개월 유지보수",
      "소셜미디어 연동",
      "기본 분석 도구 세팅",
    ],
  },
  {
    name: "프레스티지",
    description: "브랜드의 가치를 높이는 프리미엄 풀스택 솔루션",
    price: 500,
    buttonText: "시작하기",
    buttonVariant: "outline" as const,
    includes: [
      "시그니처 플랜 포함:",
      "풀스택 웹 개발",
      "관리자 대시보드",
      "커스텀 애니메이션",
      "3개월 유지보수",
      "성능 최적화",
      "고급 분석 및 리포트",
    ],
  },
  {
    name: "프리미엄 홈페이지 구축",
    description: "기능과 디자인이 조화된 하이엔드 웹 프로젝트",
    price: 500,
    subPrice: "매월 유지·관리비 10만원",
    buttonText: "상담 신청",
    buttonVariant: "outline" as const,
    includes: [
      "프레스티지 플랜 포함:",
      "전용 개발팀 배정",
      "무제한 수정",
      "6개월 유지보수",
      "AI 기능 통합",
      "우선 지원",
      "맞춤형 기능 개발",
    ],
  },
  {
    name: "맞춤형 어플 제작",
    description: "비즈니스 로직에 최적화된 고성능 애플리케이션",
    price: 30,
    subPrice: "유지비 월 20만원",
    priceLabel: "셋팅",
    buttonText: "상담 신청",
    buttonVariant: "outline" as const,
    includes: [
      "프레스티지 플랜 포함:",
      "네이티브/하이브리드 앱",
      "사용자 경험(UX) 최적화",
      "푸시 알림 시스템",
      "API 서버 연동",
      "스토어 등록 지원",
      "실시간 모니터링",
    ],
  },
];

export default function PricingSection({ onSelect }: { onSelect?: (plan: string) => void }) {
  const pricingRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="min-h-screen mx-auto relative overflow-x-hidden"
      style={{ background: 'linear-gradient(to bottom, transparent 0%, #000000 28rem)' }}
      ref={pricingRef}
    >
      {/* Sparkles background */}
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        className="absolute top-0 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]"
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]"></div>
        <SparklesComp
          density={1200}
          speed={0.8}
          color="#FF5733"
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </TimelineContent>

      {/* Orange glow ellipse */}
      <div
        className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, #FF5733 0%, transparent 70%)`,
          opacity: 0.08,
        }}
      />

      <article className="text-center mb-6 pt-16 max-w-4xl mx-auto space-y-6 relative z-50 px-6">
        <h2 className="text-4xl font-medium text-white leading-tight">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.05}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            비전을 현실로 만들 프리미엄 플랜을 선택하세요
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          animationNum={0}
          timelineRef={pricingRef}
          className="text-gray-400"
        >
          <div className="max-w-2xl mx-auto space-y-2">
            <p>단순한 마케팅 대행을 넘어, 성공의 여정을 함께하는 하이엔드 파트너십.</p>
            <p>목표에 최적화된 올인원 솔루션을 경험해 보세요.</p>
          </div>
        </TimelineContent>

      </article>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-4 py-6 mx-auto px-6">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            animationNum={2 + index}
            timelineRef={pricingRef}
          >
            <motion.div
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: plan.popular
                  ? "0 0 60px rgba(255,87,51,0.5), 0 24px 48px rgba(0,0,0,0.6)"
                  : "0 0 40px rgba(255,87,51,0.2), 0 24px 48px rgba(0,0,0,0.6)",
              }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="h-full"
            >
            <Card
              className={`relative text-white h-full transition-colors duration-300 ${
                plan.popular
                  ? "border-[#FF5733]/60 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 z-20"
                  : "border-neutral-800 hover:border-[#FF5733]/30 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 z-10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF5733] text-white text-xs font-bold px-4 py-1 rounded-full tracking-wider">
                  인기
                </div>
              )}
              <CardHeader className="text-left">
                <div className="flex justify-between">
                  <h3 className="text-2xl mb-2 min-h-[64px] flex items-center leading-tight">{plan.name}</h3>
                </div>
                <div className="flex flex-col gap-1 h-[96px] justify-center">
                  <div className="flex items-baseline gap-2">
                    {"originalPrice" in plan && (
                      <span className="text-lg text-gray-500 line-through">{plan.originalPrice}만원</span>
                    )}
                    <div className="flex items-baseline">
                      {"priceLabel" in plan && (
                        <span className="text-sm text-gray-400 mr-1">{plan.priceLabel} </span>
                      )}
                      <span className="text-4xl font-semibold">
                        <NumberFlow value={plan.price} className="text-4xl font-semibold" />
                      </span>
                      <span className="text-gray-400 ml-1 text-sm">만원</span>
                    </div>
                  </div>
                  {"subPrice" in plan && (
                    <p className="text-sm text-[#FF5733]">{plan.subPrice}</p>
                  )}
                  <p className="text-xs text-gray-600 mt-0.5">VAT 별도</p>
                </div>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2 h-10">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <button
                  onClick={() => onSelect?.(plan.name)}
                  className={`w-full mb-6 p-4 text-base font-semibold rounded-xl transition-all ${
                    plan.popular
                      ? "bg-gradient-to-t from-[#cc3a1f] to-[#FF5733] shadow-lg shadow-[#FF5733]/30 border border-[#FF5733]/60 text-white hover:opacity-90"
                      : "bg-gradient-to-t from-neutral-950 to-neutral-700 shadow-lg shadow-neutral-900 border border-neutral-700 text-white hover:border-[#FF5733]/40 transition-colors"
                  }`}
                >
                  {plan.buttonText}
                </button>

                <div className="space-y-3 pt-4 border-t border-neutral-800">
                  <h4 className="font-medium text-base mb-3 text-white/80">{plan.includes[0]}</h4>
                  <ul className="space-y-2">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <span className="h-2 w-2 bg-[#FF5733] rounded-full flex-shrink-0 mt-1.5"></span>
                        <span className="text-sm text-gray-400 leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </TimelineContent>
        ))}
      </div>

    </div>
  );
}
