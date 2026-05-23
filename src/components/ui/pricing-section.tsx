"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type DetailItem = { name: string; detail: string };
type DetailSection = { title: string; items: DetailItem[] };
type PlanDetails = {
  intro?: DetailItem;
  sections: DetailSection[];
};
type Plan = {
  name: string;
  description: string;
  price: number;
  popular?: boolean;
  buttonText: string;
  buttonVariant: "default" | "outline";
  details: PlanDetails;
  includes: string[];
  subPrice?: string;
  priceLabel?: string;
  originalPrice?: number;
};

const signatureDetails: PlanDetails = {
  intro: {
    name: "매주 1회 이상 원내 상주 방문 지원",
    detail: "현장 커뮤니케이션 및 실질적 밀착 업무 수행",
  },
  sections: [
    {
      title: "콘텐츠 및 채널 운영 (월 단위)",
      items: [
        { name: "유튜브 채널 기획 및 운영", detail: "월 롱폼 2편, 숏폼 2편 제작 (총 4편) 및 홍보 영상 촬영" },
        { name: "공식 블로그 운영", detail: "전문적인 블로그 원고 작성 및 배포 (월 5회)" },
        { name: "언론 및 신문 보도 PR", detail: "인터넷 신문 보도자료 기획 및 송출 (월 1회)" },
      ],
    },
    {
      title: "포털 검색 노출 및 광고 관리",
      items: [
        { name: "네이버 풀케어 세팅", detail: "플레이스(키워드/기본 세팅/광고), 파워링크 등록 및 관리, 원장님 인물 등록" },
        { name: "평판 관리", detail: "네이버 리뷰 관리 및 악성 댓글 방어(밀어내기)" },
        { name: "광고 및 SEO", detail: "구글 SEO 초기 세팅 및 유지, 인스타그램/페이스북/유튜브 스폰서드 광고 운영 *광고비는 별도" },
        { name: "심의 및 DB 확보", detail: "의료 광고 심의 대행, 유튜브 광고용 DB 수집 랜딩 페이지 제작" },
        { name: "기타 채널 관리", detail: "카카오 등 주요 포털 및 내비게이션 앱 등록·모니터링" },
      ],
    },
    {
      title: "브랜딩 및 비주얼 프로덕션",
      items: [
        { name: "브랜드 아이덴티티", detail: "병원 브랜드 포지셔닝, 컨셉 도출 및 브랜딩 이미지 제작" },
        { name: "포토그래피", detail: "컨셉/인테리어 및 리얼리티(진료, 수술, 행사 등) 사진 촬영과 주기적인 이미지 업데이트" },
        { name: "디자인 및 오프라인", detail: "원내/외주 협력 업체 홍보물(시안물) 기획, 디자인 및 발주 대행" },
        { name: "웹사이트", detail: "기존 웹사이트 유지 관리" },
        { name: "이벤트", detail: "병원 내외부 이슈 및 프로모션 홍보 기획" },
      ],
    },
  ],
};

