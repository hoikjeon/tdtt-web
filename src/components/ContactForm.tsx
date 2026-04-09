"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Send, CheckCircle2, Loader2, Mail, User, MessageSquare } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
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
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
        ]);

      if (error) throw error;
      
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section className="bg-white py-32 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[3.5rem] md:text-[5rem] font-bold leading-[1.1] tracking-tighter mb-8">
              Let's create<br />something<br />extraordinary.
            </h2>
            <p className="text-gray-500 text-lg max-w-sm mb-12 leading-relaxed">
              프로젝트 문의나 제휴 제안이 있으신가요? <br />
              당신의 비전을 현실로 만드는 첫걸음을 함께하고 싶습니다.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-gray-800">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Inquiry</p>
                  <p className="font-medium">hello@tdtt.agency</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors duration-300">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-gray-200 py-4 pl-8 focus:outline-none focus:border-black transition-all duration-500 placeholder:text-gray-300 text-black text-lg"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="relative group">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors duration-300">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b border-gray-200 py-4 pl-8 focus:outline-none focus:border-black transition-all duration-500 placeholder:text-gray-300 text-black text-lg"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="relative group">
                <div className="absolute left-0 top-4 text-gray-400 group-focus-within:text-black transition-colors duration-300">
                  <MessageSquare size={18} />
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your project"
                  className="w-full bg-transparent border-b border-gray-200 py-4 pl-8 focus:outline-none focus:border-black transition-all duration-500 placeholder:text-gray-300 text-black text-lg resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`
                    group relative overflow-hidden px-8 py-5 rounded-full flex items-center justify-center gap-3 w-full md:w-fit
                    transition-all duration-500 font-bold tracking-tight text-lg
                    ${status === "success" 
                      ? "bg-green-500 text-white" 
                      : status === "error" 
                        ? "bg-red-500 text-white" 
                        : "bg-black text-white hover:bg-gray-800"
                    }
                  `}
                >
                  <AnimatePresence mode="wait">
                    {status === "loading" ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Loader2 className="animate-spin" size={20} />
                      </motion.div>
                    ) : status === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 size={20} />
                        <span>Submitted Successfully</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <span>Send Message</span>
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
