import emailjs from "@emailjs/browser";
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
  Globe2,
  Smartphone,
  Bot,
  Workflow,
  PenLine,
  Image,
 
  
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
            YP
          </span>
          <span className="hidden text-sm font-semibold sm:inline">Yash Patil</span>
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
              I'm <span className="text-foreground font-medium">Yash Patil</span> — a full-stack
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
                alt="Portrait of Yash Patil"
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


/* ---------- About ---------- */

function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left Content */}
          <div>
            <Reveal>
              <SectionLabel>About Me</SectionLabel>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-6 text-4xl font-bold sm:text-5xl">
                Hi, I'm{" "}
                <span className="text-gradient">Yash Patil.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                I'm a freelance developer and digital creator passionate about
                turning ideas into useful and modern digital solutions. I enjoy
                working with businesses, creators, and individuals to help bring
                their ideas online.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                From websites and web applications to social media content,
                AI-powered solutions, and automation, I focus on creating work
                that is simple, useful, and designed around real needs.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                I'm always learning, exploring new technologies, and looking
                for opportunities to work on interesting projects. My goal is
                to build quality digital solutions while growing through every
                project and collaboration.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="mt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--cyan)]/40 bg-[color:var(--cyan)]/10 px-6 py-3 text-sm font-medium text-[color:var(--cyan)] transition-all hover:bg-[color:var(--cyan)]/20"
                >
                  Let's Work Together
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Side */}
          <div>
            <Reveal delay={0.2}>
              <div className="rounded-3xl glass p-8 sm:p-10">
                <div className="text-xs uppercase tracking-widest text-[color:var(--cyan)]">
                  What I Do
                </div>

                <h3 className="mt-3 text-2xl font-semibold">
                  Building ideas for the digital world.
                </h3>

                <div className="mt-8 space-y-5">
                  <div className="border-b border-white/10 pb-5">
                    <h4 className="font-semibold">Web Development</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Modern websites and web applications built around your needs.
                    </p>
                  </div>

                  <div className="border-b border-white/10 pb-5">
                    <h4 className="font-semibold">AI & Automation</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Smart solutions that help automate work and simplify workflows.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold">Social Media & Creative Work</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Content, captions, posts, and creative designs for your online presence.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
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
      desc: "Custom, scalable web applications built with modern technologies, secure APIs, and high-performance architecture.",
      features: [
        "Custom web applications",
        "Frontend & backend development",
        "REST API development",
        "Database integration",
      ],
      from: "Contact for pricing",
    },
    {
      icon: Globe2,
      title: "Website Development",
      desc: "Modern, responsive, and visually impressive websites designed to represent your brand and convert visitors.",
      features: [
        "Business websites",
        "Portfolio websites",
        "Landing pages",
        "Fully responsive design",
      ],
      from: "Contact for pricing",
    },
    {
      icon: Bot,
      title: "Agentic AI Development",
      desc: "Intelligent AI agents that can understand tasks, make decisions, use tools, and automate complex workflows.",
      features: [
        "AI agents",
        "LLM-powered applications",
        "RAG systems",
        "Multi-agent workflows",
      ],
      from: "Contact for pricing",
    },
    {
      icon: Workflow,
      title: "Automation Development",
      desc: "Smart automation solutions that eliminate repetitive work and connect your systems for faster operations.",
      features: [
        "Business process automation",
        "Workflow automation",
        "API integrations",
        "Custom automation tools",
      ],
      from: "Contact for pricing",
    },
    {
      icon: PenLine,
      title: "Social Media Content Writing",
      desc: "Engaging captions and content created to help your brand communicate clearly, connect with your audience, and grow online.",
      features: [
        "Instagram captions",
        "Social media content",
        "Creative copywriting",
        "Content ideas",
      ],
      from: "Contact for pricing",
    },
    {
      icon: Image,
      title: "Instagram Post & Story Design",
      desc: "Creative and visually engaging Instagram posts and stories designed to strengthen your brand presence and capture attention.",
      features: [
        "Instagram post design",
        "Instagram story design",
        "Promotional creatives",
        "Brand-focused designs",
      ],
      from: "Contact for pricing",
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
              Solutions built to{" "}
              <span className="text-gradient">
                grow your ideas.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="max-w-md text-muted-foreground">
              From websites and applications to AI, automation, content, and
              creative social media designs, I build digital solutions around
              your business needs.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-card/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/20">

                {/* Hover Gradient */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[color:var(--cyan)]/20 via-transparent to-[color:var(--purple)]/20" />
                </div>

                <div className="relative">

                  {/* Service Icon */}
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-white/10 to-transparent">
                    <s.icon className="h-6 w-6 text-[color:var(--cyan)]" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-xl font-semibold">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>

                  {/* Features */}
                  <ul className="mt-6 space-y-2">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 shrink-0 text-[color:var(--emerald)]" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Bottom Section */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        Pricing
                      </div>

                      <div className="font-display text-base font-semibold">
                        {s.from}
                      </div>
                    </div>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1 text-sm text-[color:var(--cyan)] transition-all hover:gap-2"
                    >
                      Enquire
                      <ArrowRight className="h-4 w-4" />
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
    "OpenAI", "LangChain", "MCP", "Git", "GitHub",
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
    // =========================
    // WEB PROJECTS
    // =========================

    {
      title: "Cellular Shack",
      cat: "Web",
      desc: "An eCommerce website built on Shopify, where I contributed to the development and implementation of website features and functionality.",
      tags: ["Shopify", "eCommerce", "Web Development"],
      link: "https://cellularshack.ca/",
      accent:
        "from-[color:var(--cyan)]/40 to-[color:var(--primary)]/30",
    },

    {
      title: "IIT Test Portal",
      cat: "Web",
      desc: "A complete online test portal designed for conducting and managing examinations, built using TypeScript and Python.",
      tags: ["TypeScript", "Python", "Test Portal"],
      link: "https://iit-test-portal.preview.emergentagent.com/",
      accent:
        "from-[color:var(--purple)]/40 to-[color:var(--cyan)]/30",
    },

    {
      title: "EIT Global",
      cat: "Web",
      desc: "A professional business website developed using WordPress with a responsive layout and structured content management.",
      tags: ["WordPress", "Responsive Design", "CMS"],
      link: "https://eitglobal.ae/",
      accent:
        "from-[color:var(--emerald)]/40 to-[color:var(--cyan)]/30",
    },

    {
      title: "LemonHQ",
      cat: "Web",
      desc: "A modern website developed using WordPress with a clean design and user-focused digital experience.",
      tags: ["WordPress", "Web Design", "CMS"],
      link: "https://lemonhq.io/",
      accent:
        "from-[color:var(--purple)]/40 to-[color:var(--primary)]/30",
    },

    {
      title: "Leva Patidar Samaj Community",
      cat: "Web",
      desc: "A community-focused website built using Hostinger Website Builder with a clean design and easy access to important information and updates.",
      tags: ["Hostinger", "Website Builder", "Web Design"],
      link: "https://lppa2010.in/",
      accent:
        "from-[color:var(--purple)]/40 to-[color:var(--primary)]/30",
},

    {
      title: "Provider Billing and Coding",
      cat: "Web",
      desc: "A professional WordPress website developed with a structured layout and responsive experience for users across devices.",
      tags: ["WordPress", "Website Development", "Responsive"],
      link: "https://providerbillingandcoding.com/",
      accent:
        "from-[color:var(--cyan)]/40 to-[color:var(--purple)]/30",
    },

    // =========================
    // AI PROJECTS
    // =========================

    {
      title: "AI Automation Platform",
      cat: "AI",
      desc: "An intelligent automation solution designed to streamline repetitive tasks and improve workflow efficiency.",
      tags: ["AI", "Automation", "Python"],
      link: "#",
      accent:
        "from-[color:var(--cyan)]/40 to-[color:var(--primary)]/30",
    },

    {
      title: "AI Chatbot System",
      cat: "AI",
      desc: "A smart AI chatbot capable of answering questions and assisting with business support workflows.",
      tags: ["LLM", "RAG", "API"],
      link: "#",
      accent:
        "from-[color:var(--cyan)]/40 to-[color:var(--purple)]/30",
    },

    // =========================
    // LOGO DESIGNS
    // =========================

 

    {
  title: "Logo Design 1",
  cat: "Logos",
  desc: "A creative and innovative logo designed to represent limitless ideas and bold brand vision.",
  tags: ["Logo Design", "Branding", "Creative"],
  link: "https://canva.link/l4g9x0fvpdkhctb",
  accent:
    "from-[color:var(--purple)]/40 to-[color:var(--primary)]/30",
},

{
  title: "logo Design 2",
  cat: "Logos",
  desc: "A futuristic logo concept created for an artificial intelligence and technology-focused brand.",
  tags: ["Logo Design", "AI", "Technology"],
  link: "https://canva.link/ootkvehtekywb60",
  accent:
    "from-[color:var(--purple)]/40 to-[color:var(--primary)]/30",
},

    // =========================
    // BANNER DESIGNS
    // =========================

    {
      title: "Sample Banner 1",
      cat: "Banners",
      desc: "A promotional banner design created to highlight services and attract potential customers.",
      tags: ["Banner Design", "Marketing", "Creative"],
      link: "https://www.canva.com/design/DAGoRflLAoo/kf7ZB7uTSXACpL28GU7DpQ/edit",
      accent:
        "from-[color:var(--emerald)]/40 to-[color:var(--primary)]/30",
    },

    {
      title: "Sample Banner 2",
      cat: "Banners",
      desc: "A modern banner design created for a technology event and digital marketing campaign.",
      tags: ["Event Design", "Banner", "Digital"],
      link: "https://www.canva.com/design/DAGoRVAPITI/5KPkhcT2b_LD8ViScUsdog/edit",
      accent:
        "from-[color:var(--cyan)]/40 to-[color:var(--emerald)]/30",
    },
      {
      title: "Sample Banner 3",
      cat: "Banners",
      desc: "A modern banner design created for a technology event and digital marketing campaign.",
      tags: ["Event Design", "Banner", "Digital"],
      link: "https://www.canva.com/design/DAGoRV7mzkA/7SPE4iA5q9MhFryGKgQ4xg/edit",
      accent:
        "from-[color:var(--cyan)]/40 to-[color:var(--emerald)]/30",
    },

    // =========================
    // SOCIAL MEDIA POSTS
    // =========================

    {
      title: "Sample Social Post 1",
      cat: "Social Posts",
      desc: "A visually engaging social media post created to promote digital services and increase audience engagement.",
      tags: ["Social Media", "Marketing", "Post Design"],
      link: "https://www.canva.com/design/DAG-DTn3X4M/lCTsUZxIrSh1F64FNhQxPA/edit",
      accent:
        "from-[color:var(--primary)]/40 to-[color:var(--purple)]/30",
    },

    {
      title: "Sample Social Post 2",
      cat: "Social Posts",
      desc: "A professional social media creative designed for brand awareness and audience engagement.",
      tags: ["Instagram", "Branding", "Creative"],
      link: "https://www.canva.com/design/DAG-De7TN4E/9Qbu7YaxcfNvj8FSpN7GsQ/edit",
      accent:
        "from-[color:var(--purple)]/40 to-[color:var(--cyan)]/30",
    },
  ];

  const cats = [
    "All",
    "AI",
    "Web",
    "Logos",
    "Banners",
    "Social Posts",
  ];

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.cat === filter);

  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Label */}
        <Reveal>
          <SectionLabel>Featured Work</SectionLabel>
        </Reveal>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          {/* Heading */}
          <Reveal delay={0.1}>
            <h2 className="max-w-2xl text-4xl font-bold sm:text-5xl">
              Selected{" "}
              <span className="text-gradient">
                projects & creative work.
              </span>
            </h2>
          </Reveal>

          {/* Category Filters */}
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

        {/* Projects Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[var(--shadow-card)]"
              >
                {/* Background Accent */}
                <div
                  className={`absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br ${p.accent} blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div className="relative">
                  {/* Category */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[color:var(--cyan)]">
                      {p.cat}
                    </span>

                    <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                      Project
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-2xl font-semibold">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>

                  {/* Technology Tags */}
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

                  {/* Project Links */}
                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                    <a
                      href={p.link}
                      target={p.link !== "#" ? "_blank" : undefined}
                      rel={
                        p.link !== "#"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {p.link !== "#" ? "Live Website →" : "Coming Soon"}
                    </a>

                    {p.link !== "#" && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-[color:var(--cyan)] transition-all hover:gap-2"
                      >
                        View Project
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="mt-14 rounded-3xl border border-white/10 bg-card/40 p-10 text-center text-muted-foreground">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
}
/* ---------- Testimonials ---------- */
function Testimonials() {
  const items = [
    {
      name: "Rahul Sharma",
      role: "Software Engineer",
      quote:
        "Yash understood the requirements quickly and delivered the project with great attention to detail. The final website was fast, responsive, and exactly what we needed.",
    },
    {
      name: "Priya Mehta",
      role: "Digital Marketer",
      quote:
        "Working with Yash was a smooth experience. He suggested useful improvements and created a clean, professional website that works perfectly on both mobile and desktop.",
    },
    {
      name: "Amit Kulkarni",
      role: "Product Manager",
      quote:
        "Yash has strong technical knowledge and excellent problem-solving skills. He helped us improve our application and delivered the required features on time.",
    },
    {
      name: "Sneha Patil",
      role: "Business Analyst",
      quote:
        "We wanted to automate some repetitive tasks, and Yash helped us build a practical solution. It saved time and made our daily work much easier.",
    },
    {
      name: "Rohit Deshmukh",
      role: "Web Developer",
      quote:
        "Yash delivered quality work and was always open to feedback. His knowledge of web development, backend systems, AI, and automation makes him great to work with.",
    },
  ];

  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setI((v) => (v + 1) % items.length);
    }, 5500);

    return () => clearInterval(t);
  }, [items.length]);

  return (
    <section id="testimonials" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">

        {/* Section Label */}
        <Reveal>
          <SectionLabel>Testimonials</SectionLabel>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-2xl text-4xl font-bold sm:text-5xl">
            What people say about{" "}
            <span className="text-gradient">working with me.</span>
          </h2>
        </Reveal>

        {/* Testimonial Card */}
        <div className="relative mt-12 overflow-hidden rounded-3xl glass p-10 sm:p-14">

          {/* Background Quote Icon */}
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

                {/* Five Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star
                      key={k}
                      className="h-4 w-4 fill-[color:var(--cyan)] text-[color:var(--cyan)]"
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="mt-6 text-xl leading-relaxed text-foreground sm:text-2xl">
                  “{items[i].quote}”
                </p>

                {/* Person Information */}
                <div className="mt-8 flex items-center gap-4">

                  {/* Initial Avatar */}
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[color:var(--cyan)] to-[color:var(--purple)] font-display font-bold text-black">
                    {items[i].name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div>
                    <div className="font-semibold">
                      {items[i].name}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {items[i].role}
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation */}
            <div className="mt-10 flex gap-2">
              {items.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  className={`h-1.5 rounded-full transition-all ${
                    k === i
                      ? "w-8 bg-[color:var(--cyan)]"
                      : "w-2 bg-white/20 hover:bg-white/40"
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
/* ---------- Process ---------- */
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
    [5, "+", "Projects Shipped"],
    [3, "+", "Happy Clients"],
    [2.5, "+", "Years Experience"],
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
    ["What is your typical timeline?", "Landing pages ship in 1–2 weeks, MVPs in 4–8 weeks, and full products in 3–6 months. I keep a small client roster so I can move quickly."],
    ["Do you offer post-launch support?", "Yes — every project includes 30 days of priority support. Ongoing retainers are available for teams that want a fractional senior engineer."],
    ["Which technologies do you specialise in?", "TypeScript, React, Next.js, Node, Python, Postgres, and the modern AI stack (OpenAI, LangChain, RAG). I choose tools that fit the problem."],
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

const EMAILJS_PUBLIC_KEY = "6ayL5zi-kRCBD_sEv";
const EMAILJS_SERVICE_ID = "service_67v35t9";
const EMAILJS_TEMPLATE_ID = "template_eeflve9";

function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    setStatus("sending");

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("EmailJS submission failed:", error);
      setStatus("error");
    }
  };

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
                  [Mail, "yashpatil62002@gmail.com"],
                  [Phone, "+91-9175041403"],
                  [MapPin, "Pune, Maharashtra, India"],
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
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-card/60 p-8"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field name="from_name" label="Name" placeholder="Yash Patil" required />
                <Field name="from_email" label="Email" type="email" placeholder="yashpatil62002@gmail.com" required />
                <Field name="company" label="Company" placeholder="Acme Inc." />
                <Field name="phone" label="Phone" placeholder="+91 9175041403" />
                <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                  <Select
                    name="budget"
                    label="Budget"
                    options={["< Rs 5k", "Rs 5k – Rs 15k", "Rs 15k – Rs 50k", "Rs 50k+"]}
                  />
                  <Select
                    name="project_type"
                    label="Project type"
                    options={["Web", "AI", "Logo Design", "Banner Design", "Consulting"]}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project, timeline, and goals."
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-[color:var(--cyan)]/50 focus:bg-white/[0.06]"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--cyan)] via-[color:var(--primary)] to-[color:var(--purple)] px-6 py-3 text-sm font-medium text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>

                {status === "success" && (
                  <span className="text-sm text-emerald-400">Message sent successfully.</span>
                )}
                {status === "error" && (
                  <span className="text-sm text-red-400">Something went wrong. Please try again.</span>
                )}
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
  name,
  required = false,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  name?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-[color:var(--cyan)]/50 focus:bg-white/[0.06]"
      />
    </div>
  );
}

function Select({ label, options, name }: { label: string; options: string[]; name?: string }) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <select
        name={name}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-all focus:border-[color:var(--cyan)]/50"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-background">
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
              YP
            </span>
            <span className="text-lg font-semibold">Yash Patil</span>
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
            One thoughtful email each month on shipping better software.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex gap-4">
            
            <button className="rounded-full bg-gradient-to-r from-[color:var(--cyan)] to-[color:var(--purple)] px-4 py-2 text-sm font-medium text-black">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted-foreground sm:flex-row">
        <span>© 2026 Yash Patil.</span>
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

/*
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
  */

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
              YP
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
      <BackToTop />
    </div>
  );
}
