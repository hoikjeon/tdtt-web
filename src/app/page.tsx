import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import ProblemSection from "@/components/ProblemSection";
import AgitationSection from "@/components/AgitationSection";
import ScrollMarquee from "@/components/ScrollMarquee";
import Footer from "@/components/Footer";

const ServiceBento = dynamic(() => import("@/components/ServiceBento"));
const CostComparison = dynamic(() => import("@/components/CostComparison"));
const VisionSection = dynamic(() => import("@/components/VisionSection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const ProcessSection = dynamic(() => import("@/components/ProcessSection"));
const PromotionSection = dynamic(() => import("@/components/PromotionSection"));
const ShowcaseSection = dynamic(() => import("@/components/ShowcaseSection"));
const PricingContactWrapper = dynamic(() => import("@/components/PricingContactWrapper"));

export default async function Home() {
  return (
    <>
      <main>
        <div className="relative" data-header-theme="dark"><ShowcaseSection /></div>
        <div className="relative" data-header-theme="light">
          <Intro />
          <ScrollMarquee />
          <ProblemSection />
        </div>
        <div className="relative" data-header-theme="dark"><AgitationSection /></div>
        <div className="relative" data-header-theme="light">
          <ServiceBento />
          <CostComparison />
          <ProcessSection />
        </div>
        <div className="relative" data-header-theme="light"><VisionSection /></div>
        <div className="relative" data-header-theme="light"><FAQSection /></div>
        <div className="relative" data-header-theme="dark"><PromotionSection /></div>
        <div className="relative" data-header-theme="dark">
          <PricingContactWrapper />
        </div>
      </main>
      <Footer />
      <Header />
    </>
  );
}
