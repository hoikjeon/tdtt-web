import { GlassSphereScene } from "@/components/ui/GlassSphereScene";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import ScrollMarquee from "@/components/ScrollMarquee";
import Projects, { Project } from "@/components/Projects";
import ContactForm from "@/components/ContactForm";
import { supabase } from "@/lib/supabase";

// 하드코딩된 예시 데이터 (DB 연결 전 초기 상태 또는 오류 시 사용)
const fallbackProjects: Project[] = [
  {
    src: "/project1.png",
    year: "2025",
    subtitle: "NEW CGV APP",
    title: "CGV\nMobile\nAPP",
    parallaxOffset: 120,
  },
  {
    src: "/project2.png",
    year: "2025",
    subtitle: "Educating Tomorrow's Leaders",
    title: "TAEJAE\nUniv.",
    parallaxOffset: 400,
  },
  {
    src: "/project3.png",
    year: "2025",
    subtitle: "AURA ARCHITECTS",
    title: "Aura\nBranding\nIdentity",
    parallaxOffset: 400,
  },
  {
    src: "/project4.png",
    year: "2025",
    subtitle: "AURA Fashion Collection",
    title: "Aura\nE-comm\nPlatform",
    parallaxOffset: 120,
  },
];

export default async function Home() {
  let projectData: Project[] = fallbackProjects;

  // Supabase에서 데이터 가져오기 시도
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

  return (
    <>
      <Header />
      <main>
        <GlassSphereScene />
        <Intro />
        <ScrollMarquee />
        <Projects data={projectData} />
        <ContactForm />
      </main>
    </>
  );
}
