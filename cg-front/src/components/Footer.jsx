import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative bg-emerald-900 text-white pt-24 pb-12 px-6 overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg 
          className="relative block w-full h-16 md:h-24 text-orange-500" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 L150,90 L350,20 L550,100 L750,30 L950,80 L1200,10 L1200,0 Z" 
            fill="currentColor"
          ></path>
        </svg>
      </div>



      <div className="relative z-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mt-6">
        
   
        <div>
          <div className="flex items-center space-x-2 mb-4 bg-white/10 p-2.5 rounded-2xl w-fit backdrop-blur-sm border border-white/10">
            <img src="/public/CG_LOGO.jpg" alt="CommonGround Logo" className="h-8 w-auto rounded-lg" />
            <span className="font-bold text-lg tracking-tight text-white">CommonGround</span>
          </div>
          <p className="text-sm text-emerald-100/80 leading-relaxed">
            CommonGround is a local community platform bringing people together through shared passions, local culture, and outdoor experiences.
          </p>
        </div>

        <div>
          <h4 className="text-emerald-200 font-bold mb-4 text-sm tracking-wider uppercase">Contact Us</h4>
          <ul className="text-sm space-y-3 text-emerald-100/90">
            <li className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-orange-400 shrink-0" />
              <span>Carrer de la Gran Via, 123, Barcelona</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaEnvelope className="text-blue-300 shrink-0" />
              <span>contact@commonground.local</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaPhone className="text-emerald-300 shrink-0" />
              <span>+34 931 234 567</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-emerald-200 font-bold mb-4 text-sm tracking-wider uppercase">Follow Us</h4>
          <div className="flex space-x-3">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-orange-500 transition border border-white/10">
              <FaInstagram />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-500 transition border border-white/10">
              <FaTwitter />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-emerald-500 transition border border-white/10">
              <FaGithub />
            </a>
          </div>
        </div>

      </div>

      <div className="relative z-20 max-w-6xl mx-auto mt-12 pt-6 border-t border-emerald-800/60 text-center text-xs text-emerald-300/60">
        © 2026 CommonGround. All rights reserved.
      </div>
    </footer>
  );
}