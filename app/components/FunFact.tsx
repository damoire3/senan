import type { CSSProperties } from "react";
import Counter from "./Counter";
import { Users, MapPin, Star, Globe } from "lucide-react";

const icons = { users: Users, pin: MapPin, star: Star, globe: Globe };

const sweepNavy = { "--sweep-color": "#1B263B" } as CSSProperties;

/** Bloc "fun fact" du modèle : icône ronde + compteur animé + libellé, sweep au survol. */
export default function FunFact({
  icon,
  end,
  suffix = "",
  decimals = 0,
  label,
}: {
  icon: keyof typeof icons;
  end: number;
  suffix?: string;
  decimals?: number;
  label: string;
}) {
  const Icon = icons[icon];
  return (
    <div
      className="hover-sweep group flex items-center gap-4 rounded-[10px] border border-[#eaeaea] bg-white p-5 shadow-[0_3px_15px_rgba(0,0,0,0.05)]"
      style={sweepNavy}
    >
      <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-[#00B4D8] text-white transition-all duration-300 group-hover:bg-white group-hover:text-[#1B263B]">
        <Icon size={30} />
      </div>
      <div>
        <p className="text-[35px] font-bold leading-[1.1] text-[#1B263B] transition-colors duration-300 group-hover:text-white">
          <Counter end={end} suffix={suffix} decimals={decimals} duration={3500} />
        </p>
        <p className="text-[15px] text-[#575a5f] transition-colors duration-300 group-hover:text-white/80">
          {label}
        </p>
      </div>
    </div>
  );
}
