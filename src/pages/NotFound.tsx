import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => (
  <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
    <div className="text-center max-w-md">

      {/* Glowing 404 */}
      <div className="relative inline-block mb-8">
        <span
          className="text-[10rem] font-black leading-none select-none"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #22d3ee 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 40px rgba(99,102,241,0.4))',
          }}
        >
          404
        </span>
        <div className="absolute inset-0 -z-10 blur-3xl bg-indigo-600/20 rounded-full" />
      </div>

      <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
      <p className="text-zinc-400 text-base leading-relaxed mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5"
        >
          <Home size={16} />
          Back to Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-200 font-medium rounded-xl transition-all duration-200 hover:-translate-y-0.5"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
      </div>
    </div>
  </div>
);

export default NotFound;
