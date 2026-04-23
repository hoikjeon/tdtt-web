"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import { LampContainer } from "@/components/ui/lamp";
import PricingSection from "@/components/ui/pricing-section";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const contactRef = useRef<HTMLDivElement>(null);

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setTimeout(() => {
      contactRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      <main>
        {/* 램프: 풀스크린 히어로 */}
        <LampContainer className="h-screen" />

        {/* 컨텐츠: 램프 애니메이션 후 위로 슬라이드 */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1.1,
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="-mt-[calc(58rem+35px)] relative z-10"
        >
          <PricingSection onSelect={handlePlanSelect} />
          <div ref={contactRef}>
            <ContactForm selectedPlan={selectedPlan} />
          </div>
          <Footer />
        </motion.div>
      </main>
      <Header />
    </>
  );
}
