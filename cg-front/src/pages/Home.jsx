import HeroSection from "../components/Hero";
import HowToUse from "../components/HowToUse";

export default function LandingPage() {
  return (
    <div className="bg-white text-slate-800 font-sans">
      <HeroSection />
      <HowToUse />
    </div>
  );
}