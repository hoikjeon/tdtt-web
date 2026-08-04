'use client';

import { motion } from 'framer-motion';
import { Users, Briefcase } from 'lucide-react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

function ShowcaseContent() {
  return (
    <div className="bg-gradient-to-t from-black/95 via-black/70 to-transparent px-6 md:px-16 pt-10 pb-8">
      <div className="max-w-4xl mx-auto">

        {/* 메인 카피 */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-center text-lg md:text-2xl font-black text-white tracking-tight leading-snug mb-6"
        >
          내부 직원의 장점인{' '}
          <span className="text-[#FF5733]">'현장감'</span>
          과{' '}
          <br className="hidden md:block" />
          전문 에이전시의{' '}
          <span className="text-[#FF5733]">노하우</span>
          를 완벽하게 결합했습니다.
        </motion.p>

        {/* 두 개의 특징 카드 */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            {
              icon: Users,
              label: '내부 직원의 현장감',
              desc: '병원 내부 사정과 현장 흐름을 누구보다 빠르게 파악',
            },
            {
              icon: Briefcase,
              label: '전문 에이전시 노하우',
              desc: '검증된 마케팅 전략과 콘텐츠 제작 역량을 그대로',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm"
            >
              <item.icon className="text-[#FF5733] mb-2" size={22} />
              <span className="text-white font-black text-sm mb-1">{item.label}</span>
              <span className="text-gray-400 text-[11px] leading-snug">{item.desc}</span>
            </motion.div>
          ))}
        </div>

        {/* 결론 문장 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="text-center text-white/70 text-sm md:text-base leading-relaxed"
        >
          병원 내부 사정을 누구보다 잘 아는{' '}
          <span className="text-white font-bold">'만능 마케팅 팀장'</span>
          이 되어 드립니다.
        </motion.p>

      </div>
    </div>
  );
}

export default function ShowcaseSection() {
  return (
    <div className="bg-[#121212]">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/video/hospital.mp4"
        bgImageSrc="/images/hospital1.webp"
        title="원장님 병원으로|직접 출근하겠습니다"
        date="병원 전담 마케팅"
        scrollToExpand="스크롤하여 확인하기"
        textBlend
      >
        <ShowcaseContent />
      </ScrollExpandMedia>
    </div>
  );
}
