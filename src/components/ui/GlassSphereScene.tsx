"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Text, Lightformer, Html, PerformanceMonitor } from "@react-three/drei";
import { motion } from "framer-motion";
import { LiquidSphere } from "./LiquidSphere";
import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import * as THREE from "three";

// Character width map – Latin chars have individual widths; Korean (Hangul) chars default to 0.95 (full-width)
const charWidthMap: Record<string, number> = {
  "I": 0.3, " ": 0.35, "!": 0.35, "L": 0.55, "F": 0.55, "E": 0.6,
  "T": 0.65, "P": 0.65, "S": 0.65, "B": 0.65, "R": 0.65, "Y": 0.65, "K": 0.65,
  "D": 0.75, "G": 0.75, "C": 0.75, "N": 0.7, "H": 0.7, "U": 0.7, "A": 0.7,
  "O": 0.8, "M": 0.9, "W": 0.9, "-": 0.4, "V": 0.7, "J": 0.5, "Q": 0.8, "X": 0.7, "Z": 0.65,
  "1": 0.55
};

interface CharRefData {
  ref: any;
  originX: number;
  originY: number;
  delay: number;
  isReady: boolean;
  pushFactor: number;
  scaleFactor: number;
}

function ReactiveChar({ 
  char, 
  originX, 
  originY, 
  fontSize, 
  color, 
  baseOutlineColor,
  delay,
  pushFactor = 0.26,
  scaleFactor = 0.15,
  registerChar
}: { 
  char: string, 
  originX: number, 
  originY: number, 
  fontSize: number, 
  color: string, 
  baseOutlineColor: string,
  delay: number,
  pushFactor?: number,
  scaleFactor?: number,
  registerChar: (
    ref: any,
    originX: number,
    originY: number,
    delay: number,
    pushFactor: number,
    scaleFactor: number
  ) => () => void
}) {
  const ref = useRef<any>(null); 

  useEffect(() => {
    if (ref.current) {
      const unregister = registerChar(ref.current, originX, originY, delay, pushFactor, scaleFactor);
      return unregister;
    }
  }, [registerChar, originX, originY, delay, pushFactor, scaleFactor]);

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

function ReactiveLine({ 
  text, 
  y, 
  fontSize, 
  color, 
  baseOutlineColor, 
  targetWidth,
  maxDist,
  pushFactor,
  scaleFactor,
  registerChar
}: { 
  text: string, 
  y: number, 
  fontSize: number, 
  color: string, 
  baseOutlineColor: string, 
  targetWidth?: number,
  maxDist?: number,
  pushFactor?: number,
  scaleFactor?: number,
  registerChar: (
    ref: any,
    originX: number,
    originY: number,
    delay: number,
    pushFactor: number,
    scaleFactor: number
  ) => () => void
}) {
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

  const positions: number[] = [];
  
  if (chars.length > 1 && targetWidth) {
    const edgeToEdgeCenter = targetWidth - (charWidths[0] / 2) - (charWidths[chars.length - 1] / 2);
    
    let naturalDistBetweenCenters = 0;
    for (let i = 0; i < chars.length - 1; i++) {
      naturalDistBetweenCenters += (charWidths[i]/2 + charWidths[i+1]/2);
    }
    
    const scaleFactor = edgeToEdgeCenter / naturalDistBetweenCenters;
    
    let currentX = -targetWidth / 2 + charWidths[0] / 2;
    positions.push(currentX);
    
    for (let i = 0; i < chars.length - 1; i++) {
      const gap = (charWidths[i]/2 + charWidths[i+1]/2) * scaleFactor;
      currentX += gap;
      positions.push(currentX);
    }
  } else {
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
        // Bottom-to-Top Stagger: Lower lines appear first, cascading upwards
        const delay = 0.3 + (1.8 - y) * 0.15;
        return (
          <ReactiveChar 
            key={`${i}-${char}`} 
            char={char} 
            originX={originX} 
            originY={y} 
            fontSize={fontSize} 
            color={color} 
            baseOutlineColor={baseOutlineColor} 
            delay={delay}
            pushFactor={pushFactor}
            scaleFactor={scaleFactor}
            registerChar={registerChar}
          />
        );
      })}
    </group>
  );
}

// 4 lines of Korean text with justified alignment
const heroLines = [
  { text: "병원으로 직접 출근합니다", color: "#e6e6e6" },
  { text: "직원 1명의 인건비로 누리는", color: "#e6e6e6" },
  { text: "가장 완벽한 올인원 마케팅 팀", color: "#b5b5b5" },
];

