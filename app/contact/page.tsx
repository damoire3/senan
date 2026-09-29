import type { CSSProperties } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import SectionHeading, { Accent } from "../components/SectionHeading";
import ContactForm from "../components/ContactForm";
import { contact, unsplash } from "../data/senan";

const sweepNavy = { "--sweep-color": "#1B263B" } as CSSProperties;
const wrap = "mx-auto w-full max-w-[1200px] px-5";

const infos = [
  { icon: MapPin, titre: "Adresse", valeur: contact.adresse, href: undefined },
  { icon: Phone, titre: "Téléphone", valeur: contact.telAffiche, href: contact.telHref },
  { icon: Mail, titre: "E-mail", valeur: contact.email, href: `mailto:${contact.email}` },
  { icon: Clock, titre: "Horaires", valeur: contact.horaires, href: undefined },
];

export default function Contact() {
  return (
    <>
      <PageBanner
        title="Contactez SENAN Travel"
        current="Contact"
        text="Une question sur une réservation, un trajet ou nos services ? Notre équipe est disponible pour vous répondre rapidement."
        image={unsplash.busStation}
      />

      <section className="py-[90px]">
        <div className={wrap}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {infos.map((info, i) => {
              const Icon = info.icon;
              const content = (
                <>
                  <div className="mb-5 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#00B4D8]/10 text-[#00B4D8] transition-all duration-300 group-hover:bg-white group-hover:text-[#1B263B]">
                    <Icon size={30} />
                  </div>
                  <h3 className="mb-2 text-[24px] font-semibold leading-[1.2] text-[#1B263B] transition-colors duration-300 group-hover:text-white">
                    {info.titre}
                  </h3>
                  <p className="break-words text-[15px] text-[#575a5f] transition-colors duration-300 group-hover:text-white/80">
                    {info.valeur}
                  </p>
                </>
              );
              return (
                <Reveal key={info.titre} direction="up" delay={i * 120}>
                  <div
                    className="hover-sweep group h-full rounded-[10px] border border-[#eaeaea] bg-white p-[30px] shadow-[0_3px_15px_rgba(0,0,0,0.05)]"
                    style={sweepNavy}
                  >
                    {info.href ? <a href={info.href}>{content}</a> : content}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f4fbfd] py-[90px]">
        <div className={`${wrap} mx-auto max-w-[800px]`}>
          <Reveal direction="up">
            <SectionHeading
              align="center"
              label="Nous sommes à votre écoute"
              title={
                <>
                  Envoyez-nous <Accent>un message</Accent>
                </>
              }
              text="Remplissez le formulaire ci-dessous et nous reviendrons vers vous dans les plus brefs délais."
            />
          </Reveal>
          <Reveal direction="up" delay={150}>
            <ContactForm whatsappNumber={contact.telAffiche.replace(/[^0-9]/g, "")} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
