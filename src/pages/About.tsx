import React from 'react';
import { GraduationCap, Code, Award, MapPin } from 'lucide-react';

const About = () => {
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java',
    'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'Linux'
  ];

  const education = [
    {
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'Indian Institute of Technology (IIT)',
      year: '2018 - 2022',
      location: 'Delhi, India',
      description: 'Specialized in Software Engineering and Data Structures & Algorithms'
    },
    {
      degree: 'Higher Secondary Education',
      institution: 'Delhi Public School',
      year: '2016 - 2018',
      location: 'New Delhi, India',
      description: 'Mathematics, Physics, Chemistry with Computer Science'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            I'm a passionate software engineer with expertise in full-stack development, 
            always eager to learn new technologies and solve complex problems.
          </p>
        </div>

        {/* Biography */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Journey</h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p>
                Hello! I'm Anmol Varshney, a software engineer based in India with a passion for 
                creating innovative digital solutions. My journey in technology began during my 
                undergraduate studies at IIT Delhi, where I discovered my love for programming 
                and problem-solving.
              </p>
              <p>
                Over the years, I've had the opportunity to work on diverse projects ranging from 
                web applications to system design. I specialize in full-stack development with 
                expertise in modern JavaScript frameworks, backend technologies, and cloud platforms.
              </p>
              <p>
                When I'm not coding, you can find me participating in competitive programming 
                contests, contributing to open-source projects, or exploring new technologies. 
                I believe in continuous learning and sharing knowledge with the developer community.
              </p>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <GraduationCap className="mr-3 text-blue-600" size={28} />
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-blue-600 font-medium">{edu.year}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Award className="mr-2" size={16} />
                  <span className="font-medium">{edu.institution}</span>
                </div>
                <div className="flex items-center text-gray-500 mb-3">
                  <MapPin className="mr-2" size={16} />
                  <span>{edu.location}</span>
                </div>
                <p className="text-gray-600">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <Code className="mr-3 text-emerald-600" size={28} />
            Technical Skills
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-50 px-4 py-3 rounded-lg text-center font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-default"
                >
                  {skill}
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Frontend Development</h4>
                  <p className="text-gray-600 text-sm">
                    React, TypeScript, Next.js, Tailwind CSS, responsive design
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Backend Development</h4>
                  <p className="text-gray-600 text-sm">
                    Node.js, Express, Python, RESTful APIs, microservices
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Database Management</h4>
                  <p className="text-gray-600 text-sm">
                    MongoDB, PostgreSQL, Redis, database optimization
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">DevOps & Cloud</h4>
                  <p className="text-gray-600 text-sm">
                    AWS, Docker, CI/CD, monitoring, deployment automation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;