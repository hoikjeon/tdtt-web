"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import ContactForm from "@/components/ContactForm";

const PricingSection = dynamic(() => import("@/components/ui/pricing-section"));

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
