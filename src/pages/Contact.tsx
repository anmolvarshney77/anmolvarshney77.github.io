import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'varshney.anmol.29@gmail.com', href: 'https://mail.google.com/mail/?view=cm&to=varshney.anmol.29@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 90271 32996', href: 'tel:+919027132996' },
    { icon: MapPin, label: 'Location', value: 'Bengaluru, India', href: '#' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/anmolvarshney77', desc: 'github.com/anmolvarshney77' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/anmolvarshney77', desc: 'linkedin.com/in/anmolvarshney77' },
  ];

  const inputClass = "w-full px-4 py-3 bg-zinc-800/60 border border-zinc-700/60 text-white placeholder-zinc-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm";

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Let us talk</h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Open to full-time roles, interesting projects, and conversations about AI and software engineering.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-zinc-300 font-semibold text-base mb-5">Contact Details</h2>
              <div className="space-y-4">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={i}
                      href={item.href}
                      className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all duration-200 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="text-indigo-400" size={16} />
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs mb-0.5">{item.label}</p>
                        <p className="text-zinc-200 text-sm font-medium group-hover:text-white transition-colors">{item.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-zinc-300 font-semibold text-base mb-5">Social Profiles</h2>
              <div className="space-y-3">
                {socialLinks.map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all duration-200 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                        <Icon className="text-zinc-400" size={16} />
                      </div>
                      <div>
                        <p className="text-zinc-300 text-sm font-medium group-hover:text-white transition-colors">{link.label}</p>
                        <p className="text-zinc-600 text-xs">{link.desc}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="p-5 bg-zinc-900 border border-indigo-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-medium">Available for opportunities</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Currently open to full-time software and AI engineering roles. Response time is typically within 24 hours.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <h2 className="text-zinc-300 font-semibold text-base mb-6">Send a Message</h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-zinc-900 border border-zinc-800 rounded-2xl">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <Send className="text-emerald-400" size={22} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Message sent!</h3>
                <p className="text-zinc-400 text-sm max-w-sm">
                  Thanks for reaching out. I will get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-zinc-400 text-xs font-medium mb-2">Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-xs font-medium mb-2">Email</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-2">Subject</label>
                  <input type="text" name="subject" required value={formData.subject} onChange={handleChange} className={inputClass} placeholder="What is this about?" />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-2">Message</label>
                  <textarea name="message" required rows={6} value={formData.message} onChange={handleChange} className={inputClass + " resize-none"} placeholder="Tell me about your project, opportunity, or just say hello..." />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
