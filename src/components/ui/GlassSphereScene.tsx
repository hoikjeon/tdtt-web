"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Text, Lightformer, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { LiquidSphere } from "./LiquidSphere";
import { Suspense, useEffect, useState, useRef } from "react";
import * as THREE from "three";

// Character width map – Latin chars have individual widths; Korean (Hangul) chars default to 0.95 (full-width)
const charWidthMap: Record<string, number> = {
  "I": 0.3, " ": 0.35, "!": 0.35, "L": 0.55, "F": 0.55, "E": 0.6,
  "T": 0.65, "P": 0.65, "S": 0.65, "B": 0.65, "R": 0.65, "Y": 0.65, "K": 0.65,
  "D": 0.75, "G": 0.75, "C": 0.75, "N": 0.7, "H": 0.7, "U": 0.7, "A": 0.7,
  "O": 0.8, "M": 0.9, "W": 0.9, "-": 0.4, "V": 0.7, "J": 0.5, "Q": 0.8, "X": 0.7, "Z": 0.65,
  "1": 0.55
};

function ReactiveChar({ char, originX, originY, fontSize, color, baseOutlineColor }: { char: string, originX: number, originY: number, fontSize: number, color: string, baseOutlineColor: string }) {
  const ref = useRef<any>(null); 
  const isReady = useRef(false);

  // Bottom-to-Top Stagger: Lower lines appear first, cascading upwards
  const delay = 0.3 + (1.8 - originY) * 0.15;

  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.elapsedTime;
    
    // --- PHASE 1: FADE-UP FROM BOTTOM ---
    if (!isReady.current) {
      if (time < delay) {
        return;
      }
      
      const elapsed = time - delay;
      const progress = Math.min(elapsed / 1.2, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      
      ref.current.position.y = originY - 1.5 * (1 - ease);
      ref.current.position.x = originX;
      ref.current.position.z = 0;
      
      if (ref.current.material) {
        ref.current.material.opacity = ease;
      }
      ref.current.fillOpacity = ease;
      
      if (progress >= 1) {
        ref.current.position.set(originX, originY, 0);
        if (ref.current.material) ref.current.material.opacity = 1;
        ref.current.fillOpacity = 1;
        isReady.current = true;
      }
      return;
    }

    // --- PHASE 2: INTERACTIVE HOVER BEHAVIOR ---
    const mouseX = state.pointer.x * (state.viewport.width / 2.5);
    const mouseY = state.pointer.y * (state.viewport.height / 2.5);
    
    const orgDistX = mouseX - originX; 
    const orgDistY = mouseY - originY;
    const distance = Math.sqrt(orgDistX * orgDistX + orgDistY * orgDistY);

    const maxDist = 2.0;

    if (distance < maxDist && distance > 0.01) {
      const force = Math.pow((maxDist - distance) / maxDist, 2);
      
      const pushX = (orgDistX / distance) * -0.26 * force; 
      const pushY = (orgDistY / distance) * -0.26 * force; 

      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, originX + pushX, 0.15);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, originY + pushY, 0.15);
      
      const targetScale = 1.0 + force * 0.15;
      ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, targetScale, 0.15));
      
      const targetRotation = Math.sin(originX * 10) * force * 0.15;
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, targetRotation, 0.15);

    } else {
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, originX, 0.1);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, originY, 0.1);
      ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, 1, 0.1));
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, 0, 0.1);
    }
  });

  return (
    <Text 
      ref={ref}
      font="/fonts/NanumSquareNeo-dEb.ttf" 
      position={[originX, originY - 1.5, 0]} 
      fillOpacity={0}
      fontSize={fontSize} 
      letterSpacing={0} 
      color={color} 
      outlineWidth={0.02} 
      outlineBlur={0.03} 
      outlineColor={baseOutlineColor} 
      outlineOpacity={0.4}
    >
      {char}
    </Text>
  );
}

// Helper: compute natural width of a line
function getLineNaturalWidth(text: string, fontSize: number) {
  let w = 0;
  for (const char of text) {
    w += (charWidthMap[char] || 0.95) * fontSize;
  }
  return w;
}

