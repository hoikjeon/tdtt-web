"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import ProjectTransition3D from "./ui/ProjectTransition3D";
import ProjectDetailView from "./ui/ProjectDetailView";
import ResponsiveWebsiteDetailView from "./ui/ResponsiveWebsiteDetailView";
import { AnimatePresence } from "framer-motion";

export interface ResponsiveWebsiteDetail {
  kind: "responsive-website";
  url: string;
  doctorsUrl: string;
  screenshots: {
    desktop: string;
    tablet: string;
    mobile: string;
    trainingSpecialty: string;
    consultation: string;
  };
}

export interface Project {
  id?: string;
  src: string;
  year: string;
  subtitle: string;
  title: string;
  parallaxOffset?: number;
  images?: string[];
  accentColor?: string;
  detail?: ResponsiveWebsiteDetail;
  alwaysShowInfo?: boolean;
}

interface ProjectCardProps extends Project {
  onClick?: (rect: DOMRect) => void;
}

function ProjectCard({ src, subtitle, title, parallaxOffset = 80, accentColor = "#FF5733", detail, alwaysShowInfo = false, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isResponsiveWebsite = detail?.kind === "responsive-website";
  const showInfo = isHovered || alwaysShowInfo;

  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  
  const yRaw = useTransform(scrollYProgress, [0, 1], [parallaxOffset, -parallaxOffset]);
  const y = useSpring(yRaw, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) return;
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    rafRef.current = requestAnimationFrame(() => {
      setMousePos({ x: clientX - rect.left, y: clientY - rect.top });
      rafRef.current = null;
    });
  };

  const handleClick = () => {
    if (cardRef.current && onClick) {
      const rect = cardRef.current.getBoundingClientRect();
      onClick(rect);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      data-project-kind={detail?.kind ?? "standard"}
      style={{ y, willChange: 'transform' }}
      className="relative w-full overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-black">
        {isResponsiveWebsite ? (
          <div className="absolute inset-0 z-10 overflow-hidden bg-[#071a3d]">
            <div
              aria-hidden
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(circle at 82% 18%, rgba(83,234,253,0.2), transparent 28%), radial-gradient(circle at 12% 72%, rgba(40,74,165,0.5), transparent 36%), linear-gradient(155deg, #0a1428 0%, #071a3d 55%, #020916 100%)",
              }}
            />

            <div className="absolute left-[7%] right-[7%] top-[8%] flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-[#dce8ff] md:text-[10px]">
              <span>반응형 홈페이지</span>
              <span>2026</span>
            </div>

            <div className="absolute left-[7%] top-[16%] h-[41%] w-[86%] overflow-hidden rounded-md border border-white/25 bg-white shadow-[0_30px_70px_rgba(0,0,0,0.42)] transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-[1.02]">
              <div className="flex h-5 items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b6b]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#ffd43b]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#51cf66]" />
              </div>
              <div className="relative h-[calc(100%_-_1.25rem)] w-full">
                <Image
                  src={detail.screenshots.desktop}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 86vw, 33vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="absolute bottom-[8%] right-[7%] h-[43%] w-[29%] overflow-hidden rounded-[1.1rem] border-[5px] border-[#111827] bg-white shadow-[0_28px_60px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-1">
              <div className="absolute left-1/2 top-1 z-20 h-1.5 w-8 -translate-x-1/2 rounded-full bg-[#111827]" />
              <Image
                src={detail.screenshots.mobile}
                alt=""
                fill
                sizes="(max-width: 768px) 29vw, 12vw"
                className="object-cover object-top"
              />
            </div>

          </div>
        ) : (
          <>
            {/* 블러 배경 레이어 — div로 처리해 GPU 레이어 절약 */}
            <div
              aria-hidden
              className="absolute inset-0 scale-[1.4] blur-xl opacity-60"
              style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            {/* 실제 이미지 — 전체 표시 */}
            <Image
              src={src}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 38vw"
              className="relative z-10 object-contain transition-transform duration-700 group-hover:scale-105"
            />
          </>
        )}

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: alwaysShowInfo ? 0.42 : 0 }}
          animate={{ opacity: isHovered ? (isResponsiveWebsite ? 0.72 : 1) : alwaysShowInfo ? 0.42 : 0 }}
          transition={{ duration: 0.4 }}
          className={`absolute inset-0 z-20 ${isResponsiveWebsite ? "bg-gradient-to-t from-black via-black/45 to-transparent" : "bg-black/40"}`}
        />

        {/* Text Info on Hover */}
        <div className="absolute bottom-0 left-0 z-30 w-full p-6 text-left md:p-8">
          <motion.div
            initial={{ opacity: alwaysShowInfo ? 1 : 0, y: alwaysShowInfo ? 0 : 30 }}
            animate={{ opacity: showInfo ? 1 : 0, y: showInfo ? 0 : 30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className={isResponsiveWebsite ? "max-w-[68%]" : undefined}
          >
            <div className="flex items-center gap-2 mb-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
                <path d="M2 14L14 2M14 2H4M14 2V12" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <p className="text-white/70 text-sm italic mb-2">{subtitle}</p>
            <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight uppercase whitespace-pre-line">{title}</h3>
          </motion.div>
        </div>

        {/* View Project - Mouse Tracking Circle */}
        <motion.div
          className="pointer-events-none absolute z-40"
          animate={{
            x: mousePos.x - 50,
            y: mousePos.y - 50,
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.5,
          }}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 25 },
            y: { type: "spring", stiffness: 300, damping: 25 },
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
          }}
        >
          <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
            <span className="text-white text-sm font-bold text-center leading-tight">
              프로젝트<br />보기
            </span>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
}

