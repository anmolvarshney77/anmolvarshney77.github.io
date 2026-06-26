import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Achievements from './pages/Achievements';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { BlogProvider } from './context/BlogContext';
import { AdminProvider } from './context/AdminContext';

// Page transition wrapper — key change re-mounts this div, triggering CSS enter animation
function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-page-in">
      {children}
    </div>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow">
        <PageWrapper>
          <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/about"        element={<About />} />
            <Route path="/experience"   element={<Experience />} />
            <Route path="/projects"     element={<Projects />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/blog"         element={<Blog />} />
            <Route path="/blog/:id"     element={<BlogPost />} />
            <Route path="/contact"      element={<Contact />} />
            <Route path="/admin"        element={<Admin />} />
          </Routes>
        </PageWrapper>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AdminProvider>
      <BlogProvider>
        <Router>
          <AppContent />
        </Router>
      </BlogProvider>
    </AdminProvider>
  );
}

export default App;
