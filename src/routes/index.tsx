import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Download,
  Code2,
  Cpu,
  Cloud,
  Palette,
  Sparkles,
  Rocket,
  ShieldCheck,
  Gauge,
  MessageCircle,
  Check,
  Plus,
  Minus,
  Star,
  Quote,
  ChevronUp,
  Menu,
  X,
  Calendar,
} from "lucide-react";
import portrait from "@/assets/portrait.jpg";

type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };
const Github = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...p}>
    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.19 1.18a11 11 0 0 1 5.8 0c2.22-1.49 3.19-1.18 3.19-1.18.63 1.59.24 2.77.12 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.35.78 1.05.78 2.12v3.15c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);
const Linkedin = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...p}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.44a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
);
const Twitter = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...p}>
    <path d="M18.244 2H21l-6.51 7.44L22.5 22h-6.79l-4.71-6.16L5.4 22H2.64l6.96-7.96L2 2h6.91l4.26 5.63L18.244 2Zm-1.19 18.4h1.5L7.05 3.52H5.44L17.054 20.4Z" />
  </svg>
);

export const Route = createFileRoute("/")({
  component: Portfolio,
});

/* ---------- Reusable bits ---------- */

function useMagnetic() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    };
    const onLeave = () => (el.style.transform = "translate(0,0)");
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return ref;
}

function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--cyan)] shadow-[0_0_12px_var(--cyan)]" />
      {children}
    </div>
  );
}

