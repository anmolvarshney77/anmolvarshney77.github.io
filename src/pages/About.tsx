import React from 'react';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

function tiltOn(e: React.MouseEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width  - 0.5;
  const y = (e.clientY - r.top)  / r.height - 0.5;
  e.currentTarget.style.transform =
    `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-2px)`;
}
function tiltOff(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = '';
}

const About = () => {
  useScrollReveal();

  const skillGroups = [
    {
      category: 'Languages',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      skills: ['Python', 'TypeScript', 'JavaScript', 'Golang', 'Java', 'C++', 'C', 'SQL', 'Bash'],
    },
    {
      category: 'Frontend',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      skills: ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'],
    },
    {
      category: 'Backend & APIs',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      skills: ['FastAPI', 'Node.js', 'SpringBoot', 'REST APIs', 'Microservices'],
    },
    {
      category: 'AI & ML',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      skills: ['LLM', 'RAG', 'LangChain', 'LangGraph', 'Vector Databases', 'Generative AI', 'Prompt Engineering'],
    },
    {
      category: 'Databases',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Vector DB'],
    },
    {
      category: 'DevOps & Cloud',
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/20',
      skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Kafka', 'Git', 'Linux', 'CI/CD'],
    },
  ];

  const education = [
    {
      degree: 'B.Sc. in Programming and Data Science',
      institution: 'Indian Institute of Technology, Madras (IIT-M)',
      year: '2022 – 2025',
      cgpa: '8.50 / 10.00',
      courses: ['Data Structures', 'Algorithms', 'OS', 'OOP', 'DBMS'],
      location: 'Chennai, India',
    },
    {
      degree: 'B.Sc. in Mathematics and Science',
      institution: 'Mahatma Jyotiba Phule Rohilkhand University',
      year: '2020 – 2023',
      cgpa: '8.50 / 10.00',
      courses: ['Discrete Mathematics', 'Statistics', 'Physics', 'Financial Mathematics'],
      location: 'Bareilly, UP',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="reveal mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">About</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Who I am</h1>
          <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed">
            Software &amp; AI Engineer based in Bangalore, India. I bridge strong computer science fundamentals
            with modern AI capabilities to build systems that actually ship and scale.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-20">
          {/* Bio */}
          <div className="reveal lg:col-span-3 space-y-5">
            <h2 className="text-xl font-semibold text-white mb-5">My Story</h2>
            <p className="text-zinc-400 leading-relaxed">
              My journey started with a B.Sc. in Mathematics at Mahatma Jyotiba Phule Rohilkhand
              University, where I taught myself programming out of curiosity. That curiosity led me to
              the B.Sc. in Programming &amp; Data Science at IIT Madras, one of India's top technical institutions.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Since then, I have worked across three companies spanning AI-driven smart device systems at
              Samsung R&amp;D, full-stack mental health platforms at Shridhar LifeSchool, and currently
              building enterprise AI agent infrastructure at Lyzr AI using FastAPI, React, LangChain,
              RAG, and multi-model LLM pipelines.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Outside of work, I compete in coding contests globally, placing in the top 0.5% on
              Codeforces and top 3% in Google Kickstart. I am passionate about generative AI, AI agents,
              and building tools that make real impact.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <MapPin size={14} className="text-indigo-400" />
                Bangalore, India
              </div>
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Open to opportunities
              </div>
            </div>
          </div>

          {/* Quick facts */}
          <div className="reveal reveal-d2 lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-5">Quick Facts</h2>
            <div className="space-y-3">
              {[
                { label: 'Current Role', value: 'SWE @ Lyzr AI' },
                { label: 'Specialization', value: 'AI / Full-Stack' },
                { label: 'Education', value: 'IIT Madras + MJPRU' },
                { label: 'Location', value: 'Bangalore, India' },
                { label: 'Languages', value: 'Python, TypeScript, Go' },
                { label: 'Interests', value: 'AI Agents, Competitive CP' },
              ].map((fact, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-800/60">
                  <span className="text-zinc-500 text-sm">{fact.label}</span>
                  <span className="text-zinc-200 text-sm font-medium">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <p className="reveal text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Technical Skills</p>
          <h2 className="reveal reveal-d1 text-2xl font-bold text-white mb-8">What I work with</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillGroups.map((group, i) => (
              <div
                key={i}
                onMouseMove={tiltOn}
                onMouseLeave={tiltOff}
                className={"tilt-card reveal bg-zinc-900 border rounded-2xl p-6 " + group.border}
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <h3 className={"text-xs font-semibold tracking-wider uppercase mb-4 " + group.color}>
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, j) => (
                    <span
                      key={j}
                      className={
                        "shimmer-tag text-xs px-2.5 py-1 rounded-md font-medium text-zinc-300 border border-zinc-700/50 cursor-default transition-colors duration-200 " +
                        group.bg
                      }
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <p className="reveal text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Education</p>
          <h2 className="reveal reveal-d1 text-2xl font-bold text-white mb-8">Academic Background</h2>
          <div className="space-y-5">
            {education.map((edu, i) => (
              <div
                key={i}
                className="reveal bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
                style={{ transitionDelay: `${i * 0.10}s` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">{edu.degree}</h3>
                    <div className="flex items-center gap-2 text-indigo-400 text-sm">
                      <GraduationCap size={14} />
                      {edu.institution}
                    </div>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <span className="flex items-center gap-1.5 text-zinc-400 text-sm">
                      <Calendar size={12} />
                      {edu.year}
                    </span>
                    <span className="text-emerald-400 font-semibold text-sm">CGPA {edu.cgpa}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-xs mb-4">
                  <MapPin size={12} />
                  {edu.location}
                </div>
                <div className="flex flex-wrap gap-2">
                  {edu.courses.map((c, j) => (
                    <span key={j} className="text-xs px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-md border border-zinc-700/50">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
