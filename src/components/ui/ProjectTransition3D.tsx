"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";

const VertexShader = `
  uniform float uDistortion;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // 화면 중심(0.5, 0.5)으로부터의 거리
    float dist = distance(uv, vec2(0.5));
    // 좀 더 부드럽고 둥근 물방울 느낌을 위해 반경(0.8)을 넓게 잡은 가우시안 느낌의 굴절
    float swell = smoothstep(0.8, 0.0, dist) * smoothstep(0.0, 0.8, 1.0 - dist);
    
    // Z축으로 부드럽게 당겨서 카메라 쪽으로 다가오는 입체감 극대화
    pos.z += swell * uDistortion * 1.2; 

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FragmentShader = `
  uniform float uDistortion;
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv - 0.5;
    float r2 = dot(p, p);
    
    // 왜곡 강도 설정 (부드러운 전파)
    float k = 1.2 * uDistortion; 
    
    // 고급스러운 렌즈 효과를 위한 색수차(Chromatic Aberration) 적용
    // 렌즈 굴절률이 빛의 파장(RGB)마다 다르다는 점을 모방하여 가장자리에 갈수록 색 번짐 생성
    float kR = k * 1.08; // 빨간색 채널은 조금 더 왜곡
    float kG = k * 1.00; // 초록색 채널 기본값
    float kB = k * 0.92; // 파란색 채널 덜 왜곡

    vec2 uvR = 0.5 + p * (1.0 - kR * r2);
    vec2 uvG = 0.5 + p * (1.0 - kG * r2);
    vec2 uvB = 0.5 + p * (1.0 - kB * r2);
    
    // 각 채널을 개별적으로 샘플링하여 결합
    float r = texture2D(uTexture, uvR).r;
    float g = texture2D(uTexture, uvG).g;
    float b = texture2D(uTexture, uvB).b;
    
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

interface TransitionMeshProps {
  src: string;
  rect: DOMRect;
  isReversing: boolean;
  onReady: () => void;
  onAnimationComplete: () => void;
  onReverseComplete: () => void;
}

