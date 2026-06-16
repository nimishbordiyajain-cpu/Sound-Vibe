import { createContext, useState, useContext } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [duration, setDuration] = useState(210); // Mock 3:30
  const [volume, setVolume] = useState(0.8);
  const [playlists, setPlaylists] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [isQueueOpen, setIsQueueOpen] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const toggleQueue = () => setIsQueueOpen(!isQueueOpen);
  const toggleRepeat = () => setIsRepeat(!isRepeat);
  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (!isShuffle && queue.length > 0) {
      const shuffled = [...queue].sort(() => Math.random() - 0.5);
      setQueue(shuffled);
    }
  };

  const toggleLike = (track) => {
    setLikedSongs((prev) => {
      const isLiked = prev.some(t => t.id === track.id);
      if (isLiked) {
        return prev.filter(t => t.id !== track.id);
      } else {
        return [...prev, track];
      }
    });
  };

  const addTrackToPlaylist = (playlistId, track) => {
    setPlaylists((prevPlaylists) => 
      prevPlaylists.map(p => {
        if (p.id === playlistId) {
          if (!p.tracks.some(t => t.id === track.id)) {
            return { ...p, tracks: [...p.tracks, track] };
          }
        }
        return p;
      })
    );
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      setCurrentTrack(nextTrack);
      setQueue(queue.slice(1));
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrevious = () => {
    // restart track handled by BottomPlayer
  };

  const addToQueue = (track) => {
    setQueue([...queue, track]);
  };

  const shuffleQueue = () => {
    const shuffled = [...queue].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
  };

  const createPlaylist = (name, tracks = []) => {
    setPlaylists([...playlists, { id: Date.now(), name, tracks }]);
  };

  return (
    <PlayerContext.Provider value={{
      currentTrack, isPlaying, queue, duration, volume, playlists, likedSongs, isQueueOpen, isShuffle, isRepeat,
      playTrack, togglePlay, handleNext, handlePrevious, addToQueue, shuffleQueue,
      setVolume, createPlaylist, toggleLike, addTrackToPlaylist, toggleQueue, toggleShuffle, toggleRepeat
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
