"use client";

import { motion } from "framer-motion";

// Desktop nodes (landscape layout)
const mapNodes = [
  { id: 1, x: 700, y: 400, label: "신경외과" },
  { id: 2, x: 800, y: 250, label: "정형외과" },
  { id: 3, x: 300, y: 400, label: "내과" },
  { id: 4, x: 500, y: 300, label: "산부인과" },
  { id: 5, x: 350, y: 520, label: "외과" },
  { id: 6, x: 650, y: 180, label: "안과" },
  { id: 7, x: 850, y: 450, label: "피부과" },
  { id: 8, x: 150, y: 350, label: "화상외과" },
  { id: 9, x: 550, y: 500, label: "치과" },
];

const connections = [
  [1, 2], [1, 4], [2, 6], [4, 6], [4, 3], [3, 8], [3, 5], [5, 9], [9, 1], [7, 2], [7, 1]
];

// Mobile nodes — circular layout, center(200,250), radius 150
// angles: -90, -50, -10, 30, 70, 110, 150, 190, 230 degrees
const mobileNodes = [
  { i: 0, x: 200, y: 100, label: "정형외과" },
  { i: 1, x: 297, y: 135, label: "안과" },
  { i: 2, x: 348, y: 224, label: "피부과" },
  { i: 3, x: 330, y: 325, label: "신경외과" },
  { i: 4, x: 251, y: 391, label: "치과" },
  { i: 5, x: 149, y: 391, label: "내과" },
  { i: 6, x: 70,  y: 325, label: "외과" },
  { i: 7, x: 52,  y: 224, label: "화상외과" },
  { i: 8, x: 103, y: 135, label: "산부인과" },
];

const mobileConnections = [
  // 외곽 링
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,0],
  // 중심 크로스 (가운데 엉킴)
  [0,4],[0,5],[0,3],
  [1,6],[1,5],
  [2,6],[2,7],
  [3,7],[3,8],
  [4,8],
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
  },
};

