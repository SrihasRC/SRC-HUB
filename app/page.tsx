import ShinyText from "@/components/ShinyText";
import TargetCursor from "@/components/TargetCursor";
import LiveStats from "@/components/LiveStats";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ExternalLink,
  Instagram,
} from "lucide-react";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPython,
} from "react-icons/si";
import LogoLoop from "@/components/LogoLoop";
import Dither from "@/components/Dither";

const techLogos = [
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    node: <SiPython />,
    title: "Python",
    href: "https://www.python.org",
  },
];

export default function Home() {
  const links = [
    { label: "Portfolio", href: "https://srihasrc.dev", icon: ExternalLink },
    { label: "GitHub", href: "https://github.com/SrihasRC", icon: Github },
    {
      label: "LinkedIn",
      href: "https://linkedin.in/in/srihaschalla",
      icon: Linkedin,
    },
    {
      label: "Instagram",
      href: "https://instagram.com/srihasreddyy",
      icon: Instagram,
    },
    { label: "Email", href: "mailto:challasrihasreddy@gmail.com", icon: Mail },
    {
      label: "Resume",
      href: "https://drive.google.com/file/d/1pgsVPChr1o9XKVeJKhBf_epPh2hM79Mx/view?usp=sharing",
      icon: FileText,
    },
  ];

  return (
    <div className="relative overflow-x-hidden w-full min-h-screen flex flex-col items-center justify-center ">
      <div className="w-full h-screen fixed inset-0 pointer-events-none -z-10">
        <Dither enableMouseInteraction={false} />
      </div>
      <TargetCursor />
      <div className="w-3xl min-h-screen pt-10 bg-black/70 backdrop-blur-xl">
        <div className="relative z-10 flex items-center justify-center">
          <ShinyText
            text="SRIHAS REDDY CHALLA"
            className="font-figtree text-4xl md:text-4xl lg:text-5xl font-black tracking-[0.6rem] text-center px-8 leading-none"
            speed={5}
            disabled={false}
          />
        </div>

        {/* Links Section */}
        <div className="mt-16 px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : "_self"}
                  rel={
                    link.href.startsWith("http") ? "noopener noreferrer" : ""
                  }
                  className="group relative flex items-center justify-center gap-2 px-4 py-3 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/5 transition-all duration-300 cursor-target cursor-none"
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="font-space-grotesk text-sm text-gray-400 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Live Stats Section */}
        <LiveStats />

        <div
          style={{ height: "100px", position: "relative", overflow: "hidden" }}
        >
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="right"
            logoHeight={48}
            gap={40}
            pauseOnHover
            scaleOnHover
            ariaLabel="Technology partners"
          />
        </div>
      </div>
    </div>
  );
}
