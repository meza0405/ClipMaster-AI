import { Star, Quote, Flame, ArrowUpRight, Award } from "lucide-react";
import { motion } from "motion/react";

interface TestimonialsProps {
  darkMode: boolean;
}

export default function Testimonials({ darkMode }: TestimonialsProps) {
  const reviews = [
    {
      id: "testi-1",
      name: "Sarah Jenkins",
      role: "Tech YouTuber & Creator",
      handle: "@sarahclips",
      metric: "+480% View Gain",
      quote: "My Shorts went from averaging 5,000 views to hitting over 1.2M views in less than two weeks! The Face-Tracking autopilot is scary accurate—it holds focus perfectly.",
      avatarBg: "from-pink-500 to-rose-400"
    },
    {
      id: "testi-2",
      name: "Marcus Vance",
      role: "Host, Mastermind Podcast",
      handle: "@marcuscoaches",
      metric: "Saved 24h / Week",
      quote: "I used to pay an editor $600 a week to manually slice episodes and align captions. ClipMaster does it in 15 seconds. The automated caption styles are beautiful.",
      avatarBg: "from-purple-500 to-indigo-500"
    },
    {
      id: "testi-3",
      name: "Emily Chang",
      role: "Software Educator",
      handle: "@emilycodes",
      metric: "+150K Subscribers",
      quote: "As an educator, having vertical layouts that auto-zoom onto code blocks and my face was a life-saver. The multi-language subtitle generator unlocked a massive global audience.",
      avatarBg: "from-blue-500 to-cyan-400"
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-secondary tracking-widest uppercase mb-3 block">
            Social Proof
          </span>
          <h2 className={`font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Trusted by top global creators
          </h2>
          <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            See how podcasters, gamers, educators, and marketing agencies are supercharging their vertical content production.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-grid">
          {reviews.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-[2rem] border relative flex flex-col justify-between ${
                darkMode
                  ? "bg-card border-white/5 text-white"
                  : "bg-white border-black/5 text-gray-900 shadow-md"
              }`}
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
              }}
            >
              {/* Top Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/10">
                <Quote size={40} className="stroke-[3]" />
              </div>

              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-6 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className={`text-sm italic leading-relaxed mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  "{item.quote}"
                </p>
              </div>

              {/* Creator Info */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10 dark:border-white/10 light:border-black/5">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${item.avatarBg} flex items-center justify-center font-bold text-white text-sm uppercase shadow-md shrink-0`}>
                    {item.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-tight">{item.name}</h4>
                    <span className="text-[11px] text-gray-500 font-medium block">{item.role}</span>
                  </div>
                </div>

                {/* Metric Badge */}
                <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg flex items-center gap-0.5 shadow-sm">
                  <Flame size={10} /> {item.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Creator Callout Banner */}
        <div className={`mt-16 p-8 rounded-[2rem] border flex flex-col md:flex-row items-center justify-between gap-6 ${
          darkMode ? "bg-white/[0.02] border-white/5" : "bg-black/[0.01] border-black/5"
        }`} id="testimonials-callout">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
              <Award size={24} />
            </div>
            <div>
              <h4 className="font-bold text-base tracking-tight">Are you an agency or full-time video editor?</h4>
              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Unlock custom volume discounts, multi-seat developer API keys, and dedicated high-priority CPU queues.
              </p>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-white text-black font-bold text-xs rounded-xl shadow-lg hover:bg-gray-200 transition-colors shrink-0">
            Learn About Teams
          </button>
        </div>
      </div>
    </section>
  );
}