function ReactiveLine({ text, y, fontSize, color, baseOutlineColor, targetWidth }: { text: string, y: number, fontSize: number, color: string, baseOutlineColor: string, targetWidth?: number }) {
  const chars = text.split("");
  if (chars.length === 0) return null;

  // Calculate individual char widths
  const charWidths: number[] = [];
  let naturalWidth = 0;
  for (let i = 0; i < chars.length; i++) {
    const w = (charWidthMap[chars[i]] || 0.95) * fontSize;
    charWidths.push(w);
    naturalWidth += w;
  }

  // If targetWidth is specified, we achieve perfect justification by locking 
  // the first character to the left edge and the last character to the right edge.
  const totalWidth = targetWidth || naturalWidth;
  const positions: number[] = [];
  
  if (chars.length > 1 && targetWidth) {
    // Distance between the CENTER of the first char and the CENTER of the last char
    const edgeToEdgeCenter = targetWidth - (charWidths[0] / 2) - (charWidths[chars.length - 1] / 2);
    
    // Sum of widths of middle characters and gaps
    // Wait, the natural distance between first and last center is:
    let naturalDistBetweenCenters = 0;
    for (let i = 0; i < chars.length - 1; i++) {
      naturalDistBetweenCenters += (charWidths[i]/2 + charWidths[i+1]/2);
    }
    
    // We scale the gaps (the space between centers) to fit the target edgeToEdgeCenter
    const scaleFactor = edgeToEdgeCenter / naturalDistBetweenCenters;
    
    let currentX = -targetWidth / 2 + charWidths[0] / 2;
    positions.push(currentX);
    
    for (let i = 0; i < chars.length - 1; i++) {
      const gap = (charWidths[i]/2 + charWidths[i+1]/2) * scaleFactor;
      currentX += gap;
      positions.push(currentX);
    }
  } else {
    // Default natural spacing
    let currentX = -naturalWidth / 2;
    for (let i = 0; i < chars.length; i++) {
      positions.push(currentX + charWidths[i] / 2);
      currentX += charWidths[i];
    }
  }

  return (
    <group>
      {chars.map((char, i) => {
        if (char === " ") return null;
        const originX = positions[i];
        return (
          <ReactiveChar 
            key={`${i}-${char}`} 
            char={char} 
            originX={originX} 
            originY={y} 
            fontSize={fontSize} 
            color={color} 
            baseOutlineColor={baseOutlineColor} 
          />
        );
      })}
    </group>
  );
}

// 4 lines of Korean text with justified alignment
const heroLines = [
  { text: "단순한 외주 대행 그 이상", color: "#b5b5b5" },
  { text: "병원으로 직접 출근합니다", color: "#e6e6e6" },
  { text: "직원 1명의 인건비로 누리는", color: "#e6e6e6" },
  { text: "가장 완벽한 올인원 마케팅 팀", color: "#b5b5b5" },
];
const HERO_FONT_SIZE = 0.55;

function JustifiedTextBlock() {
  // Compute the max natural width to use as target for all lines
  const maxWidth = Math.max(...heroLines.map(l => getLineNaturalWidth(l.text, HERO_FONT_SIZE)));

  const yPositions = [1.5, 0.5, -0.5, -1.5];

  return (
    <group position={[0, 0, -2]}>
      {heroLines.map((line, i) => (
        <ReactiveLine
          key={i}
          text={line.text}
          y={yPositions[i]}
          fontSize={HERO_FONT_SIZE}
          color={line.color}
          baseOutlineColor={line.color}
          targetWidth={maxWidth}
        />
      ))}
    </group>
  );
}

export default function GlassSphereScene() {
  const [dpr, setDpr] = useState([1, 2]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setDpr([1, 1.5]);
    }
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById("intro");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-screen bg-[#121212] overflow-hidden relative text-white select-none touch-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 35 }}
        dpr={dpr as [number, number]}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
      >
        <color attach="background" args={["#121212"]} />
        <ambientLight intensity={0.2} />
        
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1} 
          color="#ffffff" 
        />
        <directionalLight position={[-5, -10, -5]} intensity={0.5} color="#4f4f4f" />
        
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 0]}>
            <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} color="#ffffff" />
            <Lightformer form="circle" intensity={1} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} color="#cccccc" />
            <Lightformer form="circle" intensity={1} rotation-y={Math.PI / 2} position={[5, 1, -1]} scale={2} color="#eeeeee" />
            <Lightformer form="rect" intensity={0.5} rotation-x={Math.PI / 2} position={[0, -5, 0]} scale={10} color="#ffffff" />
          </group>
        </Environment>

        <Suspense fallback={<Html center><div className="text-white/50 text-sm tracking-widest">LOADING 3D...</div></Html>}>

          <JustifiedTextBlock />

          <LiquidSphere />

        </Suspense>
      </Canvas>

      {/* 🖱 Scroll Down Indicator (Refined Design) */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer z-50 group pointer-events-auto"
      >
        <div 
          className="relative w-12 h-16 flex items-center justify-center overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
          }}
        >
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: [0, 0.4, 0.4, 0],
                y: [30, -30],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "linear"
              }}
              className="absolute"
            >
              <svg width="30" height="15" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L12 10L22 2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          ))}
        </div>
      </motion.button>
    </div>
  );
}
