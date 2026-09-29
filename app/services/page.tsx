import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import SectionHeading, { Accent } from "../components/SectionHeading";
import IconBox, { type IconName } from "../components/IconBox";
import { services } from "../data/senan";
import { unsplash } from "../data/senan";

const sweepNavy = { "--sweep-color": "#1B263B" } as CSSProperties;
const wrap = "mx-auto w-full max-w-[1200px] px-5";

export default function Services() {
  return (
    <>
      <PageBanner
        title="Nos services"
        current="Services"
        text="Simple, rapide et sécurisé : SENAN Travel a tout prévu pour que votre voyage commence bien avant le départ."
        image={unsplash.busStation}
      />

      <section className="py-[90px]">
        <div className={wrap}>
          <Reveal direction="up">
            <SectionHeading
              align="center"
              label="3 étapes pour le voyage parfait"
              title={
                <>
                  Nous vous offrons le <Accent>meilleur service</Accent>
                </>
              }
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.titre} direction="up" delay={(i % 3) * 150}>
                <IconBox icon={s.icon as IconName} title={s.titre} text={s.texte} href="/reservations" cta="Réserver" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-[90px]">
        <div className={wrap}>
          <Reveal direction="up">
            <div className="rounded-[10px] bg-[#00B4D8] px-6 py-16 text-center text-white">
              <h2 className="text-[34px] font-bold leading-[1.1] lg:text-[42px]">Commencer ma réservation</h2>
              <Link
                href="/reservations"
                className="hover-sweep mt-8 inline-flex items-center gap-2 rounded-[6px] bg-[#FF8C42] px-7 py-3.5 font-semibold text-white"
                style={sweepNavy}
              >
                Accéder à l&apos;app
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
