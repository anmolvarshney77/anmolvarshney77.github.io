import React from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Software Engineer Intern',
      company: 'HackerEarth',
      type: 'Internship',
      location: 'Remote',
      period: 'August 2024 - February 2025',
      description: 'Contributed to the Frontend and backend systems of HackerEarth’s coding assessment platform, focusing on improving performance and reliability. Collaborated with the product team to build new features and resolve real-time issueselopment of enterprise web applications using React and Node.js.',
      achievements: ['Improved API response times by optimizing backend service architecture.',
        'Implemented a new feature for real-time code evaluation, enhancing user experience.',
        'Successfully delivered key features for the test evaluation module, enhancing recruiter analytics.',
        'Participated in code reviews and contributed to the development of best practices.'
        ],
      technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Git']
    },
    {
      title: 'Teaching Assistant',
      company: 'GeeksforGeeks',
      type: 'Internship',
      location: 'Remote',
      period: 'Mar 2024 - July 2024',
      description: 'Conducted doubt-solving sessions in Python,SQL, live problem-solving classes, and helped students strengthen their understanding of code writing and help them writing queries in SQL using MySQL.',
      achievements: [
        'Mentored 300+ students through hands-on coding and practical explanations.',
        'Created engaging learning materials and quizzes to enhance understanding.',
        'Organized weekly coding challenges to foster a competitive learning environment.',
        'Consistently rated highly for most approachable mentoring style.'
      ],
      technologies: ['Python', 'MySQL', 'SQL', 'Git']
    },
    {
      title: 'Software Engineer Intern',
      company: 'Samsung R&D Institute (SRI-B)',
      type: 'Internship',
      location: 'Remote',
      period: 'Sep 2023 - Feb 2024',
      description: 'Worked on the automation team to develop internal tools that streamlined debugging and analytics for Samsung devices.',
      achievements: [
        'Developed a shell-based automation tool that reduced debugging time by over 60%.',
        'Enhanced log analysis workflows by writing efficient Python scripts.',
        'Participated in daily standups and sprint planning',
        'Received excellent feedback from team leads'
      ],
      technologies: ['Python', 'Linux', 'MySQL', 'Git']
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
           My journey through multiple software engineering internships has equipped me with hands-on experience in backend development, automation, and technical mentoring — with key contributions across companies like Samsung R&D, HackerEarth, and GeeksforGeeks.
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