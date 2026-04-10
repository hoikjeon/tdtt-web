"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import ProjectTransition3D from "./ui/ProjectTransition3D";
import ProjectDetailView from "./ui/ProjectDetailView";
import NextProjectCTA from "./NextProjectCTA";
import { AnimatePresence } from "framer-motion";

interface ProjectCardProps {
  src: string;
  year: string;
  subtitle: string;
  title: string;
  parallaxOffset?: number;
  onClick?: (rect: DOMRect, src: string) => void;
}

function ProjectCard({ src, year, subtitle, title, parallaxOffset = 80, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
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
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleClick = () => {
    if (cardRef.current && onClick) {
      const rect = cardRef.current.getBoundingClientRect();
      onClick(rect, src);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      className="relative w-full overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-black/40"
        />

        {/* Text Info on Hover */}
        <div className="absolute bottom-0 left-0 w-full p-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
                <path d="M2 14L14 2M14 2H4M14 2V12" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <p className="text-white/70 text-sm mb-1">{year}</p>
            <p className="text-white/70 text-sm italic mb-2">{subtitle}</p>
            <h3 className="text-white text-4xl md:text-5xl font-bold leading-tight uppercase whitespace-pre-line">{title}</h3>
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
          <div className="w-[100px] h-[100px] rounded-full bg-white/90 flex items-center justify-center">
            <span className="text-black text-sm font-bold text-center leading-tight">
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
  }>({ isActive: false, isReversing: false, src: "", rect: null });

  const [detailActive, setDetailActive] = useState(false);

  const handleCardClick = useCallback((rect: DOMRect, src: string) => {
    setTransitionState({ isActive: true, isReversing: false, src, rect });
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setDetailActive(true);
  }, []);

  const handleDetailClose = useCallback(() => {
    setDetailActive(false);
    setTransitionState(prev => ({ ...prev, isReversing: true }));
  }, []);

  const handleTransitionClosed = useCallback(() => {
    setTransitionState(prev => ({ ...prev, isActive: false, isReversing: false }));
  }, []);

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
      
      <NextProjectCTA />

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
            onClose={handleDetailClose} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
