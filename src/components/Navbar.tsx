import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'About',        path: '/about'        },
    { name: 'Experience',   path: '/experience'   },
    { name: 'Projects',     path: '/projects'     },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Blog',         path: '/blog'         },
    { name: 'Contact',      path: '/contact'      },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/50 shadow-xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <span className="text-white font-bold text-sm font-mono">AV</span>
            </div>
            <span className="text-white font-semibold text-sm hidden sm:block group-hover:text-indigo-400 transition-colors">
              Anmol Varshney
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {item.name}
                {/* Animated underline indicator */}
                <span
                  className="nav-link-indicator"
                  style={{
                    width:   isActive(item.path) ? '65%' : '0%',
                    opacity: isActive(item.path) ? 1       : 0,
                  }}
                />
              </Link>
            ))}

            <a
              href="https://drive.google.com/file/d/1cbDtCC2ZM4a_K5baHD-Vmz9Cq8FjCxJo/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:-translate-y-px"
            >
              Resume
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="mobile-menu-enter md:hidden bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {isActive(item.path) && (
                  <span className="w-1 h-4 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full mr-3 flex-shrink-0" />
                )}
                {item.name}
              </Link>
            ))}
            <a
              href="https://drive.google.com/file/d/1cbDtCC2ZM4a_K5baHD-Vmz9Cq8FjCxJo/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-3 text-indigo-400 text-sm font-medium"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
