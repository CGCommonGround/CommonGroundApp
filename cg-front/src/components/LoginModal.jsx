import { useState } from 'react';
import axios from 'axios';
import { FaTimes, FaEnvelope, FaLock } from 'react-icons/fa';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/login', {
        email,
        password,
      });

      console.log('Login Success:', response.data);
      if (response.data && response.data.user) {
        const loggedInUser = response.data.user;
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        if (onLoginSuccess) onLoginSuccess(response.data);
      }

      onClose(); 
    } catch (err) {
      console.error('Login Error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg('Invalid email or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative border border-slate-100 animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition"
        >
          <FaTimes />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-slate-900">Welcome Back</h3>
            <p className="text-sm text-slate-500 mt-1">Log in to your CommonGround account</p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl text-center">
              {errorMsg}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email Address</label>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-4 text-slate-400 text-sm" />
                <input 
                  type="email" 
                  required
                  placeholder="hello@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-blue-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Password</label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-4 text-slate-400 text-sm" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-blue-500 focus:bg-white transition"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-2 bg-slate-900 text-white font-semibold py-3.5 rounded-2xl hover:bg-slate-800 transition shadow-lg shadow-slate-200 disabled:opacity-50 text-sm"
            >
              {loading ? 'Connecting...' : 'Log In'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}