import { useState } from "react";
import { 
  Sparkles, MessageSquare, Target, VolumeX, 
  Flame, Mic, ZoomIn, Smile, 
  Languages, Download, Share2, Server,
  Cpu, Filter, Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FeaturesProps {
  darkMode: boolean;
}

export default function Features({ darkMode }: FeaturesProps) {
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "edit" | "dist">("all");

  const categories = [
    { id: "all", name: "All Features", icon: <Filter size={14} /> },
    { id: "ai", name: "AI Engines", icon: <Cpu size={14} /> },
    { id: "edit", name: "Precision Editing", icon: <Target size={14} /> },
    { id: "dist", name: "Cloud & Export", icon: <Server size={14} /> }
  ];

  const features = [
    {
      id: "ai-detect",
      title: "AI Highlight Detection",
      desc: "Our neural network analyzes video transcripts, sentiment, and voice spikes to locate peak engagement moments instantly.",
      icon: <Sparkles className="text-purple-400" size={24} />,
      cat: "ai",
      badge: "GPT-4o Powered"
    },
    {
      id: "auto-sub",
      title: "Auto Subtitle Generation",
      desc: "Generates 99.2% accurate timestamps and word-by-word synchronizations with stylish animations inspired by modern creators.",
      icon: <MessageSquare className="text-blue-400" size={24} />,
      cat: "ai",
      badge: "Whisper V3"
    },
    {
      id: "face-track",
      title: "Face Tracking & Auto Reframing",
      desc: "Intelligently pans and zooms to keep speakers centered in vertical 9:16 aspect ratio grids without manual crop-points.",
      icon: <Target className="text-pink-400" size={24} />,
      cat: "edit",
      badge: "Computer Vision"
    },
    {
      id: "silence-rem",
      title: "Silence Removal",
      desc: "Slices out dead air, filler words (ums, errs, likes), and pauses in milliseconds to make the pacing lightning-fast.",
      icon: <VolumeX className="text-cyan-400" size={24} />,
      cat: "edit",
      badge: "Smart-Cut"
    },
    {
      id: "viral-mom",
      title: "Viral Moment Detection",
      desc: "Scores every clip against thousands of top-performing TikToks to assign a viral prediction index and category prediction.",
      icon: <Flame className="text-amber-400" size={24} />,
      cat: "ai",
      badge: "Predictive Analytics"
    },
    {
      id: "speaker-det",
      title: "Speaker Detection",
      desc: "Differentiates voices to support dynamic dual-speaker splits, switching layouts automatically based on active speech.",
      icon: <Mic className="text-teal-400" size={24} />,
      cat: "ai",
      badge: "Voice Diarization"
    },
    {
      id: "auto-zoom",
      title: "Auto Zoom Effects",
      desc: "Simulates manual camera punches and cinematic slides during punchy sentences to keep the viewer completely hooked.",
      icon: <ZoomIn className="text-rose-400" size={24} />,
      cat: "edit",
      badge: "Visual Flow"
    },
    {
      id: "emoji-captions",
      title: "Emoji Captions",
      desc: "Uses natural language models to automatically insert relevant high-impact emojis exactly aligned with corresponding keywords.",
      icon: <Smile className="text-yellow-400" size={24} />,
      cat: "edit",
      badge: "Context-Aware"
    },
    {
      id: "multi-lang",
      title: "Multiple Languages",
      desc: "Supports translation and subtitling across 54 global languages, expanding your local audience to global viewers.",
      icon: <Languages className="text-indigo-400" size={24} />,
      cat: "dist",
      badge: "Global Engine"
    },
    {
      id: "hd-export",
      title: "1080p Export",
      desc: "Render high-definition, crystal-clear 60FPS vertical videos instantly optimized with balanced bitrate encoding presets.",
      icon: <Download className="text-green-400" size={24} />,
      cat: "dist",
      badge: "Pro Render"
    },
    {
      id: "direct-upload",
      title: "Direct Upload to Social Media",
      desc: "Link your accounts to push finished clips directly to YouTube Shorts, TikTok, and Reels with single-click scheduling.",
      icon: <Share2 className="text-violet-400" size={24} />,
      cat: "dist",
      badge: "API Integrations"
    },
    {
      id: "cloud-proc",
      title: "Cloud Processing",
      desc: "Offload massive video files to our scalable GPU cluster. Render long videos in seconds without battery drainage.",
      icon: <Server className="text-blue-500" size={24} />,
      cat: "dist",
      badge: "H100 Nodes"
    }
  ];

  const filteredFeatures = activeTab === "all" 
    ? features 
    : features.filter(f => f.cat === activeTab);

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background radial soft light blobs */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold text-primary tracking-widest uppercase mb-3"
          >
            Capabilities Grid
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Everything you need to go viral
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            State-of-the-art AI video processing nodes custom built for modern social media creators.
          </motion.p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12" id="features-category-tabs">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg shadow-primary/25 scale-[1.02]"
                  : darkMode
                    ? "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white"
                    : "bg-black/5 text-gray-600 border border-black/5 hover:bg-black/10 hover:text-black"
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Features Card Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          id="features-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredFeatures.map((feature, idx) => (
              <motion.div
                layout
                key={feature.id}
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col group ${
                  darkMode
                    ? "bg-card hover:bg-card-light/90 border-white/5 hover:border-primary/40 text-white"
                    : "bg-white hover:bg-gray-50 border-black/5 hover:border-primary/30 text-gray-900"
                }`}
                style={{
                  boxShadow: darkMode 
                    ? "0 4px 30px rgba(0, 0, 0, 0.2)" 
                    : "0 10px 35px rgba(0, 0, 0, 0.03)"
                }}
              >
                {/* Icon Circle */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${
                  darkMode ? "bg-white/5" : "bg-black/5"
                }`}>
                  {feature.icon}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
                  <span className={`text-[10px] px-2 py-0.5 font-mono rounded-full ${
                    darkMode ? "bg-primary/20 text-primary-light" : "bg-primary/10 text-primary"
                  }`}>
                    {feature.badge}
                  </span>
                </div>

                <p className={`text-sm leading-relaxed ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  {feature.desc}
                </p>

                {/* Arrow visual hover anchor */}
                <div className="mt-6 pt-4 border-t border-white/5 dark:border-white/5 light:border-black/5 flex items-center text-xs font-semibold text-primary group-hover:text-primary-light transition-colors">
                  <Check size={14} className="mr-1.5" /> Activated in Standard App
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
