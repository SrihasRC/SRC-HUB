import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ExternalLink,
  Instagram,
} from "lucide-react";

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

export default function LinksGrid() {
  return (
    <div className="mt-16 px-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : "_self"}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : ""}
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
  );
}
