"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailViewProps {
  src: string;
  onClose: () => void;
}

export default function ProjectDetailView({ src, onClose }: ProjectDetailViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 컨테이너(모달)의 자체 스크롤 위치를 추적합니다.
  const { scrollY } = useScroll({ container: containerRef });

  // Parallax 효과 매핑
  // 텍스트는 스크롤 시 위로 덜 올라가도록 양수 방향(아래로 내리기) 추가 이동
  const textY = useTransform(scrollY, [0, 1000], [0, 100]);

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
        const titleContainer = lastSection.querySelector('.scroll-title-container');
        const lines = lastSection.querySelectorAll('.scroll-fill-text');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: lastSection,
            scroller: scroller,
            pin: true,           // 화면 고정
            scrub: 1,            // 부드러운 동기화
            start: "center center", 
            end: "+=1200",       // 1200px 내려올 때까지 고정
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

      // --- 수평 스크롤 갤러리 (No-Pin Horizontal Marquee) 설정 ---
      // pin 없이 섹션을 지나가는 동안 자연스럽게 좌우 교차 애니메이션
      const gallerySections = gsap.utils.toArray<HTMLElement>('.gallery-crossfade');

      gallerySections.forEach((section) => {
        const topRow = section.querySelector('.row-top');
        const bottomRow = section.querySelector('.row-bottom');
        if (!topRow || !bottomRow) return;

        // 윗줄: 왼쪽으로 밀려남 (xPercent -20)
        gsap.to(topRow, {
          xPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scroller: scroller,
            start: "top bottom",   // 섹션 상단이 뷰포트 하단에 닿을 때 시작
            end: "bottom top",     // 섹션 하단이 뷰포트 상단을 벗어날 때 종료
            scrub: 1,              // 1초 감쇠로 부드럽게
          }
        });

        // 아랫줄: 오른쪽으로 밀려남 (xPercent +20)
        gsap.to(bottomRow, {
          xPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scroller: scroller,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      });

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
      <div className="fixed inset-0 pointer-events-none bg-black/30" />
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
            className="flex justify-between items-start w-full"
          >
            <Link href="/" className="block">
              <img 
                src="/main-logo-bk.png" 
                alt="tdtt" 
                className="h-10 md:h-12 w-auto invert"
              />
            </Link>
            
            <div className="flex flex-col text-right">
              <span className="text-xs md:text-sm text-white/60 mb-1">2025</span>
              <span className="text-xs md:text-sm text-white/80 tracking-widest uppercase">NEW CGV APP</span>
            </div>

            {/* 닫기 버튼 (스크롤을 따라다니도록 fixed로 변경) */}
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

          {/* 중앙 거대 타이틀 */}
          <motion.div 
            variants={{ hidden: { y: 100, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } } }}
            className="flex-grow flex flex-col items-center justify-center -mt-20"
          >
            <h1 className="text-[12vw] md:text-[8vw] font-bold leading-[0.9] tracking-tighter text-center">
              CGV <br /> Mobile <br /> APP
            </h1>
          </motion.div>

          {/* 하단 본문 및 정보 */}
          <motion.div 
            variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="flex flex-col items-center max-w-lg mx-auto pb-32 text-center"
          >
            <p className="text-sm md:text-base text-white/80 leading-relaxed mb-12 text-justify">
              CGV의 새로운 서비스가 시작됩니다. 전체적인 예매 프로세스와 UI를 개선해서 
              사용성이 좋아지고 많은 예매와 예약을 할 수 있는 CGV는 자연스럽고 쉬운 흐름
              으로 결제가 진행되죠. 새로운 서비스 씨네톡은 영화 후기를 공유하고, 액티비티
              등 모든 활동을 사용자들과 교류합니다.
            </p>

            <div className="flex flex-col gap-8 w-full">
              <div className="flex justify-between items-end border-b border-white/20 pb-4">
                <span className="text-xs font-bold tracking-widest uppercase text-white/50">View Project</span>
                <div className="flex gap-4">
                  <span className="text-xs text-white uppercase cursor-pointer hover:text-white/70">Fb</span>
                  <span className="text-xs text-white uppercase cursor-pointer hover:text-white/70">Tw</span>
                  <span className="text-xs text-white uppercase cursor-pointer hover:text-white/70">In</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* --- 추가 콘텐츠 영역 (아래로 스크롤 시 나타나는 하얀 화이트 섹션) --- */}
        <div className="relative z-20 w-full bg-white text-black pt-40 pb-48 flex flex-col gap-40 md:gap-64">
          {[
            {
              title: "새로움은\n이로움으로\n시작",
              subtitle: "New CGV APP",
              desc: "모바일 예매의 시작이자 척도였던 CGV앱이 드디어 완전히 새롭게 태어났습니다. 사용자 경험을 최우선으로 고려한 직관적인 인터페이스를 만나보세요.",
              reverse: false
            },
            {
              title: "복잡함은\n개선이\n우선",
              subtitle: "New Interface",
              desc: "전체적인 예매 프로세스에 맞춰 UI를 대폭 개선해서 사용성이 좋아졌습니다. 한눈에 모든 예매 경로를 파악할 수 있는 효율적인 플로우 디자인으로 새롭게 개편했습니다.",
              reverse: true
            },
            {
              title: "쉽지않으면\n믿지않으니\n까",
              subtitle: "New Flow",
              desc: "많은 과정을 거치지 않아도 CGV에 특화된 직관적인 플로우로 쉽고 자연스럽고 빠른 예매가 진행될 수 있게 모든 환경을 개선했습니다.",
              reverse: false
            },
            {
              title: "임팩트는\n팩트로\n주는것",
              subtitle: "New Service",
              desc: "새로운 서비스 씨네톡이 오픈했습니다. 영화 후기를 공유하고 활동을 시작하세요! 나만의 영화 리포트를 기록할 수 있으며, 이 모든 과정을 새로운 디자인으로 만날 수 있습니다.",
              reverse: true
            }
          ].map((section, idx) => (
            <div 
              key={idx} 
              // max-w-5xl과 gap-16으로 사진과 글자의 거리를 좁혀 몰입감을 높였습니다.
              className={`max-w-5xl mx-auto w-full px-6 flex flex-col ${section.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-16`}
            >
              {/* 이미지 영역: 텍스트와 마주보는 방향으로 약간 밀착(justify)되도록 수정 */}
              <div className={`w-full md:w-1/2 flex justify-center ${section.reverse ? 'md:justify-start' : 'md:justify-end'}`}>
                {/* 폰 모양에 더 가까운 시원한 비율(aspect-[9/19])과 약간 더 큰 크기(max-w-[360px]) 반영 */}
                <div className="relative w-full max-w-[460px] aspect-[4/5] bg-gray-200 shadow-2xl overflow-hidden">
                  <Image src={src} fill className="object-cover" alt="Detail Image" />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                 {/* 섹션 2의 우측 사진 너비(460px)에 맞게 제목이 꽉 차보이도록 폰트 크기를 대폭 키움 (5.5rem~6rem) */}
                 <h2 className="scroll-title-container text-[4rem] md:text-[5.5rem] lg:text-[6rem] font-extrabold mb-6 leading-[1.1] tracking-tighter">
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
        <Pseudo3DSection src={src} />

        {/* --- 600여 개의 화면 디자인 텍스트 섹션 --- */}
        <div className="relative z-30 w-full bg-white flex flex-col items-center justify-center py-48 md:py-64 px-6">
           <div className="max-w-2xl w-full flex flex-col items-center text-center mx-auto">
             <h2 className="scroll-title-container text-[3.5rem] md:text-[5rem] font-bold mb-8 leading-[1.1] tracking-tighter text-center">
               {"600여개의\n화면\n디자인".split('\n').map((line, idx) => (
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
               CGV App Design Renewal
             </h3>
             <p className="text-gray-800 text-sm md:text-base leading-relaxed break-keep font-medium text-center">
                앱에서 제공되는 600개가 넘는 화면을 위해 세심하게 사용자의 시각을 읽어내는 일관성을 유지했습니다. 예매, 멤버십, 이벤트 등 다양한 서비스의 여정을 통합적으로 고려해 주요 구조를 재배치하고, 타브랜드와의 제휴성을 동시에 반영하는 UX/UI를 구현했습니다.
             </p>
           </div>
        </div>

        {/* --- Scroll-triggered Horizontal Gallery (No Pin, xPercent 교차) --- */}
        <div className="gallery-crossfade relative z-30 w-full bg-white overflow-hidden py-24 md:py-32">
           {/* 윗줄 (row-top): 스크롤 시 왼쪽(-X)으로 부드럽게 밀려남 */}
           <div className="row-top flex min-w-max mb-[2vw]" style={{ gap: '10vw' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                <div key={`top-${idx}`} className="relative shrink-0" style={{ width: '35vw', aspectRatio: '4/3' }}>
                  <Image src={src} fill className="object-cover" alt={`Gallery Top ${idx}`} />
                </div>
              ))}
           </div>

           {/* 아랫줄 (row-bottom): 처음에 왼쪽으로 치우쳐 시작, 스크롤 시 오른쪽(+X)으로 밀려남 */}
           <div className="row-bottom flex min-w-max" style={{ gap: '10vw', transform: 'translateX(-15%)' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                <div key={`bottom-${idx}`} className="relative shrink-0" style={{ width: '35vw', aspectRatio: '4/3' }}>
                  <Image src={src} fill className="object-cover" alt={`Gallery Bottom ${idx}`} />
                </div>
              ))}
           </div>
        </div>

        {/* --- 마지막 섹션: 마블스튜디오 오! 와이스튜디오 (고정 효과 적용) --- */}
        <div className="last-pinned-section relative z-30 w-full bg-white flex flex-col items-center justify-center py-48 md:py-64 px-6">
           <div className="max-w-2xl w-full flex flex-col items-center text-center mx-auto">
             <h2 className="scroll-title-container text-[3.5rem] md:text-[5rem] font-bold mb-8 leading-[1.1] tracking-tighter text-center">
               {"마블스튜디오\n오!\n와이스튜디오\n오~".split('\n').map((line, idx) => (
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
               MARVEL / TDTT
             </h3>
             <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed break-keep font-medium text-center max-w-sm opacity-80">
                영화, 그 이상의 감동. CGV와 함께 새로운 영상의 여정을 제안합니다. 극장 광고뿐만 아니라 다양한 뉴미디어의 채널에 맞게 최적화된 콘텐츠로, 최고의 브랜드 경험을 선사하고 고객의 마음을 사로잡는 커뮤니케이션을 지향합니다.
             </p>
           </div>
        </div>

      </div>
    </motion.div>
  );
}

// 하단에 덮이듯이 드러나는 Pseudo-3D 섹션 컴포넌트
function Pseudo3DSection({ src }: { src: string }) {
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
          <Image src={src} fill className="object-cover opacity-20 blur-md grayscale" alt="Background Texture" />
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
          
          {/* 1. 우측 상단 스마트폰 */}
          <motion.div 
            style={{ x: phone2X, y: phone1Y }}
            className="absolute w-[200px] md:w-[280px] aspect-[9/19] bg-black rounded-[2rem] border-8 border-gray-900 shadow-[0_20px_40px_rgba(0,0,0,0.9)] overflow-hidden right-[-5%] md:right-[15%] top-[10%] rotate-[15deg] opacity-80 blur-[2px]"
          >
            <Image src={src} fill className="object-cover scale-110" alt="Phone Layer 1" />
          </motion.div>

          {/* 2. 좌측 하단 스마트폰 */}
          <motion.div 
            style={{ x: phone1X, y: phone2Y }}
            className="absolute w-[220px] md:w-[320px] aspect-[9/19] bg-black rounded-[2rem] md:rounded-[2.5rem] border-8 border-gray-800 shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden left-[-10%] md:left-[10%] bottom-[5%] -rotate-[20deg] blur-[1px]"
          >
            <Image src={src} fill className="object-cover scale-[1.15]" alt="Phone Layer 2" />
          </motion.div>

          {/* 3. 중앙 메인 스마트폰 (가장 선명하고 크게 이동) */}
          <motion.div 
            style={{ x: phone1X, y: phone1Y }}
            className="absolute w-[260px] md:w-[380px] aspect-[9/19] bg-black rounded-[2.5rem] md:rounded-[3rem] border-8 border-gray-700 shadow-2xl overflow-hidden -rotate-6"
          >
            <Image src={src} fill className="object-cover scale-100" alt="Main Phone Layer" />
            <div className="absolute inset-0 bg-white/5 pointer-events-none" /> {/* 살짝 유리 반사 느낌 */}
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
}
