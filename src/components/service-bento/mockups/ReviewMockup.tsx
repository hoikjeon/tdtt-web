"use client";

import { memo } from "react";
import { CheckCircle2, MessageCircle, MoreHorizontal, ThumbsUp } from "lucide-react";

const ReviewMockup = memo(function ReviewMockup() {
  const reviews = [
    {
      name: "이웃집토토*",
      date: "2일 전",
      avatar: "이",
      text: "원장님이 증상과 치료 과정을 이해하기 쉽게 설명해 주셨어요. 직원분들도 친절해서 편안하게 진료받았습니다.",
      keywords: ["설명이 자세해요", "친절해요"],
    },
    {
      name: "건강한하루*",
      date: "4일 전",
      avatar: "건",
      text: "허리 통증 때문에 방문했는데 꼼꼼하게 봐주시고 필요한 치료만 권해주셔서 믿음이 갔어요.",
      keywords: ["진료가 꼼꼼해요", "과잉진료 없어요"],
    },
    {
      name: "초록산책*",
      date: "6일 전",
      avatar: "초",
      text: "예약 시간에 맞춰 빠르게 진료받았고 병원도 깨끗하게 관리되어 있어 만족스러웠습니다.",
      keywords: ["대기시간이 짧아요", "시설이 깔끔해요"],
    },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#f4f5f6] overflow-hidden rounded-[2rem] md:rounded-[3rem] text-[#242424]">
      {/* Naver Place header */}
      <div className="bg-white flex-shrink-0 border-b border-[#e8e8e8]">
        <div className="px-4 md:px-5 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-[#03C75A] flex items-center justify-center shadow-[0_4px_12px_rgba(3,199,90,0.24)]">
                <span className="text-white text-xs md:text-sm font-black tracking-tighter">N</span>
              </div>
              <div>
                <p className="text-[8px] text-[#8f8f8f] leading-none mb-1">NAVER PLACE</p>
                <p className="text-[11px] md:text-xs font-extrabold leading-none">리뷰 관리</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[#6f6f6f]">
              <div className="w-6 h-6 rounded-full border border-[#eeeeee] flex items-center justify-center">
                <MessageCircle size={11} />
              </div>
              <div className="w-6 h-6 rounded-full border border-[#eeeeee] flex items-center justify-center">
                <MoreHorizontal size={12} />
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-sm md:text-base tracking-[-0.03em]">연세정형외과의원</h3>
                <span className="text-[7px] md:text-[8px] font-bold text-[#03A94F] bg-[#ebfbf2] px-1.5 py-0.5 rounded-full">정형외과</span>
              </div>
              <p className="text-[8px] md:text-[9px] text-[#777] mt-1">
                방문자 리뷰 <strong className="text-[#03A94F]">324</strong>
                <span className="mx-1 text-[#d5d5d5]">·</span>
                블로그 리뷰 <strong className="text-[#555]">89</strong>
              </p>
            </div>
            <div className="flex items-center gap-1 text-[8px] font-bold text-[#03A94F] whitespace-nowrap">
              <CheckCircle2 size={11} />
              관리 중
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 px-3">
          {["홈", "소식", "리뷰", "사진"].map((tab) => (
            <div
              key={tab}
              className={`relative py-2 text-center text-[9px] md:text-[10px] font-bold ${tab === "리뷰" ? "text-[#03A94F]" : "text-[#888]"}`}
            >
              {tab}
              {tab === "리뷰" && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-0.5 bg-[#03C75A] rounded-full" />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Review summary */}
        <div className="bg-white px-4 md:px-5 py-3 border-b-[6px] border-[#f4f5f6]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] md:text-xs font-extrabold">방문자 리뷰</p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <strong className="text-xl md:text-2xl font-black tracking-tighter">324</strong>
                <span className="text-[8px] text-[#999]">개의 리뷰</span>
              </div>
            </div>
            <div className="bg-[#effbf4] rounded-xl px-2.5 py-1.5 text-right">
              <p className="text-[7px] text-[#6f8d7a]">최근 7일</p>
              <p className="text-[10px] font-black text-[#03A94F]">+18</p>
            </div>
          </div>
          <div className="flex gap-1.5 mt-2 overflow-hidden">
            {["친절해요 168", "설명이 자세해요 142", "시설이 깔끔해요 96"].map((keyword) => (
              <span key={keyword} className="flex-shrink-0 text-[7px] md:text-[8px] text-[#267744] font-semibold bg-[#f2fbf6] border border-[#dff4e8] rounded-full px-2 py-1">
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Visitor review list */}
        {reviews.map((r) => (
          <div key={r.name} className="bg-white px-4 md:px-5 py-3 border-b border-[#eeeeee]">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#dff8e9] to-[#b9efd0] flex items-center justify-center flex-shrink-0 text-[9px] font-black text-[#078f45]">
                  {r.avatar}
                </div>
                <div>
                  <p className="text-[9px] md:text-[10px] font-extrabold">{r.name}</p>
                  <div className="flex items-center gap-1 mt-0.5 text-[7px] text-[#999]">
                    <span>{r.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5 text-[#03A94F] font-semibold">
                      <CheckCircle2 size={8} /> 영수증 인증
                    </span>
                  </div>
                </div>
              </div>
              <MoreHorizontal size={13} className="text-[#aaa]" />
            </div>
            <p className="text-[9px] md:text-[10px] text-[#555] leading-[1.6] mt-2 line-clamp-2">{r.text}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {r.keywords.map((keyword) => (
                <span key={keyword} className="text-[7px] font-semibold text-[#397f53] border border-[#dcefe3] rounded-full px-1.5 py-0.5">{keyword}</span>
              ))}
            </div>
            <div className="mt-2 bg-[#f7faf8] rounded-lg px-2.5 py-2 flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#03C75A] text-white flex items-center justify-center text-[6px] font-black">N</div>
              <p className="text-[7px] text-[#667069] flex-1 truncate"><strong className="text-[#2e4537]">병원 답글</strong> · 소중한 리뷰 감사합니다.</p>
              <CheckCircle2 size={10} className="text-[#03A94F]" />
            </div>
          </div>
        ))}
      </div>

      {/* Management status */}
      <div className="flex-shrink-0 bg-white border-t border-[#e8e8e8] px-4 md:px-5 py-2.5 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-[#edfaf3] flex items-center justify-center">
          <ThumbsUp size={12} className="text-[#03A94F]" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-[8px] font-bold mb-1">
            <span>리뷰 답변 관리</span>
            <span className="text-[#03A94F]">답변율 100%</span>
          </div>
          <div className="h-1 bg-[#e9ecea] rounded-full overflow-hidden">
            <div className="h-full w-full bg-[#03C75A] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default ReviewMockup;
