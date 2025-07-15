import React from 'react';
import { GraduationCap, Code, Award, MapPin } from 'lucide-react';

const About = () => {
  const skills = [
    'Python','React', 'Node.js', 'TypeScript' , 'TailWindCSS' , 'n8n', 'JSON',
     'PostgreSQL', 'MySQL', 'Zapier', 'Git', 'Make'
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Data Science and Programming',
      institution: 'Indian Institute of Technology (IIT) Madras',
      year: '2021 - 2025',
      location: 'Chennai, India',
      description: 'Specialized in Software Engineering and Data Structures & Algorithms'
    },
    {
      degree: 'Bachelor of Science in Mathematics',
      institution: 'Mahila Jyotiba Phule Rohilkhand University',
      year: '2020 - 2023',
      location: 'Uttar Pradesh, India',
      description: 'Focused on core subjects like Mathematics, Physics, Chemistry, developed a strong foundation in analytical thinking and problem-solving.'
    },

  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            I'm a passionate Software Engineer with a strong foundation in full-stack development, workflow automation, and problem solving. I love building efficient, user-focused web applications and exploring new technologies.
          </p>
        </div>

        {/* Biography */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Journey</h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p>
                Hello! I'm Anmol Varshney, a software engineer based in India.
                My journey into tech began with a deep curiosity about how things
                work and a love for solving problems. I pursued a B.Sc. in Mathematics while self-learning
                programming, which eventually led me to the B.Sc. in Programming & Data Science at IIT 
                Madras.Along the way, I’ve interned at leading companies like Samsung R&D, HackerEarth,
                and GeeksforGeeks, where I worked on real-world problems ranging from scalable backend 
                systems to interactive learning platforms. These experiences taught me how to write clean,
                efficient code, work in agile teams, and deliver meaningful features under tight deadlines.
                Beyond work, I’m passionate about problem solving, workflow automation, and open-source contributions.
                I actively participate in coding contests, achieving top national and global ranks, and enjoy
                experimenting with tools like n8n, Zapier, and Docker to automate everyday tasks. Whether it’s building
                web apps, visualizing OS algorithms, or designing smart systems, I love turning ideas into real, working
                products.When I’m not coding, you’ll find me participating in programming contests, contributing to 
                open-source projects, or exploring new technologies. I believe in continuous learning and in sharing knowledge
                with the developer community.
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
                    React, TypeScript, Next.js, Tailwind CSS, JSON
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Backend Development</h4>
                  <p className="text-gray-600 text-sm">
                    Node.js, Python, n8n, Zapier, Make, REST APIs
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Database Management</h4>
                  <p className="text-gray-600 text-sm">
                    MySQL, PostgreSQL, database optimization
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">DevOps & Cloud</h4>
                  <p className="text-gray-600 text-sm">
                    Git, Docker, CI/CD, cloud services (AWS, GCP)
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