import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Sparkles, Cloud, Moon, Sun,
  Star, Zap, Cpu, ChevronRight, Play, Shield, Code, BarChart, Heart
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themePhase, setThemePhase] = useState('idle'); // 'idle' | 'sunset' | 'sunrise'

  // Animated quotes state
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const quotes = [
    "Evolving Goals Daily.",
    "Hey, I am Anshu Bhawsar",
    "Welcome to My Portfolio",
    "Building the Future",
    "Innovating Together",
    "Crafting Excellence",
    "Hello, Visitor",
    "Let's Create Something Amazing"
  ];

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active'); 
      });
    }, { threshold: 0.1 }); 

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Animated quotes effect
  useEffect(() => {
    const fullText = quotes[currentQuoteIndex];
    if (currentText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1));
      }, 150); // typing speed
      return () => clearTimeout(timeout);
    } else {
      // finished typing, wait then move to next
      const timeout = setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
        setCurrentText('');
      }, 3000); // pause before next quote
      return () => clearTimeout(timeout);
    }
  }, [currentText, currentQuoteIndex, quotes]);


  const toggleTheme = () => {
    if (themePhase !== 'idle') return;
    
    if (isDarkMode) {
      setThemePhase('sunrise');
      setTimeout(() => setIsDarkMode(false), 500);
      setTimeout(() => setThemePhase('idle'), 1200);
    } else {
      setThemePhase('sunset');
      setTimeout(() => setIsDarkMode(true), 500);
      setTimeout(() => setThemePhase('idle'), 1200);
    }
  };

  // Contact form handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  return (
    <div className="min-h-screen font-sans overflow-hidden transition-colors duration-1000 bg-rose-50 dark:bg-[#0A0510] text-slate-800 dark:text-rose-50 selection:bg-pink-300 dark:selection:bg-pink-900 selection:text-pink-900 dark:selection:text-pink-50 relative">
      
      {/* --- FLOATING STATIC BACKGROUND ORBS --- */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[15%] left-[10%] w-64 h-64 bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-[60px] animate-blob"></div>
        <div className="absolute top-[40%] right-[10%] w-80 h-80 bg-fuchsia-400/20 dark:bg-fuchsia-600/10 rounded-full blur-[80px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[10%] left-[25%] w-72 h-72 bg-rose-300/20 dark:bg-rose-500/10 rounded-full blur-[70px] animate-blob animation-delay-4000"></div>
      </div>

      {/* --- THEME TRANSITION OVERLAY --- */}
      {themePhase !== 'idle' && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
          <div className={`absolute inset-0 animate-sky ${
            themePhase === 'sunset' 
              ? 'bg-gradient-to-b from-pink-500/40 via-purple-600/40 to-[#0A0510]/90' 
              : 'bg-gradient-to-t from-orange-300/40 via-rose-200/40 to-rose-50/90'
          }`} />
          
          <div className={`relative w-64 h-64 rounded-full blur-[2px] ${
            themePhase === 'sunset' 
              ? 'bg-gradient-to-b from-rose-300 to-pink-600 shadow-[0_0_120px_rgba(219,39,119,1)] [animation:sunDown_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards]' 
              : 'bg-gradient-to-t from-orange-100 to-rose-300 shadow-[0_0_120px_rgba(251,113,133,1)] [animation:sunUp_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards]'
          }`} />
        </div>
      )}

      {/* 1. Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${
        isScrolled ? 'bg-white/70 dark:bg-[#0A0510]/70 backdrop-blur-xl border-b border-rose-200/50 dark:border-pink-900/30 py-3 shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center animate-bounce-gentle group-hover:rotate-12 transition-transform shadow-lg shadow-pink-500/30">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Anshu<span className="text-pink-500">.</span>
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Features', 'Expertise', 'Projects', 'Skills', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold text-slate-600 dark:text-rose-100/70 hover:text-pink-600 dark:hover:text-pink-400 transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-1 rounded-full bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full bg-white/50 dark:bg-[#1A0D2E] text-slate-700 dark:text-pink-400 hover:scale-110 hover:bg-white dark:hover:bg-pink-900/30 transition-all duration-300 border border-transparent dark:border-pink-800/40 shadow-sm"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button className="bg-slate-900 dark:bg-pink-500 text-white dark:text-slate-950 px-6 py-2.5 rounded-full font-bold shadow-lg hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                <a href="#contact" className="block">Get Started</a>
              </button>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleTheme} className="p-2 rounded-full bg-white/50 dark:bg-[#1A0D2E] text-slate-700 dark:text-pink-400">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="text-slate-800 dark:text-pink-400 bg-white dark:bg-[#1A0D2E] p-2 rounded-full shadow-sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center mt-10">
          
          <div className="reveal inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel text-sm font-bold text-pink-600 dark:text-pink-400 mb-8 hover:scale-105 transition-transform cursor-pointer">
            <Sparkles className="w-4 h-4 animate-pulse" />
            Software Engineer & Developer
          </div>
          
          <h1 className="reveal delay-100 text-6xl md:text-8xl font-black tracking-tight mb-8 leading-tight text-slate-900 dark:text-white text-gradient">
            {currentText}<span className="animate-pulse">|</span>
          </h1>
          
          <p className="reveal delay-200 text-lg md:text-2xl text-slate-600 dark:text-rose-100/60 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Building innovative software solutions with expertise in AI/ML, optimization algorithms, and emerging technologies.
          </p>
          
          <div className="reveal delay-300 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-black text-lg hover:scale-110 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/30 transition-all duration-300 flex items-center justify-center gap-2">
              Start Building <Zap className="w-5 h-5 fill-white" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-[#1A0D2E] text-slate-900 dark:text-pink-300 font-bold text-lg hover:bg-rose-50 dark:hover:bg-pink-950/40 border border-rose-200 dark:border-pink-800/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm">
              <Play className="w-5 h-5 fill-slate-900 dark:fill-pink-400" /> Watch Story
            </button>
          </div>

          <div className="reveal delay-400 mt-20 animate-float">
            <div className="relative mx-auto max-w-4xl p-4 glass-panel">
               <div className="rounded-[1.5rem] overflow-hidden bg-white dark:bg-[#0A0510] shadow-inner border border-rose-100 dark:border-pink-900/30">
                  <div className="h-12 bg-rose-50 dark:bg-[#120B1E] border-b border-rose-100 dark:border-pink-900/30 flex items-center px-6 gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-400 hover:scale-150 transition-transform"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-fuchsia-400 hover:scale-150 transition-transform"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 hover:scale-150 transition-transform"></div>
                  </div>
                  <div className="h-[350px] w-full bg-gradient-to-br from-rose-50/50 to-fuchsia-50/50 dark:from-pink-950/10 dark:to-purple-950/10 p-8 flex flex-col justify-center items-center relative">
                    <div className="absolute inset-0 opacity-10 dark:opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #ec4899 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
                    <Sparkles className="w-24 h-24 text-pink-500 dark:text-pink-400 mb-6 animate-bounce-gentle drop-shadow-md" />
                    <div className="h-4 w-64 bg-rose-100 dark:bg-[#1A0D2E] rounded-full overflow-hidden shadow-sm p-1">
                      <div className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full w-2/3 animate-pulse"></div>
                    </div>
                    <p className="mt-6 text-rose-400 dark:text-pink-400/60 font-bold text-sm tracking-widest uppercase">Initializing Vision...</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="reveal text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white">About <span className="text-gradient">Me</span></h2>
            <p className="reveal delay-100 text-slate-600 dark:text-rose-100/60 text-xl max-w-2xl mx-auto font-medium">AI/ML Enthusiast with strong foundation in full-stack web development and algorithmic problem-solving. Architecting intelligent, autonomous systems from agentic security honeypots to robust applications using cutting-edge AI integration.</p>
          </div>

          {/* Core Expertise */}
          <div id="expertise" className="reveal mb-20">
            <h3 className="text-3xl md:text-4xl font-black mb-8 text-slate-900 dark:text-white text-center">Core Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 glass-panel">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">AI/ML & Autonomous Systems</h4>
                </div>
                <ul className="space-y-3 text-slate-600 dark:text-rose-100/60 font-medium">
                  <li>• Reinforcement Learning algorithms and mathematical foundations</li>
                  <li>• Agentic AI systems and LLM-powered applications</li>
                  <li>• Prompt Engineering and persona-driven language models</li>
                  <li>• Predictive modeling and AI integration for intelligent automation</li>
                </ul>
              </div>

              <div className="p-8 glass-panel">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-fuchsia-100 dark:bg-fuchsia-900/20 rounded-full flex items-center justify-center">
                    <Code className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Full-Stack Development</h4>
                </div>
                <ul className="space-y-3 text-slate-600 dark:text-rose-100/60 font-medium">
                  <li>• C++ and Python for performance-critical applications</li>
                  <li>• React & Node.js for modern web applications</li>
                  <li>• Data Structures & Algorithms with competitive programming expertise</li>
                  <li>• Database design (SQLite, SQL) and Linux system optimization</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Featured Software Projects */}
          <div id="projects" className="reveal mb-20">
            <h3 className="text-3xl md:text-4xl font-black mb-8 text-slate-900 dark:text-white text-center">Featured Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              <a href="https://github.com/anshubhawsar/Hamlab_controller" target="_blank" rel="noopener noreferrer" className="p-8 glass-panel group hover:-translate-y-2 transition-transform duration-300 cursor-pointer h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Hamlab Controller</h4>
                </div>
                <p className="text-slate-600 dark:text-rose-100/60 font-medium mb-4">Advanced hardware control system with embedded programming and real-time processing capabilities.</p>
                <p className="text-sm text-slate-500 dark:text-rose-200/50 mt-auto">Open-source project integrating modern control systems with intuitive interfaces for laboratory automation.</p>
              </a>

              <a href="https://github.com/anshubhawsar/Bitcoin-Sentiment-x-Hyperliquid-Performance-Intelligence" target="_blank" rel="noopener noreferrer" className="p-8 glass-panel group hover:-translate-y-2 transition-transform duration-300 cursor-pointer h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BarChart className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Bitcoin Sentiment Intelligence</h4>
                </div>
                <p className="text-slate-600 dark:text-rose-100/60 font-medium mb-4">AI-powered sentiment analysis platform combining market intelligence with blockchain data.</p>
                <p className="text-sm text-slate-500 dark:text-rose-200/50 mt-auto">Analyzes sentiment trends across Hyperliquid and Bitcoin markets for data-driven trading insights.</p>
              </a>

              <div className="p-8 glass-panel group hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Robotics Kinematics Solver</h4>
                </div>
                <p className="text-slate-600 dark:text-rose-100/60 font-medium mb-4">Computational engine for multi-axis robotic motion using Denavit-Hartenberg transformation matrices.</p>
                <p className="text-sm text-slate-500 dark:text-rose-200/50 mt-auto">Translates mechanical constraints into precise motion control algorithms for industrial automation.</p>
              </div>

              <a href="https://github.com/anshubhawsar/socialmedia_agent" target="_blank" rel="noopener noreferrer" className="p-8 glass-panel group hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BarChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Social Media AI Agent</h4>
                </div>
                <p className="text-slate-600 dark:text-rose-100/60 font-medium mb-4">Intelligent autonomous agent for social media interaction and content management.</p>
                <p className="text-sm text-slate-500 dark:text-rose-200/50 mt-auto">AI-powered automation for Twitter/X and other platforms with intelligent decision-making and engagement strategies.</p>
              </a>
            </div>
          </div>

          {/* Technical Toolkit */}
          <div id="skills" className="reveal">
            <h3 className="text-3xl md:text-4xl font-black mb-8 text-slate-900 dark:text-white text-center">Technical Skills</h3>
            <div className="max-w-4xl mx-auto p-8 glass-panel">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                    <Code className="w-5 h-5 text-pink-500" />
                    Languages
                  </h4>
                  <p className="text-slate-600 dark:text-rose-100/60 font-medium">C++, Python, JavaScript</p>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    AI/ML Technologies
                  </h4>
                  <p className="text-slate-600 dark:text-rose-100/60 font-medium">Reinforcement Learning, LLMs, Prompt Engineering, Agentic AI</p>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-fuchsia-500" />
                    Frameworks & Tools
                  </h4>
                  <p className="text-slate-600 dark:text-rose-100/60 font-medium">React, Node.js, Flask, Tkinter, SQLite, Git, Linux</p>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-orange-500" />
                    Specializations
                  </h4>
                  <p className="text-slate-600 dark:text-rose-100/60 font-medium">Data Structures, Algorithms, API Integration, Optimization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Grid */}
      <section id="features" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="reveal text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white">Developer <span className="text-gradient">Approach</span></h2>
            <p className="reveal delay-100 text-slate-600 dark:text-rose-100/60 text-xl max-w-2xl mx-auto font-medium">Building elegant, performant solutions with meticulous attention to code quality, user experience, and scalability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Performance", desc: "Optimized algorithms and efficient code for blazing-fast execution.", color: "text-rose-500 dark:text-rose-400", bg: "bg-rose-100 dark:bg-rose-900/20", border: "border-rose-200 dark:border-rose-800/30", delay: "delay-100" },
              { icon: Shield, title: "Security", desc: "Best practices and secure architectures for protecting data and systems.", color: "text-fuchsia-500 dark:text-fuchsia-400", bg: "bg-fuchsia-100 dark:bg-fuchsia-900/20", border: "border-fuchsia-200 dark:border-fuchsia-800/30", delay: "delay-200" },
              { icon: BarChart, title: "Data Science", desc: "Advanced analytics and ML models for intelligent solutions.", color: "text-pink-500 dark:text-pink-400", bg: "bg-pink-100 dark:bg-pink-900/20", border: "border-pink-200 dark:border-pink-800/30", delay: "delay-300" },
              { icon: Cloud, title: "Scalability", desc: "Architectures built to grow and handle increasing demands effortlessly.", color: "text-purple-500 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/20", border: "border-purple-200 dark:border-purple-800/30", delay: "delay-100" },
              { icon: Star, title: "Innovation", desc: "Exploring cutting-edge technologies and novel problem-solving approaches.", color: "text-orange-500 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-800/30", delay: "delay-200" }
            ].map((feature, idx) => (
              <div key={idx} className={`reveal ${feature.delay} group p-8 glass-panel hover:-translate-y-4 hover:bg-white dark:hover:bg-[#1A0D2E] transition-all duration-500 cursor-pointer overflow-hidden relative`}>
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-50 dark:bg-pink-900/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700"></div>
                <div className={`w-16 h-16 rounded-[1.5rem] ${feature.bg} border border-transparent dark:${feature.border} flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-rose-100/60 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}

            <div className="reveal delay-300 group p-8 rounded-[2rem] bg-gradient-to-br from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 dark:from-pink-900 dark:to-rose-950 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-lg shadow-pink-500/20 hover:-translate-y-4 hover:scale-[1.02] cursor-pointer border border-transparent dark:border-pink-700/30">
              <Sparkles className="w-12 h-12 text-white dark:text-pink-300 mb-4 animate-pulse" />
              <h3 className="text-3xl font-black mb-3 text-white">Let's Collaborate</h3>
              <p className="text-rose-100 dark:text-pink-200/70 mb-8 font-medium">Ready to work on your next project?</p>
              <button className="flex items-center gap-2 text-pink-600 dark:text-slate-950 font-black bg-white dark:bg-pink-400 px-8 py-3.5 rounded-full hover:scale-110 transition-transform shadow-lg">
                Get in Touch <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="reveal text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white">Get In <span className="text-gradient">Touch</span></h2>
            <p className="reveal delay-100 text-slate-600 dark:text-rose-100/60 text-xl max-w-2xl mx-auto font-medium">Ready to collaborate on the next groundbreaking project? Let's connect and build something extraordinary together.</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="reveal p-8 glass-panel text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Code className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Email</h3>
                <a href="mailto:vabhawsar@gmail.com" className="text-slate-600 dark:text-rose-100/60 font-medium hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  vabhawsar@gmail.com
                </a>
              </div>

              <div className="reveal delay-100 p-8 glass-panel text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-fuchsia-100 dark:bg-fuchsia-900/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-fuchsia-600 dark:text-fuchsia-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Phone</h3>
                <a href="tel:9399614149" className="text-slate-600 dark:text-rose-100/60 font-medium hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  +91 9399614149
                </a>
              </div>
            </div>

            <div className="reveal delay-200 mt-12 text-center">
              <p className="text-slate-500 dark:text-rose-200/50 font-medium">Based in India • Available for remote collaboration</p>
            </div>

            {/* Contact Form */}
            <div className="reveal delay-300 mt-16 max-w-2xl mx-auto">
              <div className="p-8 glass-panel">
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white text-center">Send a Message</h3>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 dark:text-rose-100/60 mb-2">Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1A0D2E] border border-rose-200 dark:border-pink-900/20 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 dark:text-rose-100/60 mb-2">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1A0D2E] border border-rose-200 dark:border-pink-900/20 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-rose-100/60 mb-2">Message</label>
                    <textarea 
                      rows="5" 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1A0D2E] border border-rose-200 dark:border-pink-900/20 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-200/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>
                  {submitStatus === 'success' && (
                    <div className="text-green-600 dark:text-green-400 text-center font-medium">
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="text-red-600 dark:text-red-400 text-center font-medium">
                      Failed to send message. Please try again or contact me directly.
                    </div>
                  )}
                  <div className="text-center">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold rounded-full hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. Footer */}
      <footer className="bg-rose-50/50 dark:bg-[#0A0510] pt-24 pb-12 relative overflow-hidden mt-20 border-t border-rose-200/30 dark:border-pink-900/20">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-96 bg-gradient-to-t from-pink-100/30 dark:from-pink-900/10 to-transparent -z-10 rounded-t-[100%]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-rose-200 dark:border-pink-900/20 pb-12 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 dark:bg-[#1A0D2E] rounded-full flex items-center justify-center border border-transparent dark:border-pink-800/30">
                 <Code className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <span className="text-2xl font-black text-slate-900 dark:text-white">Anshu.</span>
            </div>
            <div className="flex gap-4">
              {['About', 'Features', 'Expertise', 'Projects', 'Skills', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="bg-white dark:bg-[#1A0D2E] border border-rose-200 dark:border-pink-900/20 text-slate-600 dark:text-rose-200/60 px-6 py-2 rounded-full font-bold hover:bg-rose-50 dark:hover:bg-pink-900/40 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div className="text-center text-slate-400 dark:text-pink-200/30 font-medium flex flex-col items-center gap-2">
            <p>&copy; {new Date().getFullYear()} Anshu Bhawsar. All rights reserved.</p>
            <p className="text-sm flex items-center gap-1">Crafting elegant solutions <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
