import React, { useState } from 'react';
import { MapPin, Calendar, ChevronDown, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const RESUME_URL = 'https://drive.google.com/file/d/1cbDtCC2ZM4a_K5baHD-Vmz9Cq8FjCxJo/view?usp=sharing';

const experiences = [
  {
    title: 'Software Engineer – Fullstack + AI',
    company: 'Lyzr AI',
    type: 'Full-time',
    location: 'Bangalore, India',
    period: 'Mar 2025 – Present',
    current: true,
    color: 'bg-indigo-500',
    accent: 'border-indigo-500/30',
    badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    description:
      'Building and scaling production-grade fullstack applications for enterprise AI agents, integrating multi-model LLM support and orchestration pipelines to power real-world business workflows.',
    achievements: [
      'Built production-grade fullstack apps for enterprise AI agents using FastAPI, PostgreSQL, React.js, and Next.js with multi-model support (OpenAI, Anthropic).',
      'Designed LLM orchestration pipelines leveraging LangChain, RAG architectures, and vector databases, improving response relevance and reducing hallucinations.',
      'Developed modular AI agent frameworks to automate business workflows — customer support, document processing, analytics — with secure API layers.',
      'Collaborated with product and AI teams to translate business requirements into deployable AI solutions, accelerating customer onboarding.',
    ],
    technologies: ['FastAPI', 'PostgreSQL', 'React.js', 'Next.js', 'LangChain', 'RAG', 'OpenAI', 'Anthropic', 'Python', 'Docker'],
  },
  {
    title: 'Software Engineer',
    company: 'Shridhar LifeSchool',
    type: 'Full-time',
    location: 'Remote',
    period: 'Sep 2024 – Mar 2025',
    current: false,
    color: 'bg-emerald-500',
    accent: 'border-emerald-500/30',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    description:
      'Built a scalable full-stack mental health platform supporting AI-assisted therapy workflows, journaling, situation tracking, and card-based exercises.',
    achievements: [
      'Built a scalable platform using FastAPI and PostgreSQL with role-based authentication supporting AI-assisted journaling and card-based therapy exercises.',
      'Designed LLM-powered features to analyze diary entries using prompt engineering and RAG techniques for personalized therapeutic recommendations.',
      'Implemented AI-ready data pipelines and modular CRM services to manage therapy resources and user history.',
    ],
    technologies: ['FastAPI', 'PostgreSQL', 'LLM', 'RAG', 'Python', 'Prompt Engineering'],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Samsung R&D Institute (SRI-B)',
    type: 'Internship',
    location: 'Remote',
    period: 'Sep 2023 – Feb 2024',
    current: false,
    color: 'bg-blue-500',
    accent: 'border-blue-500/30',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    description:
      'Worked on AI-driven context-aware systems to improve smart device responsiveness using user and environmental signals.',
    achievements: [
      'Analyzed device telemetry data to optimize ML models for better contextual understanding and adaptive intelligence.',
      'Built continuous learning pipelines to adapt AI models over time while ensuring strict privacy-preserving data handling.',
      'Collaborated with hardware and firmware teams to integrate intelligent AI models into real-world smart device ecosystems.',
    ],
    technologies: ['Python', 'Machine Learning', 'Linux', 'Data Pipelines', 'Git'],
  },
];

const Experience = () => {
  const [expanded, setExpanded] = useState<number | null>(0);
  useScrollReveal();

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="reveal mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Experience</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Work History</h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            From AI research intern to full-stack AI engineer — building real products that reach real users.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-2 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-zinc-700 to-transparent timeline-line" />

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className={`reveal relative pl-12`} style={{ transitionDelay: `${index * 0.12}s` }}>

                {/* Timeline dot — with pulse rings on current */}
                <div className="absolute left-[11px] top-6 w-4 h-4">
                  {exp.current && (
                    <>
                      <div className={"absolute inset-0 rounded-full animate-ping-slow " + exp.color + " opacity-50"} />
                      <div className={"absolute inset-0 rounded-full animate-ping-slower " + exp.color + " opacity-30"} />
                    </>
                  )}
                  <div className={"w-4 h-4 rounded-full border-2 border-zinc-950 relative z-10 " + exp.color} />
                </div>

                {/* Card */}
                <div
                  className={
                    "bg-zinc-900 border rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-700 " +
                    (expanded === index ? exp.accent : "border-zinc-800")
                  }
                >
                  {/* Accordion header */}
                  <button
                    onClick={() => setExpanded(expanded === index ? null : index)}
                    className="w-full text-left p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-white font-semibold text-base sm:text-lg">{exp.title}</h3>
                          {exp.current && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-full font-medium">
                              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                              Current
                            </span>
                          )}
                          <span className={"px-2.5 py-0.5 text-xs rounded-full border font-medium " + exp.badge}>
                            {exp.type}
                          </span>
                        </div>
                        <p className="text-indigo-400 font-medium text-sm mb-3">{exp.company}</p>
                        <div className="flex flex-wrap gap-4 text-zinc-500 text-xs">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Chevron — rotates when open */}
                      <div
                        className="text-zinc-600 flex-shrink-0 mt-1 transition-transform duration-300"
                        style={{ transform: expanded === index ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        <ChevronDown size={18} />
                      </div>
                    </div>

                    <p className="text-zinc-400 text-sm leading-relaxed mt-4">{exp.description}</p>
                  </button>

                  {/* Smooth accordion body */}
                  <div className={"accordion-body " + (expanded === index ? "open" : "closed")}>
                    <div className="px-6 pb-6 border-t border-zinc-800/60">
                      <div className="pt-5">
                        <h4 className="text-zinc-300 font-medium text-sm mb-3">Key Contributions</h4>
                        <ul className="space-y-2.5 mb-6">
                          {exp.achievements.map((a, j) => (
                            <li key={j} className="flex items-start gap-3 text-zinc-400 text-sm">
                              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 flex-shrink-0" />
                              {a}
                            </li>
                          ))}
                        </ul>
                        <div>
                          <h4 className="text-zinc-300 font-medium text-sm mb-3">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, k) => (
                              <span
                                key={k}
                                className="shimmer-tag text-xs px-2.5 py-1 bg-zinc-800 border border-zinc-700/50 text-zinc-300 rounded-md transition-all duration-200 cursor-default"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="reveal mt-16 p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center">
          <h3 className="text-white font-semibold text-lg mb-2">Interested in working together?</h3>
          <p className="text-zinc-400 text-sm mb-6">I am open to full-time roles and interesting projects.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-indigo-500/20"
            >
              Download Resume
              <ExternalLink size={14} />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-200 text-sm font-medium rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
