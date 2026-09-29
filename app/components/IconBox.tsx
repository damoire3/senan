import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  Search,
  CreditCard,
  Ticket,
  ShieldCheck,
  Clock,
  Headphones,
  Users,
  MapPin,
  Star,
  Globe,
} from "lucide-react";

const icons = {
  search: Search,
  card: CreditCard,
  ticket: Ticket,
  shield: ShieldCheck,
  clock: Clock,
  support: Headphones,
  users: Users,
  pin: MapPin,
  star: Star,
  globe: Globe,
};

export type IconName = keyof typeof icons;

const sweepNavy = { "--sweep-color": "#1B263B" } as CSSProperties;

/**
 * Carte "icon box" du modèle : bordure fine, rayon 10px, icône en haut,
 * titre 24px, texte, lien flèche. Au survol : remplissage qui glisse depuis la gauche.
 */
export default function IconBox({
  icon,
  title,
  text,
  href,
  cta,
}: {
  icon: IconName;
  title: string;
  text: string;
  href?: string;
  cta?: string;
}) {
  const Icon = icons[icon];
  return (
    <div
      className="hover-sweep group h-full rounded-[10px] border border-[#eaeaea] bg-white p-[30px] shadow-[0_3px_15px_rgba(0,0,0,0.05)]"
      style={sweepNavy}
    >
      <div className="mb-5 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#00B4D8]/10 text-[#00B4D8] transition-all duration-300 group-hover:bg-white group-hover:text-[#1B263B]">
        <Icon size={32} />
      </div>
      <h3 className="mb-3 text-[24px] font-semibold leading-[1.2] text-[#1B263B] transition-colors duration-300 group-hover:text-white">
        {title}
      </h3>
      <p className="text-[15px] leading-[1.7] text-[#575a5f] transition-colors duration-300 group-hover:text-white/80">
        {text}
      </p>
      {href && (
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-2 font-semibold text-[#FF8C42] transition-colors duration-300 group-hover:text-white"
        >
          <span>{cta ?? "En savoir plus"}</span>
          <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
}
