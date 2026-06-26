import React from 'react';
import { Trophy, Zap, Award, Medal, Star } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import AnimatedStat from '../components/AnimatedStat';

const Achievements = () => {
  useScrollReveal();

  const categories = [
    {
      label: 'Competitive Programming',
      icon: Trophy,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
      items: [
        {
          title: 'IIT Madras Programming Competition',
          rank: 'National Rank 16',
          date: '2022',
          participants: '8,000+',
          desc: 'Ranked 16th nationally in the programming competition conducted by IIT Madras.',
          badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        },
        {
          title: 'Google Kickstart 2024 – Round E',
          rank: 'Global Rank 609',
          date: '2024',
          participants: '20,000+',
          desc: 'Secured Global Rank 609 and India Rank 379 in Google global coding competition.',
          badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        },
        {
          title: 'Codeforces Global Contest',
          rank: 'Global Rank 73',
          date: '2024',
          participants: '15,000+',
          desc: 'Ranked Global 73 and India Top 10, demonstrating top 0.5% performance globally.',
          badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        },
        {
          title: 'Web Dev Hackathon – HBTU Kanpur',
          rank: 'Runner-Up',
          date: '2024',
          participants: '10,000+',
          desc: 'Runner-up in national-level Web Development Hackathon at HBTU Kanpur Technical Fest.',
          badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        },
      ],
    },
    {
      label: 'Hackathons',
      icon: Zap,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      items: [
        {
          title: 'AI Agents Hackathon – AirTribe',
          rank: '8th Place',
          date: '2025',
          participants: 'Global',
          desc: 'Developed an AI-powered solution for small businesses using Lyzr AI, ranked 8th globally.',
          badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        },
        {
          title: 'Hack The Vibe',
          rank: 'Top 10',
          date: '2025',
          participants: 'National',
          desc: 'Top 10 finish in Computer Vision challenge with 90% accuracy results.',
          badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        },
      ],
    },
    {
      label: 'Academic & Recognition',
      icon: Award,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      items: [
        {
          title: 'Fellowship – S&T Council, Uttar Pradesh',
          rank: 'Fellowship',
          date: '2020',
          participants: '50,000+',
          desc: 'Shortlisted for the Fellowship of Science and Technology Council, Uttar Pradesh out of 50,000+ applicants.',
          badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        },
      ],
    },
    {
      label: 'Certifications',
      icon: Medal,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      items: [
        {
          title: 'Gemini Multimodality & Multimodal RAG',
          rank: 'Google Cloud',
          date: '2025',
          participants: '',
          desc: 'Skill badge by Google Cloud for mastering Gemini multimodality and RAG techniques on Vertex AI.',
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        },
        {
          title: 'Prompt Design in Vertex AI',
          rank: 'Google Cloud',
          date: '2025',
          participants: '',
          desc: 'Skill badge by Google Cloud for mastering prompt engineering using Gemini and Vertex AI.',
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="reveal mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Achievements</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Recognition &amp; Awards</h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Highlights from competitive programming, hackathons, academic recognition, and professional certifications.
          </p>
        </div>

        {/* Summary bar with count-up */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800/50 rounded-2xl overflow-hidden border border-zinc-800/50 mb-16">
          {[
            { value: 'Top 0.5%', label: 'Global Rank (CF)'  },
            { value: 'Rank 16',  label: 'National (IIT-M)'  },
            { value: '4+',       label: 'Hackathons'        },
            { value: '2',        label: 'GCP Certifications' },
          ].map((stat, i) => (
            <AnimatedStat
              key={i}
              value={stat.value}
              label={stat.label}
              className="bg-zinc-900/80 px-6 py-6 flex flex-col cursor-default"
            />
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-14">
          {categories.map((cat, ci) => {
            const Icon = cat.icon;
            return (
              <div key={ci} className="reveal">
                <div className="flex items-center gap-3 mb-6">
                  <div className={"w-9 h-9 rounded-xl flex items-center justify-center " + cat.bg}>
                    <Icon className={cat.color} size={18} />
                  </div>
                  <h2 className="text-white font-semibold text-xl">{cat.label}</h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.items.map((item, ii) => (
                    <div
                      key={ii}
                      className={
                        "reveal bg-zinc-900 border rounded-2xl p-6 hover:border-zinc-700 hover:-translate-y-0.5 transition-all duration-200 " +
                        cat.border
                      }
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className={"px-2.5 py-1 text-xs font-semibold rounded-lg border " + item.badge}>
                          {item.rank}
                        </span>
                        <div className="flex items-center gap-1 text-zinc-600">
                          <Star size={12} className="fill-current text-yellow-500/50" />
                          <span className="text-xs">{item.date}</span>
                        </div>
                      </div>
                      <h3 className="text-white font-semibold text-sm mb-2 leading-snug">{item.title}</h3>
                      <p className="text-zinc-400 text-xs leading-relaxed mb-3">{item.desc}</p>
                      {item.participants && (
                        <p className="text-zinc-600 text-xs">Among {item.participants} participants</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Achievements;