const prestigeDetails: PlanDetails = {
  sections: [
    {
      title: "시그니처 패키지 서비스 전체 포함",
      items: [
        { name: "매주 1회 이상 원내 상주 방문", detail: "현장 소통 및 실질적인 실무 밀착 지원 전 항목 포함" },
        { name: "포털 및 평판 관리", detail: "네이버 플레이스, 파워링크, 인물 등록, 리뷰 및 악성 댓글 관리 전체 제공" },
      ],
    },
    {
      title: "프리미엄 콘텐츠 제작 및 채널 운영",
      items: [
        { name: "유튜브 채널 고도화", detail: "월 롱폼 4편, 숏폼 4편 제작 (총 8편) 및 전문 촬영 지원" },
        { name: "언론 보도 확대", detail: "인터넷 신문 보도자료 기획 및 송출 (월 3회)" },
        { name: "블로그 마케팅", detail: "병원 맞춤형 전문 원고 작성 및 배포 (월 5회 이상)" },
        { name: "시네마틱 드론 항공 촬영 및 하이엔드 원내 프로모션 필름 제작", detail: "고해상도 풀프레임 카메라와 드론 촬영을 믹스하여 병원의 압도적인 규모와 최첨단 시설, 원내 인테리어를 한 편의 영화처럼 담아내는 마스터피스 홍보 영상을 제작합니다." },
        { name: "메디컬 3D/2D 모션그래픽 영상 제작", detail: "텍스트나 일반 촬영만으로는 설명하기 어려운 고난도 수술(예: 척추 내시경 등)의 원리나 최첨단 의료 장비의 정밀함을 메탈릭하고 세련된 느낌의 모션그래픽으로 구현합니다." },
      ],
    },
    {
      title: "병원 맞춤형 전용 어플리케이션 제작 및 관리",
      items: [
        { name: "스마트 운영 시스템", detail: "원내 HR 시스템(인력 관리), 업무 프로세스 최적화 앱 기획 및 제작" },
        { name: "데이터 인프라", detail: "병원 데이터 관리 및 담당자 보고용 데이터 자동화 툴 구축 지원" },
      ],
    },
    {
      title: "프리미엄 홈페이지 구축 및 리뉴얼",
      items: [
        { name: "웹 아이덴티티 강화", detail: "병원의 가치를 극대화하는 고사양 디자인 및 UI/UX 리뉴얼 구축" },
        { name: "유지 관리", detail: "최신 트렌드 반영 및 정기적인 기능 업데이트, 관리 지원" },
      ],
    },
    {
      title: "전략적 광고 운영 및 DB 최적화",
      items: [
        { name: "통합 광고 관리", detail: "인스타그램, 페이스북, 유튜브 스폰서드 광고 전략 수립 및 운영" },
        { name: "DB 수집 극대화", detail: "유튜브 광고 연동 및 상담 전환율을 높이는 전용 랜딩 페이지(DB 페이지) 제작" },
      ],
    },
    {
      title: "통합 브랜딩 및 병원 행정 지원",
      items: [
        { name: "브랜드 고도화", detail: "병원 포지셔닝 및 컨셉 사진/영상 주기적 업데이트, 원내 시안물 기획 및 발주" },
        { name: "리스크 관리", detail: "까다로운 의료 광고 심의 대행 및 법적 규정 준수 관리 서비스" },
      ],
    },
  ],
};

const appDetails: PlanDetails = {
  sections: [
    {
      title: "맞춤형 어플리케이션 주요 기능",
      items: [
        { name: "인사 및 근태 관리 시스템", detail: "직원 정보 관리와 휴가 신청 및 승인 프로세스를 자동화하여 효율적인 인력 운영 환경을 구축합니다." },
        { name: "전자 결재 및 문서 행정", detail: "계약서, 지출결의서, 기안서 등 병원 내 각종 문서 업무를 모바일에서 비대면으로 신속하게 처리할 수 있습니다." },
        { name: "실시간 의료 소모품 및 재고 관리", detail: "병원에서 사용하는 의약품 및 의료 소모품의 입출고 현황을 실시간으로 파악하고 적정 재고를 유지하도록 지원합니다." },
        { name: "병원 전용 실시간 소통 채널", detail: "의료진과 스태프 간의 긴밀한 업무 협업을 위한 실시간 채팅 기능과 공지사항 공유를 위한 전용 게시판을 제공합니다." },
        { name: "한눈에 보는 병원 DB 데이터", detail: "병원의 핵심 운영 지표와 데이터를 시각화하여 복잡한 정보도 직관적으로 한눈에 파악할 수 있는 대시보드를 제공합니다." },
        { name: "스마트 직무 및 R&R 관리", detail: "각 부서별 세부 업무 분장도와 직무 기술서를 체계적으로 업로드하고 통합 관리하여, 병원 내 명확한 역할과 책임(R&R)을 확립합니다." },
      ],
    },
  ],
};

const websiteDetails: PlanDetails = {
  sections: [
    {
      title: "프리미엄 홈페이지 주요 기능",
      items: [
        { name: "Next.js 기반 초고속 페이지 렌더링", detail: "최신 웹 프레임워크인 Next.js를 도입하여 지연 없는 초고속 로딩 환경을 구현, 로딩 답답함으로 인한 환자의 웹사이트 이탈률을 획기적으로 방어합니다." },
        { name: "검색 포털 상위노출(SEO) 최적화", detail: "네이버, 구글 등 주요 검색 엔진의 수집 로직에 맞춘 테크니컬 구조를 적용하여, 지역 환자들이 관련 질환 검색 시 병원 사이트가 최상단에 노출되도록 돕습니다." },
        { name: "병원 맞춤형 특화 기능 개발", detail: "비급여 수가표, 치료 전후 갤러리, 의료진 스케줄 및 예약 연동 등 병원 운영과 마케팅에 꼭 필요한 세부 기능들을 병원 시스템에 맞춰 1:1로 맞춤 개발합니다." },
        { name: "고퀄리티 원내 사진 및 영상 촬영", detail: "직접 병원에 정기적으로 방문하여 신뢰감을 주는 의료진 프로필, 깔끔한 원내 인테리어, 장비 세팅 및 홍보 영상을 전문적으로 촬영해 홈페이지에 즉시 반영합니다." },
        { name: "전 기기 완벽 대응 반응형 웹", detail: "스마트폰, 태블릿, PC 등 환자가 접속하는 다양한 디바이스 화면 크기에 맞춰 레이아웃이 자동으로 최적화되어, 모바일 환경에서도 완벽한 가독성을 제공합니다." },
        { name: "직관적인 진료 예약 및 상담 UI/UX", detail: "복잡한 과정 없이 환자가 원하는 진료과목과 의료진을 쉽게 찾아, 단 몇 번의 터치만으로 즉시 예약 및 카카오톡 상담으로 이어지도록 환자 중심 동선을 설계합니다." },
      ],
    },
  ],
};

