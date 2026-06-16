import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import UpiModal from '../components/payment/UpiModal';
import { motion } from 'framer-motion';

const Premium = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [selectedUpiPlan, setSelectedUpiPlan] = useState(null);
  const { user, upgradeToPremium } = useAuth();
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (plan) => {
    if (plan.price === 0) return;

    const res = await loadRazorpayScript();

    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_Snvr3OyMCtKko3',
      amount: plan.price * 100, // Amount is in currency subunits (paise)
      currency: 'INR',
      name: 'Sound-Vibe Premium',
      description: `Upgrade to ${plan.name} Plan`,
      image: window.location.origin + '/logo.png',
      handler: function (response) {
        upgradeToPremium();
        toast.success('Payment Successful!');
        navigate('/receipt', { state: { plan, method: 'razorpay', date: new Date().toISOString(), paymentId: response.razorpay_payment_id } });
      },
      prefill: {
        name: user?.name || 'Guest User',
        email: 'user@sound-vibe.com',
        contact: '9999999999'
      },
      theme: {
        color: '#8B5CF6' // Purple theme matching our app
      },
      config: {
        display: {
          blocks: {
            upi: {
              name: "Pay via UPI",
              instruments: [
                { method: "upi" }
              ]
            },
            other: {
              name: "Other Payment Modes",
              instruments: [
                { method: "card" },
                { method: "netbanking" },
                { method: "wallet" }
              ]
            }
          },
          sequence: ["block.upi", "block.other"],
          preferences: {
            show_default_blocks: false
          }
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleNativeUpiPayment = (plan) => {
    if (plan.price === 0) return;
    setSelectedUpiPlan(plan);
    setIsUpiModalOpen(true);
  };

  const handleUpiSuccess = () => {
    setIsUpiModalOpen(false);
    upgradeToPremium();
    toast.success('UPI Payment Successful!');
    navigate('/receipt', { state: { plan: selectedUpiPlan, method: 'upi', date: new Date().toISOString(), paymentId: 'upi_' + Date.now() } });
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: ['Ad-supported music listening', 'Standard audio quality', 'Play in shuffle', 'Basic recommendations'],
      isCurrent: !user?.isPremium,
    },
    {
      id: 'basic',
      name: 'Basic',
      price: isYearly ? 599 : 59,
      features: ['Ad-free music listening', 'High audio quality', 'Unlimited skips', 'Play any track'],
      isCurrent: false,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: isYearly ? 1199 : 119,
      features: ['Ad-free music listening', 'Highest audio quality', 'Unlimited skips', 'Download to listen offline', 'AI Smart DJ Assistant'],
      isCurrent: user?.isPremium,
      popular: true,
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-20 pb-12 px-6 overflow-y-auto relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-spotify-green/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-purple-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-spotify-green" />
            <span className="text-sm font-bold tracking-widest text-gray-300">SOUND-VIBE PREMIUM</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
            Listen without limits.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Elevate your listening experience with high-fidelity audio, ad-free streaming, and exclusive AI features.</p>
          
          <div className="mt-10 flex items-center justify-center space-x-4">
            <span className={`text-sm transition-colors ${!isYearly ? 'text-white font-bold' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-16 h-8 bg-white/10 rounded-full p-1 relative transition-colors duration-300 border border-white/20 hover:border-spotify-green/50"
            >
              <div className={`w-6 h-6 bg-gradient-to-r from-spotify-green to-emerald-400 rounded-full shadow-lg transition-transform duration-300 ${isYearly ? 'translate-x-8' : ''}`} />
            </button>
            <span className={`text-sm transition-colors ${isYearly ? 'text-white font-bold' : 'text-gray-500'}`}>
              Yearly <span className="bg-spotify-green/20 text-spotify-green px-2 py-0.5 rounded text-xs font-black ml-2 uppercase tracking-wide">Save 16%</span>
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              key={plan.id} 
              className={`relative rounded-3xl p-8 border backdrop-blur-xl ${
                plan.popular 
                  ? 'bg-gradient-to-b from-spotify-green/10 to-black/40 border-spotify-green/50 shadow-[0_0_40px_rgba(30,215,96,0.15)]' 
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-spotify-green to-emerald-400 text-black px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(30,215,96,0.5)] z-10">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-black mb-2 tracking-tight">{plan.name}</h3>
              <div className="mb-8">
                <span className="text-5xl font-black tracking-tighter">₹{plan.price}</span>
                <span className="text-gray-400 font-medium">/{isYearly ? 'year' : 'month'}</span>
              </div>

              <button 
                disabled={plan.isCurrent}
                onClick={() => handlePayment(plan)}
                className={`w-full py-4 rounded-full font-black tracking-wide mb-3 transition-all ${
                  plan.isCurrent 
                    ? 'bg-white/5 text-gray-500 cursor-not-allowed mb-8' 
                    : plan.popular
                      ? 'bg-spotify-green text-black hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(30,215,96,0.4)] hover:scale-[1.02]'
                      : 'bg-white text-black hover:bg-gray-200 hover:scale-[1.02]'
                }`}
              >
                {plan.isCurrent ? 'Current Plan' : 'Pay via Razorpay'}
              </button>

              {!plan.isCurrent && plan.price > 0 && (
                <button 
                  onClick={() => handleNativeUpiPayment(plan)}
                  className="w-full py-3 rounded-full font-bold mb-8 transition-all border border-purple-500/50 text-purple-400 hover:bg-purple-500 hover:text-white hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                >
                  Scan QR & Pay via UPI
                </button>
              )}

              <div className="space-y-5 border-t border-white/10 pt-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start space-x-4 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-spotify-green shrink-0 drop-shadow-[0_0_5px_rgba(30,215,96,0.5)]" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-white/5 to-transparent rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between border border-white/5 backdrop-blur-sm"
        >
          <div className="mb-6 md:mb-0">
            <h4 className="text-xl font-bold mb-2 flex items-center tracking-tight">
              <ShieldCheck className="w-6 h-6 mr-3 text-spotify-green" /> 
              Enterprise-Grade Security
            </h4>
            <p className="text-sm text-gray-400 max-w-md">Your transactions are fully encrypted and processed securely via Sound-Vibe Checkout architecture.</p>
          </div>
          <div className="flex space-x-3 opacity-60">
            {/* Payment method badges */}
            <div className="px-4 py-2 bg-black border border-white/10 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center text-white">UPI</div>
            <div className="px-4 py-2 bg-black border border-white/10 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center text-white">Cards</div>
            <div className="px-4 py-2 bg-black border border-white/10 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center text-white">NetBanking</div>
          </div>
        </motion.div>
      </div>
      <UpiModal 
        isOpen={isUpiModalOpen} 
        onClose={() => setIsUpiModalOpen(false)} 
        plan={selectedUpiPlan} 
        onSuccess={handleUpiSuccess} 
      />
    </div>
  );
};

export default Premium;
