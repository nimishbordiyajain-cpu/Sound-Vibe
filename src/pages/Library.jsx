import { useState } from 'react';
import { ListMusic, Heart, PlusSquare, Music } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { songs } from '../utils/dummyData';
import SongRow from '../components/library/SongRow';

const Library = () => {
  const { playlists, likedSongs, createPlaylist } = usePlayer();
  const [activeTab, setActiveTab] = useState('Playlists');

  const handleCreatePlaylist = () => {
    const name = window.prompt("Enter playlist name:");
    if (name && name.trim()) {
      createPlaylist(name.trim());
    }
  };

  return (
    <div className="p-6 md:p-10 min-h-full pb-32 relative">
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-indigo-900/40 to-spotify-base pointer-events-none -z-10" />
      
      <div className="relative z-10 pt-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-black text-white tracking-tight">Your Library</h1>
          <button 
            onClick={handleCreatePlaylist}
            className="flex items-center space-x-2 text-sm font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
          >
            <PlusSquare className="w-5 h-5" />
            <span>New Playlist</span>
          </button>
        </div>

        <div className="flex space-x-8 border-b border-white/10 mb-8">
          <button 
            onClick={() => setActiveTab('Playlists')}
            className={`pb-3 text-lg font-bold transition-all ${activeTab === 'Playlists' ? 'text-white border-b-2 border-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'text-gray-400 hover:text-white'}`}
          >
            Your Playlists
          </button>
          <button 
            onClick={() => setActiveTab('Tracks')}
            className={`pb-3 text-lg font-bold transition-all flex items-center ${activeTab === 'Tracks' ? 'text-white border-b-2 border-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'text-gray-400 hover:text-white'}`}
          >
            <Music className="w-5 h-5 mr-2" />
            Track List Builder
          </button>
        </div>

        {activeTab === 'Playlists' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {/* Liked Songs Card */}
            <Link to="/liked-songs">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-indigo-600 to-purple-800 p-6 rounded-xl aspect-square flex flex-col justify-end relative overflow-hidden group shadow-lg"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10 group-hover:text-white/20 transition-colors">
                  <Heart className="w-32 h-32 fill-current" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white mb-2">Liked Songs</h3>
                  <p className="text-gray-200 font-medium">{likedSongs.length} liked songs</p>
                </div>
              </motion.div>
            </Link>

            {/* User Playlists */}
            {playlists.map((playlist) => (
              <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#181818] hover:bg-[#282828] p-4 rounded-xl flex flex-col transition-colors shadow-lg border border-white/5"
                >
                  <div className="w-full aspect-square bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-lg flex items-center justify-center mb-4 shadow-md relative overflow-hidden group">
                    <ListMusic className="w-16 h-16 text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-white font-bold truncate">{playlist.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">Playlist • {playlist.tracks?.length || 0} songs</p>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-black/20 rounded-2xl p-6 border border-white/5 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Build Your Track List</h2>
              <p className="text-gray-400">Hover over any track and use the custom selection tools to quickly add songs to your Queue or Playlists.</p>
            </div>
            <div className="space-y-1">
              {songs.map((song, index) => (
                <SongRow key={song.id} track={song} index={index + 1} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
