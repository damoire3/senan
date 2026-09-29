import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Clock, Play } from "lucide-react";
import Reveal from "./components/Reveal";
import SearchForm from "./components/SearchForm";
import SectionHeading, { Accent } from "./components/SectionHeading";
import IconBox, { type IconName } from "./components/IconBox";
import FunFact from "./components/FunFact";
import Faq from "./components/Faq";
import Testimonials from "./components/Testimonials";
import NewsletterForm from "./components/NewsletterForm";
import Counter from "./components/Counter";
import { trajets, services, stats, temoignages, faqs } from "./data/senan";

const sweepNavy = { "--sweep-color": "#1B263B" } as CSSProperties;
const wrap = "mx-auto w-full max-w-[1200px] px-5";

const points = [
  "Prix clairs, horaires fiables",
  "Paiements traçables et chiffrés",
  "Réservation en moins de 3 minutes",
  "Ticket digital instantané",
  "Données protégées",
  "Support voyageur 7j/7",
];

export default function Home() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="bg-[#00B4D8] pt-[150px] pb-[150px] text-center text-white lg:pt-[190px] lg:pb-[140px] lg:text-left">
        <div className={wrap}>
          <div className="items-center justify-between gap-10 lg:flex">
            <Reveal direction="left" className="lg:w-1/2">
              <p className="mb-5 text-[15px] font-bold">
                RÉSERVATION RAPIDE • PAIEMENT SÉCURISÉ • TICKET INSTANTANÉ
              </p>
              <h1 className="text-[42px] font-bold leading-[1.1] md:text-[52px] lg:text-[62px]">
                Votre Prochain Départ à Portée de Téléphone
              </h1>
              <p className="mt-6 text-[16px] leading-[1.7]">
                Réservez votre prochain départ depuis chez vous en quelques clics, en toute sécurité. SENAN Travel
                vous emmène partout au Bénin, sans tracas.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
                <Link
                  href="/reservations"
                  className="hover-sweep inline-flex items-center gap-2 rounded-[6px] bg-[#FF8C42] px-7 py-3.5 font-semibold text-white"
                  style={sweepNavy}
                >
                  Réserver maintenant
                  <ArrowRight size={18} />
                </Link>
                <a href="#services" className="flex items-center gap-3 font-semibold">
                  <span className="pulse-ring relative h-[60px] w-[60px] rounded-full text-white">
                    <span className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-white text-[#00B4D8]">
                      <Play size={20} fill="currentColor" />
                    </span>
                  </span>
                  Comment ça marche
                </a>
              </div>
            </Reveal>
            <Reveal direction="right" delay={200} className="pt-10 lg:w-1/2 lg:pt-0">
              <Image
                className="mx-auto h-auto w-full max-w-[600px]"
                src="/senan-travel-hero.webp"
                alt="Senan voyage"
                width={700}
                height={700}
                priority
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── FORMULAIRE DE RECHERCHE (chevauche le hero) ───────── */}
      <section className="relative z-20 -mt-[70px]">
        <div className={wrap}>
          <Reveal direction="up">
            <SearchForm />
          </Reveal>
        </div>
      </section>

      {/* ───────── À PROPOS ───────── */}
      <section className="py-[90px]">
        <div className={`${wrap} grid items-center gap-14 lg:grid-cols-2`}>
          <div className="relative mx-auto w-full max-w-[520px] pb-20 lg:pb-24">
            <Reveal direction="up" className="w-[72%]">
              <Image
                src="/Senan-Travel-confiance.webp"
                alt="SENAN Travel"
                width={500}
                height={620}
                className="h-auto w-full rounded-[10px] object-cover"
              />
            </Reveal>
            <Reveal direction="up" delay={250} className="absolute right-0 bottom-0 w-[55%]">
              <Image
                src="/Senan-Travel-rapidité.webp"
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
                label="À propos de SENAN Travel"
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
            <Reveal direction="up" delay={250}>
              <Link
                href="/about"
                className="hover-sweep mt-10 inline-flex items-center gap-2 rounded-[6px] bg-[#FF8C42] px-7 py-3.5 font-semibold text-white"
                style={sweepNavy}
              >
                En savoir plus
                <ArrowRight size={18} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── POURQUOI NOUS CHOISIR (compteurs) ───────── */}
      <section className="bg-[#f4fbfd] py-[90px]">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2`}>
          <Reveal direction="left">
            <div className="relative overflow-hidden rounded-[10px] bg-[#1B263B] p-10 text-white">
              <Image
                src="/Senan-Travel-moderne.webp"
                alt=""
                fill
                sizes="(min-width:1024px) 600px, 100vw"
                className="object-cover opacity-25"
              />
              <div className="relative">
                <h3 className="text-[28px] font-semibold leading-[1.2]">Réservez votre trajet en quelques clics</h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-white/80">
                  Choisissez votre trajet, payez en ligne et recevez votre ticket digital instantanément.
                </p>
                <Link
                  href="/reservations"
                  className="hover-sweep mt-8 inline-flex items-center gap-2 rounded-[6px] bg-[#FF8C42] px-7 py-3.5 font-semibold text-white"
                  style={{ "--sweep-color": "#00B4D8" } as CSSProperties}
                >
                  Accéder à l&apos;app
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal direction="right">
              <SectionHeading
                label="Ce qui nous guide"
                title={
                  <>
                    Nos valeurs, <Accent>en actes</Accent>
                  </>
                }
                text="Prix clairs, horaires fiables, paiements traçables. Aucune mauvaise surprise : c'est notre engagement envers chaque voyageur béninois."
              />
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
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
        </div>
      </section>

      {/* ───────── SERVICES ───────── */}
      <section id="services" className="py-[90px]">
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

      {/* ───────── DESTINATIONS (cartes façon "Our Bus") ───────── */}
      <section className="bg-[#f4fbfd] py-[90px]">
        <div className={wrap}>
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal direction="left">
              <SectionHeading
                label="Nos trajets phares"
                title={
                  <>
                    Nos meilleures <Accent>destinations</Accent>
                  </>
                }
                text="Du Sud au Nord, partez à la rencontre d'un Bénin authentique."
              />
            </Reveal>
            <Reveal direction="right">
              <Link
                href="/destinations"
                className="hover-sweep inline-flex items-center gap-2 rounded-[6px] bg-[#FF8C42] px-7 py-3.5 font-semibold text-white"
                style={sweepNavy}
              >
                Toutes les destinations
                <ArrowRight size={18} />
              </Link>
            </Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trajets.map((t, i) => (
              <Reveal key={t.numero} direction="up" delay={i * 150}>
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

      {/* ───────── TÉMOIGNAGES ───────── */}
      <section className="py-[90px]">
        <div className={wrap}>
          <Reveal direction="up">
            <SectionHeading
              align="center"
              label="Ils voyagent avec nous"
              title={
                <>
                  La confiance de <Accent>tout un pays</Accent>
                </>
              }
            />
          </Reveal>
          <Reveal direction="up" delay={150} className="mt-12">
            <Testimonials items={temoignages} />
          </Reveal>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="bg-[#f4fbfd] py-[90px]">
        <div className={`${wrap} grid gap-12 lg:grid-cols-2`}>
          <Reveal direction="left">
            <SectionHeading
              label="Questions fréquentes"
              title={
                <>
                  Vous avez des questions ? <Accent>On a les réponses.</Accent>
                </>
              }
              text="Réserver en ligne pour la première fois peut soulever des interrogations, c'est tout à fait normal. Chez SENAN Travel, la transparence est notre priorité."
            />
            <Link
              href="/contact"
              className="hover-sweep mt-8 inline-flex items-center gap-2 rounded-[6px] bg-[#FF8C42] px-7 py-3.5 font-semibold text-white"
              style={sweepNavy}
            >
              Nous écrire
              <ArrowRight size={18} />
            </Link>
          </Reveal>
          <Reveal direction="right">
            <Faq items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ───────── NEWSLETTER ───────── */}
      <section className="py-[90px]">
        <div className={wrap}>
          <Reveal direction="up">
            <div className="rounded-[10px] bg-[#00B4D8] px-6 py-16 text-center text-white">
              <h2 className="mx-auto max-w-2xl text-[34px] font-bold leading-[1.1] lg:text-[42px]">
                Restez informé, recevez nos meilleures offres
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.7]">
                Inscrivez-vous et soyez le premier à profiter de nos promotions exclusives, nouveaux trajets et bons
                plans voyage directement dans votre boîte mail.
              </p>
              <NewsletterForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
