import { useState, useEffect } from "react";
import { 
  UploadCloud, Brain, Scissors, Share2, 
  Play, Sparkles, Check, ArrowRight,
  TrendingUp, RefreshCw, BarChart2, Video
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HowItWorksProps {
  darkMode: boolean;
}

export default function HowItWorks({ darkMode }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState<number>(1);

  // Auto rotate steps for a dynamic experience unless hovered/clicked
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev % 4) + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      id: 1,
      title: "Upload Your Video",
      desc: "Drop your podcast, live stream, Zoom recording, or YouTube link into our simple cloud uploader. Supports MP4, MOV, MKV, and direct URLs.",
      icon: <UploadCloud size={20} />,
      badge: "Fast Upload"
    },
    {
      id: 2,
      title: "AI Analyzes Content",
      desc: "ClipMaster scans audio patterns, facial motion, and visual context to transcribe speech, detect speakers, and extract the most hook-worthy segments.",
      icon: <Brain size={20} />,
      badge: "Auto-Detection"
    },
    {
      id: 3,
      title: "Choose the Best Clips",
      desc: "Browse a gallery of detected highlights sorted by viral coefficient scores. Apply predesigned templates, subtitles styles, and custom speaker tracking layout.",
      icon: <Scissors size={20} />,
      badge: "Creator Studio"
    },
    {
      id: 4,
      title: "Download or Publish",
      desc: "Export in ultra-sharp 1080p or link your social credentials to publish directly to TikTok, YouTube Shorts, and Instagram Reels with one single click.",
      icon: <Share2 size={20} />,
      badge: "Instant Share"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-3 block">
            Seamless Workflow
          </span>
          <h2 className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Turn long videos to viral shorts in 4 steps
          </h2>
          <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Our automated, smart pipeline handles the heavy lifting, saving you hours of tedious timeline video editing.
          </p>
        </div>

        {/* Timeline Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side: Interactive Step Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {steps.map((step) => {
              const isActive = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 flex gap-4 items-start relative overflow-hidden ${
                    isActive
                      ? darkMode
                        ? "bg-card border-primary/40 text-white shadow-lg shadow-primary/5"
                        : "bg-white border-primary/30 text-gray-900 shadow-md"
                      : darkMode
                        ? "bg-white/[0.02] border-white/5 text-gray-400 hover:bg-white/5"
                        : "bg-black/[0.02] border-black/5 text-gray-600 hover:bg-black/5"
                  }`}
                >
                  {/* Left accent bar on active card */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary to-secondary" />
                  )}

                  {/* Step Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive 
                      ? "bg-primary text-white" 
                      : darkMode ? "bg-white/5 text-gray-400" : "bg-black/5 text-gray-600"
                  }`}>
                    {step.icon}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                        isActive ? "text-primary-light" : "text-gray-500"
                      }`}>
                        Step 0{step.id}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive 
                          ? "bg-primary/20 text-primary-light" 
                          : darkMode ? "bg-white/5 text-gray-500" : "bg-black/5 text-gray-500"
                      }`}>
                        {step.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-1 tracking-tight">{step.title}</h3>
                    <p className={`text-xs leading-relaxed ${
                      isActive 
                        ? darkMode ? "text-gray-300" : "text-gray-600"
                        : "text-gray-500"
                    }`}>
                      {step.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side: Step Visualizer Mockups */}
          <div className="lg:col-span-7 h-[420px] relative flex items-center justify-center">
            {/* Visual Screen Frame */}
            <div className={`w-full h-full rounded-3xl border p-4 flex flex-col overflow-hidden relative ${
              darkMode ? "bg-card/90 border-white/10" : "bg-white border-black/10"
            }`}>
              {/* Fake Window Controls */}
              <div className="flex items-center gap-1.5 border-b pb-3 mb-4 border-white/5 dark:border-white/5 light:border-black/5 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className={`text-[11px] font-mono ml-3 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  clipmaster.ai/engine/workspace_v2
                </span>
              </div>

              {/* Step Visualization Content */}
              <div className="flex-grow flex items-center justify-center relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full flex flex-col items-center p-6 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 border border-dashed border-primary animate-pulse">
                        <UploadCloud size={32} />
                      </div>
                      <h4 className="font-bold text-lg">Drag & Drop Long Video</h4>
                      <p className={`text-xs max-w-sm mt-1.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Drop files here, paste a YouTube link, or import directly from Google Drive.
                      </p>
                      
                      {/* Fake upload progress card */}
                      <div className={`mt-6 w-full max-w-xs p-3.5 rounded-xl border text-left ${
                        darkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
                      }`}>
                        <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                          <span className="text-gray-400 truncate max-w-[180px]">keynote_full_podcast_2026.mp4</span>
                          <span className="text-primary font-bold">78%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 dark:bg-white/10 light:bg-black/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-primary to-secondary w-[78%]" />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-gray-500 mt-2">
                          <span>182.4 MB of 234.5 MB</span>
                          <span>12.4 MB/s</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full h-full flex flex-col justify-center items-center p-6 text-center"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                        <Brain size={28} className="animate-bounce" />
                      </div>
                      <h4 className="font-bold text-lg flex items-center gap-1.5">
                        AI Scanning Track <Sparkles size={16} className="text-amber-400 animate-pulse" />
                      </h4>
                      <p className={`text-xs max-w-sm mt-1.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Transcribing dialogue tracks and mapping peak acoustic and facial motion vectors.
                      </p>

                      {/* Waveform analyzer */}
                      <div className="flex items-end justify-center gap-1.5 h-16 w-full max-w-xs mt-6">
                        {[40, 20, 60, 90, 45, 10, 30, 85, 100, 75, 40, 60, 20, 80, 50, 95, 30, 10].map((val, idx) => (
                          <div
                            key={idx}
                            className="w-2.5 bg-gradient-to-t from-primary to-secondary rounded-full"
                            style={{
                              height: `${val}%`,
                              animation: `pulse 1s ease-in-out infinite alternate`,
                              animationDelay: `${idx * 0.05}s`
                            }}
                          />
                        ))}
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <RefreshCw size={12} className="animate-spin text-primary" />
                        <span className="text-[11px] font-mono text-gray-400">Detecting dynamic voice overlays...</span>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full h-full flex flex-col justify-center p-2"
                    >
                      <h4 className="font-bold text-sm mb-3 text-center">AI Extracted Clip Highlights (Sorted by Virality)</h4>
                      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                        <div className={`p-3 rounded-xl border flex flex-col justify-between ${
                          darkMode ? "bg-white/5 border-primary/30" : "bg-black/5 border-primary/30"
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                              <TrendingUp size={8} /> 98% Score
                            </span>
                            <span className="text-[9px] text-gray-500">00:15s</span>
                          </div>
                          <p className="text-[11px] font-bold text-left mb-3">"Don't build features without a core problem..."</p>
                          <button className="py-1 bg-primary text-white font-semibold text-[10px] rounded-lg">Preview Clip</button>
                        </div>

                        <div className={`p-3 rounded-xl border flex flex-col justify-between opacity-70 ${
                          darkMode ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                              <TrendingUp size={8} /> 94% Score
                            </span>
                            <span className="text-[9px] text-gray-500">00:22s</span>
                          </div>
                          <p className="text-[11px] font-bold text-left mb-3">"We solved the scaling challenge by migrating..."</p>
                          <button className="py-1 bg-white/10 text-white font-semibold text-[10px] rounded-lg">Preview Clip</button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 4 && (
                    <motion.div
                      key="step-4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full flex flex-col items-center p-6 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                        <Check size={32} className="animate-pulse" />
                      </div>
                      <h4 className="font-bold text-lg">Clip Mastered Successfully!</h4>
                      <p className={`text-xs max-w-sm mt-1.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        High definition MP4 render fully compiled and ready.
                      </p>

                      <div className="flex gap-2.5 mt-6 w-full max-w-xs">
                        <button className="flex-1 py-2.5 bg-primary text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1">
                          <Share2 size={12} /> Publish Live
                        </button>
                        <button className={`flex-1 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1 border ${
                          darkMode ? "border-white/15 bg-white/5 text-white" : "border-black/15 bg-black/5 text-gray-900"
                        }`}>
                          Download MP4
                        </button>
                      </div>

                      <div className="flex justify-center gap-4 mt-6">
                        {["TikTok", "YouTube Shorts", "Instagram"].map((platform) => (
                          <div key={platform} className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {platform} Connected
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
