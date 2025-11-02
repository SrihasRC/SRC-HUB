import TargetCursor from "@/components/TargetCursor";
import Dither from "@/components/Dither";
import HeroSection from "@/components/HeroSection";
import LinksGrid from "@/components/LinksGrid";
import LiveStats from "@/components/LiveStats";
import ScrollVelocity from "@/components/ScrollVelocity";

export default function Home() {
  return (
    <div className="relative overflow-x-hidden min-h-screen ">
      {/* Dithered Background */}
      <div className="w-full h-screen fixed inset-0 pointer-events-none -z-10">
        <Dither enableMouseInteraction={false} />
      </div>

      <TargetCursor />

      {/* Main Content */}
      <div className="w-full min-h-screen pt-10 bg-black/40 backdrop-blur-md">
        <div className="max-w-3xl mx-auto">
          <HeroSection />
          <div className="font-bruno-ace-sc">
            <LinksGrid />
            <LiveStats />
          </div>
        </div>
        
        {/* Full Width Scroll Velocity */}
        <div className="w-full">
          <ScrollVelocity
            texts={["SRIHASRC", "PERSONALHUB"]}
            velocity={50}
            damping={80}
            stiffness={300}
            numCopies={8}
            className="font-audiowide text-[#d6d6d6a4]/50"
          />
        </div>
      </div>
    </div>
  );
}
