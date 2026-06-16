import { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2, Copy, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const UpiModal = ({ isOpen, onClose, plan, onSuccess }) => {
  const [status, setStatus] = useState('waiting'); // waiting, success

  useEffect(() => {
    let timer1, timer2;
    if (isOpen) {
      setStatus('waiting');
      // Simulate waiting for user to scan and pay
      timer1 = setTimeout(() => {
        setStatus('success');
        // Wait 1.5 seconds before redirecting
        timer2 = setTimeout(() => {
          onSuccess();
        }, 1500);
      }, 5000); // 5 seconds simulation
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isOpen, onSuccess]);

  if (!isOpen || !plan) return null;

  // Generate real UPI URI QR Code
  const upiId = 'soundvibe@upi';
  const name = 'SoundVibe Premium';
  const amount = plan.price;
  const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUri)}`;

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    toast.success('UPI ID Copied!');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-[400px] bg-gradient-to-b from-[#1e1e1e] to-[#121212] rounded-3xl p-8 border border-white/10 shadow-[0_0_80px_rgba(139,92,246,0.3)] overflow-hidden"
        >
          {/* Decorative Background Glows */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-500/20 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-500/20 rounded-full blur-[60px] pointer-events-none" />

          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8 relative z-10">
            <div className="flex justify-center mb-3">
              <div className="bg-purple-500/20 p-3 rounded-2xl border border-purple-500/30 text-purple-400">
                <Smartphone className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">Pay via UPI</h3>
            <p className="text-gray-400 text-sm">Scan with PhonePe, GPay, or Paytm</p>
          </div>

          <div className="relative mx-auto mb-8 w-60 h-60 rounded-3xl p-1 bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500">
            <div className="bg-white w-full h-full rounded-[22px] p-4 flex items-center justify-center relative overflow-hidden">
              {status === 'success' ? (
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="text-spotify-green drop-shadow-[0_0_20px_rgba(30,215,96,0.6)]"
                >
                  <CheckCircle2 className="w-28 h-28" />
                </motion.div>
              ) : (
                <>
                  <img src={qrUrl} alt="UPI QR Code" className="w-full h-full object-contain relative z-10" />
                  {/* Scanning Laser Animation */}
                  <motion.div 
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                    className="absolute left-0 w-full h-1 bg-spotify-green shadow-[0_0_15px_rgba(30,215,96,1)] z-20"
                  />
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between bg-black/40 rounded-2xl p-4 border border-white/5 mb-6 relative z-10">
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Paying</div>
              <div className="text-white font-mono">{upiId}</div>
            </div>
            <button 
              onClick={copyUpiId}
              className="text-purple-400 hover:text-purple-300 p-2 bg-purple-500/10 hover:bg-purple-500/20 rounded-xl transition-colors"
              title="Copy UPI ID"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center mb-6 relative z-10">
            <div className="text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] mb-1">₹{plan.price}</div>
            <div className="text-purple-400 font-bold text-sm tracking-widest uppercase">{plan.name} Plan</div>
          </div>

          <div className={`rounded-2xl p-4 border flex items-center justify-center space-x-3 transition-colors duration-500 relative z-10 ${status === 'waiting' ? 'bg-white/5 border-white/10' : 'bg-spotify-green/10 border-spotify-green/30'}`}>
            {status === 'waiting' ? (
              <>
                <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                <span className="text-gray-300 font-medium text-sm">Awaiting your payment...</span>
              </>
            ) : (
              <span className="text-spotify-green font-black tracking-wide text-lg drop-shadow-[0_0_8px_rgba(30,215,96,0.5)]">Payment Verified!</span>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UpiModal;
