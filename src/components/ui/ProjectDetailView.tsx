"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StickyScrollGallery from "./StickyScrollGallery";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailViewProps {
  src: string;
  images?: string[];
  subtitle?: string;
  title?: string;
  onClose: () => void;
}

export default function ProjectDetailView({ src, images = [], subtitle, onClose }: ProjectDetailViewProps) {
  const isMedical = subtitle === "Medical Video Marketing";
  const isLanding = subtitle === "Direct SNS Consultation";
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoElRef.current;
    const scroller = containerRef.current;
    if (!video || !scroller) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { root: scroller, threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // 컨테이너(모달)의 자체 스크롤 위치를 추적합니다.
  const { scrollY } = useScroll({ container: containerRef });

  // Parallax 효과 매핑
  // 텍스트는 스크롤 시 위로 덜 올라가도록 양수 방향(아래로 내리기) 추가 이동
  const textY = useTransform(scrollY, [0, 1000], [0, 100]);

  // 영상 섹션: 뷰포트 진입 시 작게 → 전체화면 → 작게
  const { scrollYProgress: videoProgress } = useScroll({
    container: containerRef,
    target: videoRef,
    offset: ["start end", "end start"],
  });
  const videoClipPath = useTransform(
    videoProgress,
    [0, 0.3, 0.7, 1],
    [
      "inset(0 22% round 16px)",
      "inset(0 0% round 0px)",
      "inset(0 0% round 0px)",
      "inset(0 22% round 16px)",
    ]
  );

  // 스크롤 변경 시 3D Canvas 컴포넌트로 메시지를 보냅니다.
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent('parallaxScroll', { detail: latest }));
    }
  });

  // GSAP ScrollTrigger 텍스트 채우기(Text Fill) 효과 설정
  useEffect(() => {
    if (!containerRef.current) return;
    const scroller = containerRef.current;
    
    const ctx = gsap.context(() => {
      // 텍스트 블록(h2) 단위로 요소를 가져옵니다.
      // 하단 고정 섹션은 별도 로직으로 처리하기 위해 제외합니다.
      const titleContainers = gsap.utils.toArray<HTMLElement>('.scroll-title-container').filter(el => !el.closest('.last-pinned-section'));
      
      titleContainers.forEach((container) => {
        // 해당 블록 안의 각 줄(span)을 순서대로 가져옴
        const lines = container.querySelectorAll('.scroll-fill-text');
        
        // h2를 트리거로 하는 하나의 타임라인 생성
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            scroller: scroller,
            start: "top 80%",       
            end: "top 40%",         
            scrub: true,            
          }
        });

        lines.forEach((line) => {
          tl.to(line, {
            backgroundPositionX: "0%",
            ease: "none",
          });
        });
      });

      // --- 마지막 섹션 전용: 화면 고정(Pin) + 순차적 텍스트 채우기 ---
      const lastSection = document.querySelector('.last-pinned-section');
      if (lastSection) {
        const lines = lastSection.querySelectorAll('.scroll-fill-text');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: lastSection,
            scroller: scroller,
            pin: true,           // 화면 고정
            scrub: 1,            // 부드러운 동기화
            start: "center center", 
            end: "+=200",
          }
        });

        // 텍스트를 줄바꿈 순서대로 한 줄씩 채움
        lines.forEach((line) => {
          tl.to(line, {
            backgroundPositionX: "0%",
            ease: "none",
            duration: 1
          });
        });

        // 마지막 문장 채워진 후 잠시 머물렀다가 고정 해제되도록 여백 추가
        tl.to({}, { duration: 0.5 }); 
      }


    }, containerRef); // containerRef를 스코프로 지정하여 컴포넌트 내 요소만 타겟팅

    return () => {
      // 컴포넌트 언마운트 시(또는 재렌더링 시) 모든 GSAP 상태와 DOM 조작을 완벽하게 초기화(Revert)합니다.
      // 이를 통해 React Strict Mode에서 중복 실행되어 pin-spacer가 꼬이는 현상을 방지합니다.
      ctx.revert();
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden text-white"
    >
      {/* 텍스트가 잘 보이도록 전체 배경을 약간 어둡게 (3D 화면 위에 덮임) */}
      {/* 텍스트 가독성을 위해 상단과 하단에 짙은 그라데이션이 포함된 오버레이 적용 */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-0" />
      {/* 
        전체 스크롤 컨테이너. 내부에 콘텐츠가 많아지면 자동으로 스크롤영역이 늘어납니다.
      */}
      <div className="relative w-full">
        
        {/* === 텍스트 레이어 (motion.div) === */}
        <motion.div
          style={{ y: textY }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
          }}
          className="relative z-10 w-full min-h-screen pt-12 md:pt-24 px-6 md:px-12 flex flex-col justify-between"
        >
          {/* 상단 헤더 */}
          <motion.div 
            variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="flex justify-end items-start w-full"
          >
            {/* 좌측 로고 삭제 (메인 헤더 로고와 중복 방지) */}
            <div className="flex flex-col text-right">
              <span className="text-xs md:text-sm text-white/80 tracking-widest uppercase">{isMedical ? "Medical Advertising" : isLanding ? "Medical Landing Page" : "Hospital Motion"}</span>
            </div>
          </motion.div>

          {/* 중앙 거대 타이틀 */}
          <motion.div 
            variants={{ hidden: { y: 100, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } } }}
            className="flex-grow flex flex-col items-center justify-center -mt-20"
          >
            <h1 className="text-[10vw] md:text-[8vw] font-bold leading-[0.9] tracking-tighter text-center">
              {isMedical ? <>Medical <br /> Advertising</> : isLanding ? <>Medical <br /> Landing Page</> : <>Motion <br /> Graphic</>}
            </h1>
          </motion.div>

          {/* 하단 본문 및 정보 */}
          <motion.div 
            variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="flex flex-col items-center max-w-lg mx-auto pb-32 text-center"
          >
            <p className="text-sm md:text-base text-white/80 leading-relaxed mb-12 text-center break-keep">
              {isMedical
                ? "지루한 원장님 인사말 영상은 이제 그만. 텍스트와 그래픽이 리듬감 있게 움직이는 모션그래픽은 시청자의 이탈률을 획기적으로 낮춥니다."
                : isLanding
                ? "우리 병원만의 핵심 진료를 직관적으로 보여주고, 환자가 평소 쓰는 SNS로 버튼 한 번에 문의를 남기게 만드세요. 이탈은 줄고 실제 '환자 DB'가 쌓입니다.\n\n빠져나가는 광고비를 확실한 매출로 바꿔주는 다이렉트 랜딩페이지, 지금 바로 도입해 보세요."
                : "강렬한 시각적 효과와 세밀한 연출을 통한 모션 그래픽 광고 솔루션을 제공합니다. 브랜드의 메시지를 가장 임팩트 있게 전달하기 위해 최신의 트렌드와 기술을 접목한 영상미를 추구하며, 고객의 감각을 깨우는 새로운 경험을 선사합니다."
              }
            </p>

            <div className="flex flex-col gap-8 w-full">
              <div className="flex justify-between items-end border-b border-white/20 pb-4">
                <span className="text-xs font-bold tracking-widest uppercase text-white/50">View Project</span>
                <div className="flex gap-4">
                  <span className="text-xs text-white uppercase cursor-pointer hover:text-white/70">{isLanding ? "Web Design" : "AE"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* --- 영상 섹션 --- */}
        {/* videoRef는 useScroll target으로 항상 DOM에 연결돼야 하므로 isLanding일 때 h-0으로 숨김 */}
        <div ref={videoRef} className={isLanding ? "h-0 overflow-hidden" : "relative z-20 w-full"}>
          {!isLanding && (
            <motion.div style={{ clipPath: videoClipPath }} className="bg-black">
              <video
                ref={videoElRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto block"
                src={isMedical ? "/video/motionvideo2.mp4" : "/video/motionvideo1.mp4"}
              />
            </motion.div>
          )}
        </div>

        {/* --- 폰 목업 섹션 (landing 전용) — clipPath 밖 독립 섹션으로 GSAP ScrollTrigger 정상 작동 --- */}
        {isLanding && (
          <div className="relative z-20 w-full bg-white text-black py-40 px-6 md:px-16 flex items-center justify-center">
            <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-16 md:gap-24">
              {/* Phone mockup */}
              <div className="flex-shrink-0 flex justify-center md:justify-end w-full md:w-1/2">
                <div
                  className="relative"
                  style={{
                    width: '300px',
                    height: '620px',
                    background: '#0f0f0f',
                    borderRadius: '44px',
                    border: '10px solid #1e1e1e',
                    boxShadow: '0 0 0 1px #d1d5db, 0 40px 100px rgba(0,0,0,0.2), 0 10px 40px rgba(0,0,0,0.12)',
                  }}
                >
                  <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '84px', height: '24px', background: '#000', borderRadius: '12px', zIndex: 20 }} />
                  <div style={{ position: 'absolute', left: '-13px', top: '96px', width: '3px', height: '28px', background: '#2a2a2a', borderRadius: '2px' }} />
                  <div style={{ position: 'absolute', left: '-13px', top: '136px', width: '3px', height: '52px', background: '#2a2a2a', borderRadius: '2px' }} />
                  <div style={{ position: 'absolute', left: '-13px', top: '200px', width: '3px', height: '52px', background: '#2a2a2a', borderRadius: '2px' }} />
                  <div style={{ position: 'absolute', right: '-13px', top: '136px', width: '3px', height: '72px', background: '#2a2a2a', borderRadius: '2px' }} />
                  <div style={{ overflow: 'hidden', borderRadius: '34px', width: '100%', height: '100%', background: '#fff' }}>
                    <iframe
                      src="https://ad-cheock.vercel.app/"
                      style={{
                        width: '390px',
                        height: '844px',
                        border: 'none',
                        transformOrigin: 'top left',
                        transform: `scale(${280 / 390})`,
                        display: 'block',
                        pointerEvents: 'auto',
                      }}
                      title="Medical Landing Page Preview"
                    />
                  </div>
                </div>
              </div>
              {/* Text with scroll-fill effect */}
              <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                <h2 className="scroll-title-container text-[2.8rem] md:text-[3.8rem] lg:text-[4.5rem] font-extrabold mb-6 leading-[1.1] tracking-tighter">
                  {["랜딩 페이지", "제작"].map((line, lineIdx) => (
                    <span
                      key={lineIdx}
                      className="scroll-fill-text block w-fit"
                      style={{
                        backgroundImage: "linear-gradient(to right, #000 50%, #d1d5db 50%)",
                        backgroundSize: "200% 100%",
                        backgroundPositionX: "100%",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {line}
                    </span>
                  ))}
                </h2>
                <h3 className="text-xs font-bold text-gray-500 mb-4 tracking-widest uppercase">Live Preview</h3>
                <p className="text-gray-800 text-sm md:text-base leading-relaxed break-keep max-w-sm font-medium">
                  광고를 클릭한 환자가 처음 마주하는 화면입니다. 스크롤 한 번으로 병원의 진료 강점, SNS 간편 상담 버튼, 신뢰 요소까지 — 환자의 시선으로 직접 경험해 보세요.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --- 추가 콘텐츠 영역 (아래로 스크롤 시 나타나는 하얀 화이트 섹션) --- */}
        <div className="relative z-20 w-full bg-white text-black pt-40 pb-48 flex flex-col gap-40 md:gap-64">
          {(isLanding ? [
            {
              title: "SNS 광고 클릭은\n많은데?",
              subtitle: "Problem Statement",
              desc: "환자들은 복잡하고 느린 예약 과정에서 이탈합니다. 의미 없는 트래픽만 늘리는 광고에서 벗어나, 클릭이 실제 '환자 DB'로 이어지는 확실한 구조가 필요합니다.",
              reverse: false,
            },
            {
              title: "이탈을 막는\n전환 구조",
              subtitle: "Direct Landing Page",
              desc: "오직 환자의 행동 전환에만 집중했습니다. 우리 병원의 주력 진료와 핵심 노출 포인트를 가장 직관적이고 매력적으로 담아냅니다.",
              reverse: true,
            },
            {
              title: "버튼 하나로\nSNS 간편 상담",
              subtitle: "SNS Direct Consultation",
              desc: "환자가 광고를 보고 들어와 평소 사용하는 SNS 채널로 즉시 상담을 남길 수 있습니다. 복잡한 가입이나 절차를 없애 환자의 문의 장벽을 획기적으로 낮췄습니다.",
              reverse: false,
            },
            {
              title: "잘 만든 랜딩 하나,\n열 마케터",
              subtitle: "Revenue Impact",
              desc: "밑빠진 독에 물 붓는 광고비는 이제 멈추세요. 병원의 매출을 직접적으로 끌어올릴 맞춤형 랜딩페이지 시스템, 지금 바로 상담받아보세요.",
              reverse: true,
            },
          ] : isMedical ? [
            {
              title: "수백만 원 광고,\n누구에게?",
              subtitle: "Targeting Strategy",
              desc: "아무리 좋은 영상도 내원할 수 없는 먼 지역 사람들에게 보여진다면 광고비 낭비입니다. 이제는 영상 퀄리티보다 '누구에게 보여줄 것인가'가 핵심입니다.",
              reverse: false
            },
            {
              title: "스크롤을 멈추게\n하는 힘",
              subtitle: "Motion Graphic",
              desc: "지루한 원장님 인사말 영상은 이제 그만. 텍스트와 그래픽이 리듬감 있게 움직이는 모션그래픽은 시청자의 이탈률을 획기적으로 낮춥니다.",
              reverse: true
            },
            {
              title: "우리 동네 환자만\n콕 집어서",
              subtitle: "Geo-Targeting",
              desc: "병원 위치를 중심으로 반경 5km, 10km 단위로 광고 노출 지역을 정밀하게 설정합니다. 실제 내원이 가능한 잠재 환자에게만 광고비를 사용하여 효율을 극대화합니다.",
              reverse: false
            },
            {
              title: "결과를 만드는\n영상",
              subtitle: "Portfolio",
              desc: "명확한 소구점, 의료진 신뢰도, 쉬운 접근성. 환자가 가장 원하는 키워드를 직관적인 모션으로 전달하여 실질적인 내원을 유도합니다.",
              reverse: true
            }
          ] : [
            {
              title: "생동감 넘치는\n언어",
              subtitle: "Motion Graphic",
              desc: "브랜드의 아이덴티티를 살아있는 움직임으로 해석합니다. 단순한 정보를 넘어 감각적인 시각 언어로 고객의 마음을 사로잡는 모션 그래픽을 제작합니다.",
              reverse: false
            },
            {
              title: "기술과 감각의\n조화",
              subtitle: "Technical Excellence",
              desc: "최신 영상 기술과 뛰어난 연출력을 결합하여 완성도 높은 결과물을 만들어냅니다. 고해상도 그래픽과 매끄러운 트랜지션으로 몰입감을 극대화합니다.",
              reverse: true
            },
            {
              title: "전략적 메시지\n전달",
              subtitle: "Strategic Impact",
              desc: "브랜드가 전달하고자 하는 핵심 가치를 명확하게 분석하여, 시청자에게 가장 효과적으로 각인될 수 있는 전략적인 영상 흐름을 설계합니다.",
              reverse: false
            },
            {
              title: "뉴미디어 최적화\n솔루션",
              subtitle: "Media Optimized",
              desc: "유튜브, 인스타그램, 틱톡 등 다양한 뉴미디어 채널의 특성에 맞게 최적화된 포맷과 연출로 최상의 광고 효과를 이끌어냅니다.",
              reverse: true
            }
          ]).map((section, idx) => (
            <div 
              key={idx} 
              // max-w-5xl과 gap-16으로 사진과 글자의 거리를 좁혀 몰입감을 높였습니다.
              className={`max-w-5xl mx-auto w-full px-6 flex flex-col ${section.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-16`}
            >
              {/* 이미지 영역: 텍스트와 마주보는 방향으로 약간 밀착(justify)되도록 수정 */}
              <div className={`w-full md:w-1/2 flex justify-center ${section.reverse ? 'md:justify-start' : 'md:justify-end'}`}>
                {/* 가로형 영상미를 강조하기 위해 aspect-video(16:9)와 더 넓은 너비(max-w-[600px]) 적용 */}
                <div className="relative w-full max-w-[600px] aspect-video bg-gray-200 shadow-2xl overflow-hidden">
                  <Image src={images[idx + 1] || src} fill className="object-cover" alt="Detail Image" />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                 {/* 섹션 2의 우측 사진 너비(460px)에 맞게 제목이 꽉 차보이도록 폰트 크기를 대폭 키움 (5.5rem~6rem) */}
                 <h2 className="scroll-title-container text-[2.8rem] md:text-[3.8rem] lg:text-[4.5rem] font-extrabold mb-6 leading-[1.1] tracking-tighter">
                   {section.title.split('\n').map((line, lineIdx) => (
                     <span 
                       key={lineIdx}
                       className="scroll-fill-text block w-fit"
                       style={{
                         backgroundImage: "linear-gradient(to right, #000 50%, #d1d5db 50%)",
                         backgroundSize: "200% 100%",
                         backgroundPositionX: "100%",
                         WebkitBackgroundClip: "text",
                         color: "transparent"
                       }}
                     >
                       {line}
                     </span>
                   ))}
                 </h2>
                 <h3 className="text-xs font-bold text-gray-500 mb-4 tracking-widest uppercase">{section.subtitle}</h3>
                 <p className="text-gray-800 text-sm md:text-base leading-relaxed break-keep max-w-sm font-medium">
                   {section.desc}
                 </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- 유사 3D 패럴랙스 (Pseudo-3D) 커튼 섹션 --- */}
        <Pseudo3DSection src={src} images={images} />

        {/* --- 600여 개의 화면 디자인 텍스트 섹션 --- */}
        <div className="relative z-30 w-full bg-white flex flex-col items-center justify-center py-48 md:py-64 px-6">
           <div className="max-w-2xl w-full flex flex-col items-center text-center mx-auto">
             <h2 className="scroll-title-container text-[3.5rem] md:text-[5rem] font-bold mb-8 leading-[1.1] tracking-tighter text-center">
               {(isMedical ? "수백만 원\n광고,\n닿았나요?" : isLanding ? "전환을\n만드는\n랜딩페이지" : "600여개의\n화면\n디자인").split('\n').map((line, idx) => (
                 <span 
                   key={idx}
                   className="scroll-fill-text block w-fit mx-auto"
                   style={{
                     backgroundImage: "linear-gradient(to right, #000 50%, #d1d5db 50%)",
                     backgroundSize: "200% 100%",
                     backgroundPositionX: "100%",
                     WebkitBackgroundClip: "text",
                     color: "transparent"
                   }}
                 >
                   {line}
                 </span>
               ))}
             </h2>
             <h3 className="text-xs font-bold text-gray-500 mb-6 tracking-widest uppercase text-center">
               {isMedical ? "Medical Targeting" : isLanding ? "Conversion Optimization" : "Video Advertisement Design"}
             </h3>
             <p className="text-gray-800 text-sm md:text-base leading-relaxed break-keep font-medium text-center">
               {isMedical
                 ? "아무리 좋은 영상도 내원할 수 없는 먼 지역 사람들에게 보여진다면 광고비 낭비입니다. 영상 퀄리티는 기본, 이제는 '누구에게 보여줄 것인가'가 핵심입니다."
                 : isLanding
                 ? "광고 클릭이 실제 상담으로 이어지지 않는다면, 문제는 랜딩페이지에 있습니다. 환자 행동 심리를 반영한 구조로 전환율을 근본적으로 끌어올립니다."
                 : "영상의 매 프레임마다 완벽한 구도와 색감을 담아내기 위해 수많은 시나리오와 디자인을 검토합니다. 일관된 톤앤매너를 유지하며 완성도 높은 영상미를 구현하고 브랜드의 가치를 높입니다."
               }
             </p>
           </div>
        </div>

        {/* bg-white wrapper: GSAP pin-spacer가 transparent이므로 부모 bg-white가 비쳐 어두운 갭이 생기지 않도록 감쌈 */}
        <div className="relative z-30 bg-white">
        {/* --- Sticky Scroll Gallery --- */}
        <StickyScrollGallery images={images} fallback={src} />

        {/* --- 마지막 섹션: 마블스튜디오 오! 와이스튜디오 (고정 효과 적용) --- */}
        <div className="last-pinned-section relative w-full bg-white flex flex-col items-center justify-center py-20 md:py-28 px-6">
           <div className="max-w-2xl w-full flex flex-col items-center text-center mx-auto">
             <h2 className="scroll-title-container text-[3.5rem] md:text-[5rem] font-bold mb-8 leading-[1.1] tracking-tighter text-center">
               {(isMedical ? "기획부터\n광고까지\n한 번에" : isLanding ? "클릭이\n환자로\n이어지다" : "영상으로\n여는\n새로운\n경험").split('\n').map((line, idx) => (
                 <span 
                   key={idx}
                   className="scroll-fill-text block w-fit mx-auto"
                   style={{
                     backgroundImage: "linear-gradient(to right, #000 50%, #d1d5db 50%)",
                     backgroundSize: "200% 100%",
                     backgroundPositionX: "100%",
                     WebkitBackgroundClip: "text",
                     color: "transparent"
                   }}
                 >
                   {line}
                 </span>
               ))}
             </h2>
             <h3 className="text-xs font-bold text-gray-400 mb-6 tracking-widest uppercase text-center">
               {isMedical ? "TDTT MEDICAL MARKETING" : isLanding ? "TDTT MEDICAL LANDING" : "TDTT VIDEO SOLUTION"}
             </h3>
             <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed break-keep font-medium text-center max-w-sm opacity-80">
               {isMedical
                 ? "원장님은 진료에만 집중하세요. 기획부터 고퀄리티 모션그래픽 제작, 정밀 타겟팅 광고 송출까지 마케팅은 전문가가 책임지겠습니다."
                 : isLanding
                 ? "원장님은 진료에만 집중하세요. 병원 맞춤형 랜딩페이지로 광고 클릭을 실제 내원 환자로 전환하는 확실한 시스템을 지금 도입하세요."
                 : "영상, 그 이상의 감동. TDTT와 함께 새로운 영상의 여정을 제안합니다. 극장 광고뿐만 아니라 다양한 뉴미디어 채널에 최적화된 콘텐츠로, 최고의 브랜드 경험을 선사합니다."
               }
             </p>
           </div>
        </div>
        </div>{/* end bg-white wrapper */}

      </div>

      {/* 닫기 버튼 (최상위 fixed 위치로 이동하여 스크롤 영향을 받지 않도록 함) */}
      <button 
        onClick={onClose}
        className="group flex flex-col items-center gap-2 cursor-pointer fixed bottom-8 right-6 md:bottom-12 md:right-12 z-[80] select-none"
      >
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/50 backdrop-blur-xl border border-white/15 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:scale-110 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.25em] text-white/40 group-hover:text-white transition-all duration-500 translate-y-0 opacity-0 group-hover:opacity-100 group-hover:translate-y-1">Close</span>
      </button>
    </motion.div>
  );
}

// 하단에 덮이듯이 드러나는 Pseudo-3D 섹션 컴포넌트
function Pseudo3DSection({ src, images = [] }: { src: string, images?: string[] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    // 뷰포트 중앙을 0 기준으로 -1 ~ 1 사이의 값으로 마우스 위치 정규화
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    // 마우스가 영역을 벗어나면 제자리로 복귀
    mouseX.set(0);
    mouseY.set(0);
  };

  // 마우스 이동 값을 매우 부드럽게(Spring) 감쇠 (딱딱하지 않게 조절)
  const springConfig = { damping: 40, stiffness: 50, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 깊이감(Depth)에 따른 레이어별 움직임 매핑
  // 1. 가장 뒤의 배경 레이어: 마우스와 반대 방향으로 미세하게 이동 (깊은 곳)
  const bgX = useTransform(smoothX, [-1, 1], [15, -15]);
  const bgY = useTransform(smoothY, [-1, 1], [15, -15]);

  // 2. 중간에 떠 있는 스마트폰 레이어 1: 마우스 방항과 동일하게 크게 이동 (가장 가까운 곳)
  const phone1X = useTransform(smoothX, [-1, 1], [-50, 50]);
  const phone1Y = useTransform(smoothY, [-1, 1], [-50, 50]);

  // 3. 주변에 떠 있는 스마트폰 레이어 2: 조금 덜 크게 이동 (중간 거리)
  const phone2X = useTransform(smoothX, [-1, 1], [30, -30]);
  const phone2Y = useTransform(smoothY, [-1, 1], [30, -30]);

  return (
    // 전체 컨테이너를 h-screen(100vh)으로 수정하여 남는 검은색 빈 공간을 완전히 제거함
    <div 
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">

        {/* 배경 레이어 (돌 질감 모방을 위해 원본을 크게 띄우고 블러 및 어둡게 처리) */}
        <motion.div 
          className="absolute inset-0 z-0 scale-[1.2]"
          style={{ x: bgX, y: bgY }}
        >
          <Image src={images[8] || src} fill className="object-cover opacity-20 blur-md grayscale" alt="Background Texture" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
        </motion.div>

        {/* 중앙 상단 거대 텍스트 (배경과 폰 사이) */}
        <div className="absolute z-10 pointer-events-none flex flex-col items-center top-[15%]">
           <h2 className="text-white/10 text-[8vw] font-bold tracking-tighter leading-none text-center">
             BEYOND <br /> EXPERIENCE
           </h2>
        </div>

        {/* 둥둥 떠다니는 스마트폰 레이어 그룹 */}
        <motion.div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          
          {/* 1. 우측 상단 레이어 (와이드 스크린 형태) */}
          <motion.div 
            style={{ x: phone2X, y: phone1Y }}
            className="absolute w-[320px] md:w-[480px] aspect-video bg-black rounded-2xl border-4 border-gray-900 shadow-[0_20px_40px_rgba(0,0,0,0.9)] overflow-hidden right-[-10%] md:right-[5%] top-[10%] rotate-[10deg] opacity-80 blur-[2px]"
          >
            <Image src={images[9] || src} fill className="object-cover" alt="Phone Layer 1" />
          </motion.div>

          {/* 2. 좌측 하단 레이어 (와이드 스크린 형태) */}
          <motion.div 
            style={{ x: phone1X, y: phone2Y }}
            className="absolute w-[360px] md:w-[540px] aspect-video bg-black rounded-2xl border-4 border-gray-800 shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden left-[-15%] md:left-[5%] bottom-[5%] -rotate-[12deg] blur-[1px]"
          >
            <Image src={images[10] || src} fill className="object-cover" alt="Phone Layer 2" />
          </motion.div>

          {/* 3. 중앙 메인 레이어 (가장 크고 선명한 와이드 스크린) */}
          <motion.div 
            style={{ x: phone1X, y: phone1Y }}
            className="absolute w-[420px] md:w-[680px] aspect-video bg-black rounded-3xl border-4 border-gray-700 shadow-2xl overflow-hidden -rotate-3"
          >
            <Image src={images[0] || src} fill className="object-cover" alt="Main Phone Layer" />
            <div className="absolute inset-0 bg-white/5 pointer-events-none" /> 
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
}
