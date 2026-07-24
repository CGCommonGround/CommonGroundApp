import { FaCalendarPlus, FaUser } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-3.5 flex justify-between items-center shadow-sm">
      <div className="flex items-center space-x-3 cursor-pointer">
        <img 
          src="../public/CG_LOGO.jpg" 
          alt="CommonGround Logo" 
          className="h-10 w-auto object-contain" 
        />
      </div>

      <nav className="hidden md:flex items-center space-x-8 font-medium text-slate-600 text-sm">
        <a href="#explore" className="hover:text-blue-600 transition">Explore Events</a>
        <a href="#categories" className="hover:text-blue-600 transition">Categories</a>
        <a 
          href="#create" 
          className="flex items-center space-x-2 bg-linear-to-r from-emerald-500 via-blue-500 to-orange-500 text-white px-4 py-2 rounded-full font-semibold hover:opacity-90 transition shadow-sm"
        >
          <FaCalendarPlus />
          <span>Create Event</span>
        </a>
      </nav>

      <div className="flex items-center space-x-3">
        <button className="text-slate-600 hover:text-slate-900 text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-100 transition">
          Sign In
        </button>
        <button className="bg-slate-900 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-slate-800 transition shadow-md flex items-center space-x-2">
          <FaUser className="text-xs" />
          <span>Log In</span>
        </button>
      </div>
    </header>
  );
}