import React from 'react';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { tiltOn, tiltOff, spotlightMove, spotlightLeave } from '../utils/tilt';

const projects = [
  {
    title: 'MCP Server – Resume Analyser',
    category: 'AI / Full-Stack',
    emoji: '🤖',
    desc: 'A robust MCP server that automates resume analysis and communication workflows using LLM orchestration and multi-model inference.',
    longDesc: 'Built a LLM-orchestrated resume parsing and semantic Q&A engine integrating multiple models for accurate skill, experience, and role-fit analysis. Includes secure RESTful APIs for email notifications and a React/Next.js playground for real-time evaluation.',
    technologies: ['TypeScript', 'Node.js', 'React.js', 'Next.js', 'LLM APIs'],
    gradient: 'from-indigo-600/20 to-purple-600/20',
    border: 'border-indigo-500/20',
    accent: 'text-indigo-400',
    accentBg: 'bg-indigo-500/10',
    featured: true,
    githubUrl: 'https://github.com/anmolvarshney77',
  },
  {
    title: 'Trade Management Mobile App',
    category: 'Mobile / Full-Stack',
    emoji: '📊',
    desc: 'Cross-platform commodity trade management app improving broker productivity with real-time execution and intelligent analytics.',
    longDesc: 'Real-time buy/sell trade execution with live P&L computation, inventory validation, and oversell prevention. Dynamic analytics dashboard and a reporting system generating PDF/Excel trade summaries.',
    technologies: ['React Native', 'Expo', 'TypeScript'],
    gradient: 'from-emerald-600/20 to-cyan-600/20',
    border: 'border-emerald-500/20',
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    featured: true,
    githubUrl: 'https://github.com/anmolvarshney77',
  },
  {
    title: 'MarketMind AI – Financial Sentiment',
    category: 'AI / Data',
    emoji: '📈',
    desc: 'Real-time financial sentiment analysis platform processing multi-source data streams with AI-powered insights and interactive charts.',
    longDesc: 'Built with Python, MongoDB, and GCP using context-aware RAG-style retrieval pipelines to enrich sentiment analysis with historical market data. Interactive analytics UI with React, Next.js, and D3.js.',
    technologies: ['FastAPI', 'VectorDB', 'MongoDB', 'GCP', 'React', 'D3.js', 'Python'],
    gradient: 'from-orange-600/20 to-red-600/20',
    border: 'border-orange-500/20',
    accent: 'text-orange-400',
    accentBg: 'bg-orange-500/10',
    featured: false,
    githubUrl: 'https://github.com/anmolvarshney77',
  },
];

const Projects = () => {
  useScrollReveal();

  const featured = projects.filter(p => p.featured);
  const others   = projects.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="reveal mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Projects</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Things I have built</h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            A selection of projects showcasing AI engineering, full-stack development, and systems design.
          </p>
        </div>

        {/* Featured — 2-column grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {featured.map((project, i) => (
            <div
              key={i}
              onMouseMove={e => { tiltOn(e, 5, 4); spotlightMove(e); }}
              onMouseLeave={e => { tiltOff(e); spotlightLeave(e); }}
              className={[
                'reveal tilt-card spotlight-card bg-zinc-900 border rounded-2xl overflow-hidden',
                'hover:shadow-xl hover:shadow-black/30 transition-all duration-300',
                project.border,
              ].join(' ')}
              style={{ transitionDelay: `${i * 0.10}s` }}
            >
              {/* Gradient header strip */}
              <div className={`h-28 bg-gradient-to-br flex items-center justify-center text-5xl ${project.gradient}`}>
                {project.emoji}
              </div>

              <div className="p-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold tracking-wide uppercase px-2.5 py-1 rounded-lg border ${project.accentBg} ${project.accent} ${project.border}`}>
                    {project.category}
                  </span>
                </div>

                <h3 className="text-white font-bold text-xl mb-2 leading-snug">{project.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-1.5">{project.desc}</p>
                <p className="text-zinc-500 text-xs leading-relaxed mb-6">{project.longDesc}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, j) => (
                    <span key={j} className="shimmer-tag text-xs px-2.5 py-1 bg-zinc-800 border border-zinc-700/50 text-zinc-300 rounded-md transition-all duration-200">
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white text-sm rounded-xl transition-all duration-200"
                >
                  <Github size={14} />
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Other projects */}
        {others.length > 0 && (
          <div className="mb-14">
            <h2 className="reveal text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-5">More Projects</h2>
            <div className="space-y-4">
              {others.map((project, i) => (
                <div
                  key={i}
                  className={[
                    'reveal flex flex-col sm:flex-row sm:items-center gap-5',
                    'bg-zinc-900 border rounded-xl p-6 hover:border-zinc-700 transition-all duration-200',
                    'hover:-translate-y-px hover:shadow-lg hover:shadow-black/20',
                    project.border,
                  ].join(' ')}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-gradient-to-br ${project.gradient}`}>
                    {project.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold text-base">{project.title}</h3>
                      <span className={`text-xs font-medium ${project.accent}`}>{project.category}</span>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-3">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 5).map((tech, j) => (
                        <span key={j} className="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded border border-zinc-700/30">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-500 rounded">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View on GitHub"
                      className="p-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all duration-200"
                    >
                      <Github size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GitHub CTA */}
        <div className="reveal p-8 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">More on GitHub</h3>
              <p className="text-zinc-400 text-sm">Explore experiments, open-source contributions, and side projects.</p>
            </div>
            <a
              href="https://github.com/anmolvarshney77"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-200 text-sm font-medium rounded-xl transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <Github size={16} />
              github.com/anmolvarshney77
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Projects;
