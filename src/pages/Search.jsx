import { useState } from 'react';
import { Search as SearchIcon, Clock } from 'lucide-react';
import { songs } from '../utils/dummyData';
import SongRow from '../components/library/SongRow';
import { usePlayer } from '../context/PlayerContext';
import { motion } from 'framer-motion';

const Search = () => {
  const { currentTrack, isPlaying, togglePlay, playTrack, addToQueue, likedSongs, toggleLike, playlists, addTrackToPlaylist } = usePlayer();
  const [query, setQuery] = useState('');

  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(query.toLowerCase()) || 
    song.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 min-h-full pb-32 relative">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-zinc-800 to-spotify-base pointer-events-none -z-10" />
      
      <div className="relative z-10">
        <div className="mb-10 pt-4">
          <div className="relative w-full max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="What do you want to listen to?"
              className="w-full bg-white/10 border border-white/20 text-white rounded-full py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all font-semibold text-lg placeholder-gray-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {query && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-6 text-white">Top Results</h2>
            {filteredSongs.length > 0 ? (
              <>
                <div className="flex items-center justify-between px-4 py-3 text-sm font-bold text-gray-400 border-b border-white/10 mb-4">
                  <div className="w-2/5 flex items-center space-x-6">
                    <span className="w-6 text-center">#</span>
                    <span>Title</span>
                  </div>
                  <div className="w-1/3 hidden md:block">Album</div>
                  <div className="w-1/4 flex justify-end pr-8">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  {filteredSongs.map((track, index) => (
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
              </>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-bold text-white mb-2">No results found for "{query}"</h3>
                <p className="text-gray-400">Please make sure your words are spelled correctly or use less or different keywords.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Search;
