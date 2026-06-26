import React from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Software Engineer – Fullstack + AI',
      company: 'Lyzr AI',
      type: 'Full-time',
      location: 'Bangalore, India',
      period: 'Mar 2025 – Present',
      description: 'Building and scaling production-grade fullstack applications for enterprise AI agents, integrating multi-model LLM support and orchestration pipelines to power real-world business workflows.',
      achievements: [
        'Built production-grade fullstack apps for enterprise AI agents using FastAPI, PostgreSQL, React.js, and Next.js, integrating multi-model support (OpenAI, Anthropic) for seamless LLM-powered workflow deployment.',
        'Designed and implemented LLM orchestration pipelines leveraging LangChain, RAG architectures, and vector databases, improving response relevance and reducing hallucinations in enterprise use cases.',
        'Developed modular AI agent frameworks to automate business workflows (customer support, document processing, analytics) with secure API layers and microservices.',
        'Collaborated with product and AI teams to translate business requirements into deployable AI solutions, accelerating customer onboarding and feature delivery.'
      ],
      technologies: ['FastAPI', 'PostgreSQL', 'React.js', 'Next.js', 'LangChain', 'RAG', 'OpenAI', 'Anthropic', 'Python', 'Docker']
    },
    {
      title: 'Software Engineer',
      company: 'Shridhar LifeSchool',
      type: 'Full-time',
      location: 'Remote',
      period: 'Sep 2024 – Mar 2025',
      description: 'Built a scalable full-stack mental health platform supporting therapy workflows, AI-assisted journaling, situation tracking, and card-based therapy exercises with user management and system analytics.',
      achievements: [
        'Built a scalable full-stack platform using FastAPI and PostgreSQL with role-based authentication supporting therapy workflows such as AI-assisted journaling and card-based therapy exercises.',
        'Designed LLM-powered features to analyze diary entries and therapy interactions, enabling context-aware insights and personalized therapeutic recommendations using prompt engineering and RAG techniques.',
        'Implemented AI-ready data pipelines and modular services to support CRM workflows for therapy resources and user history.'
      ],
      technologies: ['FastAPI', 'PostgreSQL', 'LLM', 'RAG', 'Python', 'Prompt Engineering']
    },
    {
      title: 'Software Engineer Intern',
      company: 'Samsung R&D Institute (SRI-B)',
      type: 'Internship',
      location: 'Remote',
      period: 'Sep 2023 – Feb 2024',
      description: 'Worked on AI-driven context-aware systems to improve smart device responsiveness using user and environmental signals.',
      achievements: [
        'Analyzed device telemetry data to optimize ML models for better contextual understanding and adaptive intelligence.',
        'Built continuous learning pipelines to adapt AI models over time while ensuring strict privacy-preserving data handling.',
        'Collaborated with hardware and firmware teams to integrate intelligent AI models into real-world smart device ecosystems.'
      ],
      technologies: ['Python', 'Machine Learning', 'Linux', 'Data Pipelines', 'Git']
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
           My journey from an intern at Samsung R&D to a full-stack AI engineer has equipped me with hands-on experience across the full software stack — from building AI-driven systems and LLM orchestration pipelines to delivering scalable production applications for enterprise clients.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-sm"></div>

                {/* Content */}
                <div className="ml-20">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.title}</h3>
                        <div className="flex items-center text-blue-600 font-medium mb-2">
                          <Briefcase size={16} className="mr-2" />
                          {exp.company}
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {exp.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col text-sm text-gray-500">
                        <div className="flex items-center mb-1">
                          <Calendar size={14} className="mr-2" />
                          {exp.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-2" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">{exp.description}</p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-600">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Interested in Working Together?
            </h3>
            <p className="text-gray-600 mb-6">
              I'm always open to discussing new opportunities and exciting projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.linkedin.com/in/anmolvarshney77/overlay/1749477696148/single-media-viewer/?profileId=ACoAADdL6tIBSZwHW8CJ9pNu54ptiLT8tmBxxjk"
                download
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download Resume
                <ExternalLink size={16} className="ml-2" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;