const plans: Plan[] = [
  {
    name: "시그니처 패키지",
    description: "성공적인 비즈니스의 시작을 위한 핵심 솔루션",
    price: 350,
    originalPrice: 400,
    popular: true,
    buttonText: "시작하기",
    buttonVariant: "default" as const,
    details: signatureDetails,
    includes: [
      "포함 사항:",
      "매주 1회 이상 원내 상주 방문 지원",
      "콘텐츠 및 채널 운영",
      "포털 검색 노출 및 광고 관리",
      "브랜딩 및 비주얼 프로덕션",
      "IT 솔루션 및 디지털 인프라 지원",
      "원내 마케팅 및 운영 행정 지원",
    ],
  },
  {
    name: "프레스티지 패키지",
    description: "브랜드의 가치를 높이는 프리미엄 풀스택 솔루션",
    price: 500,
    buttonText: "시작하기",
    buttonVariant: "outline" as const,
    details: prestigeDetails,
    includes: [
      "시그니처 패키지 서비스 전체 포함",
      "프리미엄 홈페이지 구축 패키지 포함",
      "맞춤형 어플 제작 패키지 포함",
      "프리미엄 콘텐츠 제작 및 채널 운영",
      "드론 항공 촬영",
      "병원 홍보영상 제작",
      "전략적 광고 운영 및 DB 최적화",
    ],
  },
  {
    name: "맞춤형 어플 제작",
    description: "병원 행정 및 진료 워크플로우에 최적화된 고성능 애플리케이션",
    price: 30,
    subPrice: "유지비 월 20만원",
    priceLabel: "셋팅",
    buttonText: "상담 신청",
    buttonVariant: "outline" as const,
    details: appDetails,
    includes: [
      "포함 사항:",
      "인사 및 근태 관리 시스템",
      "전자 결재 및 문서 행정",
      "실시간 의료 소모품 및 재고 관리",
      "병원 전용 실시간 소통 채널",
      "한눈에 보는 병원 DB 데이터",
      "스마트 직무 및 R&R 관리",
    ],
  },
  {
    name: "프리미엄 홈페이지 구축",
    description: "압도적인 속도와 검색엔진 최적화(SEO)를 갖춘 병원 특화 프리미엄 웹사이트",
    price: 500,
    subPrice: "매월 유지·관리비 10만원",
    buttonText: "상담 신청",
    buttonVariant: "outline" as const,
    details: websiteDetails,
    includes: [
      "포함 사항:",
      "검색 포털 상위노출(SEO) 최적화",
      "맞춤형 기능 개발",
      "홈페이지 사진,영상 촬영",
      "전 기기 완벽 대응 반응형 웹",
      "직관적인 진료 예약 및 상담 UI/UX",
    ],
  },
];

