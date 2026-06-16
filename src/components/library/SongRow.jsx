import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Plus, Heart, ListPlus } from 'lucide-react';

const SongRow = React.memo(({ track, index, isCurrent, isPlaying, isLiked, playTrack, togglePlay, addToQueue, toggleLike, playlists, addTrackToPlaylist }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handlePlayClick = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl glass-panel-hover border border-transparent group transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-purple-500/10 relative">
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
      </div>
      <div className="flex items-center space-x-4 w-2/5 relative z-10" onClick={handlePlayClick}>
        <div className="w-6 text-right text-gray-400 group-hover:hidden">
          {isCurrent && isPlaying ? (
            <div className="flex items-end justify-center space-x-1 h-4">
              <div className="w-1 bg-spotify-green h-full animate-pulse"></div>
              <div className="w-1 bg-spotify-green h-2/3 animate-pulse delay-75"></div>
              <div className="w-1 bg-spotify-green h-full animate-pulse delay-150"></div>
            </div>
          ) : (
            <span className={isCurrent ? 'text-spotify-green' : ''}>{index + 1}</span>
          )}
        </div>
        <div className="w-6 hidden group-hover:flex justify-end">
          {isCurrent && isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white fill-current" />}
        </div>
        
        <img src={track.cover} alt="cover" className="w-10 h-10 rounded" />
        <div className="min-w-0 flex-1">
          <p className={`font-semibold truncate ${isCurrent ? 'text-spotify-green' : 'text-white'}`}>{track.title}</p>
          <p className="text-gray-400 text-sm truncate hover:underline">{track.artist}</p>
        </div>
      </div>

      <div className="w-1/3 text-sm text-gray-400 truncate hidden md:block hover:underline" onClick={handlePlayClick}>
        {track.album}
      </div>

      <div className="w-1/4 flex items-center justify-end space-x-6 text-sm text-gray-400">
        <button 
          onClick={(e) => { e.stopPropagation(); toggleLike(track); }}
          className={`hover:text-white transition-opacity ${isLiked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          title={isLiked ? "Remove from Liked Songs" : "Save to Liked Songs"}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-spotify-green text-spotify-green' : 'text-gray-400'}`} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); addToQueue(track); }}
          className="opacity-0 group-hover:opacity-100 hover:text-white transition-opacity"
          title="Add to Queue"
        >
          <Plus className="w-5 h-5" />
        </button>
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); }}
            className="opacity-0 group-hover:opacity-100 hover:text-white transition-opacity"
            title="Add to Playlist"
          >
            <ListPlus className="w-5 h-5" />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-[#282828] rounded-md shadow-xl z-50 border border-white/10 overflow-hidden">
              <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-white/10">Add to Playlist</div>
              {playlists?.length > 0 ? (
                <div className="max-h-48 overflow-y-auto">
                  {playlists.map(p => (
                    <div 
                      key={p.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        if(addTrackToPlaylist) addTrackToPlaylist(p.id, track);
                        setShowDropdown(false);
                      }}
                      className="px-4 py-2 text-sm text-gray-200 hover:bg-white/10 cursor-pointer truncate"
                    >
                      {p.name}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">No playlists found</div>
              )}
            </div>
          )}
        </div>
        <span className="w-12">{track.duration}</span>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Timeline Update Shield: only re-render if the track changes play state, liked state, or playlists array
  return prevProps.isCurrent === nextProps.isCurrent && 
         prevProps.isLiked === nextProps.isLiked &&
         prevProps.playlists === nextProps.playlists &&
         (prevProps.isCurrent ? prevProps.isPlaying === nextProps.isPlaying : true);
});

SongRow.displayName = 'SongRow';

export default SongRow;
