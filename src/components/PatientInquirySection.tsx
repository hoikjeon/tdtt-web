"use client";

import { motion, useInView, animate, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface InquiryCard {
  id: number;
  initials: string;
  maskedName: string;
  ageGroup: string;
  location: string;
  dept: string;
  deptColor: string;
  message: string;
  minutesAgo: number;
  isNew?: boolean;
}

const ALL_INQUIRIES: InquiryCard[] = [
  // 무릎 관절
  { id: 1,  initials: "김", maskedName: "김○○", ageGroup: "60대", location: "해운대구", dept: "정형외과", deptColor: "#3b82f6", message: "무릎이 계단 내려올 때마다 소리가 나고 통증이 심한데 연골 문제인가요?", minutesAgo: 2, isNew: true },
  { id: 2,  initials: "박", maskedName: "박○○", ageGroup: "50대", location: "수영구",   dept: "정형외과", deptColor: "#3b82f6", message: "걷다가 무릎이 갑자기 뚝 소리 나면서 잠기는 느낌이에요. 반월상연골 문제일까요?", minutesAgo: 5 },
  { id: 3,  initials: "이", maskedName: "이○○", ageGroup: "40대", location: "동래구",   dept: "정형외과", deptColor: "#3b82f6", message: "달리기 후에 무릎 앞쪽이 빠지는 것처럼 아파요. 슬개골 문제인지 확인하고 싶어요.", minutesAgo: 8 },
  // 척추 · 허리
  { id: 4,  initials: "최", maskedName: "최○○", ageGroup: "40대", location: "연제구",   dept: "신경외과", deptColor: "#8b5cf6", message: "허리 디스크 진단받았는데 다리까지 저려요. 비수술 치료가 가능한지 알고 싶어요.", minutesAgo: 3, isNew: true },
  { id: 5,  initials: "정", maskedName: "정○○", ageGroup: "30대", location: "남구",     dept: "신경외과", deptColor: "#8b5cf6", message: "앉으면 괜찮은데 서 있거나 걸으면 허리가 너무 아파요. 어떤 검사가 필요한가요?", minutesAgo: 11 },
  { id: 6,  initials: "강", maskedName: "강○○", ageGroup: "50대", location: "부산진구", dept: "신경외과", deptColor: "#8b5cf6", message: "척추관협착증 진단인데요. 인공디스크 외 다른 치료 방법이 있는지 상담하고 싶습니다.", minutesAgo: 6 },
  // 어깨
  { id: 7,  initials: "윤", maskedName: "윤○○", ageGroup: "50대", location: "금정구",   dept: "정형외과", deptColor: "#3b82f6", message: "어깨 들어올릴 때 끊어질 것 같은 느낌이요. 회전근개 파열 의심되는데 수술 꼭 해야 하나요?", minutesAgo: 1, isNew: true },
  { id: 8,  initials: "장", maskedName: "장○○", ageGroup: "40대", location: "해운대구", dept: "정형외과", deptColor: "#3b82f6", message: "야구를 하다가 어깨를 다쳤어요. MRI 찍어봐야 할 것 같은데 예약 가능한가요?", minutesAgo: 14 },
  // 고관절
  { id: 9,  initials: "임", maskedName: "임○○", ageGroup: "70대", location: "북구",     dept: "정형외과", deptColor: "#3b82f6", message: "엉덩이와 사타구니 쪽이 아프고 걸음이 불편해요. 고관절 치환술 상담 받고 싶습니다.", minutesAgo: 9 },
  { id: 10, initials: "조", maskedName: "조○○", ageGroup: "60대", location: "기장군",   dept: "정형외과", deptColor: "#3b82f6", message: "오십견 증상인 것 같아요. 팔을 뒤로 못 들어요. 치료 기간이 얼마나 걸릴까요?", minutesAgo: 4 },
  // 목 디스크
  { id: 11, initials: "오", maskedName: "오○○", ageGroup: "30대", location: "사하구",   dept: "신경외과", deptColor: "#8b5cf6", message: "목 뒤가 뻣뻣하고 팔이 저려요. 목 디스크 초기 증상인가요?", minutesAgo: 7 },
  { id: 12, initials: "서", maskedName: "서○○", ageGroup: "40대", location: "수영구",   dept: "신경외과", deptColor: "#8b5cf6", message: "스마트폰을 많이 봐서인지 목에서 뚝뚝 소리 나고 두통이 있어요.", minutesAgo: 12 },
  // 발목 · 족부
  { id: 13, initials: "신", maskedName: "신○○", ageGroup: "20대", location: "동구",     dept: "정형외과", deptColor: "#3b82f6", message: "족저근막염 진단인데 주사치료 후 재발했어요. 체외충격파 치료 되나요?", minutesAgo: 22 },
  { id: 14, initials: "권", maskedName: "권○○", ageGroup: "40대", location: "영도구",   dept: "정형외과", deptColor: "#3b82f6", message: "발목을 삐었는데 3주가 지나도 붓기가 안 빠져요. 인대 파열인지 확인하고 싶어요.", minutesAgo: 18 },
  // 손목 · 기타
  { id: 15, initials: "황", maskedName: "황○○", ageGroup: "50대", location: "남구",     dept: "신경외과", deptColor: "#8b5cf6", message: "손목 저림이 심해서 잠을 못 자겠어요. 수근관증후군인지 검사받고 싶습니다.", minutesAgo: 31 },
  { id: 16, initials: "한", maskedName: "한○○", ageGroup: "30대", location: "사상구",   dept: "정형외과", deptColor: "#3b82f6", message: "달리기 후 고관절 바깥쪽이 쿡쿡 쑤셔요. 빠른 진료 가능한가요?", minutesAgo: 17 },
  // 재활
  { id: 17, initials: "안", maskedName: "안○○", ageGroup: "60대", location: "동래구",   dept: "재활의학과", deptColor: "#10b981", message: "퇴원 후 무릎 재활치료가 필요한데 병원에서 직접 받을 수 있나요?", minutesAgo: 25 },
  { id: 18, initials: "송", maskedName: "송○○", ageGroup: "30대", location: "해운대구", dept: "신경외과", deptColor: "#8b5cf6", message: "허리 MRI 찍었는데 결과 해석이 어려워요. 2차 소견 들을 수 있나요?", minutesAgo: 43 },
  { id: 19, initials: "류", maskedName: "류○○", ageGroup: "70대", location: "기장군",   dept: "정형외과", deptColor: "#3b82f6", message: "무릎 인공관절 수술 후 경과가 좋지 않아요. 재수술 가능한지 상담 원합니다.", minutesAgo: 38 },
  { id: 20, initials: "전", maskedName: "전○○", ageGroup: "40대", location: "금정구",   dept: "재활의학과", deptColor: "#10b981", message: "교통사고 후 목과 허리 통증이 계속돼요. 한방 대신 정형외과에서 치료받고 싶어요.", minutesAgo: 55 },
  { id: 21, initials: "홍", maskedName: "홍○○", ageGroup: "20대", location: "연제구",   dept: "정형외과", deptColor: "#3b82f6", message: "십자인대 파열 수술 후 복귀 준비 중인데 스포츠 재활 프로그램이 있나요?", minutesAgo: 61 },
  { id: 22, initials: "문", maskedName: "문○○", ageGroup: "50대", location: "부산진구", dept: "신경외과", deptColor: "#8b5cf6", message: "꼬리뼈 통증이 앉으면 너무 심해서 일상생활이 힘들어요. 미골 주사 치료 가능한가요?", minutesAgo: 47 },
  { id: 23, initials: "남", maskedName: "남○○", ageGroup: "60대", location: "사상구",   dept: "재활의학과", deptColor: "#10b981", message: "어깨 수술 3개월 됐는데 근력이 아직 약해요. 재활 치료 시작하고 싶습니다.", minutesAgo: 72 },
  { id: 24, initials: "노", maskedName: "노○○", ageGroup: "40대", location: "수영구",   dept: "신경외과", deptColor: "#8b5cf6", message: "야간에 특히 목·어깨 통증이 심해서 잠을 못 자겠어요. 빠른 진료 가능한가요?", minutesAgo: 15, isNew: true },
];

const COLUMN_1 = ALL_INQUIRIES.slice(0, 8);
const COLUMN_2 = ALL_INQUIRIES.slice(8, 16);
const COLUMN_3 = ALL_INQUIRIES.slice(16, 24);

const STATS = [
  { label: "이번 달 문의 수", value: 1247, suffix: "건", prefix: "" },
  { label: "내원 전환율",     value: 68,   suffix: "%",  prefix: "" },
  { label: "평균 응답시간",   value: 3,    suffix: "분",  prefix: "약 " },
];

const headerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const headlineItem: Variants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

function CountUpStat({ value, suffix, prefix, label, index }: { value: number; suffix: string; prefix: string; label: string; index: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={{
        hidden: { opacity: 0, scale: 0.92, y: 20 },
        visible: (i: number) => ({
          opacity: 1, scale: 1, y: 0,
          transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
        }),
      }}
      className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-3 xs:p-5 md:p-6 text-center"
    >
      <p className="text-[15px] xs:text-xl sm:text-2xl md:text-4xl font-black text-white tracking-tight whitespace-nowrap">
        {prefix}<span>{display.toLocaleString()}</span>{suffix}
      </p>
      <p className="text-white/50 text-[10px] xs:text-xs md:text-sm mt-1.5 md:mt-2 font-medium">{label}</p>
    </motion.div>
  );
}

function InquiryCardItem({ card }: { card: InquiryCard }) {
  const timeLabel = card.minutesAgo === 0
    ? "방금 전"
    : card.minutesAgo < 60
    ? `${card.minutesAgo}분 전`
    : `${Math.floor(card.minutesAgo / 60)}시간 전`;

  return (
    <div className="relative bg-white rounded-2xl p-4 mb-3 border border-gray-100/60 shadow-[0_2px_12px_rgba(0,0,0,0.12)] cursor-default">
      {/* isNew 하이라이트 링 */}
      {card.isNew && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-[#FF5733]/70 pointer-events-none"
          initial={{ opacity: 1, scale: 1.02 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
        />
      )}

      {/* 상단 행: 아바타 + 이름/지역/진료과 */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#FF5733]/10 text-[#FF5733] font-black text-sm shrink-0">
          {card.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[#121212] font-bold text-sm">{card.maskedName}</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
              {card.location}
            </span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: card.deptColor }}
            >
              {card.dept}
            </span>
          </div>
        </div>
      </div>

      {/* 문의 내용 */}
      <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
        {card.message}
      </p>

      {/* 시간 */}
      <p className="text-gray-400 text-[10px] mt-1.5 text-right">{timeLabel}</p>
    </div>
  );
}

function InquiryColumn({ cards, animClass, className }: { cards: InquiryCard[]; animClass: string; className?: string }) {
  const doubled = [...cards, ...cards];
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div className={animClass}>
        {doubled.map((card, i) => (
          <InquiryCardItem key={`${card.id}-${i}`} card={card} />
        ))}
      </div>
    </div>
  );
}

export default function PatientInquirySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-15%" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] py-24 md:py-32 px-6 md:px-16 overflow-hidden"
    >
      {/* 배경 블러 블롭 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5733]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* 헤더 */}
        <motion.div
          className="text-center space-y-6 mb-12"
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          {/* Eyebrow */}
          <motion.div variants={headlineItem} className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF5733]/10 border border-[#FF5733]/25 rounded-full text-[#FF5733] text-sm font-bold tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#FF5733] animate-pulse" />
              LIVE INQUIRIES
            </span>
          </motion.div>

          {/* 제목 */}
          <motion.h2
            variants={headlineItem}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1]"
          >
            클릭이 환자로<br />이어집니다
          </motion.h2>

          {/* 부제 */}
          <motion.p
            variants={headlineItem}
            className="text-white/50 text-sm xs:text-base md:text-lg max-w-xl mx-auto leading-relaxed break-keep"
          >
            지금 이 순간에도 광고를 클릭한 환자들이 <br />
            실시간으로 문의를 남기고 있습니다
          </motion.p>
        </motion.div>

        {/* Stats 바 */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto mb-12"
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          {STATS.map((stat, i) => (
            <CountUpStat key={stat.label} {...stat} index={i} />
          ))}
        </motion.div>

        {/* Waterfall 컨테이너 */}
        <div className="relative h-[560px] md:h-[640px]">
          {/* 상단 그라디언트 마스크 */}
          <div className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none bg-gradient-to-b from-[#0a0a0a] to-transparent" />
          {/* 하단 그라디언트 마스크 */}
          <div className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none bg-gradient-to-t from-[#0a0a0a] to-transparent" />

          {/* 3열 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
            <InquiryColumn
              cards={COLUMN_1}
              animClass="scroll-col-slow"
            />
            <InquiryColumn
              cards={COLUMN_2}
              animClass="scroll-col-medium"
              className="hidden md:block"
            />
            <InquiryColumn
              cards={COLUMN_3}
              animClass="scroll-col-fast"
              className="hidden lg:block"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
