"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Send, CheckCircle2, Loader2, Phone, User, Mail, MessageSquare } from "lucide-react";

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
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
          },
        ]);

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
    <section id="contact" className="relative bg-[#fbfbfb] py-24 md:py-40 px-6 overflow-hidden">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gray-50/50 rounded-bl-[10rem] -z-10" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6 mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#FF5733] font-bold tracking-[.3em] text-xs uppercase"
          >
            GET IN TOUCH
          </motion.p>
          <div className="flex justify-center">
            <div className="relative inline-block overflow-hidden">
               <span className="text-4xl md:text-6xl font-black text-gray-200 tracking-tighter block whitespace-nowrap">
                성장을 위한 첫 걸음.
              </span>
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as any }}
                className="absolute top-0 left-0 text-4xl md:text-6xl font-black text-[#121212] tracking-tighter overflow-hidden block border-r-[3px] border-[#FF5733] pr-[2px] whitespace-nowrap"
              >
                성장을 위한 첫 걸음.
              </motion.span>
            </div>
          </div>
          <p className="text-gray-500 font-medium text-lg md:text-xl max-w-xl mx-auto">
            비전을 현실로 만드는 가장 확실한 파트너. <br className="hidden md:block" />
            <span className="text-[#121212] font-bold">지금 바로 문의하세요.</span>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_32px_128px_rgba(0,0,0,0.06)] border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Name Field */}
              <div className="relative group">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">성함</label>
                <div className="relative">
                  <User className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF5733] transition-colors" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="성함을 입력해 주세요"
                    className="w-full bg-transparent border-b-2 border-gray-100 py-4 pl-8 focus:outline-none focus:border-[#FF5733] transition-all duration-500 placeholder:text-gray-200 text-[#121212] font-bold text-lg"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="relative group">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">연락처</label>
                <div className="relative">
                  <Phone className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF5733] transition-colors" size={18} />
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    className="w-full bg-transparent border-b-2 border-gray-100 py-4 pl-8 focus:outline-none focus:border-[#FF5733] transition-all duration-500 placeholder:text-gray-200 text-[#121212] font-bold text-lg"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="relative group">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">이메일</label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF5733] transition-colors" size={18} />
                <input
                  type="email"
                  required
                  placeholder="이메일 주소를 입력해 주세요"
                  className="w-full bg-transparent border-b-2 border-gray-100 py-4 pl-8 focus:outline-none focus:border-[#FF5733] transition-all duration-500 placeholder:text-gray-200 text-[#121212] font-bold text-lg"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="relative group">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">문의 내용</label>
              <div className="relative">
                <MessageSquare className="absolute left-0 top-4 text-gray-300 group-focus-within:text-[#FF5733] transition-colors" size={18} />
                <textarea
                  required
                  rows={4}
                  placeholder="상담 내용을 자유롭게 적어주세요."
                  className="w-full bg-transparent border-b-2 border-gray-100 py-4 pl-8 focus:outline-none focus:border-[#FF5733] transition-all duration-500 placeholder:text-gray-200 text-[#121212] font-bold text-lg resize-none leading-relaxed"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-8 flex justify-center">
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`
                  group relative overflow-hidden px-12 py-6 rounded-3xl flex items-center justify-center gap-3 w-full md:w-fit
                  transition-all duration-500 font-black tracking-tight text-xl shadow-2xl
                  ${status === "success" 
                    ? "bg-green-500 text-white" 
                    : status === "error" 
                      ? "bg-red-500 text-white" 
                      : "bg-[#121212] text-white hover:bg-[#FF5733] hover:scale-105"
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
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="animate-spin" size={24} />
                      <span>보내는 중...</span>
                    </motion.div>
                  ) : status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 size={24} />
                      <span>문의가 성공적으로 전달되었습니다!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3"
                    >
                      <span>상담 신청하기</span>
                      <Send size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
