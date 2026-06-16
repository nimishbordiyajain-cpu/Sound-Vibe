import { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import toast from 'react-hot-toast';

const FocusTimer = () => {
  const [durationMins, setDurationMins] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const { isPlaying, togglePlay } = usePlayer();

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      toast.success("Focus session complete! Take a break.", { icon: "🎉" });
      
      // Auto-pause the music when focus time is up
      if (isPlaying) {
        togglePlay();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isPlaying, togglePlay]);

  const toggleTimer = () => {
    if (timeLeft === 0) setTimeLeft(durationMins * 60);
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(durationMins * 60);
  };

  const changeDuration = (mins) => {
    setDurationMins(mins);
    setTimeLeft(mins * 60);
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-black/20 rounded-xl p-4 border border-white/5 mx-4 mt-6">
      <div className="flex items-center space-x-2 text-gray-400 mb-3">
        <Timer className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-wider">Focus Mode</span>
      </div>

      <div className="flex justify-between items-center mb-3">
        {[15, 25, 45, 60].map(mins => (
          <button 
            key={mins}
            onClick={() => changeDuration(mins)}
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all ${durationMins === mins ? 'bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            {mins}m
          </button>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className={`text-2xl font-black font-mono tracking-widest transition-colors ${isActive ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] animate-pulse' : 'text-white'}`}>
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={toggleTimer}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            title={isActive ? "Pause Timer" : "Start Focus Session"}
          >
            {isActive ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
          </button>
          <button 
            onClick={resetTimer}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        </div>
      </div>
      
      <div className="mt-3 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(168,85,247,0.5)]"
          style={{ width: `${((durationMins * 60 - timeLeft) / (durationMins * 60)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default FocusTimer;
