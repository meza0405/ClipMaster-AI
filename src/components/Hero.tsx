import { Sparkles, Play, Youtube, Instagram, ArrowRight, Video, Scissors, RefreshCw, BarChart2 } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  darkMode: boolean;
  onOpenPlayground: () => void;
  onOpenVideoDemo: () => void;
}

export default function Hero({ darkMode, onOpenPlayground, onOpenVideoDemo }: HeroProps) {
  // Float items configuration
  const floatingCards = [
    {
      id: 1,
      title: "Tech Podcast Clip",
      score: "99%",
      caption: "🚀 Custom hooks are a game changer!",
      speaker: "Gary V.",
      views: "1.4M",
      position: "top-12 left-6 lg:left-20",
      delay: 0,
      gradient: "from-purple-600/20 to-blue-600/20"
    },
    {
      id: 2,
      title: "Gaming Best Moments",
      score: "94%",
      caption: "🔥 Watch this insane 360 snipe!",
      speaker: "Shroud",
      views: "820K",
      position: "bottom-12 left-10 lg:left-24",
      delay: 1.5,
      gradient: "from-blue-600/20 to-cyan-600/20"
    },
    {
      id: 3,
      title: "Keynote Highlight",
      score: "97%",
      caption: "💡 The future of AI is collaborative",
      speaker: "Steve J.",
      views: "2.1M",
      position: "top-20 right-6 lg:right-20",
      delay: 0.8,
      gradient: "from-indigo-600/20 to-purple-600/20"
    },
    {
      id: 4,
      title: "Business Masterclass",
      score: "92%",
      caption: "🎯 Scale your business in 3 steps",
      speaker: "Alex H.",
      views: "540K",
      position: "bottom-20 right-10 lg:right-28",
      delay: 2.2,
      gradient: "from-pink-600/20 to-rose-600/20"
    }
  ];

  return (
    <section id="hero-section" className="relative pt-36 pb-24 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Dynamic blurred core background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] lg:w-[1000px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-primary/35 to-secondary/25 blur-[100px] sm:blur-[130px] rounded-full -z-10" />

      {/* Grid Pattern Background overlay */}
      <div className={`absolute inset-0 -z-10 opacity-35 ${
        darkMode 
          ? "bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)]" 
          : "bg-[linear-gradient(to_right,#e0e0f0_1px,transparent_1px),linear-gradient(to_bottom,#e0e0f0_1px,transparent_1px)]"
      } bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]`} />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
        {/* Sparkles pill banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8 ${
            darkMode ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"
          }`}
          id="hero-badge"
        >
          <Sparkles size={14} className="text-primary animate-pulse" />
          <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            ClipMaster V2 is Live with Autopilot Highlighting
          </span>
        </motion.div>

        {/* Hero Title */}
        <h1
          id="hero-title"
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.05]"
        >
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`block ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Turn Long Videos into
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary-light to-primary-light bg-[length:200%_auto] animate-gradient"
          >
            Viral Shorts with AI
          </motion.span>
        </h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          id="hero-subtitle"
          className={`text-base sm:text-xl max-w-3xl mx-auto mb-12 leading-relaxed ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Automatically detect the best moments, generate captions, and export videos for TikTok, YouTube Shorts, and Instagram Reels.
        </motion.p>

        {/* Hero CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:row sm:flex-row items-center justify-center gap-4 mb-16"
          id="hero-ctas"
        >
          <button
            onClick={onOpenPlayground}
            className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
          >
            Start Free Now
          </button>
          <button
            onClick={onOpenVideoDemo}
            className={`w-full sm:w-auto px-8 py-4 border rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01] ${
              darkMode
                ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                : "border-black/15 bg-black/5 text-gray-900 hover:bg-black/10"
            }`}
          >
            <Play size={18} fill="currentColor" /> Watch Demo
          </button>
        </motion.div>

        {/* Channels Integration Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex items-center justify-center gap-6 text-sm text-gray-500 font-medium pb-8"
        >
          <span>Compatible formats:</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 hover:text-red-500 transition-colors">
              <Youtube size={16} /> <span className="hidden sm:inline">YouTube Shorts</span>
            </div>
            <div className="flex items-center gap-1 hover:text-pink-500 transition-colors">
              <Instagram size={16} /> <span className="hidden sm:inline">Instagram Reels</span>
            </div>
            <div className="flex items-center gap-1 hover:text-purple-400 transition-colors">
              <Video size={16} /> <span className="hidden sm:inline">TikTok 9:16</span>
            </div>
          </div>
        </motion.div>

        {/* Floating cards decoration (visible on lg screens, hidden or streamlined on mobile) */}
        <div className="hidden lg:block">
          {floatingCards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay, duration: 0.8 }}
              className={`absolute p-4 rounded-2xl glass-panel w-64 text-left pointer-events-none select-none ${card.position} border-white/5`}
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> {card.speaker}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center gap-1">
                  <BarChart2 size={10} /> Viral: {card.score}
                </span>
              </div>
              <p className="text-xs font-bold text-white mb-2 leading-snug line-clamp-2">
                "{card.caption}"
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-[10px] font-mono text-primary-light">{card.title}</span>
                <span className="text-[10px] text-gray-500">{card.views} views</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
