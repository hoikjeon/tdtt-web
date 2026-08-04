"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "src" | "autoPlay"> & {
  src: string;
};

/**
 * 뷰포트에 들어오기 전까지 src를 붙이지 않는 video.
 * autoPlay는 preload="none"을 무시하고 즉시 다운로드를 시작하므로,
 * 화면 밖 영상까지 받아오는 것을 막으려면 src 자체를 늦게 붙여야 한다.
 */
export default function LazyVideo({ src, ...rest }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          el.play().catch(() => {}); // src가 아직 없는 첫 호출은 무시된다
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (loaded) ref.current?.play().catch(() => {});
  }, [loaded]);

  return (
    <video
      ref={ref}
      src={loaded ? src : undefined}
      preload="none"
      muted
      loop
      playsInline
      {...rest}
    />
  );
}
