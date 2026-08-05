"use client";

import { useEffect, useRef, useState } from "react";

/** 기본 임베드 뷰포트 (iPhone 14 기준) */
const DEFAULT_VIEWPORT_WIDTH = 390;
const DEFAULT_VIEWPORT_HEIGHT = 844;

type ScaledIframeProps = {
  src: string;
  title: string;
  /** 폰 화면 영역(바깥 박스)의 크기/모양 */
  className?: string;
  /** false면 스크롤·클릭을 막아 목업처럼 보이게 한다 */
  interactive?: boolean;
  /** 임베드된 사이트가 기준으로 삼을 가상 화면 크기 */
  viewportWidth?: number;
  viewportHeight?: number;
};

/**
 * iframe을 폰 프레임 크기(약 160px)에 그대로 넣으면 임베드된 사이트가
 * "폭 160px 뷰포트"로 레이아웃되어 반응형이 무너진다.
 * 실제 폰 해상도로 렌더링한 뒤 transform으로 축소해서 비율을 유지한다.
 */
export default function ScaledIframe({
  src,
  title,
  className,
  interactive = false,
  viewportWidth = DEFAULT_VIEWPORT_WIDTH,
  viewportHeight = DEFAULT_VIEWPORT_HEIGHT,
}: ScaledIframeProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / viewportWidth);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [viewportWidth]);

  return (
    <div ref={hostRef} className={`relative overflow-hidden ${className ?? ""}`}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        scrolling={interactive ? undefined : "no"}
        className={`absolute top-0 left-0 border-none ${interactive ? "" : "pointer-events-none"}`}
        style={{
          width: viewportWidth,
          height: viewportHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          visibility: scale ? "visible" : "hidden",
        }}
      />
    </div>
  );
}