export default function VisionSection() {
  return (
    <section className="relative bg-white py-24 md:py-40 px-6 md:px-16 overflow-hidden">

      <div className="max-w-6xl mx-auto relative z-10 text-center">

        {/* Main Headline */}
        <div className="mb-12 space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#FF5733] font-bold tracking-[.3em] text-xs uppercase"
          >
            THE REGIONAL VISION
          </motion.p>

          <div className="flex flex-col items-center overflow-hidden">
            {/* Mobile: 정적 헤드라인 */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="md:hidden text-xl font-black text-[#121212] tracking-tighter leading-snug text-center px-2"
            >
              우리 병원도 지역 1등이<br />될 수 있습니다.
            </motion.h2>

            {/* Desktop: fill 애니메이션 */}
            <div className="hidden md:block relative overflow-hidden">
              <span className="text-6xl font-black text-gray-100 tracking-tighter block leading-tight whitespace-nowrap">
                우리 병원도 지역 1등이 될 수 있습니다.
              </span>
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as any }}
                className="absolute top-0 left-0 text-6xl font-black text-[#121212] tracking-tighter overflow-hidden block whitespace-nowrap leading-tight"
              >
                우리 병원도 지역 1등이 될 수 있습니다.
              </motion.span>
            </div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-lg md:text-5xl font-black text-[#FF5733] tracking-tighter uppercase"
            >
              &lt;Medical EU&gt; 에 합류하세요.
            </motion.h3>
          </div>
        </div>

        {/* Vision Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-3xl mx-auto mb-20 space-y-12"
        >
          <p className="text-gray-500 text-base md:text-2xl font-bold leading-relaxed px-4">
            단순한 마케팅 대행을 넘어,<br />
            <span className="text-[#121212]">&lt;Medical EU&gt;와 함께하는</span> <br className="md:hidden" />
            <span className="text-[#121212]">부울경 지역 우수 병원 간의</span><br />
            <span className="bg-[#FF5733]/5 px-2 text-[#FF5733]">양방향 환자 크로스 프로모션(네트워크)</span><br />
            혜택까지 독보적으로 누리실 수 있습니다.
          </p>
        </motion.div>
      </div>

      {/* Network Visualization Card */}
      <div className="relative w-full max-w-6xl mx-auto mt-12 group">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="relative w-full bg-white/60 backdrop-blur-xl rounded-2xl md:rounded-[4rem] border border-gray-100 shadow-[0_40px_100px_rgba(0,0,0,0.04)] overflow-hidden"
        >
          {/* Background Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(#FF5733 1px, transparent 1px)", backgroundSize: "30px 30px" }}
          />

          {/* Map Title Badge */}
          <div className="absolute top-4 md:top-8 left-4 md:left-12 flex items-center gap-2 md:gap-3 z-10">
            <div className="w-3 h-3 bg-[#FF5733] rounded-full animate-ping" />
            <span className="text-[#121212] font-black text-sm tracking-widest uppercase opacity-40">Regional Network Live</span>
          </div>

          {/* Mobile: 원형 SVG 네트워크 */}
          <div className="md:hidden relative z-10 py-12 px-4">
            <svg
              className="w-full drop-shadow-xl"
              viewBox="-10 70 420 390"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Connection lines */}
              {mobileConnections.map(([si, ei], idx) => {
                const s = mobileNodes[si];
                const e = mobileNodes[ei];
                return (
                  <g key={`m-edge-${idx}`}>
                    <motion.line
                      x1={s.x} y1={s.y} x2={e.x} y2={e.y}
                      stroke="#FF5733" strokeWidth="1.5" strokeOpacity="0.12"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.8, delay: idx * 0.06 }}
                    />
                    <motion.circle
                      r="3" fill="#FF5733"
                      animate={{
                        cx: [s.x, e.x],
                        cy: [s.y, e.y],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: idx * 0.5,
                        ease: "linear",
                      }}
                    />
                  </g>
                );
              })}

              {/* Hospital nodes */}
              {mobileNodes.map((node, i) => (
                <motion.g
                  key={`m-node-${i}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px`, transformBox: "fill-box" }}
                >
                  {/* Pulse */}
                  <motion.circle
                    cx={node.x} cy={node.y} r="24"
                    fill="#FF5733" fillOpacity="0.06"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 0.3 }}
                  />
                  {/* Main circle */}
                  <circle
                    cx={node.x} cy={node.y} r="22"
                    fill="white"
                    stroke="#FF5733" strokeWidth="1" strokeOpacity="0.3"
                  />
                  {/* Hospital icon */}
                  <g transform={`translate(${node.x}, ${node.y})`}>
                    <rect x="-6" y="-8" width="12" height="16" rx="1.5" fill="#FF5733" fillOpacity="0.15" stroke="#FF5733" strokeWidth="1.5" />
                    <path d="M-3,0 h6 M0,-3 v6" stroke="#FF5733" strokeWidth="2" strokeLinecap="round" />
                  </g>
                  {/* Label */}
                  <rect
                    x={node.x - 34} y={node.y + 28} width="68" height="20" rx="10"
                    fill="white" stroke="#FF5733" strokeWidth="1.5" strokeOpacity="0.15"
                  />
                  <text
                    x={node.x} y={node.y + 43}
                    textAnchor="middle"
                    fill="#121212"
                    fontSize="10"
                    fontWeight="900"
                  >
                    {node.label}
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>

          {/* Desktop: SVG 네트워크 맵 */}
          <div className="hidden md:flex items-center justify-center h-[700px] p-12">
            <svg className="w-full h-full drop-shadow-2xl relative z-10" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Region border */}
              <motion.path
                d="M150,300 L350,80 L700,40 L950,150 L980,450 L850,580 L500,580 L250,520 Z"
                stroke="#FF5733"
                strokeWidth="1.5"
                strokeOpacity="0.1"
                strokeDasharray="10,10"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, delay: 0.5 }}
              />

              {/* Connection lines */}
              {connections.map(([startId, endId], i) => {
                const start = mapNodes.find(n => n.id === startId)!;
                const end = mapNodes.find(n => n.id === endId)!;
                return (
                  <g key={`edge-${i}`}>
                    <line
                      x1={start.x} y1={start.y} x2={end.x} y2={end.y}
                      stroke="#FF5733" strokeWidth="2" strokeOpacity="0.1"
                    />
                    <motion.circle
                      r="4" fill="#FF5733"
                      className="blur-[2px]"
                      animate={{
                        cx: [start.x, end.x],
                        cy: [start.y, end.y],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.7,
                        ease: "linear",
                      }}
                    />
                  </g>
                );
              })}

              {/* Hospital nodes */}
              <g>
                {mapNodes.map((node, i) => (
                  <motion.g key={`node-${i}`} variants={itemVariants} className="cursor-default">
                    <motion.circle
                      cx={node.x} cy={node.y} r="32"
                      fill="#FF5733" fillOpacity="0.05"
                      animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 3, delay: i * 0.3 }}
                    />
                    <circle
                      cx={node.x} cy={node.y} r="30"
                      fill="white"
                      stroke="#FF5733" strokeWidth="1" strokeOpacity="0.3"
                    />
                    <g transform={`translate(${node.x}, ${node.y})`}>
                      <rect x="-8" y="-10" width="16" height="20" rx="2" fill="#FF5733" fillOpacity="0.15" stroke="#FF5733" strokeWidth="1.5" />
                      <path d="M-4,0 h8 M0,-4 v8" stroke="#FF5733" strokeWidth="3" strokeLinecap="round" />
                    </g>
                    <g>
                      <rect
                        x={node.x - 45} y={node.y + 38} width="90" height="24" rx="12"
                        fill="white"
                        stroke="#FF5733" strokeWidth="2" strokeOpacity="0.1"
                      />
                      <text
                        x={node.x} y={node.y + 55}
                        textAnchor="middle"
                        fill="#121212"
                        fontSize="13"
                        fontWeight="900"
                        className="tracking-tighter"
                      >
                        {node.label}
                      </text>
                    </g>
                  </motion.g>
                ))}
              </g>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
