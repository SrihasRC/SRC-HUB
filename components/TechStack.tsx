import LogoLoop from "@/components/LogoLoop";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPython,
} from "react-icons/si";

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

export default function TechStack() {
  return (
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
  );
}
