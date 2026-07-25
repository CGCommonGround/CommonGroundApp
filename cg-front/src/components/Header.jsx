import { useState } from 'react';
import { FaCalendarPlus, FaUser, FaSignOutAlt } from 'react-icons/fa';
import LoginModal from './LoginModal';

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Error parsing user data:', e);
        return null;
      }
    }
    return null;
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer">
            <img 
              src="/public/CG_LOGO.jpg" 
              alt="CommonGround Logo" 
              className="h-10 w-auto object-contain" 
            />
          </div>
          <nav className="hidden md:flex items-center space-x-8 font-medium text-slate-600 text-sm">
            <a href="#explore" className="hover:text-slate-900 transition">
              Explore Events
            </a>
            <a 
              href="#create" 
              className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-full font-semibold hover:bg-slate-800 transition shadow-sm text-xs"
            >
              <FaCalendarPlus />
              <span>Create Event</span>
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full">
                  {/* 💡 Supports direct name or nested user.name */}
                  Hello, {currentUser.name || currentUser.user?.name || currentUser.username || 'User'}
                </span>
                <button 
                  onClick={handleLogout}
                  title="Log out"
                  className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-slate-100 transition"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            ) : (
              <>
                <button className="text-slate-600 hover:text-slate-900 text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-50 transition">
                  Sign In
                </button>
                <button 
                  onClick={() => setIsLoginOpen(true)}
                  className="border border-slate-200 text-slate-800 text-sm font-medium px-5 py-2 rounded-full hover:bg-slate-50 transition shadow-sm flex items-center space-x-2"
                >
                  <FaUser className="text-xs text-slate-500" />
                  <span>Log In</span>
                </button>
              </>
            )}
          </div>

        </div>
      </header>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={(user) => setCurrentUser(user)}
      />
    </>
  );
}