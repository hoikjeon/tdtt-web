"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import ProjectTransition3D from "./ui/ProjectTransition3D";
import ProjectDetailView from "./ui/ProjectDetailView";
import { AnimatePresence } from "framer-motion";

interface ProjectCardProps {
  src: string;
  year: string;
  subtitle: string;
  title: string;
  parallaxOffset?: number;
  images?: string[];
  accentColor?: string;
  onClick?: (rect: DOMRect, src: string, images?: string[], subtitle?: string, title?: string) => void;
}

function ProjectCard({ src, year, subtitle, title, parallaxOffset = 80, images, accentColor = "#FF5733", onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      onClick(rect, src, images, subtitle, title);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ y, willChange: 'transform' }}
      className="relative w-full overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-black">
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
          className="object-contain transition-transform duration-700 group-hover:scale-105 relative z-10"
        />

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-black/40"
        />

        {/* Text Info on Hover */}
        <div className="absolute bottom-0 left-0 w-full p-8 text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }}
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
          className="absolute pointer-events-none z-20"
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
              View<br />Project
            </span>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
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
}

interface ProjectsProps {
  data: Project[];
}

export default function Projects({ data }: ProjectsProps) {
  const [transitionState, setTransitionState] = useState<{
    isActive: boolean;
    isReversing: boolean;
    src: string;
    rect: DOMRect | null;
    images?: string[];
    subtitle?: string;
    title?: string;
  }>({ isActive: false, isReversing: false, src: "", rect: null, images: [] });

  const [detailActive, setDetailActive] = useState(false);
  const closedByButtonRef = useRef(false);

  const handleCardClick = useCallback((rect: DOMRect, src: string, images?: string[], subtitle?: string, title?: string) => {
    setTransitionState({ isActive: true, isReversing: false, src, rect, images, subtitle, title });
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

  return (
    <>
      <section className="bg-white text-black py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-20 md:gap-24">
          <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-start justify-center">
            {projectList[0] && (
              <div className="w-full md:w-[38%]">
                <ProjectCard {...projectList[0]} onClick={handleCardClick} />
              </div>
            )}
            {projectList[1] && (
              <div className="w-full md:w-[25%] md:mt-32">
                <ProjectCard {...projectList[1]} onClick={handleCardClick} />
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-start justify-center">
            {projectList[2] && (
              <div className="w-full md:w-[25%] md:mt-32 order-2 md:order-1">
                <ProjectCard {...projectList[2]} onClick={handleCardClick} />
              </div>
            )}
            {projectList[3] && (
              <div className="w-full md:w-[38%] order-1 md:order-2">
                <ProjectCard {...projectList[3]} onClick={handleCardClick} />
              </div>
            )}
          </div>
        </div>
      </section>
      
      <ProjectTransition3D
        isActive={transitionState.isActive}
        isReversing={transitionState.isReversing}
        src={transitionState.src}
        rect={transitionState.rect}
        onComplete={handleTransitionComplete}
        onClosed={handleTransitionClosed}
      />

      <AnimatePresence>
        {detailActive && (
          <ProjectDetailView
            key={transitionState.src}
            src={transitionState.src}
            images={transitionState.images}
            subtitle={transitionState.subtitle}
            title={transitionState.title}
            onClose={handleDetailClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}
