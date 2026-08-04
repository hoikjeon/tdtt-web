"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import LazyVideo from "@/components/ui/LazyVideo";
import ScaledIframe from "@/components/ui/ScaledIframe";
import DbAnalytics from "@/components/service-bento/DbAnalytics";
import AISearchMockup from "@/components/service-bento/mockups/AISearchMockup";
import BlogSearchMockup from "@/components/service-bento/mockups/BlogSearchMockup";
import HospitalPhotoSlider from "@/components/service-bento/mockups/HospitalPhotoSlider";
import ReviewMockup from "@/components/service-bento/mockups/ReviewMockup";
import YoutubeSlider from "@/components/service-bento/mockups/YoutubeSlider";
import type { ServiceItem } from "@/components/service-bento/services";

type ServiceModalProps = {
  service: ServiceItem | null;
  onClose: () => void;
};

/** 카드를 클릭했을 때만 열리는 상세 모달. ServiceBento에서 dynamic import 된다. */
export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  return (
    <AnimatePresence>
      {service && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
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
                        <LazyVideo
                          src="/video/motionvideo2.mp4"
                          className="w-full flex-shrink-0"
                          style={{ aspectRatio: "16/9" }}
                        />
                        <DbAnalytics />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#f56565]/10 blur-[80px] rounded-full pointer-events-none" />
                    </div>
                  ) : service.id === "news" ? (
                    <div className="relative w-full h-[380px] md:h-[460px] bg-gray-100 rounded-[2rem] md:rounded-[3rem] shadow-xl overflow-hidden group">
                     <img
                loading="lazy"
                decoding="async"
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
                      <LazyVideo
                        src="/video/dron-shot.mp4"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : service.id === "program" ? (
                    <div className="relative w-full h-[380px] md:h-[460px] bg-gray-100 rounded-[2rem] md:rounded-[3rem] shadow-xl overflow-hidden group">
                      <img
                loading="lazy"
                decoding="async"
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
                        <ScaledIframe
                          src="https://ad-cheock.vercel.app/orthopedic"
                          title="SNS Ad Full View"
                          className="w-full h-full"
                          interactive
                        />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#e1306c]/10 blur-[80px] rounded-full pointer-events-none" />
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
                        <ScaledIframe
                          src="https://meals-rosy.vercel.app/"
                          title="Full App View"
                          className="w-full h-full"
                          interactive
                        />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#3385ff]/10 blur-[80px] rounded-full pointer-events-none" />
                    </div>
                  ) : service.id === "web" ? (
                    <div className="relative w-full flex justify-center items-center py-4">
                      <div className="relative w-[200px] md:w-[240px] h-[380px] md:h-[460px] bg-[#0f0f0f] rounded-[2.5rem] border-[6px] border-gray-800 shadow-[0_32px_80px_rgba(13,148,136,0.15)] overflow-hidden flex-shrink-0">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#0f0f0f] rounded-b-2xl z-20" />
                        <ScaledIframe
                          src="https://yeonsei-cheok-web.vercel.app/"
                          title="Web View"
                          className="w-full h-full"
                          interactive
                        />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#0d9488]/10 blur-[80px] rounded-full pointer-events-none" />
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
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
