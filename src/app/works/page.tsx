import WorksClient from "@/components/WorksClient";
import { Project } from "@/components/Projects";
import { supabase } from "@/lib/supabase";

// 하드코딩된 예시 데이터 (DB 연결 전 초기 상태 또는 오류 시 사용)
const fallbackProjects: Project[] = [
  {
    src: "/video/hospital%20motion/motion1.webp",
    year: "",
    subtitle: "Hospital Motion",
    title: "Motion\nGraphic",
    parallaxOffset: 120,
    accentColor: "#599ac0",
    images: [
      "/video/hospital%20motion/motion1.webp",
      "/video/hospital%20motion/motion2.webp",
      "/video/hospital%20motion/motion3.webp",
      "/video/hospital%20motion/motion4.webp",
      "/video/hospital%20motion/motion5.webp",
      "/video/hospital%20motion/motion6.webp",
      "/video/hospital%20motion/motion7.webp",
      "/video/hospital%20motion/motion8.webp",
      "/video/hospital%20motion/motion9.webp",
      "/video/hospital%20motion/motion10.webp",
      "/video/hospital%20motion/motion11.webp",
      "/video/hospital%20motion/motion12.webp",
      "/video/hospital%20motion/motion13.webp",
      "/video/hospital%20motion/motion14.webp",
      "/video/hospital%20motion/motion15.webp",
      "/video/hospital%20motion/motion16.webp",
    ],
  },
  {
    src: "/video/admotion/admotion1.webp",
    year: "2025",
    subtitle: "Medical Video Marketing",
    title: "Medical\nAdvertising",
    parallaxOffset: 400,
    accentColor: "#a790c4",
    images: [
      "/video/admotion/admotion1.webp",
      "/video/admotion/admotion2.webp",
      "/video/admotion/admotion3.webp",
      "/video/admotion/admotion4.webp",
      "/video/admotion/admotion5.webp",
      "/video/admotion/admotion6.webp",
      "/video/admotion/admotion7.webp",
      "/video/admotion/admotion8.webp",
      "/video/admotion/admotion9.webp",
      "/video/admotion/admotion10.webp",
      "/video/admotion/admotion11.webp",
      "/video/admotion/admotion12.webp",
    ],
  },
  {
    src: "/video/adlanding/landing1.webp",
    year: "2025",
    subtitle: "Direct SNS Consultation",
    title: "Medical\nLanding\nPage",
    parallaxOffset: 400,
    accentColor: "#e2b923",
    images: [
      "/video/adlanding/landing1.webp",
      "/video/adlanding/landing2.webp",
      "/video/adlanding/landing3.webp",
      "/video/adlanding/landing4.png",
      "/video/adlanding/landing5.png",
      "/video/adlanding/landing6.webp",
      "/video/adlanding/landing7.webp",
      "/video/adlanding/landing8.webp",
      "/video/adlanding/landing9.webp",
      "/video/adlanding/landing10.png",
      "/video/adlanding/landing11.png",
      "/video/adlanding/landing12.png",
    ],
  },
  {
    src: "/project4.png",
    year: "2025",
    subtitle: "AURA Fashion Collection",
    title: "Aura\nE-comm\nPlatform",
    parallaxOffset: 120,
  },
];

export default async function WorksPage() {
  let projectData: Project[] = fallbackProjects;

  /* Supabase 임시 비활성화 (모든 프로젝트를 보여주기 위함)
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (!error && data && data.length > 0) {
      projectData = data;
    }
  } catch (err) {
    console.error('Failed to fetch projects from Supabase:', err);
  }
  */

  return <WorksClient projectData={projectData} />;
}
