import React from 'react';
import { Github, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

function tiltOn(e: React.MouseEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width  - 0.5;
  const y = (e.clientY - r.top)  / r.height - 0.5;
  e.currentTarget.style.transform =
    `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
}
function tiltOff(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = '';
}
function spotlightMove(e: React.MouseEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--spotlight-x', `${((e.clientX - r.left) / r.width) * 100}%`);
  e.currentTarget.style.setProperty('--spotlight-y', `${((e.clientY - r.top) / r.height) * 100}%`);
}
function spotlightLeave(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.setProperty('--spotlight-x', '-200%');
  e.currentTarget.style.setProperty('--spotlight-y', '-200%');
}

const Projects = () => {
  useScrollReveal();

  const projects = [
    {
      title: 'MCP Server – Resume Analyser',
      category: 'AI / Full-Stack',
      desc: 'A robust MCP server that automates resume analysis and communication workflows using LLM orchestration and multi-model inference.',
      longDesc: 'Built a LLM-orchestrated resume parsing and semantic Q&A engine integrating multiple models for accurate skill, experience, and role-fit analysis from unstructured resumes. Includes secure RESTful APIs for email notifications and a React/Next.js playground for real-time evaluation.',
      technologies: ['TypeScript', 'Node.js', 'React.js', 'Next.js', 'LLM APIs'],
      color: 'from-indigo-600/20 to-purple-600/20',
      border: 'border-indigo-500/20',
      accent: 'text-indigo-400',
      icon: '🤖',
      featured: true,
      githubUrl: 'https://github.com/anmolvarshney77',
    },
    {
      title: 'Trade Management Mobile App',
      category: 'Mobile / Full-Stack',
      desc: 'A cross-platform commodity trade management app improving broker productivity with real-time execution and intelligent analytics.',
      longDesc: 'Implemented real-time buy/sell trade execution with live P&L computation, inventory validation, and oversell prevention. Built a dynamic analytics dashboard and a reporting system to generate and export trade summaries in PDF and Excel formats.',
      technologies: ['React Native', 'Expo', 'TypeScript'],
      color: 'from-emerald-600/20 to-cyan-600/20',
      border: 'border-emerald-500/20',
      accent: 'text-emerald-400',
      icon: '📊',
      featured: true,
      githubUrl: 'https://github.com/anmolvarshney77',
    },
    {
      title: 'MarketMind AI – Financial Sentiment',
      category: 'AI / Data',
      desc: 'A real-time financial sentiment analysis platform processing multi-source data streams with AI-powered insights and interactive charts.',
      longDesc: 'Built using Python, MongoDB, and Google Cloud with context-aware RAG-style retrieval pipelines to enrich sentiment analysis with historical market data. Interactive analytics UI with React, Next.js, and D3.js.',
      technologies: ['FastAPI', 'VectorDB', 'MongoDB', 'GCP', 'React', 'D3.js', 'Python'],
      color: 'from-orange-600/20 to-red-600/20',
      border: 'border-orange-500/20',
      accent: 'text-orange-400',
      icon: '📈',
      featured: false,
      githubUrl: 'https://github.com/anmolvarshney77',
    },
  ];

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

        {/* Featured */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {featured.map((project, i) => (
            <div
              key={i}
              onMouseMove={(e) => { tiltOn(e); spotlightMove(e); }}
              onMouseLeave={(e) => { tiltOff(e); spotlightLeave(e); }}
              className={
                "reveal tilt-card spotlight-card bg-zinc-900 border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/30 transition-all duration-300 " +
                project.border
              }
            >
              {/* Gradient header */}
              <div className={"h-32 bg-gradient-to-br flex items-center justify-center text-5xl " + project.color}>
                {project.icon}
              </div>
              <div className="p-7">
                <div className="flex items-center justify-between mb-3">
                  <span className={"text-xs font-medium tracking-wide uppercase " + project.accent}>
                    {project.category}
                  </span>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-2">{project.desc}</p>
                <p className="text-zinc-500 text-xs leading-relaxed mb-6">{project.longDesc}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, j) => (
                    <span key={j} className="text-xs px-2.5 py-1 bg-zinc-800 border border-zinc-700/50 text-zinc-300 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-sm rounded-xl transition-colors"
                  >
                    <Github size={14} />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other projects */}
        {others.length > 0 && (
          <div className="space-y-4">
            <h2 className="reveal text-zinc-400 text-sm font-semibold uppercase tracking-widest mb-5">More Projects</h2>
            {others.map((project, i) => (
              <div
                key={i}
                className={
                  "reveal bg-zinc-900 border rounded-xl p-6 hover:border-zinc-700 transition-all duration-200 flex flex-col sm:flex-row sm:items-center gap-5 " +
                  project.border
                }
              >
                <div className={"w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-gradient-to-br " + project.color}>
                  {project.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="text-white font-semibold text-base">{project.title}</h3>
                    <span className={"text-xs font-medium " + project.accent}>{project.category}</span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-3">{project.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech, j) => (
                      <span key={j} className="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded border border-zinc-700/30">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-500 rounded">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GitHub CTA */}
        <div className="reveal mt-14 p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center">
          <div className="text-3xl mb-3">⭐</div>
          <h3 className="text-white font-semibold text-lg mb-2">More on GitHub</h3>
          <p className="text-zinc-400 text-sm mb-6">Check out more of my work, experiments, and contributions.</p>
          <a
            href="https://github.com/anmolvarshney77"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-sm font-medium rounded-xl transition-colors"
          >
            <Github size={16} />
            github.com/anmolvarshney77
            <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </div>
  );
};

export default Projects;
