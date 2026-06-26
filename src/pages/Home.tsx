import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Mail, Brain, Code2, Zap } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import NeuralBackground from '../components/NeuralBackground';
import AnimatedStat from '../components/AnimatedStat';
import ProfilePhotoCard from '../components/ProfilePhotoCard';
import { RESUME_URL } from '../constants';
import { tiltOn, tiltOff } from '../utils/tilt';

// ── MagneticWrapper ─────────────────────────────────────────────
const MagneticWrapper: React.FC<{ children: React.ReactNode; strength?: number }> = ({
  children,
  strength = 0.26,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * strength;
    const y = (e.clientY - r.top  - r.height / 2) * strength;
    ref.current.style.transform  = `translate(${x}px, ${y}px)`;
    ref.current.style.transition = 'transform 0.1s ease-out';
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform  = '';
    ref.current.style.transition = 'transform 0.45s cubic-bezier(0.23,1,0.32,1)';
  };

  return (
    <div
      ref={ref}
      className="magnetic"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
};


// ── Data ──────────────────────────────────────────────────────────
const stats = [
  { value: '2+',     label: 'Years Experience' },
  { value: '3+',     label: 'Production Apps'  },
  { value: '20+',    label: 'Technologies'     },
  { value: 'Top 1%', label: 'Competitive Rank' },
];

const highlights = [
  {
    icon: Brain, title: 'AI Engineering',
    desc: 'LLM orchestration, RAG pipelines, multi-agent frameworks',
    color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20',
  },
  {
    icon: Code2, title: 'Full-Stack Development',
    desc: 'FastAPI, React, Next.js, PostgreSQL, microservices',
    color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20',
  },
  {
    icon: Zap, title: 'Systems & Cloud',
    desc: 'Docker, Kubernetes, AWS, GCP, Kafka, Redis',
    color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20',
  },
];

const navCards = [
  { to: '/about',        title: 'About Me',     desc: 'Background, skills, education'       },
  { to: '/experience',   title: 'Experience',   desc: 'Lyzr AI, Shridhar, Samsung'           },
  { to: '/achievements', title: 'Achievements', desc: 'Competitions, certifications'          },
  { to: '/contact',      title: 'Get in Touch', desc: 'Open to full-time & freelance roles'  },
];

const companies = [
  { name: 'Lyzr AI',               tag: 'Current',    color: 'text-indigo-400', tagBg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' },
  { name: 'Shridhar LifeSchool',   tag: '2024–2025',  color: 'text-emerald-400', tagBg: '' },
  { name: 'Samsung R&D (SRI-B)',   tag: '2023–2024',  color: 'text-blue-400', tagBg: '' },
];

const socials = [
  { href: 'https://github.com/anmolvarshney77',                                   Icon: Github,   label: 'GitHub'   },
  { href: 'https://linkedin.com/in/anmolvarshney77',                              Icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://mail.google.com/mail/?view=cm&to=varshney.anmol.29@gmail.com', Icon: Mail,     label: 'Email'    },
];


// ── Component ─────────────────────────────────────────────────────
const Home = () => {
  useScrollReveal();
  const { displayed, cursorOn } = useTypingAnimation();


  return (
    <div className="min-h-screen bg-zinc-950">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Neural network canvas */}
        <NeuralBackground />

        {/* Ambient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-24 w-[520px] h-[520px] bg-indigo-600/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-24 w-[420px] h-[420px] bg-purple-600/8 rounded-full blur-3xl" />
          <div className="absolute top-3/4 left-1/3 w-[300px] h-[300px] bg-cyan-600/5 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage: 'radial-gradient(circle, #a5b4fc 1px, transparent 1px)',
              backgroundSize: '38px 38px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">

          {/* Two-column hero */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 lg:mb-20">

            {/* Left: Text */}
            <div className="order-2 lg:order-1">

              <div className="reveal inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-8">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-indigo-300 text-xs font-medium tracking-wide">Open to opportunities</span>
              </div>

              <h1 className="reveal reveal-d1 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
                Hi, I am{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Anmol
                </span>
                <br />
                <span className="text-zinc-300 text-3xl sm:text-4xl lg:text-5xl font-semibold">Varshney</span>
              </h1>

              {/* Typing animation */}
              <div className="reveal reveal-d2 mb-6 h-8 flex items-center">
                <span className="font-mono text-lg text-indigo-400 font-medium">
                  {displayed}
                  <span
                    className="inline-block ml-0.5 w-0.5 h-5 bg-indigo-400 align-middle"
                    style={{ opacity: cursorOn ? 1 : 0, transition: 'opacity 0.1s' }}
                  />
                </span>
              </div>

              <p className="reveal reveal-d2 text-zinc-400 text-lg leading-relaxed mb-8 max-w-xl">
                Building{' '}
                <span className="text-white font-medium">enterprise AI agents</span>,{' '}
                <span className="text-white font-medium">LLM orchestration pipelines</span>, and{' '}
                <span className="text-white font-medium">full-stack production systems</span>{' '}
                at the intersection of modern software and generative AI.
              </p>

              <div className="reveal reveal-d3 flex flex-wrap gap-4 mb-10">
                <MagneticWrapper>
                  <Link
                    to="/projects"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                  >
                    View Projects
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </Link>
                </MagneticWrapper>

                <MagneticWrapper>
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-200 font-medium rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Download size={16} />
                    Resume
                  </a>
                </MagneticWrapper>
              </div>

              <div className="reveal reveal-d4 flex items-center gap-4">
                <span className="text-zinc-600 text-sm">Find me on</span>
                <div className="flex items-center gap-2">
                  {socials.map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 hover:bg-zinc-800 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Profile Photo */}
            <div className="order-1 lg:order-2 flex justify-center">
              <ProfilePhotoCard />
            </div>
          </div>

          {/* Stats bar with count-up */}
          <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800/50 rounded-2xl overflow-hidden border border-zinc-800/50">
            {stats.map((stat, i) => (
              <AnimatedStat
                key={i}
                value={stat.value}
                label={stat.label}
                className="bg-zinc-900/80 px-6 py-6 flex flex-col hover:bg-zinc-900 transition-colors duration-200 cursor-default"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Companies ─────────────────────────────────────────── */}
      <section className="py-14 border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="reveal text-center text-zinc-600 text-xs font-semibold tracking-widest uppercase mb-8">
            Experience at
          </p>
          <div className="reveal flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {companies.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors duration-200"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <span className={`text-sm font-semibold ${c.color}`}>{c.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-md border font-medium ${c.tagBg || 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>
                  {c.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What I do ─────────────────────────────────────────── */}
      <section className="py-24 border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="reveal mb-14">
            <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">What I do</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Engineering at the AI frontier</h2>
            <p className="text-zinc-400 text-lg max-w-2xl">
              I design and build systems that combine solid software engineering with modern AI capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  onMouseMove={e => tiltOn(e, 7, 3)}
                  onMouseLeave={tiltOff}
                  className={[
                    'reveal tilt-card cursor-default bg-zinc-900 border rounded-2xl p-7',
                    'hover:shadow-xl hover:shadow-black/30',
                    item.border,
                  ].join(' ')}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${item.bg}`}>
                    <Icon className={item.color} size={24} />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {navCards.map((item, i) => (
              <Link
                key={i}
                to={item.to}
                className="reveal flex items-center justify-between p-5 bg-zinc-900 border border-zinc-800 hover:border-indigo-500/40 hover:bg-zinc-900/80 rounded-xl transition-all duration-200 group hover:-translate-y-0.5"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <div>
                  <p className="text-white font-medium text-sm mb-1">{item.title}</p>
                  <p className="text-zinc-500 text-xs">{item.desc}</p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
