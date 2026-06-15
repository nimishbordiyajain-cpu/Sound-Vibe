import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Download, ArrowRight } from 'lucide-react';

const Receipt = () => {
  const location = useLocation();
  const { plan, method, date } = location.state || {};

  // If accessed directly without state, redirect
  if (!plan) {
    return <Navigate to="/dashboard" replace />;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-spotify-base flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white text-black rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-spotify-green p-8 flex flex-col items-center text-center">
          <CheckCircle2 className="w-16 h-16 text-white mb-4" />
          <h1 className="text-2xl font-bold text-black mb-1">Payment Successful</h1>
          <p className="text-black/80">Thank you for upgrading to Premium</p>
        </div>

        <div className="p-8">
          <div className="space-y-4 mb-8">
            <div className="flex justify-between pb-4 border-b border-gray-200">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-bold text-lg">₹{plan.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Plan</span>
              <span className="font-semibold">{plan.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-semibold capitalize">{method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="font-semibold">{new Date(date).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-semibold text-xs">pay_{Math.random().toString(36).substr(2, 9)}</span>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button 
              onClick={handlePrint}
              className="w-full py-3 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-2" /> Download Receipt
            </button>
            <Link 
              to="/dashboard"
              className="w-full py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center"
            >
              Start Listening <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
