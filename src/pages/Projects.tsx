import React from 'react';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Secure Complaint System',
      description: 'A comprehensive web application for managing and tracking complaints with advanced security features, user authentication, and real-time notifications.',
      longDescription: 'Built with React frontend and Node.js backend, this system features role-based access control, encrypted data storage, and automated workflow management.',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Node.js', 'MongoDB', 'JWT', 'Socket.io', 'Material-UI'],
      githubUrl: 'https://github.com/anmolvarshney/secure-complaint-system',
      liveUrl: 'https://complaint-system-demo.vercel.app',
      featured: true,
      stats: { stars: 45, forks: 12 }
    },
    {
      title: 'C-Share File Sharing Platform',
      description: 'A modern file sharing platform with drag-and-drop uploads, secure file encryption, and time-limited access links.',
      longDescription: 'Developed using Next.js and AWS S3, featuring real-time progress tracking, file preview capabilities, and advanced sharing controls.',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Next.js', 'AWS S3', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'Prisma'],
      githubUrl: 'https://github.com/anmolvarshney/c-share',
      liveUrl: 'https://c-share-platform.vercel.app',
      featured: true,
      stats: { stars: 32, forks: 8 }
    },
    {
      title: 'Linux Shell Implementation',
      description: 'A custom Unix shell implementation with advanced features like command history, tab completion, and process management.',
      longDescription: 'Written in C, this shell supports piping, redirection, background processes, and custom built-in commands with memory-efficient design.',
      image: 'https://images.pexels.com/photos/270557/pexels-photo-270557.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['C', 'Linux', 'System Calls', 'Process Management', 'Memory Management'],
      githubUrl: 'https://github.com/anmolvarshney/linux-shell',
      featured: false,
      stats: { stars: 28, forks: 15 }
    },
    {
      title: 'OS Algorithms Visualizer',
      description: 'Interactive web application for visualizing operating system algorithms including scheduling, memory management, and disk algorithms.',
      longDescription: 'Educational tool built with React and D3.js, featuring step-by-step algorithm execution, customizable parameters, and performance metrics.',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'D3.js', 'JavaScript', 'CSS3', 'Chart.js'],
      githubUrl: 'https://github.com/anmolvarshney/os-algorithms-visualizer',
      liveUrl: 'https://os-algo-visualizer.vercel.app',
      featured: false,
      stats: { stars: 67, forks: 23 }
    },
    {
      title: 'Task Management API',
      description: 'RESTful API for task management with user authentication, team collaboration, and real-time updates.',
      longDescription: 'Built with Express.js and MongoDB, featuring comprehensive API documentation, rate limiting, and comprehensive testing suite.',
      image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Express.js', 'MongoDB', 'JWT', 'Swagger', 'Jest', 'Docker'],
      githubUrl: 'https://github.com/anmolvarshney/task-api',
      featured: false,
      stats: { stars: 19, forks: 7 }
    },
    {
      title: 'E-Commerce Analytics Dashboard',
      description: 'Real-time analytics dashboard for e-commerce platforms with interactive charts and business intelligence features.',
      longDescription: 'Developed using React and Python backend, featuring data visualization, predictive analytics, and automated reporting.',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Python', 'Flask', 'PostgreSQL', 'Chart.js', 'Redis'],
      githubUrl: 'https://github.com/anmolvarshney/ecommerce-dashboard',
      liveUrl: 'https://ecommerce-analytics.vercel.app',
      featured: false,
      stats: { stars: 41, forks: 11 }
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in software development, 
            system design, and problem-solving.
          </p>
        </div>

        {/* Featured Projects */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Projects</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star size={14} className="mr-1" />
                        {project.stats.stars}
                      </div>
                      <div className="flex items-center">
                        <GitFork size={14} className="mr-1" />
                        {project.stats.forks}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <p className="text-gray-500 text-sm mb-6">{project.longDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Other Projects */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Other Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-32 object-cover"
                />
                
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Star size={12} className="mr-1" />
                        {project.stats.stars}
                      </div>
                      <div className="flex items-center">
                        <GitFork size={12} className="mr-1" />
                        {project.stats.forks}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Github size={14} className="mr-1" />
                      <span className="text-sm">Code</span>
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <ExternalLink size={14} className="mr-1" />
                        <span className="text-sm">Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;