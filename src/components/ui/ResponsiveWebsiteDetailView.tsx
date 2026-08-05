"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ScaledIframe from "./ScaledIframe";
import type { ResponsiveWebsiteDetail } from "../Projects";

interface ResponsiveWebsiteDetailViewProps {
  detail: ResponsiveWebsiteDetail;
  onClose: () => void;
}

interface ScreenshotFrameProps {
  src: string;
  alt: string;
  label: string;
  className?: string;
  imageClassName?: string;
}

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
};

function ArrowUpRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScreenshotFrame({ src, alt, label, className = "", imageClassName = "object-cover object-top" }: ScreenshotFrameProps) {
  return (
    <figure className={`overflow-hidden rounded-2xl border border-[#dbe3f0] bg-white shadow-[0_30px_90px_-48px_rgba(10,20,40,0.48)] ${className}`}>
      <div className="flex h-10 items-center justify-between border-b border-[#dbe3f0] bg-[#f4f6fa] px-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#ff6b6b]" />
          <span className="h-2 w-2 rounded-full bg-[#ffd43b]" />
          <span className="h-2 w-2 rounded-full bg-[#51cf66]" />
        </div>
        <figcaption className="text-xs font-bold tracking-[0.06em] text-[#34435d]">{label}</figcaption>
      </div>
      <div className="relative h-[calc(100%_-_2.5rem)] w-full bg-[#edf2f8]">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 58vw" className={imageClassName} />
      </div>
    </figure>
  );
}

function LiveDesktopPreview({ url }: { url: string }) {
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-[#dbe3f0] bg-white shadow-[0_30px_90px_-48px_rgba(10,20,40,0.48)]">
        <div className="flex min-h-12 items-center gap-3 border-b border-[#dbe3f0] bg-[#f4f6fa] px-4">
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#ff6b6b]" />
            <span className="h-2 w-2 rounded-full bg-[#ffd43b]" />
            <span className="h-2 w-2 rounded-full bg-[#51cf66]" />
          </div>
          <p className="min-w-0 flex-1 truncate text-xs font-bold tracking-[0.04em] text-[#34435d] sm:text-sm">의료진 소개 실제 화면</p>
          <button
            type="button"
            aria-pressed={isInteractive}
            onClick={() => setIsInteractive((current) => !current)}
            className="min-h-9 shrink-0 rounded-full bg-[#173b7a] px-3 text-xs font-bold text-white transition-colors hover:bg-[#0d2b60] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b7a] sm:px-4 sm:text-sm"
          >
            {isInteractive ? "조작 종료" : "직접 조작"}
          </button>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label="의료진 소개 페이지를 새 창에서 열기"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#b8c5d8] text-[#173b7a] transition-colors hover:bg-[#173b7a] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173b7a]"
          >
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden bg-white">
          <ScaledIframe
            src={url}
            title="연세척병원 의료진 소개 실제 홈페이지"
            className="absolute inset-0 h-full w-full"
            interactive={isInteractive}
            viewportWidth={1440}
            viewportHeight={900}
          />
          {!isInteractive && (
            <button
              type="button"
              onClick={() => setIsInteractive(true)}
              className="absolute bottom-4 left-1/2 z-20 min-h-11 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#173b7a] px-5 text-sm font-bold text-white shadow-[0_12px_34px_rgba(7,26,61,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:bottom-6"
            >
              의료진 페이지 직접 살펴보기
            </button>
          )}
        </div>
      </div>
      <p className="mt-4 break-keep text-center text-sm font-medium leading-6 text-[#52617a]">
        실제 의료진 소개 페이지가 연결되어 있습니다. 직접 조작을 누르면 화면 안에서 스크롤과 메뉴 이동을 확인할 수 있습니다.
      </p>
    </div>
  );
}

