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
        <GlassSphereScene />
        <Intro />
        <ScrollMarquee />
        <ProblemSection />
        <AgitationSection />
        <SolutionSection />
        <ServiceBento />
        <CostComparison />
        <VisionSection />
        <ProcessSection />
        <PromotionSection />
        <ContactForm />
      </main>
      <Header />
    </>
  );
}
