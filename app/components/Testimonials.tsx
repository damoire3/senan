"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Temoignage = { nom: string; lieu: string; texte: string; initiale: string };

/** Carrousel de témoignages (3 cartes visibles en desktop, comme le Swiper du modèle). */
export default function Testimonials({ items }: { items: Temoignage[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    const timer = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => {
      clearInterval(timer);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-5 flex">
          {items.map((t) => (
            <div key={t.nom} className="min-w-0 flex-[0_0_100%] pl-5 md:flex-[0_0_50%] lg:flex-[0_0_33.3333%]">
              <div className="h-full rounded-[10px] border border-[#eaeaea] bg-white p-[30px] shadow-[0_3px_15px_rgba(0,0,0,0.05)]">
                <div className="mb-4 flex gap-1 text-[#ffce37]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21L12 17.77L5.82 21L7 14.14l-5-4.87l6.91-1.01z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-6 text-[15px] leading-[1.7] text-[#575a5f]">&quot;{t.texte}&quot;</p>
                <div className="flex items-center gap-3">
                  <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#00B4D8] font-bold text-white">
                    {t.initiale}
                  </span>
                  <div>
                    <p className="text-[18px] font-semibold leading-[1.2] text-[#1B263B]">{t.nom}</p>
                    <p className="text-sm text-[#575a5f]">{t.lieu}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          aria-label="Précédent"
          onClick={() => emblaApi?.scrollPrev()}
          className="hover-sweep flex h-11 w-11 items-center justify-center rounded-full border border-[#eaeaea] bg-white text-[#1B263B] hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Aller au témoignage ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                selected === i ? "w-6 bg-[#00B4D8]" : "w-2.5 bg-[#cfcfcf]"
              }`}
            />
          ))}
        </div>
        <button
          aria-label="Suivant"
          onClick={() => emblaApi?.scrollNext()}
          className="hover-sweep flex h-11 w-11 items-center justify-center rounded-full border border-[#eaeaea] bg-white text-[#1B263B] hover:text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
