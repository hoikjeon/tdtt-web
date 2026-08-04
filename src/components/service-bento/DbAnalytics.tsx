"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CountUp = ({ value, duration = 600 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const range = end - start;
    const startTime = performance.now();
    let animationFrameId: number;

    const updateRating = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress); // easeOutQuad
      const nextValue = Math.round(start + range * easeProgress);
      
      setDisplayValue(nextValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateRating);
      }
    };

    animationFrameId = requestAnimationFrame(updateRating);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration]);

  return <>{displayValue}</>;
};

const DB_BASE = [
  { label: "30대 여성", short: "30대", base: 28, color: "#f472b6" },
  { label: "40대 여성", short: "40대", base: 22, color: "#f472b6" },
  { label: "60대 여성", short: "60대", base: 14, color: "#f472b6" },
  { label: "30대 남성", short: "30대", base: 18, color: "#60a5fa" },
  { label: "50대 남성", short: "50대", base: 12, color: "#60a5fa" },
  { label: "60대 남성", short: "60대", base: 6,  color: "#60a5fa" },
];

function DbAnalytics({ compact }: { compact?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
  const [vals, setVals] = useState(DB_BASE.map(d => d.base));
  const [total, setTotal] = useState(247);

  useEffect(() => {
    if (!isInView) return; // 화면에서 보이지 않으면 인터벌 정지

    const id = setInterval(() => {
      setVals(DB_BASE.map(d => {
        const delta = (Math.random() - 0.5) * 26;
        return Math.round(Math.max(5, Math.min(65, d.base + delta)));
      }));
      setTotal(v => v + Math.floor(Math.random() * 6) + 2);
    }, 1000);
    return () => clearInterval(id);
  }, [isInView]);

  const female = DB_BASE.slice(0, 3);
  const male   = DB_BASE.slice(3);

  const barTransition = "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";

  if (compact) return (
    <div ref={containerRef} className="px-2 pt-2 flex-1 overflow-hidden">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[8px] text-gray-300 font-bold">DB 유입 분석</span>
        <span className="text-[7px] text-gray-600">이번 달</span>
      </div>
      <div className="space-y-1">
        <p className="text-[7px] text-pink-400 font-semibold mb-0.5">여성</p>
        {female.map((d, i) => (
          <div key={d.label} className="flex items-center gap-1">
            <span className="text-[7px] text-gray-500 w-7 flex-shrink-0">{d.short}</span>
            <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${vals[i]}%`, backgroundColor: d.color, transition: barTransition }} />
            </div>
            <span className="text-[7px] text-gray-500 w-5 text-right"><CountUp value={vals[i]} />%</span>
          </div>
        ))}
        <p className="text-[7px] text-blue-400 font-semibold mt-1 mb-0.5">남성</p>
        {male.map((d, i) => (
          <div key={d.label} className="flex items-center gap-1">
            <span className="text-[7px] text-gray-500 w-7 flex-shrink-0">{d.short}</span>
            <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${vals[i + 3]}%`, backgroundColor: d.color, transition: barTransition }} />
            </div>
            <span className="text-[7px] text-gray-500 w-5 text-right"><CountUp value={vals[i + 3]} />%</span>
          </div>
        ))}
      </div>
      <div className="mt-2 border-t border-gray-800 pt-1.5 flex justify-between">
        <span className="text-[7px] text-gray-600">총 유입 DB</span>
        <span className="text-[8px] text-white font-bold"><CountUp value={total} duration={400} />건</span>
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="px-3 pt-3 flex-1 overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-300 font-bold">DB 유입 데이터 분석</span>
        <span className="text-[9px] text-gray-600">이번 달</span>
      </div>
      <div className="space-y-1.5">
        <p className="text-[9px] text-pink-400 font-semibold mb-1">여성</p>
        {female.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="text-[9px] text-gray-400 w-14 flex-shrink-0">{d.label}</span>
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${vals[i]}%`, backgroundColor: d.color, transition: barTransition }} />
            </div>
            <span className="text-[9px] text-gray-400 w-7 text-right"><CountUp value={vals[i]} />%</span>
          </div>
        ))}
        <p className="text-[9px] text-blue-400 font-semibold mt-2 mb-1">남성</p>
        {male.map((d, i) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="text-[9px] text-gray-400 w-14 flex-shrink-0">{d.label}</span>
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${vals[i + 3]}%`, backgroundColor: d.color, transition: barTransition }} />
            </div>
            <span className="text-[9px] text-gray-400 w-7 text-right"><CountUp value={vals[i + 3]} />%</span>
          </div>
        ))}
      </div>
      <div className="mt-3 border-t border-gray-800 pt-3 flex justify-between items-center">
        <span className="text-[10px] text-gray-500">총 유입 DB</span>
        <span className="text-sm text-white font-bold"><CountUp value={total} duration={400} />건</span>
      </div>
    </div>
  );
}

export default DbAnalytics;
