import Image from "next/image";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";

/**
 * Bannière de page interne, façon "page header" du modèle : photo de fond
 * assombrie + overlay marine, titre + fil d'Ariane. Passe sous le header flottant.
 */
export default function PageBanner({
  title,
  text,
  current,
  image,
}: {
  title: string;
  text?: string;
  current: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#1B263B] pt-[150px] pb-[70px] lg:pt-[190px] lg:pb-[90px]">
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[#1B263B]/85" />
        </>
      )}
      <div className="relative mx-auto max-w-[1200px] px-5">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="md:w-2/3">
            <h1 className="text-[42px] font-bold leading-[1.1] text-white md:text-[52px] lg:text-[62px]">
              {title}
            </h1>
            {text && (
              <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-white/80">{text}</p>
            )}
          </div>
          <ul className="flex items-center gap-2 text-[15px] text-white">
            <li>
              <Link href="/" className="hover:text-[#00B4D8]">
                Accueil
              </Link>
            </li>
            <li className="text-[#00B4D8]">
              <ChevronsRight size={18} />
            </li>
            <li className="text-[#00B4D8]">{current}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
