import { Sparkles } from "lucide-react";
import { promos } from "../../data/senan";

/** Bandeau de promos défilant horizontalement, façon apps de livraison (Glovo, Uber Eats). */
export default function PromoBanner() {
  return (
    <div className="mb-8 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div className="flex gap-3">
        {promos.map((p) => (
          <div
            key={p.titre}
            className="flex min-w-[240px] flex-1 items-start gap-3 rounded-2xl p-4 text-white shadow-[0_3px_15px_rgba(0,0,0,0.08)]"
            style={{ backgroundColor: p.couleur }}
          >
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
              <Sparkles size={16} />
            </span>
            <div>
              <p className="text-sm font-bold leading-tight">{p.titre}</p>
              <p className="mt-1 text-xs text-white/80">{p.texte}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