function LiveMobilePreview({ url }: { url: string }) {
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-5 flex w-full max-w-[414px] items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[#0a1428]">모바일 실제 화면 · 390 × 844</p>
          <p className="mt-1 text-sm font-medium text-[#44536d]">실제 홈페이지 연결</p>
        </div>
        <button
          type="button"
          aria-pressed={isInteractive}
          onClick={() => setIsInteractive((current) => !current)}
          className="min-h-11 rounded-full bg-[#173b7a] px-4 text-sm font-bold text-white transition-colors hover:bg-[#0d2b60] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173b7a]"
        >
          {isInteractive ? "조작 종료" : "모바일 화면 조작하기"}
        </button>
      </div>

      <div className="relative w-full max-w-[414px] rounded-[3rem] border border-white/10 bg-[#090f1b] p-[10px] shadow-[0_45px_110px_-30px_rgba(7,26,61,0.65)]">
        <div className="relative aspect-[390/844] overflow-hidden rounded-[2.45rem] bg-white">
          <ScaledIframe
            src={url}
            title="연세척병원 실제 모바일 홈페이지"
            className="absolute inset-0 h-full w-full"
            interactive={isInteractive}
          />
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-[#090f1b]" />
          {!isInteractive && (
            <button
              type="button"
              onClick={() => setIsInteractive(true)}
              className="absolute inset-x-5 bottom-6 z-30 min-h-12 rounded-full bg-[#173b7a] px-5 text-sm font-bold text-white shadow-[0_12px_34px_rgba(7,26,61,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              눌러서 실제 사이트 스크롤하기
            </button>
          )}
        </div>
      </div>
      <p className="mt-5 max-w-[414px] break-keep text-center text-sm font-medium leading-6 text-[#52617a]">
        조작 모드를 켜면 휴대폰 안에서 메뉴, 링크, 스크롤을 직접 확인할 수 있습니다.
      </p>
    </div>
  );
}

const projectPoints = [
  {
    number: "01",
    title: "첫 화면에서 진료 판단",
    text: "대표 진료 메시지와 공지·진료일정을 함께 배치해, 방문자가 병원의 성격과 오늘 필요한 정보를 동시에 확인하도록 구성했습니다.",
  },
  {
    number: "02",
    title: "전문성을 근거로 설명",
    text: "의료진, 국제 트레이닝 센터, 척추·관절 특화 진료를 순서대로 보여주며 전문성이 단순한 문구에 머물지 않도록 설계했습니다.",
  },
  {
    number: "03",
    title: "상담까지 짧은 동선",
    text: "전화·온라인·카카오톡·네이버 상담을 한 흐름으로 묶어 원하는 방식으로 바로 행동할 수 있게 연결했습니다.",
  },
];

export default function ResponsiveWebsiteDetailView({ detail, onClose }: ResponsiveWebsiteDetailViewProps) {
  const { screenshots } = detail;
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="연세척병원 반응형 홈페이지 구축 프로젝트"
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[10000] overflow-y-auto overflow-x-hidden overscroll-contain bg-white text-[#0a1428] outline-none"
    >
      <section className="relative min-h-[100svh] overflow-hidden bg-[#071a3d] text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 82% 14%, rgba(90,190,255,0.17), transparent 25%), radial-gradient(circle at 8% 82%, rgba(42,82,174,0.48), transparent 34%), linear-gradient(145deg, #0a1428 0%, #071a3d 58%, #020916 100%)",
          }}
        />

        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-5 pb-12 pt-7 sm:px-8 md:px-12 md:pt-10 lg:px-16 xl:px-20">
          <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-5">
            <p className="text-sm font-bold tracking-[0.08em] text-[#e2eafe]">
              연세척병원 홈페이지 제작 사례
            </p>
            <a
              href={detail.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/45 px-4 text-xs font-bold text-white transition-colors hover:bg-white hover:text-[#071a3d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              실제 사이트
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 38 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <p className="mb-6 text-sm font-bold tracking-[0.1em] text-[#b9cdef]">연세척병원 공식 홈페이지 구축</p>
              <h1 className="break-keep text-[clamp(2.8rem,5vw,5rem)] font-bold leading-[1.08] tracking-[-0.05em] text-white">
                실력을 세우고,<br />신뢰를 연결하는<br />병원 웹사이트
              </h1>
              <p className="mt-8 max-w-2xl break-keep text-base font-medium leading-[1.9] text-[#d7e1f2] md:text-lg">
                연세척병원의 의료진과 진료 원칙이 환자에게 정확히 전달되도록 콘텐츠의 순서를 다시 세우고, 병원 탐색부터 예약·상담까지 하나의 반응형 흐름으로 구현했습니다.
              </p>

              <dl className="mt-9 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-5 border-t border-white/20 pt-6 sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-bold tracking-[0.08em] text-[#b5c8e8]">제작 범위</dt>
                  <dd className="mt-2 text-base font-bold text-white">기획 · 디자인 · 개발</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold tracking-[0.08em] text-[#b5c8e8]">대응 화면</dt>
                  <dd className="mt-2 break-keep text-base font-bold leading-6 text-white">데스크톱 · 태블릿 · 모바일</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold tracking-[0.08em] text-[#b5c8e8]">제작 연도</dt>
                  <dd className="mt-2 text-base font-bold text-white">2026</dd>
                </div>
              </dl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-4xl pb-14 pr-[9%] sm:pb-20 sm:pr-[12%]"
            >
              <ScreenshotFrame
                src={screenshots.desktop}
                alt="연세척병원 홈페이지 데스크톱 메인 화면"
                label="데스크톱 메인 화면"
                className="aspect-[16/10] border-white/20"
              />
              <div className="absolute bottom-0 right-0 h-[68%] w-[29%] overflow-hidden rounded-[1.7rem] border-[7px] border-[#0b1220] bg-white shadow-[0_35px_80px_rgba(0,0,0,0.55)] sm:rounded-[2rem] sm:border-[9px]">
                <div className="absolute left-1/2 top-2 z-20 h-2 w-12 -translate-x-1/2 rounded-full bg-[#0b1220]" />
                <Image src={screenshots.mobile} alt="연세척병원 모바일 메인 화면" fill sizes="(max-width: 768px) 29vw, 16vw" className="object-cover object-top" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fb] px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="max-w-4xl">
            <p className="mb-4 text-sm font-bold tracking-[0.08em] text-[#21498f]">프로젝트 방향</p>
            <h2 className="break-keep text-4xl font-bold leading-[1.16] tracking-[-0.045em] text-[#0a1428] md:text-6xl lg:text-7xl">
              환자가 찾는 정보와<br />병원이 전해야 할 신뢰를 연결했습니다.
            </h2>
            <p className="mt-7 max-w-3xl break-keep text-base font-medium leading-[1.95] text-[#40506d] md:text-lg">
              병원 홈페이지의 역할은 많은 정보를 보여주는 데 있지 않습니다. 방문자가 지금 필요한 진료 정보를 빠르게 찾고, 치료를 맡길 수 있다는 확신을 얻은 뒤, 가장 편한 방법으로 상담하게 만드는 것이 핵심입니다.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3">
            {projectPoints.map((point) => (
              <motion.article key={point.number} {...reveal} className="rounded-2xl border border-[#dbe3f0] bg-white p-7 md:p-8">
                <p className="text-sm font-bold text-[#2851a3]">{point.number}</p>
                <h3 className="mt-10 break-keep text-2xl font-bold tracking-[-0.035em] text-[#0a1428]">{point.title}</h3>
                <p className="mt-4 break-keep text-base font-medium leading-[1.85] text-[#485873]">{point.text}</p>
              </motion.article>
            ))}
          </div>

          <motion.div {...reveal} className="mt-8 md:mt-12">
            <LiveDesktopPreview url={detail.doctorsUrl} />
          </motion.div>
        </div>
      </section>

      <section className="overflow-hidden bg-white px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24">
          <motion.div {...reveal}>
            <p className="mb-4 text-sm font-bold tracking-[0.08em] text-[#21498f]">모바일 반응형 설계</p>
            <h2 className="break-keep text-4xl font-bold leading-[1.16] tracking-[-0.045em] text-[#0a1428] md:text-6xl">
              어떤 화면에서도<br />편리한 이용 경험
            </h2>
            <p className="mt-7 max-w-2xl break-keep text-base font-medium leading-[1.95] text-[#40506d] md:text-lg">
              모바일 환경에 맞춰 메뉴와 콘텐츠의 순서를 다시 구성하고, 진료 정보부터 예약·상담까지 편리하게 이어지도록 설계했습니다.
            </p>

            <ul className="mt-9 space-y-4">
              {[
                "화면 너비에 맞춰 메뉴와 콘텐츠 순서가 재배치됩니다.",
                "텍스트와 버튼 크기를 모바일 터치 환경에 맞췄습니다.",
                "진료 정보에서 예약·상담까지 같은 흐름을 유지합니다.",
              ].map((item) => (
                <li key={item} className="flex gap-4 border-t border-[#d9e1ed] pt-4 text-base font-bold leading-[1.85] text-[#1c2b45]">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2851a3]" />
                  <span className="break-keep">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...reveal} className="relative">
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2851a3]/15 blur-[90px]" />
            <div className="relative">
              <LiveMobilePreview url={detail.url} />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#071a3d] px-5 py-24 text-white sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="max-w-4xl">
            <p className="mb-4 text-sm font-bold tracking-[0.08em] text-[#bfd0ed]">콘텐츠 설계</p>
            <h2 className="break-keep text-4xl font-bold leading-[1.16] tracking-[-0.045em] text-white md:text-6xl lg:text-7xl">
              전문성을 말하는 대신,<br />화면으로 증명했습니다.
            </h2>
            <p className="mt-7 max-w-3xl break-keep text-base font-medium leading-[1.95] text-[#d7e1f2] md:text-lg">
              국제 척추내시경 트레이닝 센터, 양방향 척추내시경, 관절 내시경처럼 병원을 선택하는 근거가 되는 콘텐츠를 독립된 장면으로 구성했습니다. 큰 제목과 실제 현장 이미지를 함께 사용해 복잡한 의료 정보를 빠르게 이해하도록 만들었습니다.
            </p>
          </motion.div>

          <motion.div {...reveal} className="mt-14 md:mt-20">
            <ScreenshotFrame
              src={screenshots.trainingSpecialty}
              alt="연세척병원 국제 척추내시경 트레이닝 센터와 특화 진료 화면"
              label="척추내시경 교육센터 · 특화 진료"
              className="aspect-[16/10] border-white/20"
              imageClassName="object-cover object-top"
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-[#edf3fa] px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <motion.div {...reveal}>
            <p className="mb-4 text-sm font-bold tracking-[0.08em] text-[#21498f]">예약 및 상담 동선</p>
            <h2 className="break-keep text-4xl font-bold leading-[1.16] tracking-[-0.045em] text-[#0a1428] md:text-6xl">
              읽은 다음 행동까지<br />망설이지 않도록
            </h2>
            <p className="mt-7 break-keep text-base font-medium leading-[1.95] text-[#40506d] md:text-lg">
              상담 내용과 희망 날짜를 바로 남기는 신청 폼을 중심에 두고, 온라인 상담·카카오톡·네이버톡톡을 함께 제공했습니다. 사용자가 익숙한 채널을 선택할 수 있어 홈페이지 방문이 실제 문의로 자연스럽게 이어집니다.
            </p>
          </motion.div>
          <motion.div {...reveal}>
            <ScreenshotFrame
              src={screenshots.consultation}
              alt="연세척병원 예약 신청 폼과 상담 채널 화면"
              label="예약 신청 · 온라인 상담"
              className="aspect-[9/4]"
              imageClassName="object-cover object-center"
            />
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#020916] px-5 py-28 text-white sm:px-8 md:px-12 md:py-40 lg:px-16">
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2851a3]/35 blur-[120px]" />
        <motion.div {...reveal} className="relative mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <h2 className="break-keep text-4xl font-bold leading-[1.14] tracking-[-0.05em] text-white md:text-6xl lg:text-7xl">
                병원의 강점을 찾고,<br />운영되는 홈페이지로 완성합니다.
              </h2>
              <p className="mt-7 max-w-3xl break-keep text-base font-medium leading-[1.95] text-[#d7e1f2] md:text-lg">
                콘텐츠 구조 기획부터 화면 디자인, 반응형 프론트엔드 개발, 실제 배포까지 한 팀이 연결해 제작했습니다.
              </p>
            </div>
            <div className="lg:text-right">
              <a
                href={detail.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-[#071a3d] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                완성된 홈페이지 직접 보기
                <ArrowUpRightIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <button
        type="button"
        onClick={onClose}
        aria-label="프로젝트 상세 닫기"
        className="group fixed right-5 top-20 z-[10010] flex min-h-12 min-w-12 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-[#071a3d] text-white shadow-[0_12px_36px_rgba(0,0,0,0.35)] transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2851a3] md:bottom-10 md:right-10 md:top-auto md:h-14 md:w-14"
      >
        <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </motion.div>
  );
}
