import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import PageBanner from "../components/PageBanner";
import Reveal from "../components/Reveal";
import SectionHeading, { Accent } from "../components/SectionHeading";
import Faq from "../components/Faq";
import { faqs, unsplash } from "../data/senan";

const sweepNavy = { "--sweep-color": "#1B263B" } as CSSProperties;
const wrap = "mx-auto w-full max-w-[1200px] px-5";

export default function FaqPage() {
  return (
    <>
      <PageBanner
        title="FAQ"
        current="FAQ"
        text="Chez SENAN Travel, la transparence est notre priorité. Voici les réponses aux questions que nos clients posent le plus souvent."
        image={unsplash.streetAfrica}
      />

      <section className="py-[90px]">
        <div className={`${wrap} grid gap-12 lg:grid-cols-2`}>
          <Reveal direction="left">
            <SectionHeading
              label="Questions fréquentes"
              title={
                <>
                  Vous avez des questions ? <Accent>On a les réponses.</Accent>
                </>
              }
              text="Réserver en ligne pour la première fois peut soulever des interrogations, c'est tout à fait normal."
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
    </>
  );
}
