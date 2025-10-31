import Dither from "@/components/Dither";
import ShinyText from "@/components/ShinyText";

export default function Home() {
  return (
    <div className="relative">
      <div className="fixed inset-0 z-0">
        <Dither enableMouseInteraction={false} />
      </div>
      <div className="relative z-10 h-screen w-screen flex items-center justify-center">
        <ShinyText 
          text="CHALLA SRIHAS REDDY"
          className="font-figtree text-5xl md:text-6xl lg:text-8xl font-black tracking-widest text-center px-8 leading-none"
          speed={3}
        />
      </div>
    </div>
  );
}