export default function PricingSection({ onSelect }: { onSelect?: (plan: string) => void }) {
  const pricingRef = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const modalPlan = plans.find((p) => p.name === activeModal && "details" in p);

  return (
    <div
      className="mx-auto relative overflow-x-clip"
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

        <TimelineContent
          animationNum={1}
          timelineRef={pricingRef}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5733] shrink-0" />
            <p className="text-sm text-white/60 font-medium">
              외주 단가에 거품 0%, 중간 마진 0원. 그래서 가능한 가격입니다.
            </p>
          </div>
        </TimelineContent>

      </article>

      <div className="flex items-start overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pt-6 pb-6 px-6 scroll-pl-6 md:grid md:items-stretch md:grid-cols-2 lg:grid-cols-4 md:max-w-7xl md:mx-auto">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            animationNum={2 + index}
            timelineRef={pricingRef}
            className="snap-start flex-none w-[46vw] md:w-auto"
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
              className="h-auto md:h-full"
            >
            <Card
              className={`relative text-white h-auto md:h-full flex flex-col transition-colors duration-300 ${
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
              <CardHeader className="text-left p-3 md:p-6">
                <div className="flex justify-between">
                  <h3 className="text-base md:text-2xl mb-2 min-h-[40px] md:min-h-[64px] flex items-center leading-tight">{plan.name}</h3>
                </div>
                <div className="flex flex-col gap-1 h-auto md:h-[72px] justify-center">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    {"originalPrice" in plan && plan.originalPrice && (
                      <motion.div
                        initial={{ opacity: 0.8, scale: 1 }}
                        whileInView={{ opacity: 0.35, scale: 0.95 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                        className="relative text-base md:text-lg text-gray-500 font-bold flex-shrink-0"
                      >
                        <span>{plan.originalPrice}만원</span>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4, duration: 0.5, ease: "easeInOut" }}
                          className="absolute h-[2px] bg-[#FF5733] left-0 top-1/2 -translate-y-1/2"
                        />
                      </motion.div>
                    )}
                    
                    <div className="flex items-baseline">
                      {"priceLabel" in plan && plan.priceLabel && (
                        <span className="text-sm text-gray-400 mr-1">{plan.priceLabel}</span>
                      )}
                      
                      <motion.span
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.8,
                          type: "spring",
                          stiffness: 260,
                          damping: 15
                        }}
                        className="text-2xl md:text-4xl font-semibold inline-flex items-center"
                      >
                        <NumberFlow value={plan.price} className="text-2xl md:text-4xl font-semibold" />
                      </motion.span>
                      
                      <span className="text-gray-400 ml-1 text-sm">만원</span>
                      <span className="text-xs text-gray-600 ml-1.5">VAT 별도</span>
                    </div>
                  </div>
                  {"subPrice" in plan && (
                    <p className="text-sm text-[#FF5733]">{plan.subPrice}</p>
                  )}
                </div>
                <p className="text-xs md:text-sm text-gray-400 mb-2 md:mb-4 line-clamp-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="p-3 pt-0 md:p-6 md:pt-0 flex flex-col flex-1">
                <button
                  onClick={() => onSelect?.(plan.name)}
                  className={`hidden md:block w-full mb-3 md:mb-6 p-2 md:p-4 text-sm md:text-base font-semibold rounded-xl transition-all ${
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
                {"details" in plan && (
                  <div className="mt-auto pt-6">
                    <button
                      onClick={() => setActiveModal(plan.name)}
                      className="w-full text-[13px] md:text-sm text-[#FF5733] hover:text-[#ff7a5c] transition-all text-center py-2.5 border border-[#FF5733]/30 hover:border-[#FF5733]/60 rounded-lg flex items-center justify-center gap-1.5"
                    >
                      상세 내용 보기 <span className="text-lg">→</span>
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
            </motion.div>
          </TimelineContent>
        ))}
      </div>

      {/* Details Modal */}
      {mounted && createPortal(
      <AnimatePresence>
        {modalPlan && "details" in modalPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-neutral-950 border border-neutral-700 rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="sticky top-0 bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex justify-between items-center rounded-t-2xl">
                <h3 className="text-lg font-semibold text-white">{modalPlan.name} — 상세 포함 내용</h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="text-gray-500 hover:text-white transition-colors text-xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-800"
                >
                  ✕
                </button>
              </div>

              <div className="px-6 py-5 space-y-5">
                {/* Intro item */}
                {(modalPlan.details as PlanDetails).intro && (
                  <div className="p-4 bg-[#FF5733]/10 border border-[#FF5733]/30 rounded-xl">
                    <p className="text-sm text-white">
                      <span className="font-semibold">{(modalPlan.details as PlanDetails).intro!.name}:</span>
                      <span className="text-gray-400"> {(modalPlan.details as PlanDetails).intro!.detail}</span>
                    </p>
                  </div>
                )}

                {/* Sections */}
                {(modalPlan.details as PlanDetails).sections.map((section, si) => (
                  <div key={si}>
                    <h4 className="text-xs font-bold text-[#FF5733] uppercase tracking-widest mb-3 pb-2 border-b border-neutral-800">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.items.map((item, ii) => (
                        <li key={ii} className="flex gap-3">
                          <span className="h-2 w-2 bg-[#FF5733] rounded-full flex-shrink-0 mt-1.5" />
                          <p className="text-sm">
                            <span className="font-medium text-white">{item.name}:</span>
                            <span className="text-gray-400"> {item.detail}</span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      , document.body)}
    </div>
  );
}
