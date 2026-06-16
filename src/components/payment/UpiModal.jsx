import { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-sm bg-[#181818] rounded-3xl p-6 border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.3)] overflow-hidden"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-6 mt-2">
            <h3 className="text-2xl font-black text-white mb-2">Pay via UPI</h3>
            <p className="text-gray-400 text-sm">Scan using PhonePe, GPay, or Paytm</p>
          </div>

          <div className="bg-white p-4 rounded-2xl w-56 h-56 mx-auto mb-6 flex items-center justify-center relative shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            {status === 'success' ? (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-spotify-green"
              >
                <CheckCircle2 className="w-24 h-24" />
              </motion.div>
            ) : (
              <img src={qrUrl} alt="UPI QR Code" className="w-full h-full object-contain" />
            )}
          </div>

          <div className="text-center mb-6">
            <div className="text-3xl font-black text-white mb-1">₹{plan.price}</div>
            <div className="text-purple-400 font-bold text-sm tracking-widest uppercase">{plan.name} Plan</div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-center space-x-3">
            {status === 'waiting' ? (
              <>
                <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                <span className="text-gray-300 font-medium text-sm">Waiting for confirmation...</span>
              </>
            ) : (
              <span className="text-spotify-green font-bold">Payment Verified!</span>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UpiModal;
