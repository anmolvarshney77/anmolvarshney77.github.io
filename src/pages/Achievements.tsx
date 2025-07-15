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
          title: 'CodeChef Programming Contest',
          description: 'Achieved National Rank 16 in CodeChef contest in programming in Python',
          date: '2022',
          rank: 'Top 1%',
          details: 'National ranking in top 16 among more than 800 students'
        },
        {
          title: 'Google Kick Start 2024 – Round E',
          description: 'Secured Global Rank 609 and India Rank 379 among 20,000+ participants',
          date: '2024',
          rank: 'Top 3%',
          details: 'Achieved strong global performance in Google’s global coding competition'
        },
        {
          title: 'Codeforces Global Contest',
          description: 'Ranked Global 73 and India Top 10 among 15,000+ participants',
          date: '2024',
          rank: 'Top 0.5%',
          details: 'Demonstrated excellence in data structures and algorithms on a global stage'
        },
        {
          title: 'Web Development Hackathon – HBTU Kanpur',
          description: 'Runner-up among 10,000+ participants in national-level hackathon',
          date: '2024',
          rank: 'Top 2',
          details: 'Built a full-stack web solution under 36 hours and presented to a live jury panel'
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
          title: 'AI Agents Hackathon',
          description: 'Achieved Top 10 rank in AI Agents Hackathon organised by AirTribe',
          date: '2025',
          rank: '8th Place',
          details: 'Developed AI-powered solution for a small business using Lyzr AI'
        },
        {
          title: 'Hack The Vibe',
          description: 'Top 10 finish in Computer Vision challenge',
          date: '2025',
          rank: 'Top 10',
          details: 'Achieved 90% results in Computer Vision challenge'
        },
      ]
    },
    {
      category: 'Academic & Professional',
      icon: Award,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      items: [
        {
          title: 'Top 5% Promising Developer',
          description: 'Recognition for outstanding contribution to open source',
          date: '2024',
          rank: 'University Level',
          details: 'Contributed to 15+ open source projects'
        },
        {
          title: 'Student Impact Recognition – GeeksforGeeks',
          description: 'Recognized for mentoring 1000+ students across multiple DSA courses',
          date: '2024',
          rank: 'Top Mentor',
          details: 'Consistently rated highly for clear explanations, improving course engagement and completion rates'
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
          title: 'Inspect Rich Documents with Gemini Multimodality and Multimodal RAG',
          description: 'Skill badge issued by Google Cloud for mastering Gemini and Vertex AI with RAG techniques',
          date: '2025',
          rank: 'Certified',
          details: 'Skills: Google Gemini, Vertex AI, Retrieval-Augmented Generation (RAG)'
        },
        {
          title: 'Prompt Design in Vertex AI',
          description: 'Skill badge issued by Google Cloud for mastering prompt engineering using Gemini and Vertex AI',
          date: '2025',
          rank: 'Certified',
          details: 'Skills: Prompt Engineering, Google Gemini, Vertex AI, Imagen'
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
                <div className="text-3xl font-bold text-blue-600">8+</div>
                <div className="text-gray-600 text-sm">Contest Wins</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-purple-600">3+</div>
                <div className="text-gray-600 text-sm">Certifications</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-emerald-600">Top 5%</div>
                <div className="text-gray-600 text-sm">Global Ranking</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-yellow-600">1800+</div>
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