import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Music, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      register(name, email, password);
      toast.success('Account created successfully!');
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-spotify-base via-[#1a1a1a] to-spotify-base p-4">
      <div className="w-full max-w-md bg-spotify-elevated p-8 rounded-2xl shadow-2xl border border-white/5">
        <div className="flex flex-col items-center mb-8">
          <img src="/logo.png" alt="Sound-Vibe Logo" className="w-24 h-24 mb-4 object-contain drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]" />
          <h2 className="text-3xl font-bold text-white">Sign up to start listening</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">What should we call you?</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-spotify-base border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">What's your email?</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-spotify-base border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Create a password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-spotify-base border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-full transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:text-purple-400 hover:underline font-medium transition-colors">
            Log in here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
