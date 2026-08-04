"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type ScrollRevealTextProps = {
  children: string;
  /** 바탕/채움에 공통으로 들어가는 타이포 클래스 (크기·굵기·자간·행간) */
  className?: string;
  /** 아직 채워지지 않은 바탕 글자 */
  baseClassName?: string;
  /** 채워진 글자 */
  fillClassName?: string;
  /** 바깥 박스. 클리핑 폭이 글자 폭에 맞아야 하므로 inline-block 계열이어야 한다 */
  wrapperClassName?: string;
  once?: boolean;
  amount?: number;
  duration?: number;
};

/** 스크롤 시 왼쪽부터 글자가 채워지는 헤드라인. */
export default function ScrollRevealText({
  children,
  className = "",
  baseClassName = "text-gray-200",
  fillClassName = "text-[#121212]",
  wrapperClassName = "inline-block",
  once = false,
  amount = 0.8,
  duration = 1.5,
}: ScrollRevealTextProps) {
  return (
    <span className={`relative overflow-hidden ${wrapperClassName}`}>
      <span className={`block whitespace-nowrap ${className} ${baseClassName}`}>
        {children}
      </span>

      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once, amount }}
        transition={{ duration, ease: EASE }}
        className={`absolute top-0 left-0 block overflow-hidden whitespace-nowrap ${className} ${fillClassName}`}
      >
        {children}
      </motion.span>
    </span>
  );
}
