import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "motion/react";
import profileImg from "./assets/smita_profile.png";
import {
  Mail,
  Linkedin,
  ArrowUpRight,
  Zap,
  X,
  TrendingUp,
  MessageSquare,
  Sparkles,
  Target,
} from "lucide-react";

// ── Animation helpers ─────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    num: "01",
    title: "AI Lead Intelligence",
    company: "Justdial",
    desc: "Shifted from rule-based to LLaMA-based intent classification for millions of business queries, dramatically improving lead quality.",
    impact: "65% reduction in spam calls",
    tags: ["GenAI", "LLaMA", "Lead-Gen"],
    icon: Sparkles,
    writeup: {
      context:
        "Our existing lead filtering relied on rigid, rule-based logic, which often penalised genuine users, especially those exploring multiple businesses or requesting quotes. This led to poor user experience and reduced lead quality for businesses, as both spam and legitimate intent were not accurately distinguished.",
      approach: [
        "Used Whisper (speech-to-text) to convert incoming calls into text across multiple languages",
        "Applied LLaMA-based intent classification, supported by defined rule sets, to categorise users as genuine or spam",
        "Trained models on historical call patterns to better identify anomalies and improve classification accuracy",
      ],
      complexity: [
        "LLM outputs were inherently non-deterministic, requiring multiple iterations to stabilise accuracy",
        "Handling multi-language inputs and ensuring accurate speech-to-text conversion was challenging initially",
        "Balancing strict spam detection without impacting genuine users required continuous tuning of thresholds and logic",
      ],
      result: [
        "Reduced spam calls by 65%, significantly improving lead quality",
        "Ensured no genuine users were penalised, improving overall user experience",
        "Restricted repeat spammers effectively once intent was identified",
        "Delivered higher-quality, actionable leads to businesses",
      ],
    },
  },
  {
    num: "02",
    title: "AI Business Chatbot",
    company: "Justdial",
    desc: "'Ask Anything' interface letting users query specific business details on listing pages. LLaMA + Sonar to simplify discovery and drive direct lead conversion.",
    impact: "Increased business call adoption",
    tags: ["GenAI", "LLaMA", "Conversational UI"],
    icon: MessageSquare,
    writeup: {
      context:
        "Business detail pages contained a large amount of information, requiring users to scroll through multiple sections to find answers to simple queries. With growing adoption of AI-driven experiences, there was an opportunity to create a faster and more conversational way for users to interact with businesses on the platform.",
      approach: [
        "Built an AI-powered chatbot ('Ask Anything') to help users get instant answers related to a business directly within the page experience",
        "Used LLaMA + Sonar-based retrieval to understand user queries and fetch relevant business information",
        "Designed conversational entry points and prompts to encourage engagement",
        "Implemented guardrails and validation layers to reduce irrelevant or inaccurate responses",
        "Focused on improving the discovery-to-action journey without requiring users to manually navigate the page",
      ],
      complexity: [
        "Ensuring response relevance and reducing hallucinations was critical, especially for business-related queries",
        "Mapping unstructured business information into retrieval-friendly responses required multiple iterations",
        "Balancing conversational flexibility with reliable and safe outputs needed continuous tuning and monitoring",
      ],
      result: [
        "Improved user engagement on business pages",
        "Increased call intent and interaction rates by simplifying access to business information",
        "Reduced friction in the customer discovery journey through faster query resolution",
        "Created a more AI-native and interactive user experience on the platform",
      ],
    },
  },
  {
    num: "03",
    title: "Single-Click Onboarding Platform",
    company: "Perfios",
    desc: "Modular, API-first onboarding platform to streamline and automate client onboarding workflows across the BFSI ecosystem.",
    impact: "50-60% reduction in onboarding timelines",
    tags: ["Fintech", "API-First", "BFSI", "Automation"],
    icon: Zap,
    writeup: {
      context:
        "Client onboarding in the BFSI ecosystem was heavily fragmented, requiring multiple manual verification steps across KYC, AML, business verification, and compliance workflows. This resulted in long onboarding timelines, operational inefficiencies, and slower client activation.",
      approach: [
        "Unified multiple verification APIs into a single onboarding flow",
        "Designed configurable dashboards and workflows based on client onboarding requirements",
        "Enabled faster data fetching and verification across KYC/KYB/compliance systems",
        "Focused on reducing manual dependencies and simplifying onboarding operations for enterprise clients",
      ],
      complexity: [
        "Integrating multiple compliance and verification systems into a seamless flow required careful orchestration",
        "Different clients had varying onboarding and regulatory requirements, making configurability critical",
        "Ensuring reliability and low latency across multiple API dependencies required continuous optimization and monitoring",
      ],
      result: [
        "Reduced onboarding timelines from 1-2 days to a few hours (50-60% improvement)",
        "Improved operational efficiency and faster client activation",
        "Simplified onboarding workflows for enterprise customers",
        "Successfully showcased at Global Fintech Fest as a scalable onboarding solution",
      ],
    },
  },
  {
    num: "04",
    title: "GoJD - Multi-Vendor Commerce",
    company: "Justdial",
    desc: "0 to 1 development of a commerce-focused platform helping SMB vendors improve visibility and drive direct transactions on the platform.",
    impact: "Launched multi-vendor ecosystem",
    tags: ["Product Strategy", "Marketplace", "SMB", "Go-to-Market"],
    icon: TrendingUp,
    writeup: {
      context:
        "Small businesses on the platform had limited ways to showcase and sell their products beyond traditional lead generation. There was an opportunity to create a commerce-focused experience that could help vendors improve visibility, reach more customers, and drive transactions directly through the platform.",
      approach: [
        "Defined end-to-end user flows across discovery, catalog browsing, and purchase experience",
        "Built onboarding and catalog management workflows for small vendors",
        "Worked closely with content, transcoding, and engineering teams to streamline product uploads",
        "Focused on simplifying the customer journey and increasing vendor reach within the ecosystem",
      ],
      complexity: [
        "Managing consistency across vendor catalogs and media quality required tight cross-functional alignment",
        "Building scalable onboarding for a diverse vendor ecosystem involved balancing simplicity with operational controls",
        "Ensuring a seamless journey across discovery and transaction required multiple coordination cycles",
      ],
      result: [
        "Enabled small businesses to onboard and showcase products more effectively",
        "Improved customer reach and product discoverability within the ecosystem",
        "Established the foundation for a scalable multi-vendor commerce experience",
        "Improved execution predictability and collaboration across cross-functional teams",
      ],
    },
  },
  {
    num: "05",
    title: "Commit",
    company: "Portfolio Case Study",
    desc: "A salary-day commitment device for salaried urban India — not a tracker, but a ritual. SMS + Account Aggregator with an accountability partner mechanic that creates real social consequence at the point of spend.",
    impact: "Full PM case study · Interactive prototype",
    tags: ["Behaviour Change", "Fintech", "0-to-1"],
    icon: Target,
    isCommit: true,
    writeup: null,
  },
];

