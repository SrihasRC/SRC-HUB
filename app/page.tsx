import Dither from "@/components/Dither";

export default function Home() {
  return (
    <div className="relative">
      <div className="fixed inset-0 z-0">
        <Dither enableMouseInteraction={false} />
      </div>
      <div className="relative z-10 h-screen w-screen flex items-center justify-center">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-widest text-center px-8 leading-none text-[#9e9e9e]">
          SRIHAS REDDY CHALLA
        </h1>
      </div>
    </div>
  );
}