function Button({
  children,
  variant = "primary",
  href,
  className = "",
  icon,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  className?: string;
  icon?: React.ReactNode;
}) {
  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 overflow-hidden";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-[color:var(--cyan)] via-[color:var(--primary)] to-[color:var(--purple)] text-black shadow-[0_0_40px_-8px_var(--primary)] hover:shadow-[0_0_60px_-4px_var(--primary)]"
      : "border border-white/15 bg-white/5 text-foreground hover:bg-white/10 hover:border-white/25";
  const mag = useMagnetic();
  return (
    <div ref={mag} className="inline-block transition-transform duration-200">
      <a href={href ?? "#"} className={`${base} ${styles} ${className}`}>
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {icon ?? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
        </span>
      </a>
    </div>
  );
}

/* ---------- Sections ---------- */

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["About", "#about"],
    ["Services", "#services"],
    ["Work", "#work"],
    ["Process", "#process"],
    ["Contact", "#contact"],
  ];
  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full glass px-4 py-2.5">
        <a href="#" className="flex items-center gap-2 pl-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[color:var(--cyan)] to-[color:var(--purple)] font-display text-sm font-bold text-black">
            JA
          </span>
          <span className="hidden text-sm font-semibold sm:inline">John Anderson</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([l, h]) => (
            <a
              key={l}
              href={h}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="#contact" className="!py-2 !px-5">
            Hire Me
          </Button>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl glass p-4 md:hidden"
          >
            {links.map(([l, h]) => (
              <a
                key={l}
                href={h}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                {l}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 hero-bg">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      {/* floating orbs */}
      <div className="pointer-events-none absolute -top-20 left-10 h-72 w-72 rounded-full bg-[color:var(--cyan)]/20 blur-3xl animate-float" />
      <div
        className="pointer-events-none absolute top-40 right-10 h-96 w-96 rounded-full bg-[color:var(--purple)]/20 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <SectionLabel>Available for select projects · Q3 2026</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
              <span className="text-gradient">Engineering</span>
              <br />
              digital products
              <br />
              <span className="text-muted-foreground">that convert.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              I'm <span className="text-foreground font-medium">John Anderson</span> — a full-stack
              developer, AI engineer, and cloud architect. I build scalable web apps, AI-powered
              products, and modern digital experiences that help ambitious teams grow.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#contact">Hire Me</Button>
              <Button href="#work" variant="ghost" icon={<ArrowUpRight className="h-4 w-4" />}>
                View Portfolio
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                ["50+", "Projects"],
                ["30+", "Clients"],
                ["6+", "Years"],
                ["25+", "Technologies"],
              ].map(([n, l]) => (
                <div key={l as string}>
                  <div className="font-display text-3xl font-bold text-gradient">
                    <Counter to={parseInt(n as string)} suffix="+" />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-[color:var(--cyan)]/40 via-[color:var(--primary)]/30 to-[color:var(--purple)]/40 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 glass">
              <img
                src={portrait}
                alt="Portrait of John Anderson"
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl glass px-4 py-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[color:var(--emerald)] shadow-[0_0_10px_var(--emerald)]" />
                  <span className="text-foreground">Open to new work</span>
                </div>
                <span className="text-muted-foreground">Remote · Worldwide</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <span>Scroll</span>
          <div className="h-10 w-px animate-pulse bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function About() {
  const timeline = [
    { year: "2024", title: "Independent Studio", body: "Launched full-service freelance practice serving Y-Combinator, SaaS and enterprise clients." },
    { year: "2022", title: "Lead Engineer · Fintech", body: "Architected a real-time trading dashboard used by 40k+ daily active traders." },
    { year: "2020", title: "AI Research Engineer", body: "Shipped early LLM tooling and retrieval systems before RAG was mainstream." },
    { year: "2018", title: "Full Stack Developer", body: "Started professional career shipping React and Node products for agencies." },
  ];
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionLabel>About</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-4xl font-bold sm:text-5xl">
                A decade of shipping
                <br />
                <span className="text-gradient">product-grade software.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-muted-foreground">
                I partner with founders and product teams to design, build, and scale software that
                actually earns revenue. My work sits at the intersection of engineering craft,
                clear communication, and calm attention to detail.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  ["Mission", "Ship software that compounds value."],
                  ["Vision", "Empower lean teams with AI-native tools."],
                  ["Values", "Clarity, craft, ownership."],
                  ["Fun fact", "Recorded a jazz EP in 2021."],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-2xl glass p-5">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {k}
                    </div>
                    <div className="mt-2 text-sm text-foreground">{v}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-8">
                <Button variant="ghost" icon={<Download className="h-4 w-4" />}>
                  Download Resume
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[color:var(--cyan)] via-[color:var(--primary)] to-transparent" />
            <div className="space-y-6">
              {timeline.map((t, i) => (
                <Reveal key={t.year} delay={i * 0.08}>
                  <div className="relative pl-12">
                    <div className="absolute left-2 top-2 h-4 w-4 rounded-full border border-white/20 bg-background shadow-[0_0_20px_var(--primary)]">
                      <div className="m-1 h-2 w-2 rounded-full bg-gradient-to-br from-[color:var(--cyan)] to-[color:var(--purple)]" />
                    </div>
                    <div className="rounded-2xl glass p-5">
                      <div className="text-xs uppercase tracking-widest text-[color:var(--cyan)]">
                        {t.year}
                      </div>
                      <div className="mt-1 text-lg font-semibold">{t.title}</div>
                      <div className="mt-2 text-sm text-muted-foreground">{t.body}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: Code2,
      title: "Web Development",
      desc: "Custom, high-performance web platforms with pixel-perfect UI and rock-solid APIs.",
      features: ["Responsive design", "REST & GraphQL APIs", "Backend systems", "CMS integration"],
      from: "$3,500",
    },
    {
      icon: Cpu,
      title: "AI Development",
      desc: "LLM apps, chatbots, RAG pipelines, and workflow automation built on modern AI stacks.",
      features: ["RAG systems", "LLM applications", "AI chatbots", "Workflow automation"],
      from: "$4,900",
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      desc: "Resilient infrastructure on AWS and Azure with CI/CD, observability, and zero downtime.",
      features: ["AWS & Azure", "Docker & Kubernetes", "CI/CD pipelines", "Deployment"],
      from: "$2,800",
    },
    {
      icon: Palette,
      title: "UI / UX Development",
      desc: "Landing pages, dashboards, and admin panels that convert visitors into paying users.",
      features: ["Landing pages", "Dashboards", "Admin panels", "Mobile responsive"],
      from: "$1,900",
    },
    {
      icon: Gauge,
      title: "Performance",
      desc: "Audit and optimize slow, bloated apps into fast, Core Web Vitals-friendly products.",
      features: ["Lighthouse 95+", "Bundle optimization", "Caching", "SEO wins"],
      from: "$1,500",
    },
    {
      icon: Sparkles,
      title: "Consulting",
      desc: "Architecture reviews, technical strategy, and hands-on mentorship for engineering teams.",
      features: ["Architecture", "Code review", "Team mentorship", "Roadmapping"],
      from: "$220/hr",
    },
  ];
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>Services</SectionLabel>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={0.1}>
            <h2 className="max-w-2xl text-4xl font-bold sm:text-5xl">
              Everything you need to <span className="text-gradient">ship & scale.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-md text-muted-foreground">
              Six focused offerings — priced transparently, scoped weekly, delivered with a
              production-grade quality bar.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-card/60 p-7 transition-all duration-500 hover:border-white/20 hover:-translate-y-1">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[color:var(--cyan)]/20 via-transparent to-[color:var(--purple)]/20" />
                </div>
                <div className="relative">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-white/10 to-transparent">
                    <s.icon className="h-6 w-6 text-[color:var(--cyan)]" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <ul className="mt-6 space-y-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-[color:var(--emerald)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        Starting from
                      </div>
                      <div className="font-display text-xl font-semibold">{s.from}</div>
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1 text-sm text-[color:var(--cyan)] transition-all hover:gap-2"
                    >
                      Enquire <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  const tech = [
    "React", "Next.js", "TypeScript", "JavaScript", "Vue", "Angular",
    "Node.js", "Express", ".NET Core", "C#", "Python", "Java",
    "PostgreSQL", "MongoDB", "MySQL", "Redis", "SQL Server",
    "AWS", "Azure", "Docker", "Vercel", "Firebase",
    "OpenAI", "LangChain", "TensorFlow", "MCP", "Git", "GitHub",
  ];
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>Tech Stack</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-2xl text-4xl font-bold sm:text-5xl">
            A modern toolkit, <span className="text-gradient">production hardened.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap gap-3">
            {tech.map((t) => (
              <span
                key={t}
                className="cursor-default rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-muted-foreground transition-all hover:border-[color:var(--cyan)]/40 hover:bg-white/[0.06] hover:text-foreground hover:shadow-[0_0_20px_-6px_var(--cyan)]"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Work() {
  const [filter, setFilter] = useState<string>("All");
  const projects = [
    {
      title: "Nova AI Dashboard",
      cat: "AI",
      desc: "Realtime analytics workspace with an embedded LLM copilot for revenue teams.",
      tags: ["Next.js", "OpenAI", "Postgres"],
      accent: "from-[color:var(--cyan)]/40 to-[color:var(--primary)]/30",
    },
    {
      title: "Helio Commerce",
      cat: "Full Stack",
      desc: "Headless commerce platform reducing checkout drop-off by 34% for a DTC brand.",
      tags: ["React", "Node.js", "Stripe"],
      accent: "from-[color:var(--purple)]/40 to-[color:var(--primary)]/30",
    },
    {
      title: "Atlas Cloud Console",
      cat: "Cloud",
      desc: "Multi-region infrastructure control plane for a scale-up SaaS on AWS + Azure.",
      tags: ["AWS", "Terraform", "Go"],
      accent: "from-[color:var(--emerald)]/40 to-[color:var(--cyan)]/30",
    },
    {
      title: "Lumen RAG Search",
      cat: "AI",
      desc: "Enterprise knowledge assistant answering 15k queries daily across 4M documents.",
      tags: ["LangChain", "Pinecone", "Python"],
      accent: "from-[color:var(--cyan)]/40 to-[color:var(--purple)]/30",
    },
    {
      title: "Field Ops Mobile",
      cat: "Mobile",
      desc: "Offline-first mobile app for logistics teams operating in low-connectivity zones.",
      tags: ["React Native", "SQLite", "Node"],
      accent: "from-[color:var(--primary)]/40 to-[color:var(--emerald)]/30",
    },
    {
      title: "Meridian Landing Suite",
      cat: "Web",
      desc: "Award-nominated marketing site + CMS for a Series B fintech launch.",
      tags: ["Astro", "Tailwind", "Sanity"],
      accent: "from-[color:var(--purple)]/40 to-[color:var(--cyan)]/30",
    },
  ];
  const cats = ["All", "AI", "Web", "Full Stack", "Cloud", "Mobile"];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.cat === filter);
  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>Featured Work</SectionLabel>
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={0.1}>
            <h2 className="max-w-2xl text-4xl font-bold sm:text-5xl">
              Selected <span className="text-gradient">client projects.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition-all ${
                    filter === c
                      ? "border-[color:var(--cyan)]/60 bg-[color:var(--cyan)]/10 text-foreground"
                      : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[var(--shadow-card)]"
              >
                <div
                  className={`absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br ${p.accent} blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[color:var(--cyan)]">
                      {p.cat}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                      Case Study
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Live Demo →
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-sm text-[color:var(--cyan)]"
                    >
                      View case study <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      name: "Sarah Chen",
      role: "CTO, Nova Analytics",
      quote:
        "John shipped in three weeks what our previous team couldn't in six months. The bar for craft and communication was extraordinary.",
    },
    {
      name: "Marcus Rivera",
      role: "Founder, Helio Commerce",
      quote:
        "Rare combination of deep technical skill and product intuition. Our conversion rate is up 34% since launch. He is the first person I recommend.",
    },
    {
      name: "Aisha Okoye",
      role: "VP Engineering, Atlas",
      quote:
        "Calm, thoughtful, and ridiculously fast. John rearchitected our platform under load and it hasn't paged us since. Truly premium work.",
    },
    {
      name: "David Park",
      role: "Product Lead, Lumen",
      quote:
        "Working with John felt like hiring a small agency inside one person. Design, engineering, strategy — all top tier.",
    },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 5500);
    return () => clearInterval(t);
  }, [items.length]);
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>Testimonials</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-2xl text-4xl font-bold sm:text-5xl">
            Trusted by founders <span className="text-gradient">who ship.</span>
          </h2>
        </Reveal>

        <div className="relative mt-12 overflow-hidden rounded-3xl glass p-10 sm:p-14">
          <Quote className="absolute -top-6 -left-6 h-40 w-40 text-white/[0.03]" />
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-[color:var(--cyan)] text-[color:var(--cyan)]" />
                  ))}
                </div>
                <p className="mt-6 text-xl leading-relaxed text-foreground sm:text-2xl">
                  “{items[i].quote}”
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[color:var(--cyan)] to-[color:var(--purple)] font-display font-bold text-black">
                    {items[i].name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold">{items[i].name}</div>
                    <div className="text-sm text-muted-foreground">{items[i].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex gap-2">
              {items.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  className={`h-1.5 rounded-full transition-all ${
                    k === i ? "w-8 bg-[color:var(--cyan)]" : "w-2 bg-white/20"
                  }`}
                  aria-label={`Testimonial ${k + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["Discovery", "Deep-dive into your goals, users, and constraints."],
    ["Planning", "Scope, timeline, and technical architecture agreed in writing."],
    ["Design", "High-fidelity UI, prototypes, and design system tokens."],
    ["Development", "Weekly production-ready increments in a shared repo."],
    ["Testing", "Automated and manual QA across devices and load profiles."],
    ["Deployment", "Zero-downtime launch with monitoring & observability."],
    ["Support", "Post-launch iteration, tuning, and priority response."],
  ];
  return (
    <section id="process" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>Working Process</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-2xl text-4xl font-bold sm:text-5xl">
            A calm, repeatable <span className="text-gradient">delivery loop.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s[0]} delay={i * 0.05}>
              <div className="group relative h-full rounded-3xl border border-white/10 bg-card/60 p-6 transition-all hover:-translate-y-1 hover:border-[color:var(--cyan)]/30">
                <div className="font-display text-4xl font-bold text-white/10 transition-colors group-hover:text-[color:var(--cyan)]/40">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{s[0]}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s[1]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyMe() {
  const items = [
    [Rocket, "Fast delivery", "Weekly increments, no ghosting, no drift."],
    [Code2, "Clean code", "Readable, tested, documented — a joy to inherit."],
    [Palette, "Modern UI", "Design-led work that feels premium out of the box."],
    [ShieldCheck, "Scalable", "Architectures built to survive real user load."],
    [Gauge, "Performance", "Core Web Vitals in the green from day one."],
    [MessageCircle, "Communication", "Same-day replies, honest scope conversations."],
  ];
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>Why Choose Me</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-2xl text-4xl font-bold sm:text-5xl">
            Six reasons founders <span className="text-gradient">come back.</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([Icon, t, d], i) => (
            <Reveal key={t as string} delay={i * 0.05}>
              <div className="group h-full rounded-3xl border border-white/10 bg-card/60 p-7 transition-all hover:border-white/25 hover:-translate-y-1">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[color:var(--cyan)]/20 to-[color:var(--purple)]/20 text-[color:var(--cyan)]">
                  {(() => { const I = Icon as React.ComponentType<{ className?: string }>; return <I className="h-5 w-5" />; })()}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{t as string}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    [50, "+", "Projects Shipped"],
    [30, "+", "Happy Clients"],
    [6, "+", "Years Experience"],
    [99, "%", "Client Satisfaction"],
  ] as const;
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2.5rem] border border-white/10 glass p-10 sm:p-14">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map(([n, s, l]) => (
              <Reveal key={l}>
                <div>
                  <div className="font-display text-5xl font-bold text-gradient">
                    <Counter to={n} suffix={s} />
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                    {l}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qs = [
    ["How do you price projects?", "Fixed-scope engagements are billed weekly with a written statement of work. Long-term retainers are billed monthly. No surprises, no hidden fees."],
    ["What is your typical timeline?", "Landing pages ship in 1–2 weeks, MVPs in 4–8 weeks, and full products in 3–6 months. I keep a small client roster so I can move quickly."],
    ["Do you offer post-launch support?", "Yes — every project includes 30 days of priority support. Ongoing retainers are available for teams that want a fractional senior engineer."],
    ["Which technologies do you specialise in?", "TypeScript, React, Next.js, Node, Python, Postgres, and the modern AI stack (OpenAI, LangChain, RAG). I choose tools that fit the problem."],
    ["How do payments work?", "50% upfront to reserve capacity, remainder billed in weekly milestones. Wire, ACH, or Stripe."],
    ["Can you maintain existing code?", "Absolutely. I take on rescue projects, audits, and long-term maintenance for teams that need a senior pair of hands."],
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <SectionLabel>FAQ</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-4xl font-bold sm:text-5xl">
            Answers, <span className="text-gradient">before you ask.</span>
          </h2>
        </Reveal>
        <div className="mt-12 space-y-3">
          {qs.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <Reveal key={q} delay={i * 0.04}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-card/60">
                  <button
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="text-lg font-medium">{q}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-6 pb-6 text-muted-foreground">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <SectionLabel>Contact</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-4xl font-bold sm:text-5xl">
                Let's build something <span className="text-gradient">unforgettable.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-muted-foreground">
                I take on a handful of new engagements each quarter. Share a few details about
                your project and I'll respond personally within 24 hours.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 space-y-4">
                {[
                  [Mail, "hello@johnanderson.dev"],
                  [Phone, "+1 (415) 555-0142"],
                  [MapPin, "San Francisco · Remote worldwide"],
                ].map(([Icon, v]) => (
                  <div key={v as string} className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-[color:var(--cyan)]">
                      {(() => { const I = Icon as React.ComponentType<{ className?: string }>; return <I className="h-4 w-4" />; })()}
                    </div>
                    <span className="text-sm text-muted-foreground">{v as string}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-8 flex gap-2">
                {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] transition-all hover:border-[color:var(--cyan)]/40 hover:bg-white/[0.06] hover:text-[color:var(--cyan)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-3xl border border-white/10 bg-card/60 p-8"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name" placeholder="Jane Cooper" />
                <Field label="Email" type="email" placeholder="jane@company.com" />
                <Field label="Company" placeholder="Acme Inc." />
                <Field label="Phone" placeholder="+1 555 000 0000" />
                <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                  <Select label="Budget" options={["< $5k", "$5k – $15k", "$15k – $50k", "$50k+"]} />
                  <Select
                    label="Project type"
                    options={["Web", "AI", "Cloud", "Mobile", "Consulting"]}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project, timeline, and goals."
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-[color:var(--cyan)]/50 focus:bg-white/[0.06]"
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button>Send Message</Button>
                <Button variant="ghost" icon={<Calendar className="h-4 w-4" />}>
                  Book a Meeting
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-[color:var(--cyan)]/50 focus:bg-white/[0.06]"
      />
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <select className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-all focus:border-[color:var(--cyan)]/50">
        {options.map((o) => (
          <option key={o} className="bg-background">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[color:var(--cyan)] to-[color:var(--purple)] font-display text-sm font-bold text-black">
              JA
            </span>
            <span className="text-lg font-semibold">John Anderson</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Independent full-stack developer & AI engineer. Building premium digital products for
            teams who care about craft.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Navigate</div>
          <ul className="mt-4 space-y-2 text-sm">
            {["About", "Services", "Work", "Process", "Contact"].map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Newsletter</div>
          <p className="mt-4 text-sm text-muted-foreground">
            One thoughtful email a month on shipping better software.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-2">
            <input
              type="email"
              placeholder="you@work.com"
              className="w-full rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm outline-none focus:border-[color:var(--cyan)]/50"
            />
            <button className="rounded-full bg-gradient-to-r from-[color:var(--cyan)] to-[color:var(--purple)] px-4 py-2 text-sm font-medium text-black">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted-foreground sm:flex-row">
        <span>© 2026 John Anderson. Crafted with care.</span>
        <div className="flex gap-2">
          {[Github, Linkedin, Twitter].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 transition-colors hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX: w, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-[color:var(--cyan)] via-[color:var(--primary)] to-[color:var(--purple)]"
    />
  );
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[500px] w-[500px] rounded-full opacity-40 mix-blend-screen lg:block"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--cyan) 30%, transparent) 0%, transparent 60%)",
      }}
    />
  );
}

function FloatingWhatsapp() {
  return (
    <a
      href="#contact"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[color:var(--emerald)] to-[color:var(--cyan)] text-black shadow-[0_0_40px_-8px_var(--emerald)] transition-transform hover:scale-110"
      aria-label="Contact"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/10 glass transition-transform hover:scale-110"
      aria-label="Back to top"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}

function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[color:var(--cyan)] to-[color:var(--purple)] font-display text-xl font-bold text-black">
              JA
            </div>
            <div className="mt-6 flex items-center justify-center gap-1 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              <span>loading</span>
              <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-[color:var(--cyan)]" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Page ---------- */

function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Loader />
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <TechStack />
        <Work />
        <Testimonials />
        <Process />
        <WhyMe />
        <Stats />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsapp />
      <BackToTop />
    </div>
  );
}