const EXPERIENCES = [
  {
    role: "Senior Product Manager",
    company: "Justdial",
    period: "2025 - Present",
    desc: "Platform Owner for the Justdial Android app. Led the transition to LLM-powered intent classification, reducing spam calls by 65%. Owned the 0 to 1 build of GoJD commerce platform and built the 'Ask Anything' AI chatbot to enhance conversational discovery.",
  },
  {
    role: "Product Manager",
    company: "Perfios Software Solutions",
    period: "2022 - 2025",
    desc: "Launched Single-Click Onboarding platform, achieving a 50-60% improvement in onboarding TAT. Enhanced AML decisioning by integrating new data sources, contributing to 40% revenue growth. Drove org-wide enablement for compliance shifts.",
  },
  {
    role: "Product Analyst",
    company: "Better.com",
    period: "2020 - 2022",
    desc: "Contributed to ~$300M in loan volume by resolving risk/compliance bottlenecks in underwriting workflows. Collaborated with partner teams to refine decisioning speed and balance regulatory requirements.",
  },
  {
    role: "Assistant Manager",
    company: "IDFC First Bank Ltd.",
    period: "2019 - 2020",
    desc: "Scaled cross-sell portfolio in Mumbai (West) through data-driven analysis and channel enablement, driving 2x sales while managing DSA-led distribution economics.",
  },
];

const SKILLS = [
  {
    title: "Technical",
    items: ["SQL", "Postman / REST APIs", "Power BI", "LLaMA (GenAI)", "Google Analytics", "Figma"],
  },
  {
    title: "Domain",
    items: ["Fintech (KYC/KYB/AML)", "Mortgage Lending", "Retail Banking", "Regulatory Compliance", "Risk Assessment"],
  },
  {
    title: "Product",
    items: ["Roadmap Ownership", "0 to 1 Strategy", "Stakeholder Management", "A/B Testing", "Agile Methodologies"],
  },
  {
    title: "Architecture",
    items: ["API-first Design", "Mobile Platform UX", "Intent Classification"],
  },
];

const CERTIFICATIONS = [
  { title: "Agentic AI", issuer: "DeepLearning.AI", date: "2026" },
  { title: "AI For Everyone", issuer: "DeepLearning.ai", date: "2026" },
  { title: "Building a Product Strategy", issuer: "Product Management Institute (PMI)", date: "2025" },
  { title: "Product Innovation for Product Managers", issuer: "PMI", date: "2025" },
  { title: "Generative AI for Product Managers", issuer: "LinkedIn Learning", date: "2025" },
];

const METRICS = [
  { value: "65%", label: "Spam call reduction via AI intent classification" },
  { value: "50-60%", label: "Faster BFSI client onboarding timelines" },
  { value: "~$300M", label: "Loan volume contribution at Better.com" },
];

// ── Commit Case Study Modal ───────────────────────────────────────────────────