function TransitionMesh({ src, rect, isReversing, onReady, onAnimationComplete, onReverseComplete }: TransitionMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();
  
  // 최신 콜백을 유지하기 위한 ref (Dependency array로 인한 무한 재실행 방지)
  const cbRefs = useRef({ onReady, onAnimationComplete, onReverseComplete });
  useEffect(() => {
    cbRefs.current = { onReady, onAnimationComplete, onReverseComplete };
  });

  // Load texture (suspends component until loaded)
  const texture = useTexture(src);
  
  // Uniforms ref for GSAP to animate directly
  const uniforms = useRef({
    uTexture: { value: texture },
    uDistortion: { value: 0 },
  });

  useEffect(() => {
    if (!meshRef.current || !materialRef.current) return;
    
    // 텍스처 로딩 후 렌더링 준비 완료 신호
    cbRefs.current.onReady();

    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;

    // 초기 Thumbnail 크기와 위치를 3D 공간(Viewport) 좌표로 변환
    const startScaleX = (rect.width / size.width) * viewport.width;
    const startScaleY = (rect.height / size.height) * viewport.height;
    
    const startPosX = ((rect.left + rect.width / 2) / size.width) * viewport.width - viewport.width / 2;
    const startPosY = -(((rect.top + rect.height / 2) / size.height) * viewport.height - viewport.height / 2);

    // 전체화면 (Fullscreen) 크기와 위치 (화면 중앙)
    // 약간 오버스케일하여 가장자리 빈틈 방지, Y축은 패럴랙스 대응을 위해 더 크게(1.2배)
    const targetScaleX = viewport.width * 1.05;
    const targetScaleY = viewport.height * 1.2;
    const targetPosX = 0;
    const targetPosY = 0;

    const tl = gsap.timeline();

    if (isReversing) {
      // 리버스(Close) 시: 전체화면 -> 썸네일로 돌아감
      meshRef.current.position.set(targetPosX, targetPosY, 0);
      meshRef.current.scale.set(targetScaleX, targetScaleY, 1);
      materialRef.current.uniforms.uDistortion.value = 0;

      tl.to(meshRef.current.position, {
        x: startPosX,
        y: startPosY,
        duration: 0.9,
        ease: "power3.inOut"
      }, 0);
      tl.to(meshRef.current.scale, {
        x: startScaleX,
        y: startScaleY,
        duration: 0.9,
        ease: "power3.inOut"
      }, 0);

      // 왜곡(Bulge) 인앤아웃 (돌아갈 때도 꿀렁임)
      tl.to(materialRef.current.uniforms.uDistortion, {
        value: 0.8,
        duration: 0.45,
        ease: "sine.out",
      }, 0);
      tl.to(materialRef.current.uniforms.uDistortion, {
        value: 0.0,
        duration: 0.45,
        ease: "sine.in",
        onComplete: () => cbRefs.current.onReverseComplete()
      }, 0.45);

    } else {
      // 썸네일 -> 전체화면 전환 애니메이션
      meshRef.current.position.set(startPosX, startPosY, 0);
      meshRef.current.scale.set(startScaleX, startScaleY, 1);
      materialRef.current.uniforms.uDistortion.value = 0;

      tl.to(meshRef.current.position, {
        x: targetPosX,
        y: targetPosY,
        duration: 1.1,
        ease: "power3.inOut"
      }, 0);
      tl.to(meshRef.current.scale, {
        x: targetScaleX,
        y: targetScaleY,
        duration: 1.1,
        ease: "power3.inOut"
      }, 0);
      
      // Bulge & Fisheye 효과 - 젤리처럼 늘어났다 풀리는 시네마틱 텐션
      tl.to(materialRef.current.uniforms.uDistortion, {
        value: 1.4, // 몰입감을 위해 왜곡 강도를 높임 (색수차 극대화)
        duration: 0.55,
        ease: "power2.out",
      }, 0);
      tl.to(materialRef.current.uniforms.uDistortion, {
        value: 0.0, // 전체화면에서는 왜곡 풀림
        duration: 0.55,
        ease: "sine.inOut",
        onComplete: () => cbRefs.current.onAnimationComplete()
      }, 0.55);
    }

    return () => { tl.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReversing]);

  // 창 스크롤 위치를 전달받아 3D Mesh 자체를 패럴랙스로 약간 이동시킵니다
  useEffect(() => {
    const handleParallax = (e: Event) => {
      if (!meshRef.current) return;
      const customEx = e as CustomEvent;
      const yScroll = customEx.detail || 0; // px
      
      // 스크롤 시 화면 높이(100vh) 대비 스크롤한 양(progress) 계산
      const maxScroll = window.innerHeight; 
      const scrollProgress = yScroll / maxScroll;
      
      // 스크롤을 내리면(Positive yScroll), 이미지가 화면에서 위로 조금 더 빠르게 올라가야 합니다.
      // 3D 공간에서 Y축 양수는 '위쪽' 이동을 뜻합니다. 
      // targetScaleY가 viewport.height * 1.2이르모 위쪽으로 최대 0.1 * viewport.height 만큼 이동 가능
      meshRef.current.position.y = scrollProgress * (viewport.height * 0.12);
    };

    window.addEventListener('parallaxScroll', handleParallax);
    return () => window.removeEventListener('parallaxScroll', handleParallax);
  }, [viewport.height]);

  return (
    <mesh ref={meshRef}>
      {/* plane 세그먼트를 많이 나누어 Vertex displacement가 부드럽게 되도록 함 */}
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={VertexShader}
        fragmentShader={FragmentShader}
        uniforms={uniforms.current}
        transparent={true} // 외곽선 변형시 배경 투과
      />
    </mesh>
  );
}

interface ProjectTransition3DProps {
  isActive: boolean;
  isReversing: boolean;
  src: string;
  rect: DOMRect | null;
  onComplete: () => void;
  onClosed: () => void;
}

export default function ProjectTransition3D({ isActive, isReversing, src, rect, onComplete, onClosed }: ProjectTransition3DProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setIsReady(false);
    }
  }, [isActive]);

  if (!isActive || !rect) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* 뒷배경을 서서히 어둡게 처리 */}
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-700 ease-in-out"
        style={{ opacity: isReady && !isReversing ? 0.9 : 0 }}
      />
      
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <TransitionMesh
            src={src}
            rect={rect}
            isReversing={isReversing}
            onReady={() => setIsReady(true)}
            onAnimationComplete={onComplete}
            onReverseComplete={onClosed}
          />
        </Canvas>
      </div>
    </div>
  );
}
