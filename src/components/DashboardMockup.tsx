import { useState, useEffect, useRef } from "react";
import { 
  Play, Pause, Sparkles, Sliders, Layers, 
  Download, RefreshCw, Plus, ChevronRight, Check,
  Volume2, Settings, Scissors, MessageSquare, Flame, 
  Smile, AlignLeft, Eye, Grid, Video, Laptop, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DashboardMockupProps {
  darkMode: boolean;
}

export default function DashboardMockup({ darkMode }: DashboardMockupProps) {
  // Preloaded interactive datasets
  const mockVideos = [
    {
      id: "saas-scale",
      name: "SaaS Scaling Masterclass.mp4",
      duration: "10:24",
      size: "142 MB",
      highlights: [
        {
          id: "clip-1",
          title: "The Problem-First Rule",
          duration: "10s",
          viralScore: 99,
          label: "Extreme Hook",
          speaker: "Alex Hormozi",
          sceneX: -25, // speaker on the left in original 16:9
          subtitles: [
            { id: 1, start: 0, end: 3, text: "You have to build for a real problem. 🎯" },
            { id: 2, start: 3, end: 6, text: "If you don't solve a core pain point..." },
            { id: 3, start: 6, end: 10, text: "Nobody is going to buy your product. 💰" }
          ]
        },
        {
          id: "clip-2",
          title: "Pricing is Your Leverage",
          duration: "12s",
          viralScore: 95,
          label: "High Value",
          speaker: "Alex Hormozi",
          sceneX: 20, // speaker on the right in original 16:9
          subtitles: [
            { id: 1, start: 0, end: 4, text: "Double your pricing tomorrow morning. 📈" },
            { id: 2, start: 4, end: 8, text: "You will filter out the bad clients..." },
            { id: 3, start: 8, end: 12, text: "And fund elite product development!" }
          ]
        },
        {
          id: "clip-3",
          title: "The Retargeting Secret",
          duration: "8s",
          viralScore: 91,
          label: "Growth Hack",
          speaker: "Alex Hormozi",
          sceneX: 0,
          subtitles: [
            { id: 1, start: 0, end: 4, text: "Stop burning ad budget on cold traffic. 💸" },
            { id: 2, start: 4, end: 8, text: "Nurture your active leads automatically." }
          ]
        }
      ]
    },
    {
      id: "vr-review",
      name: "VR Headset Launch Review.mp4",
      duration: "08:15",
      size: "98 MB",
      highlights: [
        {
          id: "vr-clip-1",
          title: "Lenses and Liquid Vision",
          duration: "10s",
          viralScore: 98,
          label: "Mind Blowing",
          speaker: "Marques Brownlee",
          sceneX: -30,
          subtitles: [
            { id: 1, start: 0, end: 3, text: "Look at the resolution on these lenses! 🕶️" },
            { id: 2, start: 3, end: 6, text: "It feels like physical reality is melting." },
            { id: 3, start: 6, end: 10, text: "We are officially living in the future. 🚀" }
          ]
        },
        {
          id: "vr-clip-2",
          title: "The Pass-Through Weight Check",
          duration: "9s",
          viralScore: 93,
          label: "Hardware Insight",
          speaker: "Marques Brownlee",
          sceneX: 25,
          subtitles: [
            { id: 1, start: 0, end: 4, text: "The pass-through latency is under 12ms. ⚡" },
            { id: 2, start: 4, end: 9, text: "But the battery weight feels quite heavy." }
          ]
        }
      ]
    }
  ];

  // Active States
  const [selectedVideo, setSelectedVideo] = useState(mockVideos[0]);
  const [selectedClip, setSelectedClip] = useState(mockVideos[0].highlights[0]);
  
  // Player Controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [playerTime, setPlayerTime] = useState(0);
  const [isReframingActive, setIsReframingActive] = useState(true);
  const [isAutoZoomActive, setIsAutoZoomActive] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState("beast"); // beast, minimal, neon
  const [captionLanguage, setCaptionLanguage] = useState("en");
  const [showEmojis, setShowEmojis] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [reAnalyzing, setReAnalyzing] = useState(false);
  const [analyzeStep, setAnalyzeStep] = useState(0);
  const [analyzeLogs, setAnalyzeLogs] = useState<string[]>([]);

  // Video Timeline looping simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayerTime((prev) => {
          const maxSeconds = selectedClip.subtitles[selectedClip.subtitles.length - 1].end;
          if (prev >= maxSeconds) {
            return 0; // loop
          }
          return prev + 0.5;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedClip]);

  // Reset progress when changing clip
  useEffect(() => {
    setPlayerTime(0);
  }, [selectedClip]);

  // Find active subtitle text based on current simulated playerTime
  const activeSub = selectedClip.subtitles.find(
    (sub) => playerTime >= sub.start && playerTime < sub.end
  );

  // Trigger simulated AI Analysis
  const runAIAnalysis = () => {
    setReAnalyzing(true);
    setAnalyzeStep(0);
    setAnalyzeLogs([]);
    
    const logs = [
      "🔄 Initializing audio pipeline... decoding linear channels",
      "📝 Running Whisper V3 acoustic speaker transcription...",
      "🤖 Mapping natural conversation hooks with GPT-4o metrics...",
      "🎯 Computing speaker coordinates & tracking face bounding box...",
      "🔥 Generating high-engagement emoji matches and clip tags...",
      "✅ Process complete! Loaded 3 premium viral clips."
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < logs.length) {
        setAnalyzeLogs((prev) => [...prev, logs[current]]);
        setAnalyzeStep((current + 1) * 16.6);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setReAnalyzing(false);
        }, 800);
      }
    }, 600);
  };

  // Trigger simulated export
  const handleExport = () => {
    setExporting(true);
    setExportProgress(0);
    
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            alert("🎉 Clip masterfully compiled! Your 1080p viral short is ready for download.");
            setExporting(false);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  // Handle video selection change
  const handleVideoChange = (videoId: string) => {
    const video = mockVideos.find((v) => v.id === videoId);
    if (video) {
      setSelectedVideo(video);
      setSelectedClip(video.highlights[0]);
    }
  };

  // Subtitle custom styles presets
  const styleTemplates = [
    {
      id: "beast",
      name: "Beast Bold",
      desc: "Yellow font, heavy borders, highly visible, fast impact",
      cssClass: "font-display font-black text-yellow-300 text-2xl uppercase tracking-wider select-none text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] stroke-black",
      style: { WebkitTextStroke: "1.5px black" }
    },
    {
      id: "minimal",
      name: "Slate Minimalist",
      desc: "Clean white sans, dark pill container, eye-friendly",
      cssClass: "font-sans font-semibold text-white text-base bg-black/75 px-4 py-2 rounded-xl select-none text-center",
      style: {}
    },
    {
      id: "neon",
      name: "TikTok Neon",
      desc: "Cyberpunk purple and lime green dynamic outlines",
      cssClass: "font-mono font-bold text-green-300 text-xl uppercase tracking-tight select-none text-center drop-shadow-[0_0_10px_#8b5cf6]",
      style: { textShadow: "0 0 8px #8b5cf6, 0 0 15px #7c3aed" }
    }
  ];

  const currentStyleTemplate = styleTemplates.find((t) => t.id === selectedStyle) || styleTemplates[0];

  return (
    <section id="playground" className="py-24 relative bg-gradient-to-b from-dark via-[#08080f] to-dark border-y border-white/5">
      {/* Background flare */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary tracking-widest uppercase mb-3 block">
            Interactive Simulator
          </span>
          <h2 className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Play with the AI Video Editor
          </h2>
          <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Don't take our word for it. Try our fully interactive editing playground right here and watch face-tracking and dynamic captioning in action.
          </p>
        </div>

        {/* Workspace Layout */}
        <div className={`rounded-3xl border shadow-2xl p-6 lg:p-8 flex flex-col lg:grid lg:grid-cols-12 gap-8 relative overflow-hidden ${
          darkMode ? "bg-card/95 border-white/10" : "bg-white border-black/10"
        }`} id="playground-container">
          
          {/* Neon Top Edge Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

          {/* LEFT PANEL: Media & Clip Selector (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-white/5 pb-6 lg:pb-0 lg:pr-6">
            <div>
              <label className={`block text-xs font-bold mb-2 uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Source Project
              </label>
              <select
                value={selectedVideo.id}
                onChange={(e) => handleVideoChange(e.target.value)}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold outline-none border ${
                  darkMode ? "bg-white/5 border-white/10 text-white" : "bg-black/5 border-black/10 text-gray-900"
                }`}
              >
                {mockVideos.map((vid) => (
                  <option key={vid.id} value={vid.id} className={darkMode ? "bg-card text-white" : "bg-white text-gray-900"}>
                    {vid.name} ({vid.duration})
                  </option>
                ))}
              </select>
            </div>

            {/* Run AI Re-analysis button */}
            <button
              onClick={runAIAnalysis}
              disabled={reAnalyzing}
              className={`w-full py-2 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                reAnalyzing
                  ? "bg-white/5 border-white/10 text-gray-400"
                  : "border-primary/20 bg-primary/5 text-primary-light hover:bg-primary/10 hover:border-primary/40"
              }`}
            >
              <RefreshCw size={12} className={reAnalyzing ? "animate-spin" : ""} />
              {reAnalyzing ? "AI Analyzing..." : "Re-Run AI Highlighting"}
            </button>

            {/* AI Detected Highlights list */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  AI Detected Clips ({selectedVideo.highlights.length})
                </label>
                <Sparkles size={12} className="text-amber-400" />
              </div>

              <div className="flex flex-col gap-2.5 max-h-[220px] overflow-y-auto">
                {selectedVideo.highlights.map((highlight) => {
                  const isSelected = selectedClip.id === highlight.id;
                  return (
                    <button
                      key={highlight.id}
                      onClick={() => setSelectedClip(highlight)}
                      className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between relative overflow-hidden group ${
                        isSelected
                          ? "bg-primary/10 border-primary/50 text-white"
                          : darkMode
                            ? "bg-white/[0.02] border-white/5 hover:bg-white/5 text-gray-300"
                            : "bg-black/[0.02] border-black/5 hover:bg-black/5 text-gray-800"
                      }`}
                    >
                      {/* Active border accent indicator */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                      )}

                      <div className="flex items-center justify-between mb-1.5 w-full">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-0.5 font-bold ${
                          highlight.viralScore >= 95 
                            ? "bg-emerald-500/10 text-emerald-400" 
                            : "bg-amber-500/10 text-amber-400"
                        }`}>
                          <Flame size={10} className="fill-current" /> Viral: {highlight.viralScore}%
                        </span>
                        <span className="text-[10px] font-mono text-gray-500">{highlight.duration}</span>
                      </div>

                      <h4 className="text-xs font-bold leading-snug group-hover:text-primary-light transition-colors mb-1 truncate">
                        {highlight.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 line-clamp-1 italic">
                        "{highlight.subtitles[0]?.text}"
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MIDDLE PANEL: 9:16 Vertical Video Player Mockup (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5 pb-6 lg:pb-0 lg:pr-6">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full ${
                darkMode ? "bg-white/5 text-gray-400" : "bg-black/5 text-gray-600"
              }`}>
                Active Speaker: {selectedClip.speaker}
              </span>
              <span className="text-[10px] bg-red-500/10 text-red-500 font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" /> LIVE PREVIEW
              </span>
            </div>

            {/* Simulated 9:16 Frame */}
            <div className="w-[250px] h-[440px] rounded-3xl bg-black border-4 border-gray-800 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              {/* Top notch detail */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-900 rounded-full z-30" />

              {/* Speaker Scene Container */}
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                {/* Simulated 16:9 widescreen canvas which pans left/right behind the 9:16 mask */}
                <div
                  className="w-[450px] h-[250px] bg-gradient-to-r from-indigo-900/60 via-purple-900/70 to-slate-900/80 relative rounded-lg transition-transform duration-700 ease-out flex items-center justify-center"
                  style={{
                    transform: isReframingActive
                      ? `translateX(${-selectedClip.sceneX}px) scale(${isAutoZoomActive ? (playerTime > 4 && playerTime < 8 ? 1.25 : 1.1) : 1})`
                      : `translateX(0px) scale(1)`,
                  }}
                >
                  {/* Grid overlay inside the canvas */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                  {/* Speaker Face Silhouette Character */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      {/* Speaker avatar / symbol */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 via-primary to-secondary flex items-center justify-center shadow-2xl border-2 border-white/20 animate-pulse-slow">
                        <Smile size={32} className="text-white" />
                      </div>
                      {/* Computer Vision Speaker detection focus square */}
                      {isReframingActive && (
                        <div className="absolute -inset-2 border border-emerald-500/50 rounded-lg animate-pulse flex items-start justify-end p-0.5">
                          <span className="text-[7px] font-mono text-emerald-400 bg-black/80 px-1 py-0.2 rounded font-bold">FOCUS</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-bold font-mono text-white/90 mt-2 bg-black/40 px-2 py-0.5 rounded-full">
                      {selectedClip.speaker}
                    </span>
                  </div>

                  {/* Original video edge markers when reframing is off */}
                  {!isReframingActive && (
                    <div className="absolute inset-x-0 bottom-2 text-center text-[8px] text-red-400 font-mono font-semibold bg-black/50 py-1">
                      ⚠️ Speaker off-frame. Turn Auto-Reframe on!
                    </div>
                  )}
                </div>
              </div>

              {/* Watermark brand tag */}
              <div className="absolute top-10 left-4 z-20 flex items-center gap-1.5 opacity-85 pointer-events-none">
                <div className="w-5 h-5 bg-primary rounded-md flex items-center justify-center">
                  <Play size={10} fill="white" className="text-white" />
                </div>
                <span className="text-[10px] font-bold text-white tracking-wider">ClipMaster AI</span>
              </div>

              {/* Side reaction icons panel (TikTok overlay simulation) */}
              <div className="absolute right-3.5 bottom-28 z-20 flex flex-col gap-4 items-center text-white/90">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform">
                    <Flame size={16} className="text-red-500" />
                  </div>
                  <span className="text-[9px] mt-0.5 font-bold font-mono text-white/80">98.4K</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform">
                    <MessageSquare size={16} className="text-white" />
                  </div>
                  <span className="text-[9px] mt-0.5 font-bold font-mono text-white/80">1.2K</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform">
                    <Download size={16} className="text-white" />
                  </div>
                  <span className="text-[9px] mt-0.5 font-bold font-mono text-white/80">Share</span>
                </div>
              </div>

              {/* SUBTITLE OVERLAY (SIMULATED DYNAMIC TEXT CAPTION) */}
              <div className="absolute inset-x-4 bottom-20 z-20 flex justify-center pointer-events-none">
                <AnimatePresence mode="wait">
                  {activeSub && (
                    <motion.div
                      key={activeSub.id}
                      initial={{ scale: 0.85, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={currentStyleTemplate.cssClass}
                      style={currentStyleTemplate.style}
                    >
                      {activeSub.text}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom player control overlay */}
              <div className="p-4 bg-gradient-to-t from-black via-black/40 to-transparent z-10 w-full flex flex-col gap-2 shrink-0">
                {/* Timeline progress line */}
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-gray-400">0:0{Math.floor(playerTime)}</span>
                  <div className="flex-grow h-1 bg-white/20 rounded-full relative overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${(playerTime / selectedClip.subtitles[selectedClip.subtitles.length - 1].end) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-gray-400">0:0{selectedClip.subtitles[selectedClip.subtitles.length - 1].end}</span>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-transform"
                  >
                    {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                  </button>
                  <span className="text-[10px] font-mono text-gray-300">
                    Auto-Zoom: {isAutoZoomActive ? "ON 🎯" : "OFF"}
                  </span>
                  <div className="flex items-center gap-2">
                    <Volume2 size={12} className="text-gray-400" />
                    <Settings size={12} className="text-gray-400 animate-spin-slow" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Customization & Export Controls (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Intelligent reframing settings */}
            <div>
              <label className={`block text-xs font-bold mb-3 uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Auto Reframer Settings
              </label>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setIsReframingActive(!isReframingActive)}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                    isReframingActive
                      ? "border-primary/40 bg-primary/5 text-white"
                      : darkMode
                        ? "bg-white/5 border-white/5 text-gray-400"
                        : "bg-black/5 border-black/5 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Video size={16} className={isReframingActive ? "text-primary-light" : "text-gray-400"} />
                    <div>
                      <h5 className="text-xs font-bold">Face-Tracking Autopilot</h5>
                      <p className="text-[10px] text-gray-500 mt-0.5">Keeps speakers centered automatically</p>
                    </div>
                  </div>
                  <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${isReframingActive ? "bg-primary" : "bg-gray-600"}`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${isReframingActive ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                </button>

                <button
                  onClick={() => setIsAutoZoomActive(!isAutoZoomActive)}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                    isAutoZoomActive
                      ? "border-secondary/40 bg-secondary/5 text-white"
                      : darkMode
                        ? "bg-white/5 border-white/5 text-gray-400"
                        : "bg-black/5 border-black/5 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Grid size={16} className={isAutoZoomActive ? "text-secondary-light" : "text-gray-400"} />
                    <div>
                      <h5 className="text-xs font-bold">Cinematic Auto Zoom</h5>
                      <p className="text-[10px] text-gray-500 mt-0.5">Creates camera punch-ins on punchy words</p>
                    </div>
                  </div>
                  <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${isAutoZoomActive ? "bg-secondary" : "bg-gray-600"}`}>
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${isAutoZoomActive ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                </button>
              </div>
            </div>

            {/* Generated Subtitle Style list */}
            <div>
              <label className={`block text-xs font-bold mb-3 uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Caption Template Style
              </label>
              <div className="flex flex-col gap-2">
                {styleTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedStyle(template.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedStyle === template.id
                        ? "bg-primary/5 border-primary/50 text-white"
                        : darkMode
                          ? "bg-white/[0.02] border-white/5 text-gray-400 hover:bg-white/5"
                          : "bg-black/[0.02] border-black/5 text-gray-700 hover:bg-black/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{template.name}</span>
                      {selectedStyle === template.id && (
                        <Check size={12} className="text-primary-light" />
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">{template.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Subtitle text editor mockup */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Timestamp Caption Script
                </label>
                <button 
                  onClick={() => setShowEmojis(!showEmojis)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                    showEmojis 
                      ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400" 
                      : darkMode ? "border-white/10 text-gray-500" : "border-black/10 text-gray-500"
                  }`}
                >
                  {showEmojis ? "Emojis: Yes 😊" : "No Emojis"}
                </button>
              </div>

              <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                {selectedClip.subtitles.map((sub, idx) => {
                  const isActive = playerTime >= sub.start && playerTime < sub.end;
                  return (
                    <div
                      key={sub.id}
                      className={`p-2 rounded-lg border text-left flex items-center gap-2.5 transition-colors ${
                        isActive
                          ? "bg-primary/5 border-primary/20 text-white"
                          : darkMode ? "bg-white/[0.01] border-white/5 text-gray-400" : "bg-black/[0.01] border-black/5 text-gray-700"
                      }`}
                    >
                      <span className="text-[9px] font-mono text-gray-500">0:{sub.start}s</span>
                      <input
                        type="text"
                        value={sub.text}
                        onChange={(e) => {
                          const updated = [...selectedClip.subtitles];
                          updated[idx].text = e.target.value;
                          setSelectedClip({ ...selectedClip, subtitles: updated });
                        }}
                        className={`text-xs font-medium bg-transparent border-none outline-none flex-grow ${
                          isActive ? "text-primary-light font-bold" : darkMode ? "text-gray-300" : "text-gray-900"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Render Output Export Area */}
            <div className="pt-4 border-t border-white/5">
              <button
                onClick={handleExport}
                disabled={exporting}
                className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl text-sm shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
              >
                {exporting ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Rendering 1080p MP4 ({exportProgress}%)</span>
                  </>
                ) : (
                  <>
                    <Download size={14} />
                    <span>Export Short Video</span>
                  </>
                )}
              </button>
              
              <p className={`text-[10px] text-center mt-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                Estimated render time: 4 seconds. Uses remote cloud H100 cores.
              </p>
            </div>
          </div>
        </div>

        {/* Floating AI Scanning Overlay log modal */}
        <AnimatePresence>
          {reAnalyzing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className={`relative w-full max-w-lg p-6 rounded-3xl border shadow-2xl z-10 ${
                  darkMode ? "bg-card border-white/10 text-white" : "bg-white border-black/10 text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <RefreshCw size={18} className="animate-spin text-primary" />
                  <h3 className="font-display text-lg font-bold">ClipMaster Autopilot Analysis running...</h3>
                </div>

                <div className="w-full bg-white/5 rounded-full h-2 mb-4 overflow-hidden dark:bg-white/5 light:bg-black/10">
                  <div className="h-full bg-primary" style={{ width: `${analyzeStep}%` }} />
                </div>

                <div className="bg-black/60 p-4 rounded-xl font-mono text-[11px] text-emerald-400 h-40 overflow-y-auto space-y-2">
                  {analyzeLogs.map((log, index) => (
                    <div key={index} className="animate-fade-in">{log}</div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
