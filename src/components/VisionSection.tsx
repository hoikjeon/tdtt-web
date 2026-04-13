"use client";

import { motion } from "framer-motion";
import { Network, MapPin, Zap } from "lucide-react";

// Simplified coordinates for Bu-Ul-Gyeong region on a 1000x1000 SVG
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
          
          <div className="flex flex-col items-center">
            <div className="relative inline-block overflow-hidden">
               <span className="text-3xl md:text-6xl font-black text-gray-100 tracking-tighter block leading-tight">
                우리 병원도 지역 1등이 될 수 있습니다.
              </span>
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 left-0 text-3xl md:text-6xl font-black text-[#121212] tracking-tighter overflow-hidden block border-r-[3px] border-[#FF5733] pr-[2px] whitespace-nowrap leading-tight"
              >
                우리 병원도 지역 1등이 될 수 있습니다.
              </motion.span>
            </div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-2xl md:text-5xl font-black text-[#FF5733] tracking-tighter uppercase"
            >
              &lt;그날그때&gt; 에 합류하세요.
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
          <p className="text-gray-500 text-lg md:text-2xl font-bold leading-relaxed px-4">
            단순한 마케팅 대행을 넘어, <br className="hidden md:block" />
            <span className="text-[#121212]">&lt;그날그때&gt;와 함께하는 부울경 지역 우수 병원 간의</span> <br />
            <span className="bg-[#FF5733]/5 px-2 text-[#FF5733]">양방향 환자 크로스 프로모션(네트워크)</span> 혜택까지 <br className="hidden md:block" />
            독보적으로 누리실 수 있습니다.
          </p>
        </motion.div>
      </div>

      {/* Map Visualization Layout (Enhanced Glassmorphism Card) */}
      <div className="relative w-full max-w-6xl mx-auto mt-12 group">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full bg-white/60 backdrop-blur-xl rounded-[4rem] border border-gray-100 shadow-[0_40px_100px_rgba(0,0,0,0.04)] overflow-hidden h-[500px] md:h-[700px] flex items-center justify-center p-8 md:p-12"
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#FF5733 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          <svg className="w-full h-full drop-shadow-2xl relative z-10" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Stylized Bu-Ul-Gyeong Border Path (Premium stroke) */}
            <motion.path 
              d="M150,300 L350,80 L700,40 L950,150 L980,450 L850,580 L500,580 L250,520 Z"
              stroke="#FF5733"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeDasharray="10,10"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 3 }}
            />
            
            {/* Light Trails between Nodes */}
            {connections.map(([startId, endId], i) => {
              const start = mapNodes.find(n => n.id === startId)!;
              const end = mapNodes.find(n => n.id === endId)!;
              
              return (
                <g key={`edge-${i}`}>
                  <motion.line 
                    x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
                    stroke="#FF5733" strokeWidth="2" strokeOpacity="0.1"
                  />
                  <motion.circle 
                    r="4" fill="#FF5733"
                    className="blur-[2px]"
                    animate={{ 
                      cx: [start.x, end.x], 
                      cy: [start.y, end.y],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: i * 0.7,
                      ease: "linear"
                    }}
                  />
                </g>
              );
            })}

            {/* Hospital Nodes (Premium Button Style) */}
            {mapNodes.map((node, i) => (
              <g key={`node-${i}`} className="cursor-default">
                <motion.circle 
                  cx={node.x} cy={node.y} r="32" 
                  fill="white" 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 15, delay: 0.5 + i * 0.1 }}
                  className="drop-shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
                />
                <motion.circle 
                  cx={node.x} cy={node.y} r="28" 
                  fill="none" stroke="#f8f9fa" strokeWidth="1"
                />
                
                {/* Cross Icon */}
                <motion.path
                  d={`M${node.x - 7},${node.y} h14 M${node.x},${node.y - 7} v14`}
                  stroke="#FF5733" strokeWidth="4" strokeLinecap="round"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                />

                {/* Node Glow Effect */}
                <motion.circle 
                  cx={node.x} cy={node.y} r="32" fill="none" stroke="#FF5733" strokeWidth="2"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.4 }}
                />

                {/* Premium Label Style */}
                <motion.g
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <rect 
                    x={node.x - 50} y={node.y + 45} width="100" height="30" rx="15" 
                    fill="white" className="drop-shadow-sm border border-gray-50" 
                  />
                  <text
                    x={node.x} y={node.y + 65}
                    textAnchor="middle"
                    fill="#121212"
                    fontSize="13"
                    fontWeight="900"
                    className="tracking-tighter"
                  >
                    {node.label}
                  </text>
                </motion.g>
              </g>
            ))}
          </svg>

          {/* Map Title Badge */}
          <div className="absolute top-8 left-12 flex items-center gap-3">
             <div className="w-3 h-3 bg-[#FF5733] rounded-full animate-ping" />
             <span className="text-[#121212] font-black text-sm tracking-widest uppercase opacity-40">Regional Network Live</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
