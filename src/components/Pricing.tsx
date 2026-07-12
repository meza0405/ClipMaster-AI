import React, { useState } from "react";
import { Check, CheckCircle2, Flame, ArrowRight, Shield, BadgePercent, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PricingProps {
  darkMode: boolean;
}

export default function Pricing({ darkMode }: PricingProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for casual creators starting out on TikTok and YouTube Shorts.",
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        "20 video uploads / month",
        "720p HD standard export",
        "Basic subtitle templates",
        "Standard processing queue",
        "Direct upload to TikTok"
      ],
      cta: "Start Free",
      isPopular: false,
      badge: "Free Tier"
    },
    {
      id: "pro",
      name: "Pro",
      description: "Ideal for professional creators, podcasters, and agency editors.",
      priceMonthly: 20,
      priceYearly: 16, // 20% off
      features: [
        "Unlimited clips & highlights",
        "1080p Ultra-HD 60FPS export",
        "Whisper V3 AI Auto-Subtitles",
        "AI Face-Tracking & Reframer",
        "Automated Emojis & Keynotes",
        "Priority processing (No queue)",
        "Direct post to all platforms"
      ],
      cta: "Go Pro Now",
      isPopular: true,
      badge: "Best Value"
    },
    {
      id: "business",
      name: "Business",
      description: "Designed for scaling content agencies and enterprise teams.",
      priceMonthly: 75,
      priceYearly: 60,
      features: [
        "Team workspace (up to 5 seats)",
        "Stripe & Supabase developer APIs",
        "Custom creator branding/watermarks",
        "100 hours of cloud rendering/mo",
        "Dedicated account manager",
        "Custom fonts and assets upload",
        "Unlimited everything"
      ],
      cta: "Contact Sales",
      isPopular: false,
      badge: "Agencies"
    }
  ];

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setTimeout(() => {
      setCheckoutPlan(null);
      setPaymentSuccess(false);
    }, 2200);
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background glow circle */}
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-secondary/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary tracking-widest uppercase mb-3 block">
            Flexible Plans
          </span>
          <h2 className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Simple, transparent pricing
          </h2>
          <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Choose the tier that fits your publishing volume. Scale up or cancel your plan at any time.
          </p>

          {/* Monthly / Yearly Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full border border-white/10 bg-white/5 relative" id="pricing-billing-toggle">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingPeriod === "monthly"
                  ? "bg-primary text-white shadow-md"
                  : darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              Bill Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all relative flex items-center gap-1 ${
                billingPeriod === "yearly"
                  ? "bg-primary text-white shadow-md"
                  : darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              Bill Annually
              <span className="text-[9px] bg-emerald-500 text-white font-black px-1.5 py-0.5 rounded-full uppercase scale-90">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch" id="pricing-cards-grid">
          {plans.map((plan) => {
            const price = billingPeriod === "monthly" ? plan.priceMonthly : plan.priceYearly;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`p-10 rounded-[2.5rem] border flex flex-col justify-between relative transition-all ${
                  plan.isPopular
                    ? darkMode
                      ? "bg-gradient-to-b from-primary/10 via-card to-card border-2 border-primary text-white"
                      : "bg-gradient-to-b from-primary/5 via-white to-white border-2 border-primary text-gray-900 shadow-xl"
                    : darkMode
                      ? "bg-card border-white/5 text-white"
                      : "bg-white border-black/5 text-gray-900 shadow-md"
                }`}
                style={{
                  boxShadow: plan.isPopular 
                    ? "0 10px 40px rgba(139, 92, 246, 0.15)" 
                    : "0 4px 30px rgba(0, 0, 0, 0.05)"
                }}
              >
                {/* Popular Badge ribbon */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full text-white shadow-md flex items-center gap-1">
                    <Sparkles size={10} /> {plan.badge} <Sparkles size={10} />
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
                    {!plan.isPopular && (
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        darkMode ? "bg-white/5 text-gray-400" : "bg-black/5 text-gray-600"
                      }`}>
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className={`text-xs leading-relaxed mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-8">
                    {plan.priceMonthly === 0 ? (
                      <span className="text-5xl font-black tracking-tight">Free</span>
                    ) : (
                      <>
                        <span className="text-5xl font-black tracking-tight">${price}</span>
                        <span className={`text-sm font-semibold ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                          /mo
                        </span>
                      </>
                    )}
                    {billingPeriod === "yearly" && plan.priceMonthly > 0 && (
                      <span className="text-[10px] text-emerald-400 font-bold ml-2">
                        Billed annually
                      </span>
                    )}
                  </div>

                  {/* Separator line */}
                  <div className="h-px bg-white/10 dark:bg-white/10 light:bg-black/10 mb-8" />

                  {/* Feature bullet list */}
                  <ul className="space-y-4 mb-10 text-xs font-semibold">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2
                          size={16}
                          className={plan.isPopular ? "text-primary" : "text-secondary-light"}
                        />
                        <span className={darkMode ? "text-gray-300" : "text-gray-700"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setCheckoutPlan(plan.id)}
                  className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-1.5 hover:scale-[1.01] ${
                    plan.isPopular
                      ? "bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40"
                      : darkMode
                        ? "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                        : "bg-black/5 border border-black/10 text-gray-900 hover:bg-black/10"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Mock Checkout Stripe Modal */}
        <AnimatePresence>
          {checkoutPlan && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setCheckoutPlan(null)} />

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className={`relative w-full max-w-md p-8 rounded-3xl border shadow-2xl z-10 overflow-hidden ${
                  darkMode ? "bg-card border-white/10 text-white" : "bg-white border-black/10 text-gray-900"
                }`}
                id="stripe-checkout-modal"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500" />

                <div className="flex flex-col items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
                    <Shield size={24} />
                  </div>
                  <h3 className="font-display text-xl font-bold">Stripe Secure Checkout</h3>
                  <p className="text-[11px] text-gray-400 mt-1">Completing order for ClipMaster {checkoutPlan.toUpperCase()} plan</p>
                </div>

                {paymentSuccess ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4 animate-bounce">
                      <Check size={24} />
                    </div>
                    <h4 className="text-base font-bold">Payment Authorized</h4>
                    <p className="text-xs text-gray-500 mt-1">Webhook sent to platform. Provisioning cloud credits...</p>
                  </div>
                ) : (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <div className="bg-black/20 p-4 rounded-xl border border-white/5 mb-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span>ClipMaster {checkoutPlan.toUpperCase()} ({billingPeriod})</span>
                        <span className="font-mono font-bold">
                          ${checkoutPlan === "starter" ? 0 : checkoutPlan === "pro" ? (billingPeriod === "monthly" ? 20 : 16) : (billingPeriod === "monthly" ? 75 : 60)}/mo
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className={`w-full p-3 rounded-xl text-xs border outline-none ${
                          darkMode ? "bg-white/5 border-white/10 text-white" : "bg-black/5 border-black/10"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Card Details</label>
                      <div className={`flex items-center border rounded-xl p-3 ${
                        darkMode ? "bg-white/5 border-white/10 text-white" : "bg-black/5 border-black/10"
                      }`}>
                        <input
                          type="text"
                          required
                          maxLength={19}
                          placeholder="4242 •••• •••• 4242"
                          className="w-full bg-transparent border-none outline-none text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          className={`w-full p-3 rounded-xl text-xs border outline-none ${
                            darkMode ? "bg-white/5 border-white/10 text-white" : "bg-black/5 border-black/10"
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">CVC Code</label>
                        <input
                          type="text"
                          required
                          maxLength={3}
                          placeholder="•••"
                          className={`w-full p-3 rounded-xl text-xs border outline-none ${
                            darkMode ? "bg-white/5 border-white/10 text-white" : "bg-black/5 border-black/10"
                          }`}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl text-xs hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
                    >
                      Authorize Payment
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
