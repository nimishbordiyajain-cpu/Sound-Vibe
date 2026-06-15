import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

import Landing from './pages/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Premium from './pages/Premium';
import Receipt from './pages/Receipt';
import LikedSongs from './pages/LikedSongs';
import PlaylistView from './pages/PlaylistView';
import Search from './pages/Search';
import Library from './pages/Library';

function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Router>
          <div className="h-screen w-screen bg-spotify-base text-spotify-white flex flex-col font-sans overflow-hidden">
            <Toaster position="top-center" toastOptions={{
              style: {
                background: '#242424',
                color: '#fff',
              },
            }} />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/receipt" element={<ProtectedRoute><Receipt /></ProtectedRoute>} />
              
              {/* Protected Routes with MainLayout */}
              <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/liked-songs" element={<LikedSongs />} />
                <Route path="/playlist/:id" element={<PlaylistView />} />
                <Route path="/premium" element={<Premium />} />
              </Route>
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;
