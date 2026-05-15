"use client";

import Image from "next/image";
import { ReactNode, useState, useSyncExternalStore } from "react";
import {
  ArrowRight,
  Award,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Cpu,
  DatabaseZap,
  ExternalLink,
  Mail,
  Menu,
  Moon,
  Network,
  Phone,
  ShieldCheck,
  Sparkles,
  Sun,
  Trophy,
  X,
  Zap,
} from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sankalp-shukla-b77596316",
    icon: BriefcaseBusiness,
  },
  {
    label: "GitHub",
    href: "https://github.com/sankalpshukla7474-creator",
    icon: Code2,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/Sankalp212/",
    icon: Code2,
  },
  {
    label: "Email",
    href: buildGmailComposeUrl(
      "Portfolio inquiry for Sankalp Shukla",
      "Hi Sankalp,\n\nI want to discuss an AI/automation project.\n",
    ),
    icon: Mail,
  },
];

const skillGroups = [
  {
    title: "AI Frameworks & Automation",
    skills: [
      "LangChain",
      "LangGraph",
      "n8n Workflow Automation",
      "Custom AI Agents",
      "Hugging Face",
    ],
  },
  {
    title: "ML & Deep Learning",
    skills: [
      "RAG",
      "LLMs (OpenAI GPT, Llama 3, Groq)",
      "TensorFlow",
      "PyTorch",
    ],
  },
  {
    title: "Backend & Cloud",
    skills: [
      "FastAPI",
      "Flask",
      "Vector DBs (Pinecone, Chroma)",
      "Docker",
      "AWS (Certified)",
    ],
  },
  {
    title: "Languages & DataOps",
    skills: [
      "Python",
      "Java",
      "JavaScript",
      "SQL",
      "Pandas",
      "NumPy",
      "MLflow",
      "CI/CD",
    ],
  },
  {
    title: "Core CS",
    skills: ["Data Structures", "Algorithms", "OOP", "System Design"],
  },
];

const services = [
  {
    title: "Enterprise RAG Pipelines",
    description:
      "Securely chat with your PDFs, databases, or knowledge base with zero hallucinations using Pinecone and Llama 3.",
    icon: DatabaseZap,
    href: "https://contra.com/s/qMcNQ7A2-custom-rag-chatbots-trained-on-your-business-data",
    image: "/gigs/enterprise-rag-ai-agents.png",
  },
  {
    title: "Custom AI Agents",
    description:
      "Multi-agent LangChain workflows that process data, browse the web, and execute complex tasks 24/7.",
    icon: Bot,
    href: "https://contra.com/s/eOsgB2Qr-ai-api-integration-with-fast-api-lang-chain-and-ll-ms",
    image: "/gigs/ai-api-integration.png",
  },
  {
    title: "n8n Workflow Automation",
    description:
      "Connecting disparate software ecosystems and complex APIs (HubSpot, Slack) to reduce manual operational tasks by 10+ hours weekly.",
    icon: Network,
    href: "https://contra.com/s/leRRqqlR-ai-workflow-automation-with-n8n-zapier-and-open-ai",
    image: "/gigs/workflow-automation.png",
  },
];

const experience = [
  {
    role: "Freelance AI & Automation Engineer",
    company: "Global / Remote",
    period: "May 2026 – Present",
    bullets: [
      "Architecting custom multi-agent workflows using LangChain and n8n.",
      "Deploying production-ready RAG pipelines.",
      "Integrating complex APIs via FastAPI.",
    ],
  },
  {
    role: "Junior AI Engineer Intern",
    company: "Globe Spring Solutions",
    period: "Apr 2026 – Oct 2026",
    bullets: [
      "Promoted to architect Agentic AI pipelines and advanced LLM workflows.",
      "Led cross-functional collaboration on data engineering and intelligent automation.",
    ],
  },
  {
    role: "Machine Learning Engineer Intern",
    company: "Globe Spring Solutions",
    period: "Feb 2026 – Apr 2026",
    bullets: [
      "Built end-to-end ML pipelines (Pandas, Scikit-learn), reducing manual effort by ~40%.",
      "Deployed models via MLflow achieving 88%+ accuracy.",
    ],
  },
];

