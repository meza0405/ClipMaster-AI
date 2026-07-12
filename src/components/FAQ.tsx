import { useState } from "react";
import { ChevronDown, HelpCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQProps {
  darkMode: boolean;
}

export default function FAQ({ darkMode }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What video formats are supported?",
      answer: "We support all common video containers including MP4, MOV, MKV, AVI, and WEBM. Additionally, you can paste public YouTube links, Twitch VODs, Google Drive links, or Zoom recordings, and our engine will import them directly into your library in seconds."
    },
    {
      question: "How fast is the AI video processing speed?",
      answer: "Extremely fast! Because ClipMaster AI offloads all visual parsing and rendering workloads to our high-performance cloud cluster (powered by NVIDIA H100 GPUs), a full 1-hour video takes less than 3 minutes to transcribe, highlight, and slice. Rendering a 1080p 60FPS vertical clip takes just under 5 seconds."
    },
    {
      question: "How accurate is the AI highlight detection and subtitle generator?",
      answer: "Our subtitle engine leverages the latest Whisper V3 speech models combined with custom spelling corrections, hitting a tested 99.2% accuracy. For highlight detection, our predictive engine scores transcript engagement hooks against real viral TikTok database analytics, ensuring you only receive high-potential clip highlights."
    },
    {
      question: "Are there any hidden fees or contract locks in pricing?",
      answer: "Absolutely not. ClipMaster AI operates on a standard subscription model. There are no setup fees, contract lock-ins, or hidden charges. You can upgrade, downgrade, or cancel your plan at any time directly through your billing settings panel."
    },
    {
      question: "Do I own full commercial rights over the exported video clips?",
      answer: "Yes, 100%! You retain full legal ownership, commercial distribution rights, and copyrights over every single video clip, subtitle transcription track, and asset rendered or processed through our platform. You are free to monetize your clips on TikTok, YouTube, Instagram, or anywhere else."
    }
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary tracking-widest uppercase mb-3 block">
            Common Questions
          </span>
          <h2 className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Frequently Asked Questions
          </h2>
          <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Got questions? We've got answers. If you don't find what you are looking for, reach out to our team.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4" id="faq-accordions">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? darkMode
                      ? "bg-card border-primary/30"
                      : "bg-white border-primary/25 shadow-md"
                    : darkMode
                      ? "bg-white/[0.02] border-white/5 hover:bg-white/5"
                      : "bg-black/[0.02] border-black/5 hover:bg-black/5"
                }`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg transition-colors select-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="text-primary shrink-0" size={18} />
                    <span className={darkMode ? "text-white" : "text-gray-900"}>{faq.question}</span>
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Answer Slide */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`p-6 pt-0 text-sm leading-relaxed border-t border-white/5 dark:border-white/5 light:border-black/5 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support Alert Callout */}
        <div className={`mt-12 p-6 rounded-2xl border flex items-center gap-4 ${
          darkMode ? "bg-white/[0.01] border-white/5" : "bg-black/[0.01] border-black/5"
        }`} id="faq-support-callout">
          <AlertCircle className="text-secondary-light shrink-0" size={20} />
          <span className={`text-xs leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Still have a custom technical question about our API or custom integrations? Our team of engineers is ready to answer. Contact us at <strong className="text-white underline">support@clipmaster.ai</strong> or join our developer Discord community.
          </span>
        </div>
      </div>
    </section>
  );
}
