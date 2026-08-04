"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import LazyVideo from "@/components/ui/LazyVideo";
import ScaledIframe from "@/components/ui/ScaledIframe";
import ScrollRevealText from "@/components/ui/ScrollRevealText";
import DbAnalytics from "@/components/service-bento/DbAnalytics";
import { services } from "@/components/service-bento/services";

// 모달은 카드를 클릭해야 열린다. 목업 5종이 전부 모달 전용이므로 초기 번들에서 제외한다.
const ServiceModal = dynamic(() => import("@/components/service-bento/ServiceModal"));

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
            <ScrollRevealText className="text-[21px] xs:text-2xl sm:text-3xl md:text-6xl font-black tracking-tighter">
              All-in-One 파트너, 그날그때
            </ScrollRevealText>
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
                      <LazyVideo
                        src="/video/motionvideo2.mp4"
                        className="w-full flex-shrink-0 pointer-events-none"
                        style={{ aspectRatio: "16/9" }}
                      />
                      <DbAnalytics compact />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#f56565]/10 blur-[60px] rounded-full pointer-events-none" />
                  </div>
                )}

                {service.isApp && (
                  <div className="mt-auto flex justify-center relative h-64 w-full">
                    {/* Simplified Phone Mockup */}
                    <div className="relative w-40 h-[300px] bg-[#121212] rounded-[1.25rem] border-[4px] border-gray-800 shadow-2xl overflow-hidden self-start">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#121212] rounded-b-xl z-20" />
                      <ScaledIframe
                        src="https://meals-rosy.vercel.app/"
                        title="App Mockup"
                        className="w-full h-full"
                      />
                    </div>
                    {/* Background Light Effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#3385ff]/10 blur-[60px] rounded-full pointer-events-none" />
                  </div>
                )}

                {service.id === "program" && (
                  <div className="mt-auto hidden md:block relative w-full h-24 overflow-hidden rounded-xl shadow-md border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="/images/monitor.jpg"
                      alt="전용 모니터링 앱"
                      className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                )}

                {service.id === "drone" && (
                  <div className="mt-auto hidden md:block relative w-full h-24 overflow-hidden rounded-xl shadow-md border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                    <LazyVideo
                      src="/video/dron-shot.mp4"
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
                      loading="lazy"
                      decoding="async"
                      src="/images/sns.webp"
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
                    <div className="w-full h-full flex flex-col bg-white">
                      <div className="flex items-center justify-between px-2 py-1.5 flex-shrink-0 border-b border-[#edf0ee]">
                        <div className="flex items-center gap-1">
                          <span className="w-3.5 h-3.5 rounded bg-[#03C75A] text-white flex items-center justify-center font-black text-[7px]">N</span>
                          <span className="text-[#222] font-black text-[7px]">방문자 리뷰</span>
                        </div>
                        <span className="text-[#03A94F] font-bold text-[6px]">324개</span>
                      </div>
                      <div className="flex gap-1 px-2 py-1 bg-[#f5fbf7] border-b border-[#edf5f0] overflow-hidden">
                        {["친절해요", "설명이 자세해요"].map((keyword) => (
                          <span key={keyword} className="text-[5px] text-[#258149] font-bold bg-white border border-[#dcefe3] rounded-full px-1.5 py-0.5 whitespace-nowrap">{keyword}</span>
                        ))}
                      </div>
                      <div className="flex-1 px-2 py-1 space-y-1 overflow-hidden">
                        {[
                          { name: "이웃집토토*", text: "설명을 자세하게 해주셔서 안심됐어요" },
                          { name: "건강한하루*", text: "꼼꼼한 진료와 친절한 안내 감사합니다" },
                        ].map((r) => (
                          <div key={r.name} className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full bg-[#def6e8] flex items-center justify-center flex-shrink-0">
                              <span className="text-[#079448] text-[5px] font-black">{r.name[0]}</span>
                            </div>
                            <p className="text-[#555] text-[5px] truncate flex-1">{r.text}</p>
                            <span className="text-[#03A94F] text-[5px] font-bold whitespace-nowrap">답글 완료</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {service.id === "web" && (
                  <div className="mt-auto hidden md:block relative w-full h-24 overflow-hidden rounded-xl shadow-md border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                    <ScaledIframe
                      src="https://yeonsei-cheok-web.vercel.app/"
                      title="Web Thumbnail"
                      className="w-full h-full pointer-events-none"
                    />
                  </div>
                )}

                {service.id === "news" && (
                  <div className="mt-auto hidden md:flex justify-end relative w-full h-24 overflow-hidden rounded-xl shadow-md border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                    <img
                      loading="lazy"
                      decoding="async"
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
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 blur-[60px] rounded-full opacity-25 pointer-events-none"
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

      <ServiceModal
        service={services.find((s) => s.id === selectedId) ?? null}
        onClose={() => setSelectedId(null)}
      />
    </section>
  );
}
