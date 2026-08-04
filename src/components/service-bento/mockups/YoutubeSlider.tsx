"use client";

import { memo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const YOUTUBE_VIDEOS = [
  "LHI25R8Eneg",
  "BDvD7xLaaAI",
  "dCfU78X4sNU",
  "ZkBQ9Yac768",
  "I-fyZehCIMA",
];

const YoutubeSlider = memo(function YoutubeSlider() {
  const [idx, setIdx] = useState(0);

  const go = (dir: number) => {
    setIdx(i => (i + dir + YOUTUBE_VIDEOS.length) % YOUTUBE_VIDEOS.length);
  };

  const videoId = YOUTUBE_VIDEOS[idx];

  return (
    <div className="relative w-full flex flex-col gap-3">
      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
        <iframe
          key={videoId}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={`YouTube Video ${idx + 1}`}
        />
        {/* transparent overlay to block YouTube hover UI */}
        <div className="absolute inset-0 z-10" />
      </div>
      <div className="flex items-center justify-between px-1">
        <button
          onClick={() => go(-1)}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={18} className="text-gray-600" />
        </button>
        <div className="flex gap-2">
          {YOUTUBE_VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{ backgroundColor: i === idx ? "#FF5733" : "#d1d5db" }}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ChevronRight size={18} className="text-gray-600" />
        </button>
      </div>
      <p className="text-center text-xs text-gray-400">{idx + 1} / {YOUTUBE_VIDEOS.length}</p>
    </div>
  );
});

export default YoutubeSlider;
