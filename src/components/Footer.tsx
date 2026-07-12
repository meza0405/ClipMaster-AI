import { Zap, Youtube, Instagram, Twitter, MessageCircle, Github, Heart, Send, Check } from "lucide-react";
import React, { useState } from "react";

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => {
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className={`border-t pt-20 pb-10 ${
      darkMode ? "bg-dark/60 border-white/5 text-gray-400" : "bg-gray-50 border-black/5 text-gray-600"
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Logo Brand column (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary via-primary-dark to-secondary rounded-lg flex items-center justify-center">
                <Zap size={16} fill="white" className="text-white" />
              </div>
              <span className={`font-display text-lg font-bold tracking-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
                ClipMaster<span className="text-primary-light font-extrabold">.ai</span>
              </span>
            </a>
            <p className="text-xs leading-relaxed max-w-sm">
              The future of social media content creation. Powered by state-of-the-art artificial intelligence to automatically scan, highlight, reframe, and subtitle long-form videos in seconds.
            </p>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                All cloud rendering systems operational
              </span>
            </div>
          </div>

          {/* Product links column (col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <h4 className={`text-xs font-black uppercase tracking-wider ${darkMode ? "text-white" : "text-gray-900"}`}>
              Product
            </h4>
            <ul className="space-y-3.5 text-xs font-medium">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing Plans</a></li>
              <li><a href="#playground" className="hover:text-primary transition-colors">AI Playground</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Keys</a></li>
            </ul>
          </div>

          {/* Company links column (col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <h4 className={`text-xs font-black uppercase tracking-wider ${darkMode ? "text-white" : "text-gray-900"}`}>
              Company
            </h4>
            <ul className="space-y-3.5 text-xs font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Creator Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter Subscribe column (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <h4 className={`text-xs font-black uppercase tracking-wider ${darkMode ? "text-white" : "text-gray-900"}`}>
              Subscribe to Viral Secrets
            </h4>
            <p className="text-xs leading-relaxed">
              Get weekly hacks on video hook formulas, subtitle layouts, and algorithmic updates directly in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email..."
                className={`flex-grow px-3.5 py-2.5 rounded-xl text-xs outline-none border ${
                  darkMode 
                    ? "bg-white/5 border-white/10 text-white focus:border-primary focus:bg-white/10" 
                    : "bg-white border-black/10 text-black focus:border-primary"
                }`}
              />
              <button
                type="submit"
                className="px-3 py-2.5 bg-primary text-white font-bold rounded-xl text-xs flex items-center justify-center shadow-lg hover:shadow-primary/25 hover:bg-primary-dark transition-all"
              >
                {subscribed ? <Check size={14} className="animate-bounce" /> : <Send size={14} />}
              </button>
            </form>
            {subscribed && (
              <span className="text-[10px] text-emerald-400 font-bold">✓ Subscribed! Check your inbox soon.</span>
            )}
          </div>

        </div>

        {/* Bottom Social Icons and Credits */}
        <div className="pt-10 border-t border-white/10 dark:border-white/10 light:border-black/5 flex flex-col sm:flex-row justify-between items-center gap-6 text-[11px] font-medium">
          <div>
            © {new Date().getFullYear()} ClipMaster AI Inc. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 items-center">
            <a href="#" className="hover:text-primary transition-colors" title="YouTube"><Youtube size={16} /></a>
            <a href="#" className="hover:text-primary transition-colors" title="Instagram"><Instagram size={16} /></a>
            <a href="#" className="hover:text-primary transition-colors" title="Twitter"><Twitter size={16} /></a>
            <a href="#" className="hover:text-primary transition-colors" title="Discord"><MessageCircle size={16} /></a>
            <a href="#" className="hover:text-primary transition-colors" title="GitHub"><Github size={16} /></a>
          </div>

          <div className="flex items-center gap-1 text-[10px]">
            Crafted with <Heart size={10} className="text-red-500 fill-current" /> in the Cloud Workspace
          </div>
        </div>
      </div>
    </footer>
  );
}
