import ShinyText from "@/components/ShinyText";

export default function HeroSection() {
  return (
    <div className="relative z-10">
      <ShinyText
        text="SRIHAS REDDY CHALLA"
        className="font-audiowide text-4xl md:text-4xl lg:text-5xl font-black tracking-[0.6rem] text-center px-8 leading-none"
        speed={2}
        disabled={false}
      />
    </div>
  );
}
