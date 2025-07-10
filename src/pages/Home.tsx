import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    Anmol Varshney
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Software Engineer & Full-Stack Developer passionate about building innovative 
                  solutions and contributing to open-source projects.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  View My Work
                  <ArrowRight className="ml-2" size={16} />
                </Link>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="mr-2" size={16} />
                  Download Resume
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Connect with me:</span>
                <div className="flex space-x-3">
                  <a
                    href="https://github.com/anmolvarshney"
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://linkedin.com/in/anmolvarshney"
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="mailto:anmol@example.com"
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Anmol Varshney"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur-lg opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">5+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-600">20+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">10+</div>
              <div className="text-gray-600">Technologies</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600">15+</div>
              <div className="text-gray-600">Achievements</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore My Portfolio
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover my journey, projects, and achievements in software development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              to="/about"
              className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <span className="text-blue-600 font-bold">AB</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">About Me</h3>
              <p className="text-gray-600">
                Learn about my background, education, and technical skills
              </p>
            </Link>

            <Link
              to="/projects"
              className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-emerald-200"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                <span className="text-emerald-600 font-bold">PR</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Projects</h3>
              <p className="text-gray-600">
                Explore my latest projects and technical implementations
              </p>
            </Link>

            <Link
              to="/blog"
              className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <span className="text-purple-600 font-bold">BL</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Blog</h3>
              <p className="text-gray-600">
                Read my thoughts on technology, tutorials, and insights
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;