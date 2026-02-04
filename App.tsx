import React, { useState } from 'react';
import { PROJECTS, ABOUT_TEXT, SKILLS } from './constants';
import { ViewState } from './types';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetail } from './components/ProjectDetail';
import { Button } from './components/Button';
import { Menu, X, Mail, Github, Linkedin, Phone, Copy, Check } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null);

  const CONTACT_INFO = {
    email: 'hello@ramanadesign.tech',
    phone: '+1 (555) 123-4567'
  };

  const handleProjectClick = (id: string) => {
    setSelectedProjectId(id);
    setView('PROJECT_DETAIL');
    window.scrollTo(0, 0);
  };

  const handleNavClick = (newView: ViewState) => {
    setView(newView);
    setSelectedProjectId(null);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const currentProject = PROJECTS.find(p => p.id === selectedProjectId);

  const renderContactModal = () => {
    if (!isContactModalOpen) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsContactModalOpen(false)}
        />
        
        {/* Modal Card */}
        <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl p-8 animate-in zoom-in-95 fade-in duration-300">
          <button 
            onClick={() => setIsContactModalOpen(false)}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold text-slate-900 mb-2 font-heading">Get in Touch</h2>
          <p className="text-slate-500 mb-8">Feel free to reach out for collaborations or just a friendly hello.</p>

          <div className="space-y-4">
            {/* Email Field */}
            <div className="group relative bg-[#F0F9FB] border border-[#2B6B7C]/10 rounded-2xl p-4 flex items-center justify-between hover:border-[#2B6B7C]/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-xl text-[#2B6B7C]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Email</p>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-slate-900 font-medium hover:text-[#2B6B7C] transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
              <button 
                onClick={() => copyToClipboard(CONTACT_INFO.email, 'email')}
                className="p-2 text-slate-400 hover:text-[#2B6B7C] hover:bg-white rounded-lg transition-all"
                title="Copy email"
              >
                {copiedType === 'email' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Field */}
            <div className="group relative bg-[#F0F9FB] border border-[#2B6B7C]/10 rounded-2xl p-4 flex items-center justify-between hover:border-[#2B6B7C]/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white rounded-xl text-[#2B6B7C]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Phone</p>
                  <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g,'')}`} className="text-slate-900 font-medium hover:text-[#2B6B7C] transition-colors">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
              <button 
                onClick={() => copyToClipboard(CONTACT_INFO.phone, 'phone')}
                className="p-2 text-slate-400 hover:text-[#2B6B7C] hover:bg-white rounded-lg transition-all"
                title="Copy phone number"
              >
                {copiedType === 'phone' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
             <Button variant="text" onClick={() => setIsContactModalOpen(false)}>
                Close
             </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (view) {
      case 'PROJECT_DETAIL':
        if (currentProject) {
          return (
            <ProjectDetail 
              project={currentProject} 
              onBack={() => handleNavClick('HOME')} 
            />
          );
        }
        return <div className="p-12 text-center text-slate-500">Project not found</div>;
      
      case 'ABOUT':
        return (
          <div className="max-w-3xl mx-auto px-4 py-12">
             <h1 className="text-4xl font-bold text-slate-900 mb-8">About Me</h1>
             <div className="prose prose-lg text-slate-600 leading-relaxed mb-12">
               {ABOUT_TEXT.split('\n').map((paragraph, idx) => (
                 paragraph.trim() && <p key={idx} className="mb-4">{paragraph}</p>
               ))}
             </div>

             <div className="mb-12 border-t border-slate-100 pt-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Skills & Expertise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {SKILLS.map((skillGroup) => (
                    <div key={skillGroup.category}>
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3 font-heading">
                        {skillGroup.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <span 
                            key={skill}
                            className="px-3 py-1.5 bg-[#F0F9FB] text-[#2B6B7C] text-sm font-medium rounded-lg border border-[#2B6B7C]/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Let's Connect</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="primary" 
                    icon={<Mail className="w-4 h-4" />}
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    Contact Me
                  </Button>
                  <Button 
                    variant="secondary"
                    icon={<Linkedin className="w-4 h-4" />}
                    onClick={() => window.open('https://linkedin.com', '_blank')}
                  >
                    LinkedIn
                  </Button>
                   <Button 
                    variant="secondary"
                    icon={<Github className="w-4 h-4" />}
                    onClick={() => window.open('https://github.com', '_blank')}
                  >
                    GitHub
                  </Button>
                </div>
             </div>
          </div>
        );

      case 'HOME':
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <section className="mb-20 max-w-3xl">
              <span className="text-[#3A8CA3] font-semibold tracking-wide uppercase text-sm mb-4 block font-heading">
                Portfolio
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
                <span className="text-slate-400">ramana.</span> <span className="whitespace-nowrap">Product Designer</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                I design and build prototypes for interactive systems that explore human experience and everyday choices
              </p>
            </section>

            {/* Projects Grid */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center">
                Selected Work
                <div className="h-px bg-slate-200 flex-1 ml-6"></div>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {PROJECTS.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={handleProjectClick} 
                  />
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-[#2B6B7C] selection:text-white">
      
      {/* Contact Reveal Modal */}
      {renderContactModal()}

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo */}
            <div 
              className="font-bold text-xl tracking-tight cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6B7C] rounded-lg px-2 font-heading"
              onClick={() => handleNavClick('HOME')}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => e.key === 'Enter' && handleNavClick('HOME')}
            >
              ramanadesign<span className="text-[#3A8CA3]">.tech</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => handleNavClick('HOME')} 
                className={`text-sm font-medium transition-colors hover:text-[#2B6B7C] ${view === 'HOME' && !selectedProjectId ? 'text-[#2B6B7C]' : 'text-slate-600'}`}
              >
                Work
              </button>
              <button 
                onClick={() => handleNavClick('ABOUT')} 
                className={`text-sm font-medium transition-colors hover:text-[#2B6B7C] ${view === 'ABOUT' ? 'text-[#2B6B7C]' : 'text-slate-600'}`}
              >
                About
              </button>
              <Button 
                variant="primary" 
                className="!py-1 !px-4 !min-h-[40px] text-sm"
                onClick={() => setIsContactModalOpen(true)}
              >
                Contact
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B6B7C]"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
            <button 
              onClick={() => handleNavClick('HOME')} 
              className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-900"
            >
              Work
            </button>
            <button 
              onClick={() => handleNavClick('ABOUT')} 
              className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-900"
            >
              About
            </button>
             <button 
              onClick={() => setIsContactModalOpen(true)} 
              className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-[#2B6B7C]"
            >
              Contact Me
            </button>
          </div>
        )}
      </nav>

      <main className="min-h-[calc(100vh-64px)]">
        {renderContent()}
      </main>

      <footer className="bg-white border-t border-slate-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Portfolio. Built with Material 3 & React.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-[#2B6B7C] transition-colors" aria-label="Github">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-[#2B6B7C] transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;