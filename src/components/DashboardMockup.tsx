import React, { useState, useEffect, useRef } from "react";
import { 
  Play, Pause, Sparkles, Sliders, Layers, 
  Download, RefreshCw, Plus, ChevronRight, Check,
  Volume2, Settings, Scissors, MessageSquare, Flame, 
  Smile, AlignLeft, Eye, Grid, Video, Laptop, HelpCircle,
  Youtube, UploadCloud, Star, Trash2, CheckCircle, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Subtitle {
  id: number;
  start: number;
  end: number;
  text: string;
}

interface Highlight {
  id: string;
  title: string;
  duration: string;
  viralScore: number;
  label: string;
  speaker: string;
  sceneX: number;
  rating: number; // User star rating
  subtitles: Subtitle[];
}

interface VideoProject {
  id: string;
  name: string;
  duration: string;
  size: string;
  highlights: Highlight[];
}

interface DashboardMockupProps {
  darkMode: boolean;
}

export default function DashboardMockup({ darkMode }: DashboardMockupProps) {
  // Preloaded interactive datasets with ratings
  const initialVideos: VideoProject[] = [
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
          sceneX: -25,
          rating: 5,
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
          sceneX: 20,
          rating: 4,
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
          rating: 4,
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
          rating: 5,
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
          rating: 4,
          subtitles: [
            { id: 1, start: 0, end: 4, text: "The pass-through latency is under 12ms. ⚡" },
            { id: 2, start: 4, end: 9, text: "But the battery weight feels quite heavy." }
          ]
        }
      ]
    }
  ];

  // Dynamic state list of loaded projects
  const [videosList, setVideosList] = useState<VideoProject[]>(initialVideos);

  // Active States
  const [selectedVideo, setSelectedVideo] = useState<VideoProject>(initialVideos[0]);
  const [selectedClip, setSelectedClip] = useState<Highlight>(initialVideos[0].highlights[0]);
  
  // Custom input states for imports
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importSource, setImportSource] = useState<string | null>(null);

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

  // Update selected video reference when videosList updates (to preserve edited subtitles or star ratings)
  useEffect(() => {
    const matchedVideo = videosList.find((v) => v.id === selectedVideo.id);
    if (matchedVideo) {
      setSelectedVideo(matchedVideo);
      const matchedClip = matchedVideo.highlights.find((h) => h.id === selectedClip.id);
      if (matchedClip) {
        setSelectedClip(matchedClip);
      }
    }
  }, [videosList]);

  // Video Timeline looping simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying && selectedClip && selectedClip.subtitles && selectedClip.subtitles.length > 0) {
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
  const activeSub = selectedClip && selectedClip.subtitles
    ? selectedClip.subtitles.find((sub) => playerTime >= sub.start && playerTime < sub.end)
    : null;

  // Star Rating updates for any clip
  const handleRateClip = (ratingValue: number) => {
    if (!selectedClip) return;
    setVideosList((prevList) =>
      prevList.map((video) => {
        if (video.id === selectedVideo.id) {
          return {
            ...video,
            highlights: video.highlights.map((clip) => {
              if (clip.id === selectedClip.id) {
                return { ...clip, rating: ratingValue };
              }
              return clip;
            })
          };
        }
        return video;
      })
    );
  };

  // Delete an imported project
  const handleDeleteProject = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (videosList.length <= 1) {
      alert("At least one video project must remain in the workspace!");
      return;
    }
    const filtered = videosList.filter((v) => v.id !== videoId);
    setVideosList(filtered);
    if (selectedVideo.id === videoId) {
      setSelectedVideo(filtered[0]);
      setSelectedClip(filtered[0].highlights[0]);
    }
  };

  // Automated custom clip generator based on files/URLs
  const generateClipsForSource = (name: string, isYoutube: boolean) => {
    let cleanTitle = name;
    if (isYoutube) {
      try {
        const url = new URL(name);
        const searchParams = new URLSearchParams(url.search);
        const v = searchParams.get("v");
        if (v) {
          cleanTitle = `YouTube Video (${v})`;
        } else if (url.pathname.length > 1) {
          cleanTitle = url.pathname.substring(1).split("/").pop() || "YouTube Video";
        }
      } catch {
        cleanTitle = name.replace(/(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//g, "") || "YouTube Broadcast";
      }
    }

    // formatting
    cleanTitle = cleanTitle
      .replace(/\.[^/.]+$/, "")
      .replace(/[_-]/g, " ")
      .trim();
    if (cleanTitle.length > 40) {
      cleanTitle = cleanTitle.substring(0, 38) + "...";
    }

    let speakerName = "Viral Creator";
    const lowercase = cleanTitle.toLowerCase();
    if (lowercase.includes("pod") || lowercase.includes("talk")) speakerName = "Joe Rogan";
    else if (lowercase.includes("tech") || lowercase.includes("code")) speakerName = "MKBHD";
    else if (lowercase.includes("beast") || lowercase.includes("jimmy")) speakerName = "Jimmy Donaldson";
    else if (lowercase.includes("money") || lowercase.includes("business")) speakerName = "Alex Hormozi";

    const customHighlights: Highlight[] = [
      {
        id: `h1-${Date.now()}`,
        title: `🔥 [HOOK] The truth about ${cleanTitle}`,
        duration: "10s",
        viralScore: Math.floor(Math.random() * 5) + 95, // 95 to 99
        label: "Extreme Engagement",
        speaker: speakerName,
        sceneX: -20,
        rating: 5,
        subtitles: [
          { id: 1, start: 0, end: 3, text: `Listen carefully to how ${cleanTitle} really works! 👂` },
          { id: 2, start: 3, end: 6, text: "Most people fail because they miss this single detail..." },
          { id: 3, start: 6, end: 10, text: "But once you fix it, the growth is immediate! 🚀" }
        ]
      },
      {
        id: `h2-${Date.now()}`,
        title: `💡 Mind-blowing ${cleanTitle} Strategy`,
        duration: "12s",
        viralScore: Math.floor(Math.random() * 6) + 89, // 89 to 94
        label: "High Retention",
        speaker: speakerName,
        sceneX: 15,
        rating: 4,
        subtitles: [
          { id: 1, start: 0, end: 4, text: "I have used this secret formula on multiple campaigns. 📊" },
          { id: 2, start: 4, end: 8, text: "It works literally every single time without exception." },
          { id: 3, start: 8, end: 12, text: "Make sure you save this short for your next session! 💾" }
        ]
      },
      {
        id: `h3-${Date.now()}`,
        title: "⚡ Quick Hack to double engagement",
        duration: "8s",
        viralScore: Math.floor(Math.random() * 6) + 84, // 84 to 89
        label: "Looping Catalyst",
        speaker: speakerName,
        sceneX: 0,
        rating: 4,
        subtitles: [
          { id: 1, start: 0, end: 4, text: "Stop posting content the traditional way. 🛑" },
          { id: 2, start: 4, end: 8, text: "Apply this exact 5-second structural visual loop now! 🔁" }
        ]
      }
    ];

    return {
      id: `proj-${Date.now()}`,
      name: isYoutube ? `YouTube: ${cleanTitle}` : cleanTitle.endsWith(".mp4") ? cleanTitle : `${cleanTitle}.mp4`,
      duration: isYoutube ? "14:15" : "05:12",
      size: isYoutube ? "Streaming Link" : `${(Math.random() * 120 + 20).toFixed(1)} MB`,
      highlights: customHighlights
    };
  };

  // Trigger import and processing animation
  const startImportPipeline = (sourceName: string, isYoutube: boolean) => {
    setImportSource(sourceName);
    setReAnalyzing(true);
    setAnalyzeStep(0);
    setAnalyzeLogs([]);

    const youtubeLogs = [
      "🔗 Connecting to streaming endpoints & fetching video headers...",
      "📥 Downloading high-fidelity stereo audio stream track...",
      "🔊 Filtering background noise & mapping speech frequencies...",
      "📝 Running Whisper V3 acoustic speech-to-text pipeline...",
      "🤖 Extracting emotional peaks and high-scoring viral sentences...",
      "🎯 Aligning speaker facial frames and coordinates for 9:16 layout...",
      "✨ Generating customized high-contrast subtitle scripts...",
      "✅ Dynamic clips generated! Perfect viral parameters achieved."
    ];

    const localFileLogs = [
      "📂 Parsing local video file headers and tracking audio channels...",
      "⚡ Initializing secure web assembly hardware rendering pipeline...",
      "🔊 Transcribing voice channels using multi-threaded Whisper models...",
      "🤖 Scoring speech hooks, pacing, and keyword density...",
      "🎯 Panning & tracking speaker faces in vertical aspect frames...",
      "🔥 Adding optimized dynamic emojis matching verbal emotion...",
      "✅ Process complete! Custom clips successfully formatted."
    ];

    const logs = isYoutube ? youtubeLogs : localFileLogs;
    let current = 0;

    const interval = setInterval(() => {
      if (current < logs.length) {
        setAnalyzeLogs((prev) => [...prev, logs[current]]);
        setAnalyzeStep(Math.min((current + 1) * (100 / logs.length), 100));
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          const newProject = generateClipsForSource(sourceName, isYoutube);
          setVideosList((prev) => [newProject, ...prev]);
          setSelectedVideo(newProject);
          setSelectedClip(newProject.highlights[0]);
          setReAnalyzing(false);
          setYoutubeUrl("");
          setImportSource(null);
        }, 600);
      }
    }, 500);
  };

  // Handle YouTube URL submission
  const handleYoutubeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl.trim()) return;
    startImportPipeline(youtubeUrl, true);
  };

  // Handle Local File upload trigger
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      startImportPipeline(file.name, false);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      startImportPipeline(files[0].name, false);
    }
  };

  // Trigger simulated AI Analysis for existing videos
  const runAIAnalysis = () => {
    if (!selectedVideo) return;
    startImportPipeline(selectedVideo.name, selectedVideo.name.includes("YouTube:"));
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
            alert(`🎉 "${selectedClip.title}" masterfully compiled! Your 1080p viral short with a score of ${selectedClip.viralScore}% has been saved to your downloads.`);
            setExporting(false);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 120);
  };

  // Handle video selection change
  const handleVideoChange = (videoId: string) => {
    const video = videosList.find((v) => v.id === videoId);
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
            Interactive AI Playground
          </span>
          <h2 className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Play with the AI Video Editor
          </h2>
          <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Paste any YouTube URL or drop a local MP4 file. Watch our AI analyze the speech landscape, auto-frame face dynamics, and compile perfect viral clips with customizable caption templates.
          </p>
        </div>

        {/* Workspace Layout Container */}
        <div className={`rounded-3xl border shadow-2xl p-6 lg:p-8 flex flex-col gap-8 relative overflow-hidden ${
          darkMode ? "bg-card/95 border-white/10" : "bg-white border-black/10"
        }`} id="playground-container">
          
          {/* Neon Top Edge Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

          {/* TOP PANEL: YouTube URL Paste & Local Drag-and-Drop Area (col-span-12) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8 border-b border-white/5">
            {/* YouTube Paste Module */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
              darkMode ? "bg-white/[0.01] border-white/5" : "bg-black/[0.01] border-black/5"
            }`}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Youtube className="text-red-500" size={20} />
                  <h4 className="text-sm font-bold text-white">Import from YouTube / TikTok</h4>
                </div>
                <p className={`text-xs mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Paste any video link. The AI will instantly download the audio, transcribe the speech, and crop the best viral moments.
                </p>
              </div>
              <form onSubmit={handleYoutubeSubmit} className="flex gap-2">
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className={`flex-grow py-2 px-3 rounded-xl text-xs outline-none border transition-colors ${
                    darkMode 
                      ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-primary" 
                      : "bg-black/5 border-black/10 text-gray-900 placeholder-gray-400 focus:border-primary"
                  }`}
                />
                <button
                  type="submit"
                  disabled={reAnalyzing}
                  className="py-2 px-4 rounded-xl text-xs font-bold bg-primary hover:bg-primary-light text-white transition-all shadow-md shadow-primary/25 whitespace-nowrap flex items-center gap-1"
                >
                  <Sparkles size={12} />
                  <span>Clip with AI</span>
                </button>
              </form>
            </div>

            {/* Local Video Upload Dropzone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-5 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDragOver 
                  ? "border-primary bg-primary/5 scale-[1.01]" 
                  : darkMode 
                    ? "border-white/10 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02]" 
                    : "border-black/10 bg-black/[0.01] hover:border-black/20 hover:bg-black/[0.02]"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="video/*"
              />
              <UploadCloud className="text-primary-light mb-2 animate-bounce-slow" size={24} />
              <h4 className="text-sm font-bold text-white mb-1">Upload Local Video</h4>
              <p className={`text-xs max-w-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Drag & drop your local video file here or <span className="text-primary font-semibold underline">browse folders</span>. MP4, MOV up to 500MB.
              </p>
            </div>
          </div>

          {/* MAIN EDITING WORKSPACE GRID (3 columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT PANEL: Media & Clip Selector (col-span-3) */}
            <div className="lg:col-span-3 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-white/5 pb-6 lg:pb-0 lg:pr-6">
              <div>
                <label className={`block text-xs font-bold mb-2 uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Active Projects
                </label>
                <div className="flex flex-col gap-2">
                  {videosList.map((vid) => {
                    const isSelected = selectedVideo.id === vid.id;
                    return (
                      <div
                        key={vid.id}
                        onClick={() => handleVideoChange(vid.id)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? "bg-primary/5 border-primary text-white"
                            : darkMode
                              ? "bg-white/[0.01] border-white/5 text-gray-300 hover:bg-white/5"
                              : "bg-black/[0.01] border-black/5 text-gray-700 hover:bg-black/5"
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Video size={14} className={isSelected ? "text-primary-light" : "text-gray-400"} />
                          <div className="overflow-hidden">
                            <h5 className="text-xs font-bold truncate">{vid.name}</h5>
                            <span className="text-[9px] text-gray-500 font-mono">{vid.duration} • {vid.size}</span>
                          </div>
                        </div>
                        {videosList.length > 1 && (
                          <button
                            onClick={(e) => handleDeleteProject(vid.id, e)}
                            className="p-1 text-gray-500 hover:text-red-400 rounded transition-colors"
                            title="Delete project"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Re-analyze current active project */}
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
                {reAnalyzing ? "Processing..." : "Re-Run AI Highlighting"}
              </button>

              {/* AI Detected Highlights list */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    AI Detected Clips ({selectedVideo.highlights.length})
                  </label>
                  <Sparkles size={12} className="text-amber-400 animate-pulse" />
                </div>

                <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {selectedVideo.highlights.map((highlight) => {
                    const isSelected = selectedClip.id === highlight.id;
                    return (
                      <button
                        key={highlight.id}
                        onClick={() => setSelectedClip(highlight)}
                        className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between relative overflow-hidden group ${
                          isSelected
                            ? "bg-primary/10 border-primary/50 text-white shadow-lg"
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
                          <div className="flex items-center gap-1 font-mono text-[10px] text-gray-500">
                            <Star size={10} className="fill-amber-400 text-amber-400" />
                            <span>{highlight.rating || 5}/5</span>
                          </div>
                        </div>

                        <h4 className="text-xs font-bold leading-snug group-hover:text-primary-light transition-colors mb-1 truncate">
                          {highlight.title}
                        </h4>
                        <p className="text-[10px] text-gray-500 line-clamp-1 italic">
                          "{highlight.subtitles[0]?.text || "No subtitle transcription"}"
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* MIDDLE PANEL: 9:16 Vertical Video Player Mockup & Interactive Rating (col-span-5) */}
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
                      transform: isReframingActive && selectedClip
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
                        {selectedClip?.speaker || "Unknown"}
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
                    <span className="text-[9px] mt-0.5 font-bold font-mono text-white/80">{(selectedClip?.viralScore * 1.2).toFixed(1)}K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform">
                      <MessageSquare size={16} className="text-white" />
                    </div>
                    <span className="text-[9px] mt-0.5 font-bold font-mono text-white/80">{(selectedClip?.viralScore / 8).toFixed(1)}K</span>
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
                          width: `${selectedClip?.subtitles?.length ? (playerTime / selectedClip.subtitles[selectedClip.subtitles.length - 1].end) * 100 : 0}%`
                        }}
                      />
                    </div>
                    <span className="text-[9px] font-mono text-gray-400">0:0{selectedClip?.subtitles?.length ? selectedClip.subtitles[selectedClip.subtitles.length - 1].end : 10}</span>
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

              {/* INTERACTIVE VIDEO RATING MODULE */}
              <div className={`mt-5 w-[250px] p-3.5 rounded-2xl border flex flex-col items-center justify-center text-center ${
                darkMode ? "bg-white/[0.02] border-white/5" : "bg-black/[0.02] border-black/5"
              }`}>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">
                  Rate Generated AI Clip Quality
                </span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRateClip(star)}
                      className="p-0.5 hover:scale-125 transition-all"
                    >
                      <Star
                        size={18}
                        className={
                          star <= (selectedClip?.rating || 0)
                            ? "fill-amber-400 text-amber-400"
                            : darkMode ? "text-gray-600" : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
                <p className="text-[9px] text-gray-500 mt-1.5 italic font-medium">
                  {(selectedClip?.rating || 5) >= 4 ? "Outstanding AI selection score! 🔥" : "We'll tune the neural thresholds."}
                </p>
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
                  {selectedClip?.subtitles?.map((sub, idx) => {
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
                            if (!selectedClip) return;
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
                  className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl text-sm shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <RefreshCw size={18} className="animate-spin text-primary animate-spin-slow" />
                    <h3 className="font-display text-base font-bold text-white">ClipMaster Autopilot Analysis</h3>
                  </div>
                  <span className="text-[10px] bg-primary/20 text-primary-light px-2 py-0.5 rounded font-mono font-bold">
                    {Math.floor(analyzeStep)}%
                  </span>
                </div>

                {importSource && (
                  <div className="mb-4 bg-white/[0.02] border border-white/5 p-3 rounded-xl flex items-center gap-2.5">
                    <Video size={16} className="text-primary-light shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-wider">Analyzing Media Source</p>
                      <p className="text-xs font-bold text-white truncate">{importSource}</p>
                    </div>
                  </div>
                )}

                <div className="w-full bg-white/5 rounded-full h-1.5 mb-5 overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${analyzeStep}%` }} />
                </div>

                <div className="bg-black/60 p-4 rounded-xl font-mono text-[11px] text-emerald-400 h-48 overflow-y-auto space-y-2.5 border border-white/5">
                  {analyzeLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-1.5 animate-fade-in">
                      <span className="text-emerald-500">▶</span>
                      <span>{log}</span>
                    </div>
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
