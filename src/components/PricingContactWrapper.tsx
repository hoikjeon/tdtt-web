"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";

const PricingSection = dynamic(() => import("@/components/ui/pricing-section"));
const ContactForm = dynamic(() => import("@/components/ContactForm"));

export default function PricingContactWrapper() {
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
      <PricingSection onSelect={handlePlanSelect} />
      <div ref={contactRef}>
        <ContactForm selectedPlan={selectedPlan} />
      </div>
    </>
  );
}
