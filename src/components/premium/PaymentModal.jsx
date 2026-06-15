import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CreditCard, Wallet, Building2, Smartphone, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const PaymentModal = ({ isOpen, onClose, plan }) => {
  const [method, setMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const { upgradeToPremium } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate Razorpay payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      upgradeToPremium();
      toast.success('Payment Successful!');
      onClose();
      navigate('/receipt', { state: { plan, method, date: new Date().toISOString() } });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white text-black w-full max-w-md rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#02040a] p-4 flex justify-between items-center text-white border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-bold text-xs">R</div>
            <span className="font-semibold">Razorpay Test</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount */}
        <div className="bg-[#02040a] p-6 text-center border-b border-white/10 text-white">
          <p className="text-gray-400 text-sm mb-1">Paying SoundVibe</p>
          <h2 className="text-3xl font-bold">₹{plan.price}</h2>
        </div>

        {/* Methods */}
        <div className="flex h-64">
          {/* Sidebar */}
          <div className="w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col">
            <MethodButton active={method === 'card'} onClick={() => setMethod('card')} icon={<CreditCard className="w-4 h-4" />} label="Card" />
            <MethodButton active={method === 'upi'} onClick={() => setMethod('upi')} icon={<Smartphone className="w-4 h-4" />} label="UPI" />
            <MethodButton active={method === 'netbanking'} onClick={() => setMethod('netbanking')} icon={<Building2 className="w-4 h-4" />} label="Netbanking" />
            <MethodButton active={method === 'wallet'} onClick={() => setMethod('wallet')} icon={<Wallet className="w-4 h-4" />} label="Wallet" />
          </div>

          {/* Content */}
          <div className="w-2/3 p-4 bg-white flex flex-col">
            {method === 'card' && (
              <div className="space-y-4">
                <input type="text" placeholder="Card Number" className="w-full border p-2 rounded text-sm outline-blue-500" />
                <div className="flex space-x-2">
                  <input type="text" placeholder="MM/YY" className="w-1/2 border p-2 rounded text-sm outline-blue-500" />
                  <input type="text" placeholder="CVV" className="w-1/2 border p-2 rounded text-sm outline-blue-500" />
                </div>
                <input type="text" placeholder="Cardholder Name" className="w-full border p-2 rounded text-sm outline-blue-500" />
              </div>
            )}
            {method === 'upi' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-2">Enter your UPI ID</p>
                <input type="text" placeholder="example@upi" className="w-full border p-2 rounded text-sm outline-blue-500" />
              </div>
            )}
            {method === 'netbanking' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-2">Select Bank</p>
                <select className="w-full border p-2 rounded text-sm outline-blue-500 bg-white">
                  <option>SBI</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                </select>
              </div>
            )}
            {method === 'wallet' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-2">Select Wallet</p>
                <select className="w-full border p-2 rounded text-sm outline-blue-500 bg-white">
                  <option>Paytm</option>
                  <option>PhonePe</option>
                  <option>Amazon Pay</option>
                </select>
              </div>
            )}

            <div className="mt-auto">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded text-sm flex justify-center items-center h-10 transition-colors"
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : `Pay ₹${plan.price}`}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-3 text-center text-xs text-gray-500 border-t border-gray-200 flex justify-center items-center space-x-1">
          <ShieldCheck className="w-3 h-3" />
          <span>Secured by Razorpay</span>
        </div>
      </div>
    </div>
  );
};

const MethodButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`p-3 flex flex-col items-center justify-center space-y-1 text-xs transition-colors border-l-4 ${
      active ? 'bg-white border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-gray-600 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default PaymentModal;
