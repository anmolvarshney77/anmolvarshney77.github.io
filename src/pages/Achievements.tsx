import React from 'react';
import { Trophy, Award, Medal, Star, Target, Zap } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      category: 'Competitive Programming',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      items: [
        {
          title: 'CodeChef 5-Star Rating',
          description: 'Achieved 5-star rating on CodeChef with consistent performance in monthly contests',
          date: '2023',
          rank: 'Top 1%',
          details: 'Global ranking in top 1% with 2100+ rating points'
        },
        {
          title: 'Google Code Jam - Round 2',
          description: 'Advanced to Round 2 of Google Code Jam 2023',
          date: '2023',
          rank: 'Top 3000',
          details: 'Among top 3000 participants worldwide'
        },
        {
          title: 'Codeforces Expert',
          description: 'Reached Expert level (1600+ rating) on Codeforces',
          date: '2022',
          rank: 'Top 5%',
          details: 'Consistent performance in Div 1 and Div 2 contests'
        }
      ]
    },
    {
      category: 'Hackathons & Contests',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      items: [
        {
          title: 'Smart India Hackathon - Winner',
          description: 'First place in Smart India Hackathon 2023 Software Edition',
          date: '2023',
          rank: '1st Place',
          details: 'Developed AI-powered solution for traffic management'
        },
        {
          title: 'HackerEarth Deep Learning Challenge',
          description: 'Top 10 finish in Computer Vision challenge',
          date: '2023',
          rank: 'Top 10',
          details: 'Achieved 94.5% accuracy in image classification task'
        },
        {
          title: 'AngelHack Global Hackathon',
          description: 'Second place in Delhi regional competition',
          date: '2022',
          rank: '2nd Place',
          details: 'Built fintech solution for micro-lending'
        }
      ]
    },
    {
      category: 'Academic & Professional',
      icon: Award,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      items: [
        {
          title: 'Dean\'s List Recognition',
          description: 'Consistently maintained top 5% academic performance',
          date: '2020-2022',
          rank: 'Top 5%',
          details: 'GPA: 9.2/10 for 4 consecutive semesters'
        },
        {
          title: 'Best Student Developer Award',
          description: 'Recognition for outstanding contribution to open source',
          date: '2022',
          rank: 'University Level',
          details: 'Contributed to 15+ open source projects'
        },
        {
          title: 'Technical Excellence Award',
          description: 'Company-wide recognition for innovative solutions',
          date: '2023',
          rank: 'Company Wide',
          details: 'Implemented system that improved efficiency by 40%'
        }
      ]
    },
    {
      category: 'Certifications & Recognition',
      icon: Medal,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      items: [
        {
          title: 'AWS Solutions Architect',
          description: 'Associate level certification for cloud architecture',
          date: '2023',
          rank: 'Certified',
          details: 'Score: 885/1000 (Pass: 720)'
        },
        {
          title: 'Google Cloud Professional',
          description: 'Professional Cloud Developer certification',
          date: '2023',
          rank: 'Professional',
          details: 'Expertise in cloud-native application development'
        },
        {
          title: 'Microsoft Azure Fundamentals',
          description: 'Foundation certification in Azure cloud services',
          date: '2022',
          rank: 'Certified',
          details: 'Score: 920/1000'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Achievements & Recognition</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of my accomplishments in competitive programming, hackathons, 
            academics, and professional development.
          </p>
        </div>

        {/* Achievement Categories */}
        <div className="space-y-16">
          {achievements.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <section key={categoryIndex}>
                <div className="flex items-center mb-8">
                  <div className={`p-3 rounded-lg ${category.bgColor} mr-4`}>
                    <IconComponent className={`${category.color}`} size={28} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((achievement, achievementIndex) => (
                    <div
                      key={achievementIndex}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {achievement.title}
                          </h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${category.bgColor} ${category.color}`}>
                              {achievement.rank}
                            </span>
                            <span className="text-sm text-gray-500">{achievement.date}</span>
                          </div>
                        </div>
                        <Star className="text-yellow-400 fill-current" size={20} />
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {achievement.description}
                      </p>

                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Details:</span> {achievement.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Stats Summary */}
        <section className="mt-20">
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-emerald-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Achievement Summary
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-gray-600 text-sm">Contest Wins</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-purple-600">5+</div>
                <div className="text-gray-600 text-sm">Certifications</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-emerald-600">Top 1%</div>
                <div className="text-gray-600 text-sm">Global Ranking</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-yellow-600">2100+</div>
                <div className="text-gray-600 text-sm">Rating Points</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Always Striving for Excellence
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              These achievements represent my commitment to continuous learning and excellence. 
              I'm always looking for new challenges and opportunities to grow.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Let's Connect
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;