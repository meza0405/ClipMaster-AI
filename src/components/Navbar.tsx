import React, { useState, useEffect } from "react";
import { Zap, Moon, Sun, Menu, X, ArrowRight, Lock, Mail, Shield, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onOpenPlayground: () => void;
}

export default function Navbar({ darkMode, setDarkMode, onOpenPlayground }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setAuthModalOpen(false);
      setIsSubmitted(false);
      setEmail("");
      setPassword("");
    }, 2000);
  };

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "AI Playground", href: "#playground" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" }
  ];

  return (
    <>
      <nav
        id="navbar-main"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? darkMode
              ? "bg-dark/80 backdrop-blur-md border-b border-white/5 py-4"
              : "bg-white/80 backdrop-blur-md border-b border-black/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group" id="nav-logo">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary-dark to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Zap className="fill-white text-white animate-pulse" size={20} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 dark:from-white dark:to-gray-400 light:from-gray-900 light:to-gray-600">
              ClipMaster<span className="text-primary-light font-extrabold">.ai</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 relative py-1 hover:text-primary-light ${
                  darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                }`}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full border transition-all duration-300 ${
                darkMode
                  ? "border-white/10 bg-white/5 text-yellow-400 hover:bg-white/10"
                  : "border-black/10 bg-black/5 text-indigo-600 hover:bg-black/10"
              }`}
              title="Toggle theme"
              id="theme-toggle"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Desktop CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => {
                  setIsSignUp(false);
                  setAuthModalOpen(true);
                }}
                className={`px-4 py-2.5 text-sm font-semibold transition-colors rounded-full ${
                  darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                }`}
                id="btn-login"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsSignUp(true);
                  setAuthModalOpen(true);
                }}
                className="relative group overflow-hidden px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-bold shadow-[0_4px_20px_rgba(139,92,246,0.35)] hover:shadow-[0_4px_30px_rgba(139,92,246,0.5)] transition-all duration-300 hover:scale-[1.02]"
                id="btn-start-free"
              >
                <span className="relative z-10 flex items-center gap-1">
                  Start Free <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-full border transition-colors ${
                darkMode ? "border-white/10 bg-white/5 text-white" : "border-black/10 bg-black/5 text-black"
              }`}
              id="btn-mobile-menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-24 left-4 right-4 z-40 p-6 rounded-2xl border shadow-2xl lg:hidden ${
              darkMode ? "bg-card border-white/10 text-white" : "bg-white border-black/10 text-black"
            }`}
            id="mobile-drawer"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 border-b border-white/5 ${
                    darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                  }`}
                  id={`mobile-nav-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSignUp(false);
                    setAuthModalOpen(true);
                  }}
                  className={`py-3 rounded-xl border font-semibold text-sm transition-colors ${
                    darkMode
                      ? "border-white/10 hover:bg-white/5 text-white"
                      : "border-black/10 hover:bg-black/5 text-black"
                  }`}
                  id="mobile-btn-login"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSignUp(true);
                    setAuthModalOpen(true);
                  }}
                  className="py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-md text-center"
                  id="mobile-btn-signup"
                >
                  Start Free Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal (Sleek and secure simulation) */}
      <AnimatePresence>
        {authModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setAuthModalOpen(false)}
              id="auth-backdrop"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full max-w-md p-8 rounded-3xl border shadow-2xl overflow-hidden z-10 ${
                darkMode ? "bg-card border-white/10 text-white" : "bg-white border-black/10 text-black"
              }`}
              id="auth-modal"
            >
              {/* Highlight gradient bar */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-primary-light" />

              <button
                onClick={() => setAuthModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/5 transition-colors"
                id="btn-close-auth"
              >
                <X size={16} />
              </button>

              <div className="flex flex-col items-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Shield size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold tracking-tight">
                  {isSignUp ? "Create your account" : "Welcome back"}
                </h3>
                <p className={`text-xs mt-1 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {isSignUp
                    ? "Start creating viral videos for free. No credit card required."
                    : "Access your dashboard and active projects in one click."}
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 animate-bounce">
                    <Check size={28} />
                  </div>
                  <h4 className="text-lg font-bold">Successfully Connected</h4>
                  <p className={`text-sm mt-1 px-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Initializing secured workspace container... authenticating with Supabase.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium border outline-none transition-all ${
                          darkMode
                            ? "bg-white/5 border-white/10 text-white focus:border-primary focus:bg-white/10"
                            : "bg-black/5 border-black/10 text-black focus:border-primary focus:bg-white"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium border outline-none transition-all ${
                          darkMode
                            ? "bg-white/5 border-white/10 text-white focus:border-primary focus:bg-white/10"
                            : "bg-black/5 border-black/10 text-black focus:border-primary focus:bg-white"
                        }`}
                      />
                    </div>
                  </div>

                  {isSignUp && (
                    <div className="flex items-start gap-2.5 py-1">
                      <input type="checkbox" required id="agree-terms" className="mt-1" />
                      <label htmlFor="agree-terms" className={`text-xs leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        I agree to the Terms of Service and Privacy Policy, and consent to cloud processing of my clips.
                      </label>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl text-sm shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98]"
                  >
                    {isSignUp ? "Create Free Account" : "Sign In to ClipMaster"}
                  </button>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className={`flex-shrink mx-4 text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>or continue with</span>
                    <div className="flex-grow border-t border-white/10"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(true);
                        setTimeout(() => {
                          setAuthModalOpen(false);
                          setIsSubmitted(false);
                        }, 1200);
                      }}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold hover:bg-white/5 transition-colors ${
                        darkMode ? "border-white/10" : "border-black/10"
                      }`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.74-.08-1.3-.176-1.854H12.24z"
                        />
                      </svg>
                      Google
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(true);
                        setTimeout(() => {
                          setAuthModalOpen(false);
                          setIsSubmitted(false);
                        }, 1200);
                      }}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-semibold hover:bg-white/5 transition-colors ${
                        darkMode ? "border-white/10" : "border-black/10"
                      }`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        />
                      </svg>
                      GitHub
                    </button>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className={`text-xs font-semibold underline hover:text-primary ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
