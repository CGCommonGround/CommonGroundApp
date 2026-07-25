import { FaSearch, FaTree, FaCity, FaLandmark } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <section className="bg-white py-16 px-6 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <span className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-4 py-1.5 rounded-full">
            <FaTree /> <span>Nature & Outdoor</span>
          </span>
          <span className="flex items-center space-x-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold px-4 py-1.5 rounded-full">
            <FaCity /> <span>City & Connection</span>
          </span>
          <span className="flex items-center space-x-1.5 bg-orange-50 text-orange-700 border border-orange-200 text-xs font-semibold px-4 py-1.5 rounded-full">
            <FaLandmark /> <span>Culture & Art</span>
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
          Find Your 
          <span className="bg-linear-to-r from-emerald-600 via-blue-600 to-orange-500 bg-clip-text text-transparent">Common Ground</span> in the City.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-normal">
          Discover local events, outdoor activities, cultural meetups, and connect with people who share your exact passions.
        </p>

        <div className="bg-white p-2.5 rounded-full shadow-lg border border-slate-200 max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-2">
          <div className="flex items-center pl-4 text-slate-400 w-full">
            <FaSearch className="mr-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search concerts, mountain hiking, tech meetups..." 
              className="w-full text-slate-800 outline-none text-sm bg-transparent" 
            />
          </div>
          <button className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-md whitespace-nowrap">
            Explore Now
          </button>
        </div>

      </div>
    </section>
  );
}