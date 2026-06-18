"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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
  ChevronLeft,
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
    id: "db-ad",
    title: "DB 마케팅 광고",
    description: "최저가로 확보하는 유효 가망 고객 리스트",
    detail: "광고 매체별 데이터를 분석하여 가장 저렴한 비용으로 실제 내원 확률이 높은 고객을 발굴합니다.",
    icon: Target,
    color: "#f56565",
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
    detail: "단순히 대본만 쓰는 것이 아닙니다. 환자가 궁금해하는 질문과 원장님의 전문성을 연결하여, 신뢰도가 200% 상승하는 '전문가용 시나리오'를 구성합니다.",
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
    title: "지역 타겟 블로그",
    description: "지역 환자의 발길을 이끄는 전략적 검색 최적화",
    detail: "원장님의 주력 진료 과목을 검색 결과 상단에 확실하게 노출시킵니다. 기계적인 단순 발행이 아닌, 지역 환자들에게 병원의 전문성이 가장 먼저 닿을 수 있도록 최적화된 브랜드 블로그를 운영합니다.",
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
    detail: "지역 타겟팅 and 관심사 분석을 통해 잠재 환자에게 가장 효과적으로 브랜드를 노출합니다.",
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
    id: "ai-search",
    title: "AI 검색 최적화",
    description: "ChatGPT, 네이버 등 AI 검색 시대 필수 전략",
    detail: "단순 키워드 노출을 넘어 AI가 학습하고 추천하는 병원이 되도록 알고리즘 최적화를 선점합니다.",
    icon: Search,
    color: "#FF5733",
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

const YOUTUBE_VIDEOS = [
  "LHI25R8Eneg",
  "BDvD7xLaaAI",
  "dCfU78X4sNU",
  "ZkBQ9Yac768",
  "I-fyZehCIMA",
];

const YoutubeSlider = memo(function YoutubeSlider() {
  const [idx, setIdx] = useState(0);

  const go = (dir: number) => {
    setIdx(i => (i + dir + YOUTUBE_VIDEOS.length) % YOUTUBE_VIDEOS.length);
  };

  const videoId = YOUTUBE_VIDEOS[idx];

  return (
    <div className="relative w-full flex flex-col gap-3">
      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
        <iframe
          key={videoId}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={`YouTube Video ${idx + 1}`}
        />
        {/* transparent overlay to block YouTube hover UI */}
        <div className="absolute inset-0 z-10" />
      </div>
      <div className="flex items-center justify-between px-1">
        <button
          onClick={() => go(-1)}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={18} className="text-gray-600" />
        </button>
        <div className="flex gap-2">
          {YOUTUBE_VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{ backgroundColor: i === idx ? "#FF5733" : "#d1d5db" }}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ChevronRight size={18} className="text-gray-600" />
        </button>
      </div>
      <p className="text-center text-xs text-gray-400">{idx + 1} / {YOUTUBE_VIDEOS.length}</p>
    </div>
  );
});

const HOSPITAL_PHOTOS = [
  { src: "/images/doctor1.jpg", label: "의료진 프로필" },
  { src: "/images/doctor2.jpg", label: "원내 촬영" },
];

