"use client";

import React, { ElementType, RefObject } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineContentProps {
  children?: React.ReactNode;
  className?: string;
  as?: ElementType;
  animationNum?: number;
  timelineRef?: RefObject<HTMLElement | null>;
  customVariants?: Variants;
}

export function TimelineContent({
  children,
  className,
  customVariants,
}: TimelineContentProps) {
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const variants = customVariants || defaultVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
