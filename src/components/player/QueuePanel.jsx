import { usePlayer } from '../../context/PlayerContext';
import { GripVertical } from 'lucide-react';
import { useState } from 'react';

const QueuePanel = () => {
  const { queue, currentTrack } = usePlayer();

  if (queue.length === 0 && !currentTrack) return null;

  return (
    <div className="w-80 bg-[#121212] border-l border-white/10 flex flex-col shrink-0 h-full">
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="font-bold text-lg">Next in Queue</h2>
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
                <div key={idx} className="flex items-center space-x-3 p-2 hover:bg-white/10 rounded group cursor-grab">
                  <GripVertical className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100" />
                  <img src={track.cover} alt="cover" className="w-10 h-10 rounded" />
                  <div className="flex-1 min-w-0">
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
