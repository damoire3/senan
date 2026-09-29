import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import { trajets, unsplash } from "../data/senan";

const sweepNavy = { "--sweep-color": "#1B263B" } as CSSProperties;
const wrap = "mx-auto w-full max-w-[1200px] px-5";

export default function Destination() {
  return (
    <>
      <PageBanner
        title="Destinations"
        current="Destinations"
        text="Explore le Bénin, ville par ville. Compare les trajets et réserve en ligne en quelques secondes."
        image={unsplash.busStation}
      />

      <section className="py-[90px]">
        <div className={wrap}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trajets.map((t, i) => (
              <Reveal key={t.numero} direction="up" delay={(i % 3) * 150}>
                <div className="lift-hover h-full overflow-hidden rounded-[10px] border border-[#eaeaea] bg-white shadow-[0_3px_15px_rgba(0,0,0,0.05)]">
                  <div className="relative">
                    <Image src={t.image} alt={t.ville} width={500} height={320} className="h-[230px] w-full object-cover" />
                    <span className="absolute top-4 left-4 rounded-[6px] bg-[#FF8C42] px-3 py-1 text-sm font-bold text-white">
                      {t.prix}
                    </span>
                  </div>
                  <div className="p-[25px]">
                    <h3 className="mb-3 text-[24px] font-semibold leading-[1.2] text-[#1B263B]">{t.titre}</h3>
                    <p className="mb-5 text-[15px] leading-[1.7] text-[#575a5f]">{t.description}</p>
                    <div className="mb-5 flex flex-col gap-2 border-y border-[#eaeaea] py-4 text-[15px] text-[#1B263B]">
                      <span className="flex items-center gap-3">
                        <MapPin size={18} className="text-[#00B4D8]" />
                        {t.ville}
                      </span>
                      <span className="flex items-center gap-3">
                        <Clock size={18} className="text-[#00B4D8]" />
                        {t.duree}
                      </span>
                    </div>
                    <Link
                      href="/reservations"
                      className="hover-sweep flex items-center justify-center gap-2 rounded-[6px] bg-[#FF8C42] px-5 py-3 font-semibold text-white"
                      style={sweepNavy}
                    >
                      Réserver ce trajet
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
