import { usePlayer } from '../../context/PlayerContext';
import { GripVertical, X } from 'lucide-react';
import { useState } from 'react';

const QueuePanel = () => {
  const { queue, currentTrack, isQueueOpen, toggleQueue, reorderQueue } = usePlayer();
  const [draggedIdx, setDraggedIdx] = useState(null);

  if (!isQueueOpen || (queue.length === 0 && !currentTrack)) return null;

  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", index);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // necessary to allow dropping
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;
    reorderQueue(draggedIdx, index);
    setDraggedIdx(null);
  };

  return (
    <div className="w-80 bg-[#121212] border-l border-white/10 flex flex-col shrink-0 h-full">
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="font-bold text-lg">Next in Queue</h2>
        <button onClick={toggleQueue} className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentTrack && (
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase">Now Playing</h3>
            <div className="flex items-center space-x-3 group">
              <img src={currentTrack.cover} alt="cover" className="w-10 h-10 rounded" />
              <div className="flex-1 min-w-0">
                <p className="text-spotify-green text-sm font-semibold truncate">{currentTrack.title}</p>
                <p className="text-gray-400 text-xs truncate">{currentTrack.artist}</p>
              </div>
            </div>
          </div>
        )}

        {queue.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase">Next Up</h3>
            <div className="space-y-2">
              {queue.map((track, idx) => (
                <div 
                  key={`${track.id}-${idx}`} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, idx)}
                  onDragEnd={() => setDraggedIdx(null)}
                  className={`flex items-center space-x-3 p-2 rounded group cursor-grab active:cursor-grabbing transition-colors ${
                    draggedIdx === idx ? 'bg-white/20 opacity-50 scale-[0.98]' : 'hover:bg-white/10'
                  }`}
                >
                  <GripVertical className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img src={track.cover} alt="cover" className="w-10 h-10 rounded pointer-events-none" />
                  <div className="flex-1 min-w-0 pointer-events-none">
                    <p className="text-white text-sm font-semibold truncate">{track.title}</p>
                    <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueuePanel;
