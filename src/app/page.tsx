import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import ProblemSection from "@/components/ProblemSection";
import AgitationSection from "@/components/AgitationSection";
import ScrollMarquee from "@/components/ScrollMarquee";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import GlassSphereScene from "@/components/ui/GlassSphereSceneClient";

const ServiceBento = dynamic(() => import("@/components/ServiceBento"));
const CostComparison = dynamic(() => import("@/components/CostComparison"));
const VisionSection = dynamic(() => import("@/components/VisionSection"));
const ProcessSection = dynamic(() => import("@/components/ProcessSection"));
const PromotionSection = dynamic(() => import("@/components/PromotionSection"));
const ShowcaseSection = dynamic(() => import("@/components/ShowcaseSection"));

export default async function Home() {
  return (
    <>
      <main>
        <div className="relative" data-header-theme="dark"><GlassSphereScene /></div>
        <div className="relative" data-header-theme="light">
          <Intro />
          <ScrollMarquee />
          <ProblemSection />
          <AgitationSection />
        </div>
        <div className="relative" data-header-theme="dark"><ShowcaseSection /></div>
        <div className="relative" data-header-theme="light">
          <ServiceBento />
          <CostComparison />
          <VisionSection />
          <ProcessSection />
        </div>
        <div className="relative" data-header-theme="dark"><PromotionSection /></div>
        <div className="relative" data-header-theme="dark">
          <ContactForm />
        </div>
      </main>
      <Footer />
      <Header />
    </>
  );
}
