import TargetCursor from "@/components/TargetCursor";
import Dither from "@/components/Dither";
import HeroSection from "@/components/HeroSection";
import LinksGrid from "@/components/LinksGrid";
import LiveStats from "@/components/LiveStats";
import TechStack from "@/components/TechStack";

export default function Home() {

  return (
    <div className="relative overflow-x-hidden min-h-screen ">

      {/* Dithered Background */}
      <div className="w-full h-screen fixed inset-0 pointer-events-none -z-10">
        <Dither enableMouseInteraction={false} />
      </div>
      
      <TargetCursor />

      {/* Main Content */}
      <div className="w-full min-h-screen pt-10 bg-black/70 backdrop-blur-xl">
        <HeroSection />
        <LinksGrid />
        <LiveStats />
        <TechStack />
      </div>
    </div>
  );
}