const CommitModal = ({ onClose }: { onClose: () => void }) => {
  const [protoScreen, setProtoScreen] = useState(1);
  const [sliders, setSliders] = useState({ food: 4000, transport: 3000, ent: 2000, shop: 5000 });
  const [emoji, setEmoji] = useState(1);
  const [adjFood, setAdjFood] = useState(4000);
  const [adjEnt, setAdjEnt] = useState(2000);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setProtoScreen((s) => Math.min(5, s + 1));
      if (e.key === "ArrowLeft") setProtoScreen((s) => Math.max(1, s - 1));
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");
  const emojis = [
    { icon: "😴", label: "Too easy" },
    { icon: "😊", label: "Just right" },
    { icon: "😤", label: "Tough" },
    { icon: "😬", label: "Missed" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 56, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 320 }}
        className="bg-zinc-950 border border-zinc-800 w-full sm:max-w-3xl max-h-[92vh] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 border-b border-zinc-800 shrink-0">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
              Portfolio Case Study · Fintech · Behaviour Change
            </p>
            <h3 className="text-xl font-bold text-white">Commit</h3>
            <p className="text-sm text-zinc-500 mt-0.5">A commitment device for salaried India</p>
          </div>
          <button
            onClick={onClose}
            className="mt-0.5 p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 scrollbar-hide">

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-zinc-900 text-sm font-semibold rounded-full">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              0-to-1 Product
            </div>
            {["Behaviour Change", "SMS + AA", "India", "Fintech"].map((t) => (
              <span key={t} className="px-2.5 py-1 text-[11px] font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-full">
                {t}
              </span>
            ))}
          </div>

          {/* PROBLEM */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-4">01 · Problem</h4>
            <blockquote className="border-l-2 border-amber-500 pl-4 mb-5">
              <p className="text-zinc-300 text-sm italic leading-relaxed">
                "Every app answers 'where did my money go?' — no app answers 'what would I have to believe about myself to spend differently?'"
              </p>
            </blockquote>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                { icon: "⚡", title: "Insight without friction", desc: "Data is shown at month-end. The decision happens at 8pm when Swiggy opens." },
                { icon: "🎯", title: "No skin in the game", desc: "Budgets show red when breached. No social cost, no money at stake." },
                { icon: "🌫️", title: "Vague goals", desc: "\"Spend less\" is not a commitment. A named amount with a named witness is." },
                { icon: "🪞", title: "No identity peg", desc: "Behaviour change tools attach goals to identity. Finance apps don't." },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">{item.icon}</span>
                    <span className="text-sm font-semibold text-white">{item.title}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="border-l-2 border-amber-800 bg-zinc-900 rounded-r-xl p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1">Present Bias</p>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The intervention must happen at the moment of spend — not at month-end review. This is the window no product has owned.
              </p>
            </div>
          </div>

          {/* USER PERSONA */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-4">02 · User Persona</h4>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="flex items-center gap-4 p-4 border-b border-zinc-800">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xl shrink-0">👨‍💻</div>
                <div>
                  <p className="font-semibold text-white text-sm">Raj Menon, 28</p>
                  <p className="text-xs text-zinc-500">Software Engineer · Bengaluru · ₹80,000/mo</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3">Goals</p>
                  <ul className="space-y-1.5">
                    {["Feel in control without obsessing over money", "Save for a Japan trip in 8 months", "Stop month-end guilt"].map((g) => (
                      <li key={g} className="flex gap-2 text-xs text-zinc-400">
                        <span className="text-zinc-600 shrink-0">—</span>{g}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3">Frustrations</p>
                  <ul className="space-y-1.5">
                    {["Opens Fi Money, feels bad, closes it", "Sets budgets in Jan, forgets by Feb 5", "Salary absorbed invisibly over 30 days"].map((f) => (
                      <li key={f} className="flex gap-2 text-xs text-zinc-400">
                        <span className="text-zinc-600 shrink-0">—</span>{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-950">
                <p className="text-xs text-zinc-500 italic">"I know exactly where my money goes. I just don't change anything about it."</p>
              </div>
            </div>
          </div>

          {/* CORE CONCEPT */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-4">03 · Core Concept</h4>
            <div className="grid sm:grid-cols-3 gap-3 mb-5">
              {[
                { icon: "🌅", title: "Salary-day ritual", desc: "A 2-min ritual fires the moment salary credits — the one moment of financial clarity." },
                { icon: "🤝", title: "Accountability partner", desc: "Every commit is anchored to a real person who sees your summary and is notified on overages." },
                { icon: "⚡", title: "Real-time nudge", desc: "Every spend SMS parsed instantly. 'You just spent ₹840 at Swiggy. ₹3,160 remaining.'" },
              ].map((p) => (
                <div key={p.title} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-xl mb-3 block">{p.icon}</span>
                  <p className="text-sm font-semibold text-white mb-1.5">{p.title}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3">User Flow</p>
              <div className="flex flex-wrap gap-2 items-center">
                {["💳 Salary credited", "🔔 Ritual triggered", "🔒 Commit locked", "📱 SMS parsed", "⚡ Nudge sent", "🔥 Streak tracked"].map(
                  (step, i, arr) => (
                    <span key={i} className="flex items-center gap-2">
                      <span className="px-2.5 py-1.5 text-xs font-medium bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300">{step}</span>
                      {i < arr.length - 1 && <span className="text-zinc-600 text-xs">→</span>}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* ARCHITECTURE */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-4">04 · Technical Architecture</h4>
            <div className="space-y-2">
              {[
                { label: "Data Layer", chips: ["SMS Parsing (bank alerts)", "Account Aggregator (AA)", "UPI transaction feed"], color: "emerald" as const },
                { label: "Logic Layer", chips: ["Salary detection engine", "Commitment ledger", "Category classifier", "Nudge scheduler"], color: "amber" as const },
                { label: "Delivery Layer", chips: ["WhatsApp Business API", "Push notifications", "Partner notifications", "Weekly digest"], color: "blue" as const },
              ].map((layer, i, arr) => (
                <div key={layer.label}>
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-3">{layer.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {layer.chips.map((chip) => (
                        <span
                          key={chip}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                            layer.color === "emerald"
                              ? "border-emerald-900 text-emerald-400 bg-emerald-950/40"
                              : layer.color === "amber"
                              ? "border-amber-900 text-amber-400 bg-amber-950/40"
                              : "border-blue-900 text-blue-400 bg-blue-950/40"
                          }`}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex justify-center py-1">
                      <span className="text-zinc-600 text-sm">↓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* METRICS */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-4">05 · Metrics Framework</h4>
            <div className="p-4 rounded-xl border border-amber-900 bg-amber-950/20 mb-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1.5">North Star Metric</p>
              <p className="text-sm font-semibold text-white leading-snug">
                % of users who complete ≥1 commitment category within ±10% of target in month 1
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mb-3">Input Metrics</p>
                <ul className="space-y-2.5">
                  {[
                    "Ritual completion rate (within 24h of salary credit)",
                    "Accountability partner invite acceptance rate",
                    "Nudge delivery accuracy (within 60s of SMS)",
                    "Weekly check-in response rate",
                  ].map((m) => (
                    <li key={m} className="flex gap-2 text-xs text-zinc-400 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 mb-3">Guardrail Metrics</p>
                <ul className="space-y-2.5">
                  {["Nudge unsubscribe rate — must stay below 5%", "Accountability partner churn rate"].map((m) => (
                    <li key={m} className="flex gap-2 text-xs text-zinc-400 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1 shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RISKS */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-4">06 · Risks</h4>
            <div className="space-y-2">
              {[
                { level: "High", text: "Accountability mechanic doesn't create real social consequence — the core hypothesis to validate via WhatsApp MVP before engineering." },
                { level: "Med", text: "SMS parsing breaks silently as banks change formats — Account Aggregator is the long-term data layer." },
                { level: "Med", text: "Early monetisation pressure (lending, investments) breaks user trust before behaviour change is proven." },
              ].map((risk, i) => (
                <div key={i} className="flex gap-3 items-start p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 mt-0.5 ${
                      risk.level === "High"
                        ? "bg-red-950 text-red-400 border-red-900"
                        : "bg-amber-950 text-amber-400 border-amber-900"
                    }`}
                  >
                    {risk.level}
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed">{risk.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PROTOTYPE */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-5">07 · Interactive Prototype</h4>
            <div className="flex flex-col items-center">

              {/* Phone frame */}
              <div className="w-full max-w-[280px] bg-zinc-950 rounded-[36px] border border-zinc-700 overflow-hidden shadow-2xl">
                <div className="h-7 bg-zinc-950 flex items-center justify-center">
                  <div className="w-20 h-6 bg-black rounded-b-2xl" />
                </div>
                <div className="bg-black overflow-hidden" style={{ height: "520px" }}>

                  {/* Screen 1 — Salary Alert */}
                  {protoScreen === 1 && (
                    <div className="h-full flex flex-col">
                      <div className="flex justify-between items-center px-4 pt-2 pb-1">
                        <span className="text-white text-xs font-semibold">9:14</span>
                      </div>
                      <div className="mx-3 mb-2 bg-zinc-900 border border-zinc-700 rounded-2xl p-3 flex gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-900 flex items-center justify-center text-sm shrink-0">🏦</div>
                        <div>
                          <p className="text-zinc-400 text-[10px] font-semibold">HDFC Bank</p>
                          <p className="text-white text-xs font-medium leading-tight">₹80,000 credited — Salary Jun 2026</p>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
                        <div className="text-4xl mb-3">💰</div>
                        <div className="text-2xl font-bold text-white mb-1" style={{ letterSpacing: "-1px" }}>₹80,000</div>
                        <p className="text-zinc-400 text-xs mb-5 leading-relaxed">June salary landed.<br />Set your monthly Commit — 2 mins.</p>
                        <div className="bg-amber-950/60 border border-amber-900 rounded-xl p-3 text-left mb-6 w-full">
                          <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wide mb-1">Why now?</p>
                          <p className="text-[11px] text-zinc-400 leading-tight">You're briefly rational about money. Set intent before it gets absorbed.</p>
                        </div>
                      </div>
                      <div className="px-4 pb-6 space-y-2">
                        <button onClick={() => setProtoScreen(2)} className="w-full py-3 bg-amber-500 text-black text-sm font-bold rounded-xl hover:bg-amber-400 transition-colors">
                          Start 2-min ritual →
                        </button>
                        <button className="w-full py-2.5 border border-zinc-800 text-zinc-500 text-xs font-medium rounded-xl">Remind me in 1 hour</button>
                      </div>
                    </div>
                  )}

                  {/* Screen 2 — Commitment Ritual */}
                  {protoScreen === 2 && (
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900">
                        <div>
                          <p className="text-white text-sm font-bold">Set June Commits</p>
                          <p className="text-zinc-500 text-[11px]">These are your promises.</p>
                        </div>
                        <span className="text-[10px] font-bold text-amber-500 bg-amber-950 border border-amber-900 px-2 py-1 rounded-full">1 of 2</span>
                      </div>
                      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide">
                        {[
                          { emoji: "🍔", label: "Food & Dining", key: "food" as const, min: 1000, max: 12000 },
                          { emoji: "🚌", label: "Transport", key: "transport" as const, min: 500, max: 8000 },
                          { emoji: "🎬", label: "Entertainment", key: "ent" as const, min: 500, max: 8000 },
                          { emoji: "🛍", label: "Shopping", key: "shop" as const, min: 1000, max: 15000 },
                        ].map((cat) => (
                          <div key={cat.key} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
                            <div className="flex items-center justify-between mb-2.5">
                              <div className="flex items-center gap-2">
                                <span className="text-base">{cat.emoji}</span>
                                <span className="text-white text-xs font-semibold">{cat.label}</span>
                              </div>
                              <span className="text-amber-500 text-sm font-bold">{fmt(sliders[cat.key])}</span>
                            </div>
                            <input
                              type="range"
                              className="commit-slider"
                              min={cat.min} max={cat.max} step={500}
                              value={sliders[cat.key]}
                              onChange={(e) => setSliders((s) => ({ ...s, [cat.key]: +e.target.value }))}
                            />
                          </div>
                        ))}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-500 mb-2">Who keeps you honest?</p>
                          <input
                            type="text"
                            defaultValue="Priya Sharma"
                            className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-amber-800"
                          />
                          <p className="text-[10px] text-zinc-600 mt-1.5">Priya sees your summary and is notified on overages.</p>
                        </div>
                      </div>
                      <div className="px-4 pb-6 pt-2">
                        <button onClick={() => setProtoScreen(3)} className="w-full py-3 bg-amber-500 text-black text-sm font-bold rounded-xl hover:bg-amber-400 transition-colors">
                          Lock it in →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Screen 3 — Dashboard */}
                  {protoScreen === 3 && (
                    <div className="h-full flex flex-col">
                      <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                        <p className="text-white text-sm font-bold">Hey Raj. Day 12. 🎯</p>
                        <p className="text-zinc-500 text-[11px]">June 2026 · Commits active</p>
                        <span className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-1 bg-amber-950 border border-amber-900 rounded-full text-amber-500 text-[11px] font-semibold whitespace-nowrap">
                          🔥 12-day streak
                        </span>
                      </div>
                      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-hide">
                        {[
                          { emoji: "🍔", label: "Food", used: 2840, total: 4000, pct: 71, color: "bg-amber-500" },
                          { emoji: "🚌", label: "Transport", used: 1200, total: 3000, pct: 40, color: "bg-emerald-500" },
                          { emoji: "🎬", label: "Entertainment", used: 1800, total: 2000, pct: 90, color: "bg-red-500" },
                          { emoji: "🛍", label: "Shopping", used: 0, total: 5000, pct: 0, color: "bg-emerald-500" },
                        ].map((item) => (
                          <div key={item.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
                            <div className="flex items-center justify-between gap-2 mb-2.5">
                              <span className="flex items-center gap-1.5 min-w-0 text-white text-xs font-semibold">
                                <span className="shrink-0">{item.emoji}</span>
                                <span className="truncate">{item.label}</span>
                              </span>
                              <span className="shrink-0 whitespace-nowrap text-zinc-500 text-[11px] tabular-nums">{fmt(item.used)} / {fmt(item.total)}</span>
                            </div>
                            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                            </div>
                          </div>
                        ))}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex items-center gap-3">
                          <span className="text-xl">👩‍💼</span>
                          <div>
                            <p className="text-white text-xs font-semibold">Priya Sharma</p>
                            <p className="text-zinc-500 text-[10px]">Notified of Entertainment overage · Day 10</p>
                          </div>
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-600 pt-1">Recent Spends</p>
                        {[["Swiggy", "Food", "₹480"], ["Ola", "Transport", "₹220"], ["BookMyShow", "Entertainment", "₹560"]].map(
                          ([merchant, cat, amt]) => (
                            <div key={merchant} className="flex items-center justify-between py-2 border-b border-zinc-900">
                              <div>
                                <p className="text-white text-xs font-medium">{merchant}</p>
                                <p className="text-zinc-600 text-[10px]">{cat}</p>
                              </div>
                              <span className="text-white text-xs font-semibold">{amt}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Screen 4 — Spend Nudge */}
                  {protoScreen === 4 && (
                    <div className="h-full flex flex-col items-center justify-center px-4 bg-zinc-950/95">
                      <div className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden">
                        <div className="bg-amber-950/50 border-b border-amber-900/50 px-4 py-3 flex items-center gap-3">
                          <span className="text-base">💬</span>
                          <p className="text-amber-500 text-xs font-bold">Commit · Spend Alert</p>
                          <span className="ml-auto text-amber-800 text-[10px]">Now</span>
                        </div>
                        <div className="p-4">
                          <p className="text-white text-sm font-bold mb-0.5">Swiggy</p>
                          <p className="text-red-400 text-2xl font-black mb-4" style={{ letterSpacing: "-1px" }}>−₹840</p>
                          <div className="border-t border-zinc-800 pt-3 mb-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                              <span className="text-zinc-400 text-xs">Food budget: <span className="text-white font-semibold">₹3,160 remaining</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-zinc-600 shrink-0" />
                              <span className="text-zinc-400 text-xs">₹840 spent today on food</span>
                            </div>
                          </div>
                          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden mb-3">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: "71%" }} />
                          </div>
                          <div className="bg-emerald-950/50 border border-emerald-900/50 rounded-lg p-2.5 mb-4">
                            <p className="text-emerald-400 text-xs font-semibold">✓ You're on track</p>
                            <p className="text-zinc-500 text-[10px] mt-0.5">At this pace: ₹4,200 est. — watch Entertainment.</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => setProtoScreen(3)} className="py-2.5 border border-zinc-700 text-zinc-400 text-xs font-semibold rounded-xl hover:border-zinc-600 transition-colors">Got it</button>
                            <button onClick={() => setProtoScreen(3)} className="py-2.5 bg-amber-500 text-black text-xs font-bold rounded-xl hover:bg-amber-400 transition-colors">View dashboard</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Screen 5 — Weekly Check-in */}
                  {protoScreen === 5 && (
                    <div className="h-full flex flex-col">
                      <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                        <p className="text-amber-500 text-[10px] font-bold uppercase tracking-wide mb-0.5">Week 2 Check-in</p>
                        <p className="text-white text-sm font-bold">How did June go so far?</p>
                      </div>
                      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
                        <div>
                          <p className="text-white text-xs font-semibold mb-1">How did the Food commit feel?</p>
                          <p className="text-zinc-500 text-[11px] mb-3">₹2,840 used of ₹4,000</p>
                          <div className="grid grid-cols-4 gap-1.5">
                            {emojis.map((e, i) => (
                              <button
                                key={i}
                                onClick={() => setEmoji(i)}
                                className={`py-2.5 rounded-xl border text-center transition-all ${
                                  emoji === i ? "border-amber-700 bg-amber-950/60" : "border-zinc-800 bg-zinc-900"
                                }`}
                              >
                                <span className="text-lg block">{e.icon}</span>
                                <span className={`text-[9px] block mt-0.5 ${emoji === i ? "text-amber-500" : "text-zinc-600"}`}>{e.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-white text-xs font-semibold mb-2">What made it harder?</p>
                          <textarea
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white text-xs outline-none focus:border-amber-800 resize-none scrollbar-hide"
                            style={{ height: "60px" }}
                            defaultValue="Team lunch Thursday wiped ₹600."
                          />
                        </div>
                        <div>
                          <p className="text-white text-xs font-semibold mb-2">Adjust next month?</p>
                          {[
                            { label: "🍔 Food", val: adjFood, set: setAdjFood },
                            { label: "🎬 Entertainment", val: adjEnt, set: setAdjEnt },
                          ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 mb-1.5">
                              <span className="text-white text-xs font-medium whitespace-nowrap">{item.label}</span>
                              <div className="flex items-center gap-2 shrink-0">
                                <button onClick={() => item.set((v) => Math.max(500, v - 500))} className="w-6 h-6 rounded-lg bg-zinc-800 text-white text-xs flex items-center justify-center hover:bg-zinc-700">−</button>
                                <span className="text-amber-500 text-xs font-bold w-14 text-center">{fmt(item.val)}</span>
                                <button onClick={() => item.set((v) => v + 500)} className="w-6 h-6 rounded-lg bg-zinc-800 text-white text-xs flex items-center justify-center hover:bg-zinc-700">+</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="px-4 pb-6 pt-2">
                        <button onClick={() => setProtoScreen(3)} className="w-full py-3 bg-amber-500 text-black text-sm font-bold rounded-xl hover:bg-amber-400 transition-colors">
                          Save &amp; close
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Nav dots */}
              <div className="flex gap-2 items-center mt-4">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setProtoScreen(n)}
                    className={`rounded-full transition-all duration-200 ${
                      protoScreen === n ? "w-5 h-1.5 bg-amber-500" : "w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500"
                    }`}
                  />
                ))}
              </div>
              <p className="text-zinc-600 text-[10px] mt-2">Use ← → keys or tap dots to navigate</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800 shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white text-zinc-900 rounded-xl font-semibold text-sm hover:bg-zinc-200 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Case Study Modal ──────────────────────────────────────────────────────────

const CaseStudyModal = ({ project, onClose }: { project: any; onClose: () => void }) => {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 56, opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 320 }}
        className="bg-zinc-950 border border-zinc-800 w-full sm:max-w-3xl max-h-[92vh] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 border-b border-zinc-800 shrink-0">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1">{project.company}</p>
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="mt-0.5 p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-zinc-900 text-sm font-semibold rounded-full">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              {project.impact}
            </div>
            {project.tags.map((t: string) => (
              <span key={t} className="px-2.5 py-1 text-[11px] font-medium text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-full">
                {t}
              </span>
            ))}
          </div>

          {project.writeup?.context && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Context</h4>
              <p className="text-zinc-300 leading-relaxed text-base">{project.writeup.context}</p>
            </div>
          )}

          {project.writeup?.approach && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Approach</h4>
              <ul className="space-y-3">
                {project.writeup.approach.map((p: string, i: number) => (
                  <li key={i} className="flex gap-3 text-zinc-300 text-base">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.writeup?.complexity && (
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Challenges</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.writeup.complexity.map((p: string, i: number) => (
                  <div key={i} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 leading-relaxed">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.writeup?.result && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-8">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-4">Key Results</h4>
              <ul className="space-y-3">
                {project.writeup.result.map((p: string, i: number) => (
                  <li key={i} className="flex gap-3 text-zinc-200 text-base leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-zinc-500 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-zinc-800 shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white text-zinc-900 rounded-xl font-semibold text-sm hover:bg-zinc-200 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Section label ─────────────────────────────────────────────────────────────

const Label = ({ children }: { children: string }) => (
  <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{children}</p>
);

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [commitOpen, setCommitOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const navLinks = ["projects", "experience", "skills", "contact"];

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">

      {/* ── Nav ── */}
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-900"
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-semibold text-white tracking-tight">Smita Bhattacharya</span>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l} href={`#${l}`} className="text-sm text-zinc-500 hover:text-white capitalize transition-colors duration-200">{l}</a>
            ))}
          </nav>
          <button className="md:hidden text-sm font-medium text-zinc-500 hover:text-white transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-black border-t border-zinc-900"
            >
              <div className="flex flex-col px-6 py-4 gap-4">
                {navLinks.map((l) => (
                  <a key={l} href={`#${l}`} onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-white capitalize py-1">{l}</a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="max-w-5xl mx-auto px-6">

        {/* ── Hero ── */}
        <section ref={heroRef} className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-12 lg:gap-20">

            {/* Text */}
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-500"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Senior PM · Justdial
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18, ease }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-white mb-6"
              >
                Smita
                <br />
                <span className="text-zinc-500">Bhattacharya</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.28, ease }}
                className="text-lg text-zinc-300 leading-relaxed max-w-lg mb-6"
              >
                Product Manager specialising in AI-powered products and fintech ecosystems.
                7+ years turning complex business problems into scalable, measurable outcomes
                across B2B and B2C.
              </motion.p>

              {/* PM Philosophy quote */}
              <motion.blockquote
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.38 }}
                className="border-l-2 border-amber-500 pl-4 mb-10"
              >
                <p className="text-sm text-zinc-400 italic leading-relaxed">
                  "The hardest PM skill isn't building the right thing - it's knowing what not to build,
                  and defending that choice in a room full of stakeholders."
                </p>
              </motion.blockquote>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.48 }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href="/resume.pdf"
                  download="Resume_Smita_Bhattacharya.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-900 text-sm font-semibold rounded-xl hover:bg-zinc-200 active:scale-95 transition-all duration-200"
                >
                  Download Resume <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-800 text-zinc-300 text-sm font-semibold rounded-xl hover:border-zinc-600 hover:text-white active:scale-95 transition-all duration-200"
                >
                  Get in touch
                </a>
              </motion.div>
            </div>

            {/* Photo */}
            <motion.div style={{ y: photoY }} className="flex flex-col items-center gap-5 shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15, ease }}
                className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border border-zinc-800 shadow-2xl shadow-black bg-zinc-900"
              >
                <img
                  src={profileImg}
                  alt="Smita Bhattacharya"
                  className="w-full h-full object-cover object-[center_20%]"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&fit=crop"; }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="flex gap-3"
              >
                <a
                  href="https://www.linkedin.com/in/smita-bhattacharya9/"
                  target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="p-3 rounded-xl border border-zinc-800 text-zinc-500 hover:text-blue-400 hover:border-blue-900 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:smitab95@gmail.com" aria-label="Email"
                  className="p-3 rounded-xl border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Metrics ── */}
        <section className="pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-900 border border-zinc-900 rounded-2xl overflow-hidden">
            {METRICS.map((m, i) => (
              <FadeIn key={i} delay={i * 0.1} className="p-7 sm:p-8 bg-zinc-950">
                <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                  <div className="text-3xl font-bold tracking-tight text-white mb-1.5 tabular-nums">{m.value}</div>
                  <div className="text-sm text-zinc-400 leading-snug">{m.label}</div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="pb-24 scroll-mt-20">
          <FadeIn className="mb-10">
            <Label>Selected Work</Label>
            <h2 className="text-3xl font-bold tracking-tight text-white">Featured Projects</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-4">
            {PROJECTS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <motion.button
                  onClick={() => (p as any).isCommit ? setCommitOpen(true) : setSelectedProject(p)}
                  whileHover={{ y: -3, boxShadow: "0 12px 36px -8px rgba(0,0,0,0.6)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className="group text-left w-full p-6 rounded-xl border border-zinc-900 bg-zinc-950 hover:border-zinc-700 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-[11px] font-mono text-zinc-600">{p.num}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                      (p as any).isCommit
                        ? "text-amber-500 bg-amber-950 border-amber-900"
                        : "text-zinc-400 bg-zinc-900 border-zinc-800"
                    }`}>
                      {p.company}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-zinc-300 transition-colors duration-200">{p.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-300">
                      <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                      {p.impact}
                    </div>
                    <span className="text-xs font-semibold text-zinc-500 group-hover:text-zinc-300 flex items-center gap-1 transition-colors duration-200 shrink-0 ml-3">
                      Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.button>
              </FadeIn>
            ))}
          </div>

          <AnimatePresence>
            {selectedProject && (
              <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
            {commitOpen && (
              <CommitModal onClose={() => setCommitOpen(false)} />
            )}
          </AnimatePresence>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="pb-24 scroll-mt-20">
          <FadeIn className="mb-10">
            <Label>Career</Label>
            <h2 className="text-3xl font-bold tracking-tight text-white">Experience</h2>
          </FadeIn>

          <div className="border-t border-zinc-900">
            {EXPERIENCES.map((e, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-1 md:gap-10 py-8 border-b border-zinc-900 cursor-default"
                >
                  <p className="text-xs font-mono text-zinc-500 md:mt-0.5 mb-1 md:mb-0">{e.period}</p>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-2 mb-2">
                      <h3 className="font-bold text-white text-base">{e.role}</h3>
                      <span className="text-zinc-400 text-sm">· {e.company}</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">{e.desc}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="pb-24 scroll-mt-20">
          <FadeIn className="mb-10">
            <Label>Capabilities</Label>
            <h2 className="text-3xl font-bold tracking-tight text-white">Skills & Expertise</h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILLS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className="p-5 rounded-xl border border-zinc-900 bg-zinc-950 h-full"
                >
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-4">{s.title}</h3>
                  <ul className="space-y-2.5">
                    {s.items.map((item, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -6 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 + j * 0.04, duration: 0.35 }}
                        className="text-sm text-zinc-300"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Education ── */}
        <section className="pb-24">
          <FadeIn className="mb-10">
            <Label>Academic</Label>
            <h2 className="text-3xl font-bold tracking-tight text-white">Education</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { period: "2017 - 2019", school: "IMT Nagpur", degree: "Post Graduate Diploma in Management (PGDM)", tags: ["Marketing & Finance", "Okonomos Club"] },
              { period: "2013 - 2016", school: "SNDT University", degree: "Bachelor of Commerce (B.Com) in Accounting", tags: ["Accounting"] },
            ].map((edu, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className="p-6 rounded-xl border border-zinc-900 bg-zinc-950 h-full"
                >
                  <p className="text-xs font-mono text-zinc-500 mb-3">{edu.period}</p>
                  <h3 className="font-bold text-white mb-1">{edu.school}</h3>
                  <p className="text-sm text-zinc-300 mb-4">{edu.degree}</p>
                  <div className="flex gap-2 flex-wrap">
                    {edu.tags.map((t) => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Certifications ── */}
        <section className="pb-24">
          <FadeIn className="mb-10">
            <Label>Learning</Label>
            <h2 className="text-3xl font-bold tracking-tight text-white">Certifications</h2>
          </FadeIn>

          <div className="space-y-2">
            {CERTIFICATIONS.map((c, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="flex items-center justify-between py-4 px-5 rounded-xl border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-950 transition-colors duration-200 cursor-default"
                >
                  <div>
                    <p className="font-semibold text-white text-sm">{c.title}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">{c.issuer}</p>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 shrink-0 ml-4">{c.date}</span>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="pb-20 scroll-mt-20">
          <FadeIn>
            <div className="border border-zinc-800 rounded-2xl p-10 md:p-16 text-center overflow-hidden relative bg-zinc-950">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-2xl bg-radial-[at_50%_50%] from-zinc-600 to-transparent pointer-events-none"
              />
              <h2 className="relative text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">Let's connect.</h2>
              <p className="relative text-zinc-400 text-sm leading-relaxed max-w-sm mx-auto mb-2">
                Open to AI product strategy discussions, fintech collaborations, and high-impact roles.
              </p>
              <p className="relative text-zinc-500 text-sm font-mono mb-10">+91-9978709562</p>

              <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.a
                  href="mailto:smitab95@gmail.com"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-center gap-2 px-7 py-3.5 bg-white text-zinc-900 rounded-xl font-semibold text-sm hover:bg-zinc-200 transition-colors w-full sm:w-auto justify-center"
                >
                  <Mail className="w-4 h-4" /> smitab95@gmail.com
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/smita-bhattacharya9/"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-center gap-2 px-7 py-3.5 border border-zinc-700 text-zinc-300 rounded-xl font-semibold text-sm hover:border-zinc-500 hover:text-white transition-colors w-full sm:w-auto justify-center"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </motion.a>
              </div>
            </div>
          </FadeIn>
        </section>

      </main>
    </div>
  );
}
