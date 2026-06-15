import { useParams } from 'react-router-dom';
import { Clock, ListMusic } from 'lucide-react';
import SongRow from '../components/library/SongRow';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const PlaylistView = () => {
  const { id } = useParams();
  const { currentTrack, isPlaying, togglePlay, playTrack, addToQueue, likedSongs, toggleLike, playlists, addTrackToPlaylist } = usePlayer();
  const { user } = useAuth();
  
  const playlist = playlists.find(p => p.id.toString() === id);

  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Playlist not found
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 min-h-full pb-32 relative">
      {/* Dynamic Top Gradient */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-800/40 via-zinc-900/20 to-spotify-base pointer-events-none -z-10" />
      
      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end space-x-0 md:space-x-6 mb-10 pt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-48 h-48 md:w-60 md:h-60 bg-gradient-to-br from-purple-600 to-indigo-600 shadow-[0_0_40px_rgba(139,92,246,0.3)] flex items-center justify-center mb-6 md:mb-0 shrink-0 rounded-2xl"
          >
            <ListMusic className="w-20 h-20 text-white" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col pb-2"
          >
            <span className="text-sm font-bold uppercase tracking-wider text-white mb-2">Playlist</span>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 truncate max-w-2xl">{playlist.name}</h1>
            <div className="flex items-center text-sm text-gray-300 font-medium">
              <div className="w-6 h-6 bg-spotify-green rounded-full flex items-center justify-center text-white font-bold mr-2 text-xs">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="font-bold text-white mr-2 hover:underline cursor-pointer">{user?.name || 'User'}</span>
              <span>• {playlist.tracks?.length || 0} songs</span>
            </div>
          </motion.div>
        </div>

        {!playlist.tracks || playlist.tracks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-t border-white/10 mt-8">
            <ListMusic className="w-16 h-16 text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Let's find something for your playlist</h2>
            <p className="text-gray-400">Go to your Dashboard and use the List+ icon to add songs here.</p>
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
              {playlist.tracks.map((track, index) => (
                <SongRow 
                  key={track.id + index} 
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
        )}
      </div>
    </div>
  );
};

export default PlaylistView;
