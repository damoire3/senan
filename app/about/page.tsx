import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import SectionHeading, { Accent } from "../components/SectionHeading";
import IconBox, { type IconName } from "../components/IconBox";
import FunFact from "../components/FunFact";
import Counter from "../components/Counter";
import { stats, valeurs, services, equipe, unsplash } from "../data/senan";

const sweepNavy = { "--sweep-color": "#1B263B" } as CSSProperties;
const wrap = "mx-auto w-full max-w-[1200px] px-5";

const points = [
  "Prix clairs, horaires fiables",
  "Paiements traçables",
  "Réservation en moins de 3 minutes",
  "Ticket digital instantané",
  "Paiements chiffrés",
  "Données protégées",
];

export default function About() {
  return (
    <>
      <PageBanner
        title="À propos"
        current="À propos"
        text="Notre raison d'être : rendre le voyage au Bénin simple, sûr et accessible à tous depuis n'importe quel téléphone, à toute heure."
        image={unsplash.streetAfrica}
      />

      {/* À propos */}
      <section className="py-[90px]">
        <div className={`${wrap} grid items-center gap-14 lg:grid-cols-2`}>
          <div className="relative mx-auto w-full max-w-[520px] pb-20 lg:pb-24">
            <Reveal direction="up" className="w-[72%]">
              <Image src={valeurs[0].image} alt="SENAN Travel" width={500} height={620} className="h-auto w-full rounded-[10px] object-cover" />
            </Reveal>
            <Reveal direction="up" delay={250} className="absolute right-0 bottom-0 w-[55%]">
              <Image
                src={valeurs[1].image}
                alt="SENAN Travel"
                width={400}
                height={480}
                className="h-auto w-full rounded-[10px] border-[8px] border-white object-cover shadow-[0_3px_15px_rgba(0,0,0,0.1)]"
              />
            </Reveal>
            <div className="hover-sweep absolute bottom-2 left-0 hidden rounded-[10px] bg-[#FF8C42] px-6 py-5 text-white shadow-[0_3px_15px_rgba(0,0,0,0.1)] sm:block" style={sweepNavy}>
              <p className="text-[35px] font-bold leading-[1.1]">
                <Counter end={10000} suffix="+" duration={3500} />
              </p>
              <p className="text-[15px]">Voyageurs servis</p>
            </div>
          </div>

          <div>
            <Reveal direction="right">
              <SectionHeading
                label="Notre raison d'être"
                title={
                  <>
                    Rendre le voyage au Bénin <Accent>simple, sûr et accessible</Accent>
                  </>
                }
                text="À tous, depuis n'importe quel téléphone, à toute heure."
              />
            </Reveal>
            <Reveal direction="left" delay={150}>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[15px] text-[#1B263B]">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#00B4D8]" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir : valeurs + compteurs */}
      <section className="bg-[#f4fbfd] py-[90px]">
        <div className={wrap}>
          <Reveal direction="up">
            <SectionHeading
              align="center"
              label="Ce qui nous guide"
              title={
                <>
                  Nos valeurs, <Accent>en actes</Accent>
                </>
              }
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {valeurs.map((v, i) => (
              <Reveal key={v.label} direction="up" delay={i * 150}>
                <div className="lift-hover h-full overflow-hidden rounded-[10px] border border-[#eaeaea] bg-white shadow-[0_3px_15px_rgba(0,0,0,0.05)]">
                  <Image src={v.image} alt={v.titre} width={500} height={320} className="h-[220px] w-full object-cover" />
                  <div className="p-[25px]">
                    <p className="mb-2 text-[15px] font-bold text-[#00B4D8]">{v.label}</p>
                    <h3 className="mb-3 text-[24px] font-semibold leading-[1.2] text-[#1B263B]">{v.titre}</h3>
                    <p className="text-[15px] leading-[1.7] text-[#575a5f]">{v.texte}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} direction="left" delay={i * 120}>
                <FunFact
                  icon={s.icon as "users" | "pin" | "star" | "globe"}
                  end={s.end}
                  suffix={s.suffix}
                  decimals={s.decimals}
                  label={s.label}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-[90px]">
        <div className={wrap}>
          <Reveal direction="up">
            <SectionHeading
              align="center"
              label="Nos services"
              title={
                <>
                  Nous vous offrons le <Accent>meilleur service</Accent>
                </>
              }
              text="Simple, rapide et sécurisé : SENAN Travel a tout prévu pour que votre voyage commence bien avant le départ."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.titre} direction="up" delay={(i % 3) * 150}>
                <IconBox icon={s.icon as IconName} title={s.titre} text={s.texte} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="bg-[#f4fbfd] py-[90px]">
        <div className={wrap}>
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal direction="left">
              <SectionHeading
                label="Celles et ceux qui font SENAN"
                title={
                  <>
                    Une équipe <Accent>béninoise</Accent>, à votre service
                  </>
                }
              />
            </Reveal>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {equipe.map((m, i) => (
              <Reveal key={m.titre} direction="up" delay={i * 120}>
                <div className="hover-sweep group h-full rounded-[10px] border border-[#eaeaea] bg-white p-[30px] text-center shadow-[0_3px_15px_rgba(0,0,0,0.05)]" style={sweepNavy}>
                  <h3 className="mb-2 text-[24px] font-semibold leading-[1.2] text-[#1B263B] transition-colors duration-300 group-hover:text-white">
                    {m.titre}
                  </h3>
                  <p className="text-[15px] text-[#575a5f] transition-colors duration-300 group-hover:text-white/80">{m.texte}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[90px]">
        <div className={wrap}>
          <Reveal direction="up">
            <div className="rounded-[10px] bg-[#00B4D8] px-6 py-16 text-center text-white">
              <h2 className="text-[34px] font-bold leading-[1.1] lg:text-[42px]">Prêt à voyager malin ?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.7]">
                Rejoins les milliers de Béninois qui réservent déjà leurs trajets en ligne avec SENAN.
              </p>
              <Link
                href="/reservations"
                className="hover-sweep mt-8 inline-flex items-center gap-2 rounded-[6px] bg-[#FF8C42] px-7 py-3.5 font-semibold text-white"
                style={sweepNavy}
              >
                Réserver maintenant
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
