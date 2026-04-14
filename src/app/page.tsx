import GlassSphereScene from "@/components/ui/GlassSphereScene";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import ProblemSection from "@/components/ProblemSection";
import AgitationSection from "@/components/AgitationSection";
import SolutionSection from "@/components/SolutionSection";
import ServiceBento from "@/components/ServiceBento";
import CostComparison from "@/components/CostComparison";
import VisionSection from "@/components/VisionSection";
import ProcessSection from "@/components/ProcessSection";
import PromotionSection from "@/components/PromotionSection";
import ScrollMarquee from "@/components/ScrollMarquee";
import ContactForm from "@/components/ContactForm";

export default async function Home() {
  return (
    <>
      <main>
        <div data-header-theme="dark"><GlassSphereScene /></div>
        <div data-header-theme="light">
          <Intro />
          <ScrollMarquee />
          <ProblemSection />
          <AgitationSection />
        </div>
        <div data-header-theme="dark"><SolutionSection /></div>
        <div data-header-theme="light">
          <ServiceBento />
          <CostComparison />
          <VisionSection />
          <ProcessSection />
          <PromotionSection />
          <ContactForm />
        </div>
      </main>
      <Header />
    </>
  );
}