function JustifiedTextBlock({ isVisible }: { isVisible: boolean }) {
  const { size } = useThree();
  const width = size.width;
  
  const charRefs = useRef<CharRefData[]>([]);

  const registerChar = useCallback((
    ref: any,
    originX: number,
    originY: number,
    delay: number,
    pushFactor: number,
    scaleFactor: number
  ) => {
    const existing = charRefs.current.find(item => item.ref === ref);
    if (!existing) {
      charRefs.current.push({
        ref,
        originX,
        originY,
        delay,
        isReady: false,
        pushFactor,
        scaleFactor
      });
    }
    return () => {
      charRefs.current = charRefs.current.filter(item => item.ref !== ref);
    };
  }, []);

  // Responsive scaling based on window width
  let fontSize = 0.55;
  let ySep = 1.0;
  let maxDist = 2.0;
  let pushFactor = 0.26;
  let scaleFactor = 0.15;

  if (width < 480) {
    fontSize = 0.28;
    ySep = 0.5;
    maxDist = 0.8;
    pushFactor = 0.12;
    scaleFactor = 0.08;
  } else if (width < 768) {
    fontSize = 0.38;
    ySep = 0.7;
    maxDist = 1.2;
    pushFactor = 0.18;
    scaleFactor = 0.10;
  } else if (width < 1024) {
    fontSize = 0.48;
    ySep = 0.85;
    maxDist = 1.6;
    pushFactor = 0.22;
    scaleFactor = 0.12;
  }

  // Unified Frame Loop: Single useFrame updates all characters in one go
  useFrame((state) => {
    if (!isVisible) return;

    const time = state.clock.elapsedTime;
    const mouseX = state.pointer.x * (state.viewport.width / 2.5);
    const mouseY = state.pointer.y * (state.viewport.height / 2.5);

    charRefs.current.forEach((item) => {
      if (!item.ref) return;

      // --- PHASE 1: FADE-UP FROM BOTTOM ---
      if (!item.isReady) {
        if (time < item.delay) {
          return;
        }
        
        const elapsed = time - item.delay;
        const progress = Math.min(elapsed / 1.2, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        
        item.ref.position.y = item.originY - 1.5 * (1 - ease);
        item.ref.position.x = item.originX;
        item.ref.position.z = 0;
        
        if (item.ref.material) {
          item.ref.material.opacity = ease;
        }
        item.ref.fillOpacity = ease;
        
        if (progress >= 1) {
          item.ref.position.set(item.originX, item.originY, 0);
          if (item.ref.material) item.ref.material.opacity = 1;
          item.ref.fillOpacity = 1;
          item.isReady = true;
        }
        return;
      }

      // --- PHASE 2: INTERACTIVE HOVER BEHAVIOR ---
      const orgDistX = mouseX - item.originX; 
      const orgDistY = mouseY - item.originY;
      const distance = Math.sqrt(orgDistX * orgDistX + orgDistY * orgDistY);

      if (distance < maxDist && distance > 0.01) {
        const force = Math.pow((maxDist - distance) / maxDist, 2);
        
        const pushX = (orgDistX / distance) * -item.pushFactor * force; 
        const pushY = (orgDistY / distance) * -item.pushFactor * force; 

        item.ref.position.x = THREE.MathUtils.lerp(item.ref.position.x, item.originX + pushX, 0.15);
        item.ref.position.y = THREE.MathUtils.lerp(item.ref.position.y, item.originY + pushY, 0.15);
        
        const targetScale = 1.0 + force * item.scaleFactor;
        item.ref.scale.setScalar(THREE.MathUtils.lerp(item.ref.scale.x, targetScale, 0.15));
        
        const targetRotation = Math.sin(item.originX * 10) * force * item.scaleFactor;
        item.ref.rotation.z = THREE.MathUtils.lerp(item.ref.rotation.z, targetRotation, 0.15);

      } else {
        item.ref.position.x = THREE.MathUtils.lerp(item.ref.position.x, item.originX, 0.1);
        item.ref.position.y = THREE.MathUtils.lerp(item.ref.position.y, item.originY, 0.1);
        item.ref.scale.setScalar(THREE.MathUtils.lerp(item.ref.scale.x, 1, 0.1));
        item.ref.rotation.z = THREE.MathUtils.lerp(item.ref.rotation.z, 0, 0.1);
      }
    });
  });

  // Compute the max natural width to use as target for all lines
  const maxWidth = Math.max(...heroLines.map(l => getLineNaturalWidth(l.text, fontSize)));
  const yPositions = [ySep * 1.0, ySep * 0.0, ySep * -1.0];

  return (
    <group position={[0, 0, -2]}>
      {heroLines.map((line, i) => (
        <ReactiveLine
          key={i}
          text={line.text}
          y={yPositions[i]}
          fontSize={fontSize}
          color={line.color}
          baseOutlineColor={line.color}
          targetWidth={maxWidth}
          maxDist={maxDist}
          pushFactor={pushFactor}
          scaleFactor={scaleFactor}
          registerChar={registerChar}
        />
      ))}
    </group>
  );
}

export default function GlassSphereScene() {
  const [dpr, setDpr] = useState(1.5);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Monitor visibility of the 3D Canvas wrapper to suspend rendering when offscreen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setDpr(1); // Mobile defaults to 1 for better performance
    }
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById("intro");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen bg-[#121212] overflow-hidden relative text-white select-none touch-none"
    >
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 10], fov: 35 }}
          dpr={dpr}
          gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
        >
          <PerformanceMonitor onIncline={() => setDpr(1.5)} onDecline={() => setDpr(1)}>
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
              <JustifiedTextBlock isVisible={isVisible} />
              <LiquidSphere />
            </Suspense>
          </PerformanceMonitor>
        </Canvas>
      )}

      {/* 🖱 Scroll Down Indicator (Refined Design) */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] as any }}
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

