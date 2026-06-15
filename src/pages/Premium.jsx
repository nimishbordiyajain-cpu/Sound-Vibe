import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Check, ShieldCheck } from 'lucide-react';
import PaymentModal from '../components/premium/PaymentModal';

const Premium = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { user } = useAuth();

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
    <div className="min-h-screen bg-spotify-base text-white pt-20 pb-12 px-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Listen without limits.</h1>
          <p className="text-xl text-gray-400">Choose the Premium plan that's right for you.</p>
          
          <div className="mt-8 flex items-center justify-center space-x-4">
            <span className={`text-sm ${!isYearly ? 'text-white font-bold' : 'text-gray-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-7 bg-spotify-elevated rounded-full p-1 relative transition-colors duration-300 border border-gray-600"
            >
              <div className={`w-5 h-5 bg-spotify-green rounded-full shadow-md transition-transform duration-300 ${isYearly ? 'translate-x-7' : ''}`} />
            </button>
            <span className={`text-sm ${isYearly ? 'text-white font-bold' : 'text-gray-400'}`}>Yearly <span className="text-spotify-green text-xs font-bold ml-1">Save 16%</span></span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative bg-spotify-elevated rounded-2xl p-8 border ${plan.popular ? 'border-spotify-green shadow-[0_0_20px_rgba(30,215,96,0.2)]' : 'border-white/10'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-spotify-green text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-extrabold">₹{plan.price}</span>
                <span className="text-gray-400">/{isYearly ? 'year' : 'month'}</span>
              </div>

              <button 
                disabled={plan.isCurrent}
                onClick={() => setSelectedPlan(plan)}
                className={`w-full py-3 rounded-full font-bold mb-8 transition-colors ${
                  plan.isCurrent 
                    ? 'bg-white/10 text-white cursor-not-allowed' 
                    : plan.popular
                      ? 'bg-spotify-green text-black hover:bg-spotify-greenHover'
                      : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {plan.isCurrent ? 'Current Plan' : 'Get Started'}
              </button>

              <div className="space-y-4 border-t border-white/10 pt-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start space-x-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-spotify-green shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#1a1a1a] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between border border-white/5">
          <div className="mb-4 md:mb-0">
            <h4 className="text-xl font-bold mb-2 flex items-center"><ShieldCheck className="w-6 h-6 mr-2 text-spotify-green" /> Secure Payment</h4>
            <p className="text-sm text-gray-400">Your transactions are encrypted and simulated securely via Razorpay UI.</p>
          </div>
          <div className="flex space-x-4 grayscale opacity-70">
            {/* Payment method icons placeholders */}
            <div className="w-12 h-8 bg-gray-800 rounded"></div>
            <div className="w-12 h-8 bg-gray-800 rounded"></div>
            <div className="w-12 h-8 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={selectedPlan !== null} 
        onClose={() => setSelectedPlan(null)} 
        plan={selectedPlan || {}}
      />
    </div>
  );
};

export default Premium;
