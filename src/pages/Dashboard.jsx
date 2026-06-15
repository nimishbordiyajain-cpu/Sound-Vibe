import { Clock, Play, Sparkles } from 'lucide-react';
import { songs } from '../utils/dummyData';
import SongRow from '../components/library/SongRow';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const { currentTrack, isPlaying, togglePlay, playTrack, addToQueue, likedSongs, toggleLike, playlists, addTrackToPlaylist } = usePlayer();
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('Good evening');

  useEffect(() => {
    // Get hour strictly in India timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      hour12: false
    });
    const hourStr = formatter.format(new Date());
    const hour = parseInt(hourStr, 10);

    // 5 AM to 11:59 AM is Morning
    // 12 PM to 5:59 PM is Afternoon
    // 6 PM to 4:59 AM is Evening
    if (hour >= 5 && hour < 12) setGreeting('Good morning');
    else if (hour >= 12 && hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="p-6 md:p-10 min-h-full pb-32 relative">
      {/* Dynamic Top Gradient */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-900/60 via-purple-900/20 to-spotify-base pointer-events-none -z-10" />
      
      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-lg flex items-center flex-wrap gap-4">
            <span>{greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-spotify-green to-indigo-400">{user?.name || 'Guest'}</span></span>
            {user?.isPremium && (
              <span className="text-sm md:text-base font-black bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-md uppercase tracking-widest shadow-[0_0_15px_rgba(139,92,246,0.5)]">PRO</span>
            )}
          </h1>
          <div className="hidden md:flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-spotify-green" />
            <span className="text-xs font-bold text-gray-300">Premium Audio Active</span>
          </div>
        </motion.div>
        
        {/* Quick Picks - Glassmorphism Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16">
          {songs.slice(0, 6).map((track, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={track.id} 
              onClick={() => playTrack(track)}
              className="flex items-center glass-panel glass-panel-hover rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 relative"
            >
              <div className="relative w-20 h-20 shrink-0 overflow-hidden">
                <img 
                  src={track.cover} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt="cover" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <span className="font-bold px-4 truncate text-white/90 group-hover:text-white">{track.title}</span>
              <div className="ml-auto mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <div className="w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(139,92,246,0.6)] hover:scale-105 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Seamless Album Browser */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold hover:underline cursor-pointer">Your Music</h2>
          </div>
          
          {/* Table Header */}
          <div className="flex items-center justify-between px-4 py-3 text-sm font-bold text-gray-400 border-b border-white/10 mb-4 sticky top-0 bg-spotify-base/90 backdrop-blur-xl z-20 shadow-sm rounded-t-lg">
            <div className="w-2/5 flex items-center space-x-6">
              <span className="w-6 text-center">#</span>
              <span>Title</span>
            </div>
            <div className="w-1/3 hidden md:block">Album</div>
            <div className="w-1/4 flex justify-end pr-8">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          {/* Virtualized/Seamless List */}
          <div className="space-y-1">
            {songs.map((track, index) => (
              <SongRow 
                key={track.id} 
                track={track} 
                index={index} 
                isCurrent={currentTrack?.id === track.id}
                isPlaying={isPlaying}
                isLiked={likedSongs?.some(t => t.id === track.id)}
                playTrack={playTrack}
                togglePlay={togglePlay}
                addToQueue={addToQueue}
                toggleLike={toggleLike}
                playlists={playlists}
                addTrackToPlaylist={addTrackToPlaylist}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
