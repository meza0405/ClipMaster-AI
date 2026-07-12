import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import DashboardMockup from "./components/DashboardMockup";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import { Play, X, Volume2, Sparkles, AlertCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [demoModalOpen, setDemoModalOpen] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(true);

  // Smooth scroll to playground section
  const handleScrollToPlayground = () => {
    const el = document.getElementById("playground");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? "bg-dark text-white selection:bg-primary/30" : "bg-[#fcfcfd] text-gray-900 selection:bg-primary/20"
    }`}>
      {/* Dynamic Header Notification Ribbon */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-to-r from-primary via-primary-dark to-secondary text-white text-xs font-bold py-2 px-6 flex items-center justify-between text-center relative z-50 overflow-hidden"
            id="promo-ribbon"
          >
            <div className="flex items-center gap-2 mx-auto justify-center">
              <Sparkles size={14} className="animate-spin-slow" />
              <span>ClipMaster AI V2 is live! Unlock auto-reframer, dual-speaker layout, and H100 cloud nodes.</span>
              <button
                onClick={handleScrollToPlayground}
                className="underline hover:opacity-80 transition-opacity ml-1.5 flex items-center gap-0.5"
              >
                Try live editor <ArrowRight size={10} />
              </button>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors shrink-0"
              title="Dismiss"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Navigation Bar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenPlayground={handleScrollToPlayground}
      />

      {/* Hero Header Section */}
      <Hero
        darkMode={darkMode}
        onOpenPlayground={handleScrollToPlayground}
        onOpenVideoDemo={() => setDemoModalOpen(true)}
      />

      {/* Interactive AI Playground Dashboard */}
      <DashboardMockup darkMode={darkMode} />

      {/* 12 Features Grid */}
      <Features darkMode={darkMode} />

      {/* Interactive 4-step Timeline */}
      <HowItWorks darkMode={darkMode} />

      {/* Pricing Tiers with dynamic billing switch */}
      <Pricing darkMode={darkMode} />

      {/* Social proof, Star Reviews & metrics */}
      <Testimonials darkMode={darkMode} />

      {/* Frequently Asked Questions */}
      <FAQ darkMode={darkMode} />

      {/* Footer Sitemap */}
      <Footer darkMode={darkMode} />

      {/* Immersive Video Demo Player Modal */}
      <AnimatePresence>
        {demoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setDemoModalOpen(false)}
              id="demo-modal-backdrop"
            />

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              className={`relative w-full max-w-4xl p-2 rounded-3xl border shadow-2xl z-10 overflow-hidden ${
                darkMode ? "bg-card border-white/10" : "bg-white border-black/10"
              }`}
              id="demo-modal-body"
            >
              <button
                onClick={() => setDemoModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                title="Close video"
              >
                <X size={16} />
              </button>

              {/* Simulated Premium Video Player */}
              <div className="aspect-video bg-slate-950 rounded-2xl relative overflow-hidden flex flex-col justify-between p-6">
                
                {/* Visual pulse radar scan to represent AI */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 pointer-events-none" />

                {/* Simulated playback interface */}
                <div className="flex justify-between items-start z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center animate-pulse">
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">ClipMaster AI Demo Workflow</h4>
                      <p className="text-[10px] text-gray-400 font-mono">01:45 • Ultra HD 4K</p>
                    </div>
                  </div>
                </div>

                {/* Play icon inside a glowing radar ring */}
                <div className="flex flex-col items-center justify-center gap-4 py-8 z-10">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 animate-pulse cursor-pointer hover:scale-105 transition-transform">
                    <Play size={28} fill="currentColor" className="ml-1" />
                  </div>
                  <span className="text-xs text-gray-300 font-bold tracking-wider uppercase bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                    Click to Play Interactive Presentation
                  </span>
                </div>

                {/* Control bar overlay */}
                <div className="flex items-center justify-between z-10 bg-black/40 p-3 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3 text-white">
                    <Play size={14} fill="currentColor" />
                    <Volume2 size={14} />
                    <span className="text-[10px] font-mono text-gray-300">0:14 / 1:45</span>
                  </div>

                  {/* Simulated audio waveform */}
                  <div className="flex items-center gap-1 h-4">
                    {[10, 40, 20, 80, 50, 90, 30, 70, 40, 10, 80, 50, 90, 20, 10].map((val, i) => (
                      <div key={i} className="w-1 bg-primary/60 rounded-full" style={{ height: `${val}%` }} />
                    ))}
                  </div>

                  <span className="text-[10px] font-bold text-emerald-400 font-mono">
                    ✓ Face Tracking Active
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
