import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

import { RESUME_URL } from '../constants';

const Footer = () => {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: 'About',        to: '/about'        },
    { label: 'Experience',   to: '/experience'   },
    { label: 'Projects',     to: '/projects'     },
    { label: 'Achievements', to: '/achievements' },
    { label: 'Blog',         to: '/blog'         },
    { label: 'Contact',      to: '/contact'      },
  ];

  const socialLinks = [
    { icon: Github,   href: 'https://github.com/anmolvarshney77',                                   label: 'GitHub'   },
    { icon: Linkedin, href: 'https://linkedin.com/in/anmolvarshney77',                              label: 'LinkedIn' },
    { icon: Mail,     href: 'https://mail.google.com/mail/?view=cm&to=varshney.anmol.29@gmail.com', label: 'Email'    },
  ];

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top row: brand + nav + social */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="text-white font-bold text-xs font-mono">AV</span>
              </div>
              <span className="text-white font-semibold text-sm">Anmol Varshney</span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-[220px]">
              Software &amp; AI Engineer building enterprise AI agents and LLM-powered systems.
            </p>
            <div className="flex items-center gap-1.5 mt-4">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-medium">Open to opportunities</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-zinc-500 hover:text-zinc-200 text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-4">Connect</p>
            <div className="space-y-3 mb-5">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex items-center gap-2.5 text-zinc-500 hover:text-zinc-200 transition-colors duration-200 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 flex items-center justify-center transition-colors">
                      <Icon size={13} />
                    </div>
                    <span className="text-sm">{link.label}</span>
                  </a>
                );
              })}
            </div>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 border border-indigo-500/30 hover:bg-indigo-600/20 hover:border-indigo-500/50 text-indigo-400 text-xs font-medium rounded-lg transition-all duration-200"
            >
              View Resume →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-zinc-600 text-xs">
            &copy; {year} Anmol Varshney &middot; Built with React &amp; Tailwind CSS
          </p>
          <p className="text-zinc-700 text-xs">Bangalore, India</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
