import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { marked } from 'marked';
import { useBlog } from '../context/BlogContext';

// Enable GitHub-flavoured Markdown with line-break support
marked.use({ breaks: true, gfm: true });

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { getPost } = useBlog();

  if (!id) return <Navigate to="/blog" replace />;

  const post = getPost(id);
  if (!post || !post.published) return <Navigate to="/blog" replace />;

  const htmlContent = useMemo(() => marked.parse(post.content) as string, [post.content]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.excerpt, url: window.location.href });
      } catch (_) { /* user cancelled */ }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <div className="mb-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>

        {/* Article header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 text-xs text-zinc-500 mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {post.readTime} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-sm rounded-xl transition-all duration-200"
            >
              <Share2 size={14} />
              Share
            </button>
          </div>
        </header>

        {/* Divider */}
        <div className="border-t border-zinc-800/60 mb-12" />

        {/* Article content */}
        <article className="blog-content">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>

        {/* Article footer */}
        <div className="mt-16 border-t border-zinc-800/60 pt-12">
          <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center">
            <h3 className="text-white font-semibold text-lg mb-2">Enjoyed this article?</h3>
            <p className="text-zinc-400 text-sm mb-6">
              Share it with others or connect with me — I write about AI, software engineering, and more.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20"
              >
                <Share2 size={14} />
                Share Article
              </button>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-sm font-medium rounded-xl transition-all duration-200"
              >
                More Posts
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-sm font-medium rounded-xl transition-all duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogPost;
