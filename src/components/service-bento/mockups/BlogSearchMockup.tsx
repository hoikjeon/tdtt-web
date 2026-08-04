"use client";

import { memo } from "react";
import { Search } from "lucide-react";

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

export default BlogSearchMockup;