const projects = [
  {
    title: "AI-Driven Judicial Precedent & Case Management System",
    tech: "Python, RAG, LangChain, Hugging Face, Groq (Llama 3.3 70B), Docker.",
    description:
      "Architected a highly accurate RAG pipeline utilizing Vector Databases and open-source LLMs to retrieve and rank judicial precedents. Implemented advanced hallucination detection with a 0-100% trust-scoring engine.",
    highlight: "🏆 Won Best Innovation Award at Build With Gemini.",
    icon: ShieldCheck,
    href: "https://github.com/sankalpshukla7474-creator",
  },
  {
    title: "Endpoint Security Anomaly Detection System",
    tech: "Python, TensorFlow, Flask, Pandas, Docker, JavaScript.",
    description:
      "Processed 20,000+ endpoint telemetry events. Built an autoencoder-based anomaly detection model flagging 1,000+ real-time threats. Deployed via Docker with a CI/CD pipeline and real-time SOC dashboard.",
    icon: Cpu,
    href: "https://github.com/sankalpshukla7474-creator",
  },
];

const certifications = [
  "AWS Certified AI Practitioner (AIF-C01) (Feb 2026)",
  "AWS Certified Cloud Practitioner (CLF-C02) (Feb 2026)",
  "Introduction to Modern AI (Cisco)",
];

const hackathons = [
  "Team Leader – Best Innovation Award, Build With Gemini (Delhi University)",
  "Team Leader – 1st Runner-Up, AI Global Summit 2K26 (GLA University)",
  "Team Leader – 1st Runner-Up, Vibe Coding Hackathon (BMIET Sonipat)",
];

type Theme = "dark" | "light";

const THEME_STORAGE_KEY = "sankalp-theme";
const THEME_CHANGE_EVENT = "sankalp-theme-change";

function getServerThemeSnapshot(): Theme {
  return "dark";
}

function getThemeSnapshot(): Theme {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
}

function subscribeToThemeChanges(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
}

function saveTheme(theme: Theme) {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

function scrollToSection(href: string) {
  const element = document.querySelector(href);
  element?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function buildGmailComposeUrl(subject: string, body: string) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=sankalpshukla212@gmail.com&su=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="animate-rise mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.26em] text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
          {copy}
        </p>
      ) : null}
    </div>
  );
}

function GlowCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-[1px] shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:shadow-emerald-950/30 ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.14),transparent_30%)] opacity-70 transition duration-300 group-hover:opacity-100" />
      <div className="relative h-full rounded-2xl bg-slate-950/55 p-6">
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useSyncExternalStore(
    subscribeToThemeChanges,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const toggleTheme = () => {
    saveTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <main
      className={`theme-root theme-${theme} min-h-screen overflow-hidden bg-[#0B0F19] text-slate-100`}
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute right-[-12rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute bottom-0 left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-emerald-300/10 blur-3xl" />
      </div>

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0B0F19]/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => scrollToSection("#hero")}
            className="shrink-0 whitespace-nowrap text-base font-bold tracking-tight text-white sm:text-lg"
            aria-label="Go to top"
          >
            <span className="text-emerald-300">&lt;</span>Sankalp{" "}
            <span className="text-cyan-300">/&gt;</span>
          </button>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-slate-300 transition hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-cyan-200/60 hover:text-cyan-200"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("#contact");
              }}
              className="inline-flex rounded-full border border-emerald-300/40 bg-emerald-300/10 px-5 py-2.5 text-sm font-semibold text-emerald-100 shadow-lg shadow-emerald-950/30 transition hover:border-emerald-200 hover:bg-emerald-300/20"
            >
              Hire Me
            </a>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="ml-auto mr-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-cyan-200/60 hover:text-cyan-200 sm:h-10 sm:w-10 lg:hidden"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("#contact");
            }}
            className="mr-2 inline-flex shrink-0 whitespace-nowrap rounded-full border border-emerald-300/35 bg-emerald-300/10 px-3 py-2 text-[11px] font-bold leading-none text-emerald-100 shadow-lg shadow-emerald-950/20 transition hover:border-emerald-200 sm:mr-3 sm:px-4 sm:text-xs lg:hidden"
          >
            Hire Me
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white sm:h-10 sm:w-10 lg:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen ? (
          <div className="border-t border-white/10 bg-slate-950/95 px-5 py-5 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    scrollToSection(link.href);
                  }}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm font-medium text-slate-200"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  scrollToSection("#contact");
                }}
                className="rounded-xl bg-emerald-300 px-4 py-3 text-sm font-bold text-slate-950"
              >
                Hire Me
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-bold text-slate-100"
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        ) : null}
      </nav>

      <section
        id="hero"
        className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:pt-24"
      >
        <div className="animate-rise max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-100 shadow-lg shadow-emerald-950/30">
            <Sparkles size={16} />
            🔥 500+ DSA Questions Solved
          </div>
          <p className="mb-4 text-lg font-medium text-cyan-200">
            Hi, I am Sankalp Shukla.
          </p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Enterprise AI & Automation Engineer
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            I engineer production-ready RAG Systems, Custom AI Agents, and n8n
            Workflows. Unlike generic ChatGPT wrappers, I build autonomous
            systems that solve real business problems with zero hallucinations.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollToSection("#projects")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-7 py-4 text-sm font-bold text-slate-950 shadow-2xl shadow-emerald-950/40 transition hover:scale-[1.02]"
            >
              View Projects <ArrowRight size={18} />
            </button>
            <a
              href="/Sankalp_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-bold text-white transition hover:border-cyan-200/60 hover:bg-white/10"
            >
              Download Resume <ExternalLink size={17} />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={link.label}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-slate-200 transition hover:border-cyan-200/60 hover:text-cyan-200"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="animate-rise-delay relative mx-auto w-full max-w-[28rem]">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-emerald-300/25 via-cyan-300/10 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-3 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-slate-900">
              <Image
                src="/sankalp-profile.jpeg"
                alt="Sankalp Shukla"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 448px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/70 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-slate-950/75 p-4 backdrop-blur-xl">
              <p className="text-sm font-semibold text-white">
                Production AI systems
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                RAG, agents, secure APIs, automation workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative z-10 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="About & Skills"
            title="Built for real business systems, not demos."
            copy="I am a dynamic AI Engineer with a strong foundation in Machine Learning, Agentic Workflows, and Enterprise Automation. As a Junior AI Engineer Intern at Globe Spring Solutions and a successful Freelance Consultant, I architect scalable LangChain multi-agent systems and secure APIs for global clients."
          />

          <div className="grid gap-5 lg:grid-cols-5">
            {skillGroups.map((group) => (
              <GlowCard key={group.title} className="lg:col-span-1">
                <h3 className="mb-5 text-base font-semibold text-white">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3 py-1.5 text-xs font-semibold text-emerald-100 shadow-[0_0_18px_rgba(52,211,153,0.08)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="relative z-10 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="My Services"
            title="AI automation offers for high-leverage teams."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <GlowCard key={service.title}>
                  <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-slate-900">
                    <Image
                      src={service.image}
                      alt={`${service.title} gig preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                  </div>
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-4 min-h-28 text-sm leading-7 text-slate-300">
                    {service.description}
                  </p>
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition hover:text-cyan-200"
                  >
                    View offer <ChevronRight size={17} />
                  </a>
                </GlowCard>
              );
            })}
          </div>

          <GlowCard className="mt-6">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-slate-900">
                <Image
                  src="/gigs/ai-solutions.png"
                  alt="AI solutions gig preview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                  Fiverr flagship offer
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  AI Chatbots, RAG Systems, Workflow Automation
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Custom AI solutions for your business using Python,
                  LangChain, OpenAI, FastAPI, n8n, Zapier, and Vector DBs.
                </p>
                <a
                  href="https://www.fiverr.com/s/rEyxj30"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:border-emerald-200 hover:bg-emerald-300/20"
                >
                  View Fiverr gig <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </GlowCard>

          <div className="mt-8 flex justify-center">
            <a
              href="https://www.fiverr.com/s/rEyxj30"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:border-emerald-200 hover:bg-emerald-300/20"
            >
              Explore Fiverr profile <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      <section id="experience" className="relative z-10 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Professional Experience"
            title="A timeline of applied AI engineering."
          />

          <div className="relative">
            <div className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-emerald-300 via-cyan-300 to-transparent md:block" />
            <div className="space-y-6">
              {experience.map((item, index) => (
                <div
                  key={`${item.role}-${item.period}`}
                  className="animate-rise relative md:pl-14"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="absolute left-0 top-7 hidden h-8 w-8 items-center justify-center rounded-full border border-emerald-300/40 bg-slate-950 text-emerald-200 shadow-lg shadow-emerald-950/30 md:flex">
                    <BriefcaseBusiness size={16} />
                  </div>
                  <GlowCard>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {item.role}{" "}
                          <span className="text-slate-400">| {item.company}</span>
                        </h3>
                      </div>
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold text-cyan-100">
                        {item.period}
                      </span>
                    </div>
                    <ul className="mt-5 space-y-3">
                      {item.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-sm leading-7 text-slate-300"
                        >
                          <CheckCircle2
                            size={18}
                            className="mt-1 shrink-0 text-emerald-300"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </GlowCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="relative z-10 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Key Projects"
            title="Systems with measurable technical depth."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <GlowCard key={project.title}>
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">
                      <Icon size={26} />
                    </div>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-200/60 hover:text-cyan-200"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm font-semibold leading-7 text-cyan-200">
                    Tech: {project.tech}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {project.description}
                  </p>
                  {project.highlight ? (
                    <p className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm font-semibold text-amber-100">
                      Highlight: {project.highlight}
                    </p>
                  ) : null}
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Achievements & Certifications"
            title="Proof points across cloud, AI, and hackathons."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            <GlowCard>
              <Award className="mb-5 text-emerald-300" size={30} />
              <h3 className="mb-5 text-xl font-semibold text-white">
                Certifications
              </h3>
              <ul className="space-y-3">
                {certifications.map((item) => (
                  <li key={item} className="text-sm leading-7 text-slate-300">
                    {item}
                  </li>
                ))}
              </ul>
            </GlowCard>
            <GlowCard>
              <Trophy className="mb-5 text-cyan-300" size={30} />
              <h3 className="mb-5 text-xl font-semibold text-white">
                Hackathons
              </h3>
              <ul className="space-y-3">
                {hackathons.map((item) => (
                  <li key={item} className="text-sm leading-7 text-slate-300">
                    {item}
                  </li>
                ))}
              </ul>
            </GlowCard>
            <GlowCard>
              <Cloud className="mb-5 text-emerald-300" size={30} />
              <h3 className="mb-5 text-xl font-semibold text-white">
                Education
              </h3>
              <p className="text-sm leading-7 text-slate-300">
                B.Tech CSE at KIET Group Of Institutions (Aggregate: 80%).
              </p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-3xl font-semibold text-white">80%</p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-400">
                  Aggregate
                </p>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="animate-rise">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.26em] text-cyan-300">
              Contact
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Ready to automate your business?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Currently open for freelance projects and enterprise AI roles.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="tel:+918874745250"
                className="flex items-center gap-3 text-slate-200 transition hover:text-emerald-200"
              >
                <Phone size={20} className="text-emerald-300" />
                +91 8874745250
              </a>
              <a
                href={buildGmailComposeUrl(
                  "Portfolio inquiry for Sankalp Shukla",
                  "Hi Sankalp,\n\nI want to discuss an AI/automation project.\n",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-200 transition hover:text-cyan-200"
              >
                <Mail size={20} className="text-cyan-300" />
                sankalpshukla212@gmail.com
              </a>
            </div>
          </div>

          <GlowCard>
            <form
              action="/api/contact"
              method="POST"
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/60"
                  placeholder="Tell me what you want to automate."
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-7 py-4 text-sm font-bold text-slate-950 shadow-2xl shadow-emerald-950/40 transition hover:scale-[1.01]"
              >
                Send Hire Request <Zap size={17} />
              </button>
              <p className="text-center text-xs leading-5 text-slate-400">
                This sends the details directly to sankalpshukla212@gmail.com
                through the portfolio email service.
              </p>
            </form>
          </GlowCard>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-sm text-slate-400 sm:flex-row sm:text-left">
          <p>© 2026 Sankalp Shukla. Built with precision.</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={link.label}
                  className="text-slate-400 transition hover:text-cyan-200"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </main>
  );
}
