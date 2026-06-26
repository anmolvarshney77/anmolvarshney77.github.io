import React from 'react';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/anmolvarshney77', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/anmolvarshney77', label: 'LinkedIn' },
    { icon: Mail, href: 'https://mail.google.com/mail/?view=cm&to=varshney.anmol.29@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs font-mono">AV</span>
              </div>
              <span className="text-white font-semibold text-sm">Anmol Varshney</span>
            </div>
            <p className="text-zinc-500 text-xs">Software & AI Engineer · Bangalore, India</p>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>

          <p className="text-zinc-600 text-xs">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
