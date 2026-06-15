import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomPlayer from '../player/BottomPlayer';
import QueuePanel from '../player/QueuePanel';

const MainLayout = () => {
  return (
    <div 
      className="flex h-screen overflow-hidden bg-[#050505] text-white w-screen animate-ambient" 
      style={{ backgroundImage: "radial-gradient(circle at top left, rgba(107, 33, 168, 0.15), transparent 40%), radial-gradient(circle at bottom right, rgba(79, 70, 229, 0.15), transparent 40%)" }}
    >
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative pb-32">
        <Outlet />
      </main>
      <QueuePanel />
      
      {/* Floating Bottom Player Container */}
      <div className="fixed bottom-6 left-[17rem] right-6 z-50 flex justify-center pointer-events-none">
        <div className="w-full max-w-5xl pointer-events-auto">
          <BottomPlayer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
