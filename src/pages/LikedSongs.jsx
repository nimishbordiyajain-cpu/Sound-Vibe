import { Clock, Heart } from 'lucide-react';
import SongRow from '../components/library/SongRow';
import { usePlayer } from '../context/PlayerContext';
import { motion } from 'framer-motion';

const LikedSongs = () => {
  const { currentTrack, isPlaying, togglePlay, playTrack, addToQueue, likedSongs, toggleLike, playlists, addTrackToPlaylist } = usePlayer();

  return (
    <div className="p-6 md:p-10 min-h-full pb-32 relative">
      {/* Dynamic Top Gradient */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-600/40 via-[#121212]/20 to-spotify-base pointer-events-none -z-10" />
      
      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end space-x-0 md:space-x-6 mb-10 pt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-48 h-48 md:w-60 md:h-60 bg-gradient-to-br from-indigo-500 to-blue-300 shadow-[0_0_40px_rgba(79,70,229,0.4)] flex items-center justify-center mb-6 md:mb-0 shrink-0 rounded-2xl"
          >
            <Heart className="w-20 h-20 text-white fill-current" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col pb-2"
          >
            <span className="text-sm font-bold uppercase tracking-wider text-white mb-2">Playlist</span>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6">Liked Songs</h1>
            <div className="flex items-center text-sm text-gray-300 font-medium">
              <div className="w-6 h-6 bg-spotify-green rounded-full flex items-center justify-center text-white font-bold mr-2 text-xs">AX</div>
              <span className="font-bold text-white mr-2 hover:underline cursor-pointer">AudioX User</span>
              <span>• {likedSongs?.length || 0} songs</span>
            </div>
          </motion.div>
        </div>

        {!likedSongs || likedSongs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-t border-white/10 mt-8">
            <Heart className="w-16 h-16 text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Songs you like will appear here</h2>
            <p className="text-gray-400">Save songs by tapping the heart icon.</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
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

            {/* List */}
            <div className="space-y-1">
              {likedSongs.map((track, index) => (
                <SongRow 
                  key={track.id} 
                  track={track} 
                  index={index} 
                  isCurrent={currentTrack?.id === track.id}
                  isPlaying={isPlaying}
                  isLiked={true}
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
        )}
      </div>
    </div>
  );
};

export default LikedSongs;
