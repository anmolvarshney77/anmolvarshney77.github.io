import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, BookOpen } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Blog = () => {
  useScrollReveal();
  const { getPublishedPosts } = useBlog();
  const [searchTerm,   setSearchTerm]   = useState('');
  const [selectedTag,  setSelectedTag]  = useState('');

  const posts = getPublishedPosts();
  const allTags = useMemo(() => Array.from(new Set(posts.flatMap(p => p.tags))), [posts]);

  const filteredPosts = posts.filter(post => {
    const matchSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTag = !selectedTag || post.tags.includes(selectedTag);
    return matchSearch && matchTag;
  });

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="reveal mb-12">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Thoughts & Insights</h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Writing on AI engineering, software architecture, competitive programming, and building with LLMs.
          </p>
        </div>

        {/* Search + filter */}
        {posts.length > 0 && (
          <div className="reveal mb-10 space-y-4">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-zinc-800/60 border border-zinc-700/60 text-white placeholder-zinc-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
              />
            </div>

            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag('')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                    !selectedTag
                      ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
                  }`}
                >
                  All
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                      selectedTag === tag
                        ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Posts */}
        {posts.length === 0 ? (
          /* Empty state — no posts published yet */
          <div className="reveal flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mb-6">
              <BookOpen className="text-indigo-400" size={28} />
            </div>
            <h2 className="text-white font-semibold text-xl mb-3">Coming soon</h2>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              I am working on articles about AI engineering, LLM architectures, and competitive programming.
              Check back soon.
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="reveal py-16 text-center">
            <p className="text-zinc-500 text-sm">No posts match your search.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredPosts.map((post, i) => (
              <article
                key={post.id}
                className={`reveal bg-zinc-900 border border-zinc-800 hover:border-indigo-500/30 rounded-2xl p-7 transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20`}
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {post.readTime} min read
                  </span>
                </div>

                <h2 className="text-white font-bold text-xl mb-3 group-hover:text-indigo-300 transition-colors duration-200 leading-snug">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>

                <p className="text-zinc-400 text-sm leading-relaxed mb-5">{post.excerpt}</p>

                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, j) => (
                      <button
                        key={j}
                        onClick={() => setSelectedTag(tag)}
                        className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs rounded-lg hover:bg-indigo-500/20 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors group/link"
                  >
                    Read more
                    <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* CTA */}
        {posts.length > 0 && (
          <div className="reveal mt-14 p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center">
            <h3 className="text-white font-semibold text-lg mb-2">Stay connected</h3>
            <p className="text-zinc-400 text-sm mb-6">Follow me for updates on AI, software engineering, and new articles.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://twitter.com/anmolvarshney77"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-200 text-sm font-medium rounded-xl transition-all duration-200"
              >
                Follow on Twitter
              </a>
              <a
                href="https://linkedin.com/in/anmolvarshney77"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-200 text-sm font-medium rounded-xl transition-all duration-200"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Blog;