interface ProjectsProps {
  data: Project[];
}

export default function Projects({ data }: ProjectsProps) {
  const [transitionState, setTransitionState] = useState<{
    isActive: boolean;
    isReversing: boolean;
    rect: DOMRect | null;
    project: Project | null;
  }>({ isActive: false, isReversing: false, rect: null, project: null });

  const [detailActive, setDetailActive] = useState(false);
  const closedByButtonRef = useRef(false);

  const handleCardClick = useCallback((rect: DOMRect, project: Project) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTransitionState({ isActive: !reduceMotion, isReversing: false, rect, project });
    if (reduceMotion) setDetailActive(true);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setDetailActive(true);
  }, []);

  const handleDetailClose = useCallback(() => {
    closedByButtonRef.current = true;
    setDetailActive(false);
    setTransitionState(prev => ({ ...prev, isReversing: true }));
    if (window.history.state?.projectDetail) {
      window.history.back();
    }
  }, []);

  const handleTransitionClosed = useCallback(() => {
    setTransitionState(prev => ({ ...prev, isActive: false, isReversing: false }));
  }, []);

  // 모달 열릴 때 history 진입점 추가, 뒤로가기로 닫기 처리
  useEffect(() => {
    if (!detailActive) return;
    window.history.pushState({ projectDetail: true }, '');

    const handlePopState = () => {
      if (closedByButtonRef.current) {
        closedByButtonRef.current = false;
        return;
      }
      setDetailActive(false);
      setTransitionState(prev => ({ ...prev, isReversing: true }));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [detailActive]);

  const projectList = data || [];
  const activeProject = transitionState.project;

  return (
    <>
      <section className="bg-white text-black py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-20 md:gap-24">
          <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-start justify-center">
            {projectList[0] && (
              <div className="w-full md:w-[38%]">
                <ProjectCard {...projectList[0]} onClick={(rect) => handleCardClick(rect, projectList[0])} />
              </div>
            )}
            {projectList[1] && (
              <div className="w-full md:w-[25%] md:mt-32">
                <ProjectCard {...projectList[1]} onClick={(rect) => handleCardClick(rect, projectList[1])} />
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-start justify-center">
            {projectList[2] && (
              <div className="w-full md:w-[25%] md:mt-32 order-2 md:order-1">
                <ProjectCard {...projectList[2]} onClick={(rect) => handleCardClick(rect, projectList[2])} />
              </div>
            )}
            {projectList[3] && (
              <div className="w-full md:w-[38%] order-1 md:order-2">
                <ProjectCard {...projectList[3]} onClick={(rect) => handleCardClick(rect, projectList[3])} />
              </div>
            )}
          </div>
        </div>
      </section>
      
      <ProjectTransition3D
        isActive={transitionState.isActive}
        isReversing={transitionState.isReversing}
        src={activeProject?.src ?? ""}
        rect={transitionState.rect}
        onComplete={handleTransitionComplete}
        onClosed={handleTransitionClosed}
      />

      <AnimatePresence>
        {detailActive && activeProject && (
          activeProject.detail?.kind === "responsive-website" ? (
            <ResponsiveWebsiteDetailView
              key={activeProject.id ?? activeProject.src}
              detail={activeProject.detail}
              onClose={handleDetailClose}
            />
          ) : (
            <ProjectDetailView
              key={activeProject.src}
              src={activeProject.src}
              images={activeProject.images}
              subtitle={activeProject.subtitle}
              title={activeProject.title}
              onClose={handleDetailClose}
            />
          )
        )}
      </AnimatePresence>
    </>
  );
}
