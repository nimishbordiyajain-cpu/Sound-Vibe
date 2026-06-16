import { Link } from 'react-router-dom';
import { Music, PlayCircle, ShieldCheck, Zap, Headphones, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <div className="min-h-screen bg-spotify-base overflow-hidden relative selection:bg-spotify-green selection:text-black">
      {/* Dynamic Background Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-spotify-green/20 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none animate-pulse duration-[10000ms]" />
      
      {/* Navbar - Glassmorphism */}
      <nav className="fixed w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all transform group-hover:rotate-6 overflow-hidden">
              <img src="/logo.png" alt="Sound-Vibe Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-3xl font-black text-white tracking-tighter bg-clip-text bg-gradient-to-r from-white to-gray-400">Sound-Vibe</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-x-6 flex items-center"
          >
            <Link to="/register" className="text-gray-300 hover:text-white font-medium transition-colors text-lg">Sign up</Link>
            <Link to="/login" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 hover:bg-gray-200 transition-all shadow-[0_4px_14px_0_rgba(255,255,255,0.2)]">
              Log in
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center relative z-10 min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 text-left"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-sm font-semibold mb-8 backdrop-blur-md">
            <Star className="w-4 h-4 mr-2 fill-current" /> Premium Audio Experience
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tighter">
            Feel the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-400">music.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-xl font-light leading-relaxed">
            Immerse yourself in millions of songs and podcasts. High-fidelity audio with a seamless, lag-free premium interface.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register" className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-10 py-5 rounded-full font-extrabold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(139,92,246,0.6)] flex items-center justify-center">
              Get Sound-Vibe Free <ChevronRight className="w-6 h-6 ml-2" />
            </Link>
            <Link to="/premium" className="bg-[#242424] text-white border border-white/10 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center">
              View Premium Plans
            </Link>
          </div>
          
          <div className="mt-12 flex items-center space-x-8 text-sm text-gray-500 font-medium">
            <div className="flex items-center"><Headphones className="w-5 h-5 mr-2 text-gray-400" /> High Quality Audio</div>
            <div className="flex items-center"><Zap className="w-5 h-5 mr-2 text-gray-400" /> AI DJ Assistant</div>
          </div>
        </motion.div>
        
        {/* Floating Abstract UI Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="lg:w-1/2 mt-20 lg:mt-0 relative perspective-1000"
        >
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Glassmorphic card back */}
            <div className="absolute inset-4 bg-gradient-to-tr from-[#1a1a1a] to-[#2a2a2a] rounded-3xl transform rotate-6 border border-white/5 shadow-2xl"></div>
            {/* Glassmorphic card front */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-spotify-green/20 rounded-full blur-[80px] -mr-10 -mt-10"></div>
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                  <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
                </div>
                <div className="px-4 py-1 bg-white/10 rounded-full text-xs font-bold text-purple-400 border border-white/10">Now Playing</div>
              </div>
              
              <div className="relative z-10">
                <div className="w-full h-48 rounded-xl bg-[url('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=600&h=400')] bg-cover bg-center mb-6 shadow-2xl"></div>
                <h3 className="text-3xl font-bold text-white mb-2">Midnight City</h3>
                <p className="text-gray-400 text-lg">M83 • Hurry Up, We're Dreaming</p>
                
                <div className="mt-8 relative">
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ duration: 2, delay: 1 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-32 bg-[#0a0a0a] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">Why Sound-Vibe?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">The best music experience built with cutting-edge technology for an unmatched auditory journey.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<PlayCircle className="w-12 h-12 text-purple-500" />}
              title="Seamless Playback"
              description="A persistent bottom player ensures your music never stops, even when you navigate to other pages."
              delay={0.1}
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-12 h-12 text-indigo-400" />}
              title="Timeline Shield"
              description="Advanced performance optimizations keep the app running flawlessly without battery drain."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Zap className="w-12 h-12 text-purple-400" />}
              title="AI Smart DJ"
              description="Our built-in AI assistant helps you discover new tracks and curates the perfect vibe instantly."
              delay={0.3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -10, transition: { duration: 0.2 } }}
    className="flex flex-col items-start p-10 bg-gradient-to-b from-[#1a1a1a] to-[#121212] rounded-3xl border border-white/5 hover:border-white/20 transition-all group shadow-xl"
  >
    <div className="w-20 h-20 bg-[#242424] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
  </motion.div>
);

export default Landing;
