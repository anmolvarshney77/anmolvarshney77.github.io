import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { getPost } = useBlog();
  
  if (!id) {
    return <Navigate to="/blog" replace />;
  }
  
  const post = getPost(id);
  
  if (!post || !post.published) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Calendar size={16} className="mr-2" />
            <span>{formatDate(post.date)}</span>
            <Clock size={16} className="ml-4 mr-2" />
            <span>{post.readTime} min read</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Tag size={16} className="text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ 
              __html: post.content.replace(/\n/g, '<br>').replace(/#{1,6}\s(.+)/g, (match, title) => {
                const level = match.split('#').length - 1;
                return `<h${level} class="text-${4-level}xl font-bold text-gray-900 mt-8 mb-4">${title}</h${level}>`;
              })
            }} 
          />
        </article>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Enjoyed this article?
            </h3>
            <p className="text-gray-600 mb-6">
              If you found this helpful, consider sharing it with others or connecting with me on social media.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleShare}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Share Article
              </button>
              <Link
                to="/blog"
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Read More Posts
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BlogPost;