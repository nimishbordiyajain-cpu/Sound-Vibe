import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, PlusSquare, Heart, Crown, LogOut, Headphones } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlayer } from '../../context/PlayerContext';
import { motion } from 'framer-motion';
import FocusTimer from './FocusTimer';

const Sidebar = () => {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();
  const { playlists, createPlaylist } = usePlayer();

  const handleCreatePlaylist = () => {
    const name = window.prompt("Enter playlist name:");
    if (name && name.trim()) {
      createPlaylist(name.trim());
    }
  };

  const navLinks = [
    { name: 'Home', path: '/dashboard', icon: <Home className="w-6 h-6" /> },
    { name: 'Search', path: '/search', icon: <Search className="w-6 h-6" /> },
    { name: 'Your Library', path: '/library', icon: <Library className="w-6 h-6" /> },
  ];

  return (
    <div className="w-64 bg-black/40 backdrop-blur-3xl border-r border-white/5 flex flex-col h-full shrink-0 z-20 shadow-2xl relative">
      {/* Ambient glowing orb in sidebar */}
      <div className="absolute top-0 left-0 w-full h-40 bg-purple-600/20 blur-[80px] pointer-events-none" />
      
      <div className="p-6 pb-2 relative z-10">
        <Link to="/dashboard" className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform">
            <img src="/logo.png" alt="Sound-Vibe Logo" className="w-full h-full object-cover" />
          </div>
          <span>Sound-Vibe</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 mt-6 overflow-y-auto">
        <ul className="space-y-4">
          {navLinks.map((link) => (
            <motion.li key={link.name} whileHover={{ x: 5 }}>
              <Link 
                to={link.path} 
                className={`flex items-center space-x-4 font-bold transition-all duration-300 ${
                  pathname === link.path ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="mt-10">
          <ul className="space-y-4">
            <li>
              <button 
                onClick={handleCreatePlaylist}
                className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors font-bold w-full text-left"
              >
                <div className="bg-gray-300 text-black p-1 rounded-sm"><PlusSquare className="w-5 h-5" /></div>
                <span>Create Playlist</span>
              </button>
            </li>
            <li>
              <Link to="/liked-songs" className="flex items-center space-x-4 text-gray-400 hover:text-white transition-colors font-bold w-full text-left">
                <div className="bg-gradient-to-br from-indigo-500 to-blue-300 text-white p-1 rounded-sm"><Heart className="w-5 h-5" /></div>
                <span>Liked Songs</span>
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Playlists Divider */}
        <hr className="border-white/10 my-4" />
        
        {/* Personal Playlist Hub link */}
        {playlists.map((playlist) => (
          <Link to={`/playlist/${playlist.id}`} key={playlist.id} className="block text-gray-400 hover:text-white transition-colors text-sm py-2 font-semibold">
            {playlist.name}
          </Link>
        ))}
      </nav>

      {/* Focus Timer Widget */}
      <FocusTimer />

      {/* User Section */}
      <div className="p-4 border-t border-white/10 mt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center font-bold text-white">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm text-white drop-shadow-md">{user?.name}</span>
              {user?.isPremium && (
                <span className="text-[10px] font-black bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-1.5 py-0.5 rounded uppercase tracking-wider shadow-[0_0_10px_rgba(168,85,247,0.5)] animate-pulse">PRO</span>
              )}
            </div>
          </div>
          <button onClick={logout} className="text-gray-400 hover:text-white" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
        {!user?.isPremium && (
          <Link to="/premium" className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full text-white font-bold text-xs flex items-center justify-center hover:scale-105 transition-transform">
            <Crown className="w-4 h-4 mr-1" /> Upgrade to Premium
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
