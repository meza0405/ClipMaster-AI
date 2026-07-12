export interface VideoClip {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  duration: number;
  viralScore: number;
  label: string;
  speaker: string;
  subtitles: Array<{ time: number; text: string; speaker: string }>;
  sceneScale: number; // For Auto-Zoom / Face-Tracking mockup movement
  sceneX: number; // For keeping speaker centered
}

export interface SubtitleStyle {
  id: string;
  name: string;
  font: string;
  color: string;
  bgColor: string;
  textCase: "uppercase" | "capitalize" | "normal";
  hasEmoji: boolean;
  borderStyle: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  badge?: string;
  ctaText: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: "AI Engines" | "Editing Tools" | "Distribution";
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  handle: string;
  avatarUrl: string;
  rating: number;
  quote: string;
  viralStat: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
