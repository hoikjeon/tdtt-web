'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const RELEASE_THRESHOLD = 1.4; // animation ends at 1.0, holds until 1.4 before releasing
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const lockedScrollYRef = useRef(0);
  const inViewRef = useRef(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    // 섹션 진입 여부 감지
    const observer = new IntersectionObserver(
      ([entry]) => { inViewRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateProgress = (delta: number) => {
      const newProg = Math.max(0, Math.min(RELEASE_THRESHOLD, progressRef.current + delta));
      progressRef.current = newProg;
      setScrollProgress(newProg);
      setShowContent(newProg >= 0.65);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!inViewRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // 섹션이 아직 뷰포트 아래에 있으면 무시
      if (rect.top > window.innerHeight * 0.2) return;
      // hold 구간 이후 아래로 스크롤은 통과
      if (progressRef.current >= RELEASE_THRESHOLD && e.deltaY > 0) return;
      // 효과 시작 전 위로 스크롤은 통과
      if (progressRef.current <= 0 && e.deltaY < 0) return;

      e.preventDefault();

      // 스크롤 위치를 섹션 상단에 고정
      lockedScrollYRef.current = window.scrollY + rect.top;
      window.scrollTo(0, lockedScrollYRef.current);

      updateProgress(e.deltaY * 0.0018);
    };

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!inViewRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.2) return;

      const deltaY = touchStartY - e.touches[0].clientY;

      if (progressRef.current >= RELEASE_THRESHOLD && deltaY > 0) return;
      if (progressRef.current <= 0 && deltaY < 0) return;

      e.preventDefault();
      lockedScrollYRef.current = window.scrollY + rect.top;
      window.scrollTo(0, lockedScrollYRef.current);

      updateProgress(deltaY * 0.003);
      touchStartY = e.touches[0].clientY;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const p = Math.min(1, scrollProgress);
  const mediaWidth = 300 + p * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + p * (isMobileState ? 200 : 400);

  // 타이틀: 바깥→안 (translateX)
  const textTranslateX = (1 - p) * (isMobileState ? 120 : 150);

  // '|' 구분자가 있으면 그 기준으로, 없으면 첫 단어 / 나머지 단어로 분리
  const [firstWord, restOfTitle] = title
    ? title.includes('|')
      ? title.split('|')
      : [title.split(' ')[0], title.split(' ').slice(1).join(' ')]
    : ['', ''];

  return (
    <div
      ref={containerRef}
      className="relative transition-colors duration-700 ease-in-out overflow-x-hidden"
    >
      <section className="relative flex flex-col items-center justify-start h-[100dvh] overflow-hidden">
        <div className="relative w-full flex flex-col items-center h-full">
          {/* 배경 */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            animate={{ opacity: 1 - p }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt="Background"
              width={1920}
              height={1080}
              className="w-screen h-screen"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
            <div className="absolute inset-0 bg-black/55" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10 h-full">
            <div className="flex flex-col items-center justify-center w-full h-full relative">
              {/* 확장 미디어 */}
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                {mediaType === 'image' ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/50 rounded-xl"
                      animate={{ opacity: 0.7 - p * 0.5 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : mediaSrc.includes('youtube.com') ? (
                  <div className="relative w-full h-full pointer-events-none">
                    <iframe
                      width="100%"
                      height="100%"
                      src={
                        mediaSrc.includes('embed')
                          ? mediaSrc + (mediaSrc.includes('?') ? '&' : '?') + 'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                          : mediaSrc.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' + mediaSrc.split('v=')[1]
                      }
                      className="w-full h-full rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/30 rounded-xl"
                      animate={{ opacity: 0.5 - p * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full pointer-events-none">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover rounded-xl"
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    <div className="absolute inset-0 bg-black/55 rounded-xl" />
                  </div>
                )}

                {/* date / scrollToExpand — 안→밖 (p 증가 시 사라짐) */}
                <div className="flex flex-col items-center text-center relative z-10 mt-4">
                  {date && (
                    <p
                      className="text-2xl text-blue-200"
                      style={{ opacity: 1 - p * 2, transform: `translateY(${p * 20}px)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="text-blue-200 font-medium text-center"
                      style={{ opacity: 1 - p * 2, transform: `translateY(${p * 20}px)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {/* 타이틀: 바깥→안 */}
              <div className="flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col">
                <h2
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-white"
                  style={{
                    transform: `translateX(-${textTranslateX}vw)`,
                    textShadow: '0 2px 24px rgba(0,0,0,0.95)',
                  }}
                >
                  {firstWord}
                </h2>
                <h2
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-white"
                  style={{
                    transform: `translateX(${textTranslateX}vw)`,
                    textShadow: '0 2px 24px rgba(0,0,0,0.95)',
                  }}
                >
                  {restOfTitle}
                </h2>
              </div>
            </div>

            {/* 하단 오버레이 콘텐츠 */}
            {children && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 z-30"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 24 }}
                transition={{ duration: 0.7 }}
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
