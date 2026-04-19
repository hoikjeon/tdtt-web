"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Send, CheckCircle2, Loader2, ArrowUpRight } from "lucide-react";

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 font-medium text-base focus:outline-none focus:border-[#FF5733]/60 focus:bg-white/8 transition-all duration-300";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { error } = await supabase
        .from("contacts")
        .insert([{ name: formData.name, phone: formData.phone, email: formData.email, message: formData.message }]);

      if (error) throw error;

      setStatus("success");
      setFormData({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative bg-[#0d0d0d] overflow-hidden">

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#FF5733]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">

          {/* ── Left Panel ── */}
          <div className="space-y-12 lg:sticky lg:top-32">

            {/* Tag */}
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-[#FF5733] font-bold tracking-[.3em] text-xs uppercase"
            >
              <span className="w-4 h-px bg-[#FF5733] inline-block" />
              GET IN TOUCH
            </motion.p>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[1.05]"
              >
                성장을 위한<br />
                <span className="text-[#FF5733]">첫 걸음.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/40 text-lg leading-relaxed max-w-sm"
              >
                비전을 현실로 만드는 가장 확실한 파트너.<br />지금 바로 문의하세요.
              </motion.p>
            </div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4 pt-4 border-t border-white/8"
            >
              {[
                { label: "Email", value: "hibestme2@naver.com", href: "mailto:hibestme2@naver.com" },
                { label: "Phone", value: "010-8522-9499", href: "tel:010-8522-9499" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center justify-between py-3"
                >
                  <div>
                    <p className="text-white/25 text-[10px] font-bold tracking-[.25em] uppercase mb-0.5">{item.label}</p>
                    <p className="text-white/70 group-hover:text-white text-sm font-medium transition-colors duration-200">{item.value}</p>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-[#FF5733] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right Panel — Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Row: name + phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-white/30 text-[10px] font-bold tracking-[.25em] uppercase pl-1">성함</label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    className={inputClass}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white/30 text-[10px] font-bold tracking-[.25em] uppercase pl-1">연락처</label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    className={inputClass}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-white/30 text-[10px] font-bold tracking-[.25em] uppercase pl-1">이메일</label>
                <input
                  type="email"
                  required
                  placeholder="email@example.com"
                  className={inputClass}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-white/30 text-[10px] font-bold tracking-[.25em] uppercase pl-1">문의 내용</label>
                <textarea
                  required
                  rows={6}
                  placeholder="어떤 프로젝트를 구상 중이신지 자유롭게 적어주세요."
                  className={`${inputClass} resize-none leading-relaxed`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`
                    group relative w-full overflow-hidden rounded-2xl py-5 flex items-center justify-center gap-3
                    font-black tracking-tight text-lg transition-all duration-500
                    ${status === "success"
                      ? "bg-green-500 text-white"
                      : status === "error"
                        ? "bg-red-500/80 text-white"
                        : "bg-[#FF5733] text-white hover:bg-[#ff3d14]"
                    }
                  `}
                >
                  {/* Shine sweep */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <AnimatePresence mode="wait">
                    {status === "loading" ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={20} />
                        <span>보내는 중...</span>
                      </motion.div>
                    ) : status === "success" ? (
                      <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2">
                        <CheckCircle2 size={20} />
                        <span>문의가 성공적으로 전달되었습니다!</span>
                      </motion.div>
                    ) : (
                      <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                        <span>상담 신청하기</span>
                        <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
