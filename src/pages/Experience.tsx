import React from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      type: 'Full-time',
      location: 'Remote',
      period: 'Jan 2023 - Present',
      description: 'Leading full-stack development of enterprise web applications using React, Node.js, and AWS. Mentoring junior developers and implementing best practices for code quality and performance.',
      achievements: [
        'Reduced application load time by 40% through optimization',
        'Led migration to microservices architecture',
        'Mentored 3 junior developers and conducted code reviews',
        'Implemented CI/CD pipeline reducing deployment time by 60%'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'Docker']
    },
    {
      title: 'Software Engineer',
      company: 'Innovative Systems Ltd.',
      type: 'Full-time',
      location: 'Bangalore, India',
      period: 'Jul 2021 - Dec 2022',
      description: 'Developed and maintained web applications for financial services. Collaborated with cross-functional teams to deliver high-quality software solutions.',
      achievements: [
        'Built responsive web applications serving 50K+ users',
        'Implemented real-time data synchronization features',
        'Reduced API response time by 35% through optimization',
        'Contributed to open-source projects and internal tools'
      ],
      technologies: ['JavaScript', 'Python', 'PostgreSQL', 'Redis', 'Git', 'Linux']
    },
    {
      title: 'Software Development Intern',
      company: 'StartupXYZ',
      type: 'Internship',
      location: 'Delhi, India',
      period: 'May 2021 - Jul 2021',
      description: 'Worked on developing mobile-first web applications and learned modern development practices in an agile environment.',
      achievements: [
        'Developed 3 key features for the main product',
        'Improved code coverage by 25% through unit testing',
        'Participated in daily standups and sprint planning',
        'Received excellent feedback from team leads'
      ],
      technologies: ['React', 'Express.js', 'MySQL', 'Jest', 'Agile']
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My journey through various roles in software development, highlighting key 
            achievements and technologies used.
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
                href="/resume.pdf"
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