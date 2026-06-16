import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, ListMusic } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

const BottomPlayer = () => {
  const { currentTrack, isPlaying, togglePlay, handleNext, handlePrevious, volume, setVolume, isQueueOpen, toggleQueue, isShuffle, isRepeat, toggleShuffle, toggleRepeat, playbackRate, setPlaybackRate } = usePlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  
  // Dragging states
  const timelineRef = useRef(null);
  const volumeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const [isVolumeDragging, setIsVolumeDragging] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && currentTrack) {
        audioRef.current.play().catch(e => console.log("Playback interrupted"));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current && !isDragging) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const calculateTimeFromEvent = (e) => {
    if (!timelineRef.current || !duration) return 0;
    const rect = timelineRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    return percent * duration;
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    const time = calculateTimeFromEvent(e);
    setDragProgress((time / duration) * 100);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      const time = calculateTimeFromEvent(e);
      setDragProgress((time / duration) * 100);
    }
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
      const newTime = calculateTimeFromEvent(e);
      if (audioRef.current) {
        audioRef.current.currentTime = newTime;
      }
      setCurrentTime(newTime);
    }
  };

  const handleVolumePointerDown = (e) => {
    setIsVolumeDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    if (!volumeRef.current) return;
    const rect = volumeRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setVolume(percent);
  };

  const handleVolumePointerMove = (e) => {
    if (isVolumeDragging && volumeRef.current) {
      const rect = volumeRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      setVolume(percent);
    }
  };

  const handleVolumePointerUp = (e) => {
    if (isVolumeDragging) {
      setIsVolumeDragging(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const displayProgress = isDragging ? dragProgress : progress;
  const displayTime = isDragging ? (dragProgress / 100) * duration : currentTime;

  const onPrevious = () => {
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      handlePrevious();
    }
  };

  const handleSpeedToggle = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackRate(speeds[nextIndex]);
  };

  return (
    <div className="h-20 glass-panel rounded-2xl px-6 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10 hover:border-white/20 transition-colors">
      <audio 
        ref={audioRef} 
        src={currentTrack?.url} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          if (isRepeat && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else {
            handleNext();
          }
        }}
      />
      {/* Track Info */}
      <div className="flex items-center w-1/3">
        {currentTrack ? (
          <>
            <img src={currentTrack.cover} alt="Cover" className="w-12 h-12 rounded-lg mr-4 shadow-md" />
            <div>
              <h4 className="text-white text-sm font-bold hover:text-purple-400 transition-colors cursor-pointer">{currentTrack.title}</h4>
              <p className="text-xs text-gray-400 hover:text-white transition-colors cursor-pointer mt-0.5">{currentTrack.artist}</p>
            </div>
          </>
        ) : (
          <div className="text-xs text-gray-400">Select a track to play</div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-1/3 max-w-2xl">
        <div className="flex items-center space-x-6 mb-2">
          <button 
            onClick={toggleShuffle}
            className={`transition-all ${isShuffle ? 'text-spotify-green hover:text-green-400 drop-shadow-[0_0_8px_rgba(30,215,96,0.6)]' : 'text-gray-400 hover:text-white'}`}
            title="Shuffle"
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button onClick={onPrevious} className="text-gray-400 hover:text-white transition-colors">
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-1" />}
          </button>
          <button onClick={handleNext} className="text-gray-400 hover:text-white transition-colors">
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
          <button 
            onClick={toggleRepeat}
            className={`transition-all ${isRepeat ? 'text-spotify-green hover:text-green-400 drop-shadow-[0_0_8px_rgba(30,215,96,0.6)]' : 'text-gray-400 hover:text-white'}`}
            title="Repeat"
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>
        
        {/* Timeline */}
        <div className="flex items-center w-full space-x-2">
          <span className="text-xs text-gray-400 min-w-[35px] text-right">{formatTime(displayTime)}</span>
          <div 
            ref={timelineRef}
            className="h-1 bg-gray-600 rounded-full w-full relative group cursor-pointer"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div 
              className="h-full bg-white group-hover:bg-spotify-green rounded-full relative pointer-events-none" 
              style={{ width: `${displayProgress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow pointer-events-none" />
            </div>
          </div>
          <span className="text-xs text-gray-400 min-w-[35px]">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Extra Controls */}
      <div className="flex items-center justify-end w-1/3 space-x-4 pr-2">
        <button 
          onClick={handleSpeedToggle}
          className={`transition-colors text-[10px] font-black px-2 py-0.5 rounded border ${playbackRate !== 1 ? 'text-spotify-green border-spotify-green drop-shadow-[0_0_5px_rgba(30,215,96,0.5)]' : 'text-gray-400 border-gray-600 hover:text-white hover:border-gray-400'}`}
          title="Playback Speed (DJ Mode)"
        >
          {playbackRate}x
        </button>
        <button 
          onClick={toggleQueue} 
          className={`transition-colors ${isQueueOpen ? 'text-spotify-green hover:text-green-400' : 'text-gray-400 hover:text-white'}`}
          title="Toggle Queue"
        >
          <ListMusic className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <Volume2 className="w-5 h-5 text-gray-400" />
          <div 
            ref={volumeRef}
            className="w-24 h-1 bg-gray-600 rounded-full group cursor-pointer relative py-2 -my-2 flex items-center"
            onPointerDown={handleVolumePointerDown}
            onPointerMove={handleVolumePointerMove}
            onPointerUp={handleVolumePointerUp}
            onPointerCancel={handleVolumePointerUp}
          >
            <div className="w-full h-1 bg-gray-600 rounded-full relative">
              <div 
                className="h-full bg-white group-hover:bg-spotify-green rounded-full pointer-events-none" 
                style={{ width: `${volume * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomPlayer;