const AISearchMockup = memo(function AISearchMockup() {
  const messages = [
    {
      role: "user",
      text: "강남에서 허리디스크 잘 치료하는 병원 추천해줘",
    },
    {
      role: "ai",
      text: null,
      recommendation: {
        name: "연세 정형외과의원",
        tags: ["비수술 치료", "척추 전문", "당일 예약"],
        reason: "AI 학습 데이터 기준 강남구 척추·관절 분야 상위 추천 병원입니다. 환자 후기 분석 결과 치료 만족도 97%, 재방문율 82%로 집계됩니다.",
        rating: 4.9,
        reviews: 324,
      },
    },
    {
      role: "user",
      text: "비수술로도 치료 가능해?",
    },
    {
      role: "ai",
      text: "네, 연세 정형외과는 도수치료·체외충격파·신경차단술 등 비수술 치료를 전문으로 합니다. 초진 환자의 91%가 수술 없이 호전됩니다.",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#0f0f13] overflow-hidden rounded-[2rem] md:rounded-[3rem]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 md:px-5 py-3 border-b border-white/10 flex-shrink-0 bg-[#1a1a24]">
        <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-black text-[8px] md:text-[9px]">AI</span>
        </div>
        <span className="text-white font-bold text-[10px] md:text-xs">ChatGPT · AI 검색 최적화</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-[8px]">학습됨</span>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-3 md:px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "ai" && (
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 self-start">
                <span className="text-white font-black text-[6px]">AI</span>
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${msg.role === "user" ? "bg-indigo-600 rounded-tr-sm" : "bg-[#1e1e2e] rounded-tl-sm"}`}>
              {msg.text && (
                <p className={`text-[9px] md:text-[10px] leading-relaxed ${msg.role === "user" ? "text-white" : "text-gray-200"}`}>{msg.text}</p>
              )}
              {msg.recommendation && (
                <div className="space-y-2">
                  <p className="text-gray-300 text-[9px] md:text-[10px] leading-relaxed">강남 허리디스크 치료 추천 병원입니다.</p>
                  {/* Hospital card */}
                  <div className="bg-[#12121c] border border-violet-500/30 rounded-xl p-2.5">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <div className="flex items-center gap-1 mb-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                          <span className="text-[8px] text-violet-300 font-bold uppercase tracking-wide">AI 최우선 추천</span>
                        </div>
                        <p className="text-white font-black text-[10px] md:text-[11px]">{msg.recommendation.name}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-yellow-400 font-black text-[10px]">★ {msg.recommendation.rating}</p>
                        <p className="text-gray-500 text-[7px]">{msg.recommendation.reviews}건</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {msg.recommendation.tags.map((tag) => (
                        <span key={tag} className="bg-violet-500/20 text-violet-300 text-[7px] font-semibold px-1.5 py-0.5 rounded-full border border-violet-500/30">{tag}</span>
                      ))}
                    </div>
                    <p className="text-gray-400 text-[8px] md:text-[9px] leading-relaxed">{msg.recommendation.reason}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* AI platforms row */}
      <div className="flex-shrink-0 bg-[#1a1a24] border-t border-white/10 px-3 md:px-4 py-2.5">
        <p className="text-gray-500 text-[7px] mb-1.5">최적화된 AI 플랫폼</p>
        <div className="flex items-center gap-2">
          {[
            { name: "ChatGPT", color: "bg-[#10a37f]" },
            { name: "Perplexity", color: "bg-[#1e90ff]" },
            { name: "Gemini", color: "bg-[#4285F4]" },
            { name: "네이버 AI", color: "bg-[#03C75A]" },
          ].map((p) => (
            <div key={p.name} className={`${p.color} px-2 py-0.5 rounded-full flex items-center gap-1`}>
              <div className="w-1 h-1 rounded-full bg-white/70" />
              <span className="text-white text-[6px] md:text-[7px] font-bold">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

const ReviewMockup = memo(function ReviewMockup() {
  const reviews = [
    { name: "이○○ 님", date: "2일 전", rating: 5, text: "원장님이 너무 친절하게 설명해주셔서 걱정이 없어졌어요. 치료 효과도 정말 빠르게 나타났습니다!", platform: "네이버" },
    { name: "박○○ 님", date: "4일 전", rating: 5, text: "허리 디스크로 오래 고생했는데 3회 만에 통증이 확 줄었어요. 강력 추천드립니다!", platform: "구글" },
    { name: "김○○ 님", date: "6일 전", rating: 4, text: "대기 시간이 좀 있었지만 진료는 매우 만족스러웠습니다. 재방문 의사 있어요.", platform: "카카오" },
    { name: "최○○ 님", date: "8일 전", rating: 5, text: "무릎 수술 걱정했는데 비수술 치료로 완쾌됐습니다. 정말 감사해요!", platform: "네이버" },
  ];

  const platformColor: Record<string, string> = {
    "네이버": "#03C75A",
    "구글": "#4285F4",
    "카카오": "#FEE500",
  };
  const platformText: Record<string, string> = {
    "네이버": "text-white",
    "구글": "text-white",
    "카카오": "text-gray-800",
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#fffbf0] overflow-hidden rounded-[2rem] md:rounded-[3rem]">
      {/* Header */}
      <div className="bg-[#1a1a2e] px-4 md:px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-yellow-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5">Review Management</p>
            <h3 className="text-white font-black text-sm md:text-base leading-tight">리뷰 관리 현황</h3>
          </div>
          <div className="text-right">
            <p className="text-yellow-400 font-black text-2xl md:text-3xl leading-none">4.9</p>
            <div className="flex gap-0.5 justify-end mt-0.5">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-400 text-[8px] md:text-[9px] mt-0.5">리뷰 324건</p>
          </div>
        </div>
        {/* Platform tabs */}
        <div className="flex gap-1.5">
          {[
            { name: "전체", count: 324, active: true },
            { name: "네이버", count: 187, active: false },
            { name: "구글", count: 89, active: false },
            { name: "카카오", count: 48, active: false },
          ].map((p) => (
            <button key={p.name} className={`text-[8px] md:text-[9px] font-bold px-2 py-0.5 rounded-full transition-colors ${p.active ? "bg-yellow-400 text-gray-900" : "bg-white/10 text-gray-300"}`}>
              {p.name} {p.count}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews list */}
      <div className="flex-1 overflow-y-auto px-3 md:px-4 py-3 space-y-2">
        {reviews.map((r) => (
          <div key={r.name} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 text-[10px] font-black text-yellow-600">
                  {r.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] md:text-[10px] font-bold text-gray-800">{r.name}</span>
                    <span className="text-[7px] md:text-[8px] px-1 py-0.5 rounded font-bold text-[8px]"
                      style={{ backgroundColor: platformColor[r.platform], color: platformText[r.platform] === "text-white" ? "#fff" : "#1a1a2e" }}>
                      {r.platform}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <svg key={i} className="w-2 h-2 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-[7px] text-gray-400">{r.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 bg-green-50 text-green-600 text-[7px] font-bold px-1.5 py-0.5 rounded-full border border-green-100">답변완료</div>
            </div>
            <p className="text-[9px] md:text-[10px] text-gray-600 leading-relaxed mt-2 line-clamp-2">{r.text}</p>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div className="flex-shrink-0 bg-[#1a1a2e] px-4 md:px-5 py-3 grid grid-cols-3 gap-2">
        {[
          { label: "총 리뷰", value: "324건" },
          { label: "답변율", value: "100%" },
          { label: "평균 별점", value: "4.9★" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-yellow-400 font-black text-sm md:text-base">{s.value}</p>
            <p className="text-gray-400 text-[8px] md:text-[9px]">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

const BlogSearchMockup = memo(function BlogSearchMockup() {
  const results = [
    { rank: 1, title: "강남 허리디스크 수술 없이 치료하는법 [연세정형외과]", views: "12,847", days: "1일 전", highlight: true },
    { rank: 2, title: "목 디스크 증상과 치료, 전문의가 알려드립니다", views: "8,321", days: "3일 전", highlight: false },
    { rank: 3, title: "무릎 연골 손상 조기 치료가 중요한 이유", views: "6,104", days: "5일 전", highlight: false },
    { rank: 4, title: "도수치료 vs 물리치료, 무엇이 다를까요?", views: "4,892", days: "7일 전", highlight: false },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#f9fafb] overflow-hidden rounded-[2rem] md:rounded-[3rem]">
      {/* Naver Header */}
      <div className="bg-[#03C75A] px-4 md:px-6 pt-5 pb-4 flex-shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-white font-black text-xl md:text-2xl tracking-tighter">N</span>
          <div className="flex-1 bg-white rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm">
            <span className="text-gray-500 text-[10px] md:text-sm flex-1">강남 허리디스크 잘하는 병원</span>
            <Search size={14} className="text-gray-400 flex-shrink-0" />
          </div>
        </div>
        <div className="flex gap-2">
          {["통합", "블로그", "카페", "뉴스"].map((tab, i) => (
            <button key={tab} className={`text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${i === 1 ? "bg-white text-[#03C75A]" : "text-white/80"}`}>{tab}</button>
          ))}
        </div>
      </div>

      {/* Results area */}
      <div className="flex-1 overflow-y-auto bg-white px-4 md:px-5 py-3 space-y-2">
        {/* Top badge */}
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-[#03C75A]/10 text-[#03C75A] text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#03C75A]/20">블로그 검색결과</div>
          <span className="text-[9px] text-gray-400">약 124,000개</span>
        </div>

        {results.map((r) => (
          <div
            key={r.rank}
            className={`relative rounded-xl p-3 border transition-all ${r.highlight ? "bg-[#f0fdf8] border-[#03C75A]/40 shadow-sm" : "bg-white border-gray-100"}`}
          >
            {r.highlight && (
              <div className="absolute -top-2 -right-1 bg-[#FF5733] text-white text-[8px] md:text-[9px] font-black px-2 py-0.5 rounded-full shadow-md">
                🏆 1위
              </div>
            )}
            <div className="flex items-start gap-2">
              <div className={`w-5 h-5 md:w-6 md:h-6 rounded-md flex items-center justify-center flex-shrink-0 text-[9px] md:text-[10px] font-black ${r.highlight ? "bg-[#03C75A] text-white" : "bg-gray-100 text-gray-500"}`}>
                {r.rank}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[10px] md:text-xs font-bold leading-snug ${r.highlight ? "text-[#0a5c3a]" : "text-gray-700"}`}>{r.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[8px] md:text-[9px] text-[#03C75A] font-semibold">blog.naver.com/yonsei_ortho</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[8px] text-gray-400">조회 {r.views}</span>
                  <span className="text-[8px] text-gray-300">•</span>
                  <span className="text-[8px] text-gray-400">{r.days}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div className="flex-shrink-0 bg-[#0d9488] px-4 md:px-5 py-3 grid grid-cols-3 gap-2">
        {[
          { label: "월 발행량", value: "24건" },
          { label: "상단 노출률", value: "75%" },
          { label: "유입 증가", value: "↑47%" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-white font-black text-sm md:text-base">{s.value}</p>
            <p className="text-teal-100 text-[8px] md:text-[9px]">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

const HospitalWebMockup = memo(function HospitalWebMockup() {
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-white text-[#1a1a2e]" style={{ fontFamily: "sans-serif" }}>
      {/* Header */}
      <div className="bg-[#0d9488] px-2 py-1.5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-1">
          <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#0d9488] rounded-full" />
          </div>
          <span className="text-white font-black text-[7px] tracking-tight">연세 정형외과</span>
        </div>
        <div className="flex gap-1.5">
          <span className="text-white/80 text-[5px]">진료안내</span>
          <span className="text-white/80 text-[5px]">의료진</span>
          <span className="text-white/80 text-[5px]">예약</span>
        </div>
      </div>
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#0d9488] to-[#134e4a] px-3 py-3 overflow-hidden">
        <div className="relative z-10 text-white">
          <p className="text-[5px] text-teal-200 mb-0.5 font-medium">빠른 회복, 정확한 진단</p>
          <h1 className="text-[9px] font-black leading-tight mb-1.5">척추·관절 전문<br/>정형외과의원</h1>
          <button className="bg-white text-[#0d9488] text-[6px] font-bold px-2 py-0.5 rounded-full shadow">
            온라인 예약하기
          </button>
        </div>
        <div className="absolute right-2 bottom-0 w-12 h-12 bg-white/10 rounded-full" />
        <div className="absolute right-6 top-1 w-6 h-6 bg-white/15 rounded-full" />
      </div>
      {/* Notice */}
      <div className="bg-[#f0fdf4] px-2 py-1 border-b border-green-100 flex items-center gap-1">
        <div className="w-1 h-1 rounded-full bg-green-500 flex-shrink-0" />
        <p className="text-[5px] text-green-700 font-medium">토요일 오전 진료 운영 (09:00~13:00)</p>
      </div>
      {/* Quick Links */}
      <div className="grid grid-cols-4 border-b border-gray-100">
        {[
          { icon: "📅", label: "진료예약" },
          { icon: "🏥", label: "진료안내" },
          { icon: "👨‍⚕️", label: "의료진" },
          { icon: "📍", label: "오시는길" },
        ].map((item, i) => (
          <div key={item.label} className={`flex flex-col items-center py-1.5 gap-0.5 ${i < 3 ? "border-r border-gray-100" : ""}`}>
            <span className="text-[9px]">{item.icon}</span>
            <span className="text-[5px] text-gray-600 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
      {/* Services */}
      <div className="px-2 py-2">
        <h2 className="text-[7px] font-bold text-gray-800 mb-1.5">진료 분야</h2>
        <div className="grid grid-cols-2 gap-1">
          {[
            { name: "척추클리닉", bg: "bg-teal-50", bd: "border-teal-100", dot: "bg-teal-400" },
            { name: "관절클리닉", bg: "bg-blue-50", bd: "border-blue-100", dot: "bg-blue-400" },
            { name: "도수치료", bg: "bg-purple-50", bd: "border-purple-100", dot: "bg-purple-400" },
            { name: "통증클리닉", bg: "bg-orange-50", bd: "border-orange-100", dot: "bg-orange-400" },
          ].map((s) => (
            <div key={s.name} className={`${s.bg} border ${s.bd} rounded-md p-1.5`}>
              <div className="flex items-center gap-1 mb-0.5">
                <div className={`w-1 h-1 rounded-full ${s.dot}`} />
                <p className="text-[6px] font-semibold text-gray-700">{s.name}</p>
              </div>
              <p className="text-[5px] text-gray-400">자세히 보기 →</p>
            </div>
          ))}
        </div>
      </div>
      {/* Doctor */}
      <div className="px-2 py-2 bg-gray-50 border-t border-gray-100">
        <h2 className="text-[7px] font-bold text-gray-800 mb-1.5">의료진 소개</h2>
        <div className="flex gap-2 items-start">
          <div className="w-9 h-10 bg-[#0d9488]/15 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-sm">👨‍⚕️</span>
          </div>
          <div>
            <p className="text-[6px] font-black text-gray-800">김정형 원장</p>
            <p className="text-[5px] text-teal-600 font-semibold mt-0.5">척추·관절 전문의</p>
            <p className="text-[5px] text-gray-400 mt-0.5">연세대학교 의과대학 졸업</p>
            <p className="text-[5px] text-gray-400">정형외과 전문의 취득</p>
          </div>
        </div>
      </div>
      {/* Before/After */}
      <div className="px-2 py-2 border-t border-gray-100">
        <h2 className="text-[7px] font-bold text-gray-800 mb-1.5">치료 후기</h2>
        {[
          { name: "이○○ 님", text: "허리 디스크로 6개월 고생했는데 3회 만에 완쾌됐어요!", stars: 5 },
          { name: "박○○ 님", text: "무릎 통증 완전히 사라졌습니다. 강력 추천해요!", stars: 5 },
        ].map((r) => (
          <div key={r.name} className="bg-white border border-gray-100 rounded-md p-1.5 mb-1 shadow-sm">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[5px] font-bold text-gray-700">{r.name}</span>
              <span className="text-[8px]">{"⭐".repeat(r.stars)}</span>
            </div>
            <p className="text-[5px] text-gray-500 leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
      {/* CTA */}
      <div className="px-2 py-2.5 bg-[#0d9488]">
        <p className="text-white text-[6px] font-black mb-0.5">지금 바로 예약하세요</p>
        <p className="text-teal-100 text-[5px] mb-1.5">평일 09:00~18:00 / 토 09:00~13:00</p>
        <div className="w-full bg-white text-[#0d9488] text-[6px] font-bold py-1 rounded-md text-center">
          📞 02-1234-5678
        </div>
      </div>
      {/* Footer */}
      <div className="px-2 py-2 bg-gray-800">
        <p className="text-[5px] text-gray-400 leading-relaxed">서울시 강남구 테헤란로 123<br/>연세 정형외과의원 © 2025</p>
      </div>
    </div>
  );
});

function HospitalPhotoSlider({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!isInView) return; // 화면에서 안보이면 작동 중지

    const id = setInterval(() => {
      setIdx(i => (i + 1) % HOSPITAL_PHOTOS.length);
    }, 3800);
    return () => clearInterval(id);
  }, [isInView]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="sync">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <motion.img
            src={HOSPITAL_PHOTOS[idx].src}
            alt={HOSPITAL_PHOTOS[idx].label}
            animate={{ scale: [1, 1.06] }}
            transition={{ duration: 3.8, ease: "linear" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      {/* Label overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${idx}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-4 left-3 z-10"
        >
          <span className="text-white text-[9px] font-semibold">{HOSPITAL_PHOTOS[idx].label}</span>
        </motion.div>
      </AnimatePresence>
      {/* Slide dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {HOSPITAL_PHOTOS.map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full transition-all duration-500"
            style={{ backgroundColor: i === idx ? "#fff" : "rgba(255,255,255,0.4)" }}
          />
        ))}
      </div>
    </div>
  );
}

const CountUp = ({ value, duration = 600 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const range = end - start;
    const startTime = performance.now();
    let animationFrameId: number;

    const updateRating = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress); // easeOutQuad
      const nextValue = Math.round(start + range * easeProgress);
      
      setDisplayValue(nextValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateRating);
      }
    };

    animationFrameId = requestAnimationFrame(updateRating);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration]);

  return <>{displayValue}</>;
};

const DB_BASE = [
  { label: "30대 여성", short: "30대", base: 28, color: "#f472b6" },
  { label: "40대 여성", short: "40대", base: 22, color: "#f472b6" },
  { label: "60대 여성", short: "60대", base: 14, color: "#f472b6" },
  { label: "30대 남성", short: "30대", base: 18, color: "#60a5fa" },
  { label: "50대 남성", short: "50대", base: 12, color: "#60a5fa" },
  { label: "60대 남성", short: "60대", base: 6,  color: "#60a5fa" },
];

function DbAnalytics({ compact }: { compact?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const [vals, setVals] = useState(DB_BASE.map(d => d.base));
  const [total, setTotal] = useState(247);

  useEffect(() => {
    if (!isInView) return; // 화면에서 보이지 않으면 인터벌 정지

    const id = setInterval(() => {
      setVals(DB_BASE.map(d => {
        const delta = (Math.random() - 0.5) * 26;
        return Math.round(Math.max(5, Math.min(65, d.base + delta)));
      }));
      setTotal(v => v + Math.floor(Math.random() * 6) + 2);
    }, 1000);
    return () => clearInterval(id);
  }, [isInView]);

  const female = DB_BASE.slice(0, 3);
  const male   = DB_BASE.slice(3);

  const barTransition = "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";

  if (compact) return (
    <div ref={containerRef} className="px-2 pt-2 flex-1 overflow-hidden">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[8px] text-gray-300 font-bold">DB 유입 분석</span>
        <span className="text-[7px] text-gray-600">이번 달</span>
      </div>
      <div className="space-y-1">
        <p className="text-[7px] text-pink-400 font-semibold mb-0.5">여성</p>
        {female.map((d, i) => (
          <div key={d.label} className="flex items-center gap-1">
            <span className="text-[7px] text-gray-500 w-7 flex-shrink-0">{d.short}</span>
            <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${vals[i]}%`, backgroundColor: d.color, transition: barTransition }} />
            </div>
            <span className="text-[7px] text-gray-500 w-5 text-right"><CountUp value={vals[i]} />%</span>
          </div>
        ))}
        <p className="text-[7px] text-blue-400 font-semibold mt-1 mb-0.5">남성</p>
        {male.map((d, i) => (
          <div key={d.label} className="flex items-center gap-1">
            <span className="text-[7px] text-gray-500 w-7 flex-shrink-0">{d.short}</span>
            <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${vals[i + 3]}%`, backgroundColor: d.color, transition: barTransition }} />
            </div>
            <span className="text-[7px] text-gray-500 w-5 text-right"><CountUp value={vals[i + 3]} />%</span>
          </div>
        ))}
      </div>
      <div className="mt-2 border-t border-gray-800 pt-1.5 flex justify-between">
        <span className="text-[7px] text-gray-600">총 유입 DB</span>
        <span className="text-[8px] text-white font-bold"><CountUp value={total} duration={400} />건</span>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="px-3 pt-3 flex-1 overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-300 font-bold">DB 유입 데이터 분석</span>
        <span className="text-[9px] text-gray-600">이번 달</span>
      </div>
      <div className="space-y-1.5">
        <p className="text-[9px] text-pink-400 font-semibold mb-1">여성</p>
        {female.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="text-[9px] text-gray-400 w-14 flex-shrink-0">{d.label}</span>
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${vals[i]}%`, backgroundColor: d.color, transition: barTransition }} />
            </div>
            <span className="text-[9px] text-gray-400 w-7 text-right"><CountUp value={vals[i]} />%</span>
          </div>
        ))}
        <p className="text-[9px] text-blue-400 font-semibold mt-2 mb-1">남성</p>
        {male.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="text-[9px] text-gray-400 w-14 flex-shrink-0">{d.label}</span>
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${vals[i + 3]}%`, backgroundColor: d.color, transition: barTransition }} />
            </div>
            <span className="text-[9px] text-gray-400 w-7 text-right"><CountUp value={vals[i + 3]} />%</span>
          </div>
        ))}
      </div>
      <div className="mt-3 border-t border-gray-800 pt-3 flex justify-between items-center">
        <span className="text-[10px] text-gray-500">총 유입 DB</span>
        <span className="text-sm text-white font-bold"><CountUp value={total} duration={400} />건</span>
      </div>
    </div>
  );
}

export default function ServiceBento() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] as any 
      },
    },
  };

  return (
    <section className="relative bg-white py-24 md:py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#FF5733] font-bold tracking-[.2em] text-xs md:text-sm uppercase"
          >
            OUR ALL-IN-ONE OFFER
          </motion.p>
          <div className="space-y-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[#121212] font-black text-base md:text-2xl leading-snug tracking-tight"
            >
              <span>디자이너</span>
              <span className="text-[#FF5733] font-bold">+</span>
              <span>영상감독</span>
              <span className="text-[#FF5733] font-bold">+</span>
              <span>마케터</span>
              <span className="text-[#FF5733] font-bold">+</span>
              <span>개발자</span>
              <span className="text-[#FF5733] font-bold">+</span>
              <span>사진작가.</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-[#121212] font-black text-base md:text-2xl leading-snug tracking-tight"
            >
              5명의 전문가팀을 매주 출근시킵니다.
            </motion.p>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[21px] xs:text-2xl sm:text-3xl md:text-6xl font-black text-[#121212] tracking-tighter flex flex-col gap-2 md:gap-4"
          >
            <span>현장 밀착형 병원 전담</span>

            {/* Scroll Triggered Fill Text */}
            <div className="relative inline-block overflow-hidden">
              <span className="text-[21px] xs:text-2xl sm:text-3xl md:text-6xl font-black text-gray-200 tracking-tighter block whitespace-nowrap">All-in-One 파트너, 그날그때</span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as any }}
                className="absolute top-0 left-0 text-[21px] xs:text-2xl sm:text-3xl md:text-6xl font-black text-[#121212] tracking-tighter overflow-hidden block whitespace-nowrap"
              >
                All-in-One 파트너, 그날그때
              </motion.span>
            </div>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm md:text-xl font-medium leading-relaxed break-keep"
          >
            우리 병원 전담 직원이 매주 1회 직접 출근하여 기획, 촬영, 소통을 현장에서 끝냅니다. <br className="hidden md:block" />
            외주 없이 25가지 핵심 실무를 자체적으로 대행하는 완벽한 파트너십을 경험하세요.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              onClick={() => setSelectedId(service.id)}
              className={`
                relative bg-[#f8f9fa] rounded-2xl md:rounded-3xl p-4 md:p-8 cursor-pointer overflow-hidden border border-gray-100 group shadow-sm hover:shadow-xl transition-all duration-300
                ${service.size === "large" ? "col-span-2 md:col-span-2 md:row-span-2" : ""}
                ${service.size === "medium" ? "col-span-2 md:col-span-2 md:row-span-1" : ""}
                ${service.size === "small" ? "col-span-1 md:col-span-1 md:row-span-1" : ""}
              `}
              whileHover={{ scale: 1.015, y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
            >
              {/* Icon & Label */}
              <div className="flex flex-col h-full relative z-10">
                <div className="space-y-4">
                  <div
                    className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: service.color }}
                  >
                    <service.icon size={16} className="md:hidden" />
                    <service.icon size={24} className="hidden md:block" />
                  </div>
                  <div>
                    <h4 className="text-xs md:text-2xl font-bold text-[#121212] leading-snug">{service.title}</h4>
                    <p className="hidden md:block text-gray-500 font-medium text-sm mt-1">{service.description}</p>
                  </div>
                </div>

                {service.id === "db-ad" && (
                  <div className="mt-auto flex justify-center relative h-64 w-full">
                    <div className="relative w-40 h-[300px] bg-[#0f0f0f] rounded-[1.25rem] border-[4px] border-gray-800 shadow-2xl overflow-hidden self-start flex flex-col">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#0f0f0f] rounded-b-xl z-20" />
                      <div className="h-5 flex-shrink-0" />
                      <video
                        src="/video/motionvideo2.mp4"
                        autoPlay muted loop playsInline
                        className="w-full flex-shrink-0 pointer-events-none"
                        style={{ aspectRatio: "16/9" }}
                      />
                      <DbAnalytics compact />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#f56565]/20 blur-[60px] rounded-full pointer-events-none" />
                  </div>
                )}

                {service.isApp && (
                  <div className="mt-auto flex justify-center relative h-64 w-full">
                    {/* Simplified Phone Mockup */}
                    <div className="relative w-40 h-[300px] bg-[#121212] rounded-[1.25rem] border-[4px] border-gray-800 shadow-2xl overflow-hidden self-start">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#121212] rounded-b-xl z-20" />
                      <iframe
                        src="https://meals-rosy.vercel.app/"
                        className="w-full h-full border-none pointer-events-none"
                        title="App Mockup"
                      />
                    </div>
                    {/* Background Light Effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#3385ff]/20 blur-[60px] rounded-full pointer-events-none" />
                  </div>
                )}

                {service.id === "program" && (
                  <div className="mt-auto hidden md:block relative w-full h-24 overflow-hidden rounded-xl shadow-md border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                    <img
                      src="/images/monitor.jpg"
                      alt="전용 모니터링 앱"
                      className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                )}

                {service.id === "drone" && (
                  <div className="mt-auto hidden md:block relative w-full h-24 overflow-hidden rounded-xl shadow-md border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                    <video
                      src="/video/dron-shot.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                )}

                {service.id === "ai-search" && (
                  <div className="mt-auto hidden md:block relative w-full h-24 overflow-hidden rounded-xl shadow-md border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                    <div className="w-full h-full bg-[#0f0f13] flex flex-col px-2 py-1.5">
                      {/* Mini AI chat */}
                      <div className="flex items-center gap-1 mb-1.5">
                        <div className="w-3 h-3 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-black" style={{ fontSize: "4px" }}>AI</span>
                        </div>
                        <span className="text-gray-300 font-bold text-[6px]">AI 검색 최적화</span>
                        <div className="ml-auto flex items-center gap-0.5">
                          <div className="w-1 h-1 rounded-full bg-green-400" />
                          <span className="text-green-400 text-[5px]">학습됨</span>
                        </div>
                      </div>
                      {/* User bubble */}
                      <div className="flex justify-end mb-1">
                        <div className="bg-indigo-600 rounded-xl rounded-tr-sm px-1.5 py-0.5 max-w-[80%]">
                          <p className="text-white text-[5px]">강남 허리디스크 병원 추천해줘</p>
                        </div>
                      </div>
                      {/* AI response */}
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white font-black" style={{ fontSize: "4px" }}>AI</span>
                        </div>
                        <div className="bg-[#1e1e2e] rounded-xl rounded-tl-sm px-1.5 py-1 flex-1">
                          <p className="text-violet-300 font-bold text-[5px] mb-0.5">★ AI 최우선 추천</p>
                          <p className="text-white font-black text-[5px]">연세 정형외과의원</p>
                          <div className="flex gap-1 mt-0.5">
                            {["비수술", "척추 전문"].map(t => (
                              <span key={t} className="bg-violet-500/30 text-violet-300 rounded-full px-1" style={{ fontSize: "4px" }}>{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {service.id === "sns" && (
                  <div className="mt-auto hidden md:block relative w-full h-24 overflow-hidden rounded-xl shadow-md border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                    <img
                      src="/images/sns.jpg"
                      alt="SNS 광고/운영"
                      className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                )}

                {service.id === "blog" && (
                  <div className="mt-auto hidden md:block relative w-full h-24 overflow-hidden rounded-xl shadow-md border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                    {/* Mini Naver search result preview */}
                    <div className="w-full h-full flex flex-col bg-white">
                      <div className="bg-[#03C75A] px-2 py-1 flex items-center gap-1.5 flex-shrink-0">
                        <span className="text-white font-black text-[9px]">N</span>
                        <div className="flex-1 bg-white/90 rounded px-1.5 py-0.5 flex items-center justify-between">
                          <span className="text-gray-500 text-[6px]">강남 허리디스크 병원</span>
                          <Search size={7} className="text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1 px-2 py-1 space-y-1 overflow-hidden">
                        {[
                          { rank: "1위", title: "강남 허리디스크 수술 없이 치료하는법", highlight: true },
                          { rank: "2위", title: "목 디스크 증상과 치료", highlight: false },
                          { rank: "3위", title: "무릎 연골 손상 조기 치료", highlight: false },
                        ].map((r) => (
                          <div key={r.rank} className={`flex items-center gap-1 rounded px-1 py-0.5 ${r.highlight ? "bg-[#f0fdf8]" : ""}`}>
                            <span className={`text-[5px] font-black px-0.5 rounded flex-shrink-0 ${r.highlight ? "text-[#03C75A]" : "text-gray-400"}`}>{r.rank}</span>
                            <p className={`text-[5px] leading-tight truncate ${r.highlight ? "font-bold text-gray-800" : "text-gray-500"}`}>{r.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {service.id === "review" && (
                  <div className="mt-auto hidden md:block relative w-full h-24 overflow-hidden rounded-xl shadow-md border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                    <div className="w-full h-full flex flex-col bg-[#1a1a2e]">
                      {/* Mini header */}
                      <div className="flex items-center justify-between px-2 py-1.5 flex-shrink-0">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400 font-black text-[8px]">4.9</span>
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(i => (
                              <svg key={i} className="w-1.5 h-1.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <span className="text-gray-400 text-[6px]">리뷰 324건</span>
                      </div>
                      {/* Mini reviews */}
                      <div className="flex-1 px-2 space-y-1 overflow-hidden">
                        {[
                          { name: "이○○", text: "허리 디스크 3회 만에 완쾌!", rating: 5 },
                          { name: "박○○", text: "원장님 너무 친절해요 추천!", rating: 5 },
                          { name: "김○○", text: "비수술로 무릎 완쾌됐어요", rating: 5 },
                        ].map((r) => (
                          <div key={r.name} className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-yellow-400 text-[5px] font-black">{r.name[0]}</span>
                            </div>
                            <p className="text-gray-300 text-[5px] truncate flex-1">{r.text}</p>
                            <div className="flex gap-0.5 flex-shrink-0">
                              {Array.from({ length: r.rating }).map((_, i) => (
                                <svg key={i} className="w-1.5 h-1.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {service.id === "web" && (
                  <div className="mt-auto hidden md:block relative w-full h-24 overflow-hidden rounded-xl shadow-md border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                    {/* Browser chrome */}
                    <div className="w-full h-4 bg-[#0d9488] flex items-center px-1.5 gap-1 flex-shrink-0">
                      <div className="flex gap-0.5">
                        <div className="w-1 h-1 rounded-full bg-white/40" />
                        <div className="w-1 h-1 rounded-full bg-white/40" />
                        <div className="w-1 h-1 rounded-full bg-white/40" />
                      </div>
                      <div className="flex-1 h-1.5 bg-white/20 rounded-full mx-1 flex items-center px-1">
                        <span className="text-white/60" style={{ fontSize: "4px" }}>yonsei-hospital.co.kr</span>
                      </div>
                    </div>
                    {/* Hero section */}
                    <div className="w-full bg-gradient-to-br from-[#0d9488] to-[#134e4a] px-2 py-1.5 flex items-center justify-between">
                      <div>
                        <p className="text-white font-black leading-tight" style={{ fontSize: "7px" }}>척추·관절 전문</p>
                        <p className="text-white font-black leading-tight" style={{ fontSize: "7px" }}>정형외과의원</p>
                        <div className="mt-1 bg-white text-[#0d9488] font-bold rounded-full px-1.5 py-0.5 inline-block" style={{ fontSize: "5px" }}>온라인 예약</div>
                      </div>
                      <div className="relative w-10 h-10 flex-shrink-0">
                        <div className="absolute inset-0 bg-white/10 rounded-full" />
                        <div className="absolute inset-2 bg-white/15 rounded-full" />
                      </div>
                    </div>
                    {/* Quick links row */}
                    <div className="w-full bg-white grid grid-cols-4 border-t border-gray-100">
                      {["진료예약", "진료안내", "의료진", "오시는길"].map((label, i) => (
                        <div key={label} className={`flex items-center justify-center py-1 ${i < 3 ? "border-r border-gray-100" : ""}`}>
                          <span className="text-gray-500 font-medium" style={{ fontSize: "5px" }}>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {service.id === "news" && (
                  <div className="mt-auto hidden md:flex justify-end relative w-full h-24 overflow-hidden rounded-xl shadow-md border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                    <img
                      src="https://cdn.kormedi.com/wp-content/uploads/2025/08/kakaotalk-20250827-112337595-06.jpg"
                      alt="News Article"
                      className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/10 to-transparent" />
                    <div className="absolute bottom-2 left-3 pr-2 text-left">
                       <p className="text-white text-[11px] md:text-xs font-semibold leading-relaxed drop-shadow-md line-clamp-2">연세척병원, "부산 펜싱선수들 척추 관절 책임지겠다"</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Subtle Grid Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:20px_20px]" />

              {/* Enhanced Visuals for specific cards */}
              {service.id === "db-ad" && (
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 blur-[60px] rounded-full opacity-50 pointer-events-none" 
                  style={{ background: `radial-gradient(circle, ${service.color}33 0%, transparent 70%)` }}
                />
              )}
              {service.id === "db-ad" && (
                <div className="absolute bottom-8 right-8 flex flex-col gap-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="w-32 h-1.5 bg-[#121212] rounded-full" />
                  <div className="w-48 h-1.5 bg-[#121212] rounded-full" />
                  <div className="w-24 h-1.5 bg-[#121212] rounded-full" />
                </div>
              )}
              {service.id === "youtube" && (
                <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-[0.05] group-hover:scale-110 transition-transform duration-700">
                  <service.icon size={128} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
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

            <div className="fixed inset-0 flex items-end md:items-center justify-center pointer-events-none z-[101] px-4 md:px-6 pb-0 md:pb-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                className="bg-white rounded-t-[2rem] md:rounded-[3rem] p-6 md:p-14 w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-[0_32px_128px_rgba(0,0,0,0.1)] pointer-events-auto relative"
              >

                {(() => {
                  const service = services.find(s => s.id === selectedId);
                  if (!service) return null;
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                      <div className="space-y-4 md:space-y-8">
                        <div
                          className="w-10 h-10 md:w-16 md:h-16 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-white"
                          style={{ backgroundColor: service.color }}
                        >
                          <service.icon size={20} className="md:hidden" />
                          <service.icon size={32} className="hidden md:block" />
                        </div>
                        <div className="space-y-2 md:space-y-4">
                          <h2 className="text-2xl md:text-5xl font-black text-[#121212] tracking-tight">{service.title}</h2>
                          <p className="text-[#FF5733] font-bold text-sm md:text-lg">{service.description}</p>
                          <p className="text-gray-500 text-sm md:text-xl leading-relaxed">{service.detail}</p>
                        </div>
                        <div className="pt-2 md:pt-8">
                          {/* Button removed as requested */}
                        </div>
                      </div>

                      <div className="relative">
                        {service.id === "db-ad" ? (
                          <div className="relative w-full flex justify-center items-center py-4">
                            <div className="relative w-[200px] md:w-[240px] h-[380px] md:h-[460px] bg-[#0f0f0f] rounded-[2.5rem] border-[6px] border-gray-800 shadow-[0_32px_80px_rgba(245,101,101,0.35)] overflow-hidden flex flex-col flex-shrink-0">
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#0f0f0f] rounded-b-2xl z-20" />
                              <div className="h-6 flex-shrink-0" />
                              <video
                                src="/video/motionvideo2.mp4"
                                autoPlay muted loop playsInline
                                className="w-full flex-shrink-0"
                                style={{ aspectRatio: "16/9" }}
                              />
                              <DbAnalytics />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#f56565]/20 blur-[80px] rounded-full pointer-events-none" />
                          </div>
                        ) : service.id === "news" ? (
                          <div className="relative w-full h-[380px] md:h-[460px] bg-gray-100 rounded-[2rem] md:rounded-[3rem] shadow-xl overflow-hidden group">
                           <img
                             src="https://cdn.kormedi.com/wp-content/uploads/2025/08/kakaotalk-20250827-112337595-06.jpg"
                             alt="뉴스 기사"
                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                           <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col gap-4">
                             <h3 className="text-white text-xl md:text-2xl font-bold leading-snug drop-shadow-md">연세척병원, "부산 펜싱선수들 척추 관절 책임지겠다"</h3>
                             <a
                               href="https://kormedi.com/2744007/"
                               target="_blank"
                               rel="noopener noreferrer"
                               className="inline-flex items-center justify-center gap-2 bg-[#FF5733] text-white py-3 px-6 rounded-xl font-bold hover:bg-[#e64a2e] transition-colors shadow-lg self-start mt-2"
                             >
                               기사 원문 보기 <ChevronRight size={18} />
                             </a>
                           </div>
                          </div>
                        ) : service.id === "drone" ? (
                          <div className="relative w-full h-[380px] md:h-[460px] bg-black rounded-[2rem] md:rounded-[3rem] shadow-xl overflow-hidden">
                            <video
                              src="/video/dron-shot.mp4"
                              autoPlay
                              muted
                              loop
                              playsInline
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : service.id === "program" ? (
                          <div className="relative w-full h-[380px] md:h-[460px] bg-gray-100 rounded-[2rem] md:rounded-[3rem] shadow-xl overflow-hidden group">
                            <img
                              src="/images/monitor.jpg"
                              alt="전용 모니터링 앱"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                        ) : service.id === "ai-search" ? (
                          <div className="relative w-full h-[380px] md:h-[460px] shadow-xl overflow-hidden">
                            <AISearchMockup />
                          </div>
                        ) : service.id === "sns" ? (
                          <div className="relative w-full flex justify-center items-center py-4">
                            <div className="relative w-[200px] md:w-[240px] h-[380px] md:h-[460px] bg-[#0f0f0f] rounded-[2.5rem] border-[6px] border-gray-800 shadow-[0_32px_80px_rgba(225,48,108,0.35)] overflow-hidden flex-shrink-0">
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#0f0f0f] rounded-b-2xl z-20" />
                              <iframe
                                src="https://ad-cheock.vercel.app/orthopedic"
                                className="w-full h-full border-none"
                                title="SNS Ad Full View"
                              />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#e1306c]/20 blur-[80px] rounded-full pointer-events-none" />
                          </div>
                        ) : service.id === "hospital-photo" ? (
                          <div className="relative w-full h-[380px] md:h-[460px] rounded-[2rem] md:rounded-[3rem] shadow-xl overflow-hidden">
                            <HospitalPhotoSlider className="w-full h-full" />
                          </div>
                        ) : service.id === "blog" ? (
                          <div className="relative w-full h-[380px] md:h-[460px] shadow-xl overflow-hidden">
                            <BlogSearchMockup />
                          </div>
                        ) : service.id === "review" ? (
                          <div className="relative w-full h-[380px] md:h-[460px] shadow-xl overflow-hidden">
                            <ReviewMockup />
                          </div>
                        ) : service.isApp ? (
                          <div className="relative w-full flex justify-center items-center py-4">
                            <div className="relative w-[200px] md:w-[240px] h-[380px] md:h-[460px] bg-[#0f0f0f] rounded-[2.5rem] border-[6px] border-gray-800 shadow-[0_32px_80px_rgba(51,133,255,0.35)] overflow-hidden flex-shrink-0">
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#0f0f0f] rounded-b-2xl z-20" />
                              <iframe
                                src="https://meals-rosy.vercel.app/"
                                className="w-full h-full border-none"
                                title="Full App View"
                              />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#3385ff]/20 blur-[80px] rounded-full pointer-events-none" />
                          </div>
                        ) : service.id === "web" ? (
                          <div className="relative w-full flex justify-center items-center py-4">
                            <div className="relative w-[200px] md:w-[240px] h-[380px] md:h-[460px] bg-[#0f0f0f] rounded-[2.5rem] border-[6px] border-gray-800 shadow-[0_32px_80px_rgba(13,148,136,0.4)] overflow-hidden flex-shrink-0 flex flex-col">
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#0f0f0f] rounded-b-2xl z-20" />
                              <div className="pt-6 flex-1 overflow-hidden">
                                <HospitalWebMockup />
                              </div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#0d9488]/20 blur-[80px] rounded-full pointer-events-none" />
                          </div>
                        ) : service.id === "youtube" ? (
                          <div className="w-full h-[380px] md:h-[460px] flex items-center">
                            <YoutubeSlider />
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
