import { FaCompass, FaUsers, FaHeart } from 'react-icons/fa';

export default function HowToUse() {
  return (
    <section className="py-16 px-6 bg-slate-50 border-y border-slate-100">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3 text-slate-900">How CommonGround Works</h2>
        <p className="text-slate-500 text-sm mb-12">Three simple steps to start exploring your city</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 text-2xl">
              <FaCompass />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">Step 01</span>
            <h3 className="font-bold text-xl text-slate-800 mb-3">Set Preferences</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Tell us what you love 
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              from mountain hikes to tech talks, sports, and live concerts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 text-2xl">
              <FaUsers />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Step 02</span>
            <h3 className="font-bold text-xl text-slate-800 mb-3">Join or Host</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Browse nearby community activities or host your own event in just a few clicks.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6 text-2xl">
              <FaHeart />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-2">Step 03</span>
            <h3 className="font-bold text-xl text-slate-800 mb-3">Meet & Connect</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Gather at the common ground and build genuine, meaningful local relationships.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}