"use client";

import { memo } from "react";

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

export default AISearchMockup;
