import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import { contact } from "../data/senan";

const liens = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/destinations", label: "Destinations" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const social = [
  "M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m2.274 6.634h-1.443c-.171 0-.361.225-.361.524V8.6h1.805l-.273 1.486H10.47v4.461H8.767v-4.461H7.222V8.6h1.545v-.874c0-1.254.87-2.273 2.064-2.273h1.443z",
  "M13 10a3 3 0 1 1-6 0q.001-.257.049-.5H6v3.997c0 .278.225.503.503.503h6.995a.503.503 0 0 0 .502-.503V9.5h-1.049q.048.243.049.5m-3 2a2 2 0 1 0-.001-4.001A2 2 0 0 0 10 12m2.4-4.1h1.199a.3.3 0 0 0 .301-.3V6.401a.3.3 0 0 0-.301-.301H12.4a.3.3 0 0 0-.301.301V7.6c.001.165.136.3.301.3M10 .4A9.6 9.6 0 0 0 .4 10a9.6 9.6 0 0 0 9.6 9.6a9.6 9.6 0 0 0 9.6-9.6A9.6 9.6 0 0 0 10 .4m5 13.489C15 14.5 14.5 15 13.889 15H6.111C5.5 15 5 14.5 5 13.889V6.111C5 5.5 5.5 5 6.111 5h7.778C14.5 5 15 5.5 15 6.111z",
  "M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4M7.65 13.979H5.706V7.723H7.65zm-.984-7.024c-.614 0-1.011-.435-1.011-.973c0-.549.409-.971 1.036-.971s1.011.422 1.023.971c0 .538-.396.973-1.048.973m8.084 7.024h-1.944v-3.467c0-.807-.282-1.355-.985-1.355c-.537 0-.856.371-.997.728c-.052.127-.065.307-.065.486v3.607H8.814v-4.26c0-.781-.025-1.434-.051-1.996h1.689l.089.869h.039c.256-.408.883-1.01 1.932-1.01c1.279 0 2.238.857 2.238 2.699z",
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#1B263B] text-white">
      <div className="mx-auto max-w-[1200px] px-5 pt-[80px] pb-[40px]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marque */}
          <div>
            <span className="header-font text-[28px] font-bold leading-[1.1]">
              SENAN <span className="text-[#00B4D8]">Travel</span>
            </span>
            <p className="mt-5 text-[15px] leading-[1.7] text-white/80">
              &quot;Voyagez malin. Voyagez SENAN.&quot;
            </p>
            <div className="mt-6 flex gap-3">
              {social.map((d, i) => (
                <span
                  key={i}
                  className="hover-sweep flex h-10 w-10 items-center justify-center rounded-[6px] bg-white/10 text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <path fill="currentColor" d={d} />
                  </svg>
                </span>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="mb-6 text-[24px] font-semibold leading-[1.2]">Liens rapides</h4>
            <ul className="flex flex-col gap-3">
              {liens.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-2 text-[15px] text-white/80 transition-colors hover:text-[#00B4D8]"
                  >
                    <ChevronRight size={14} className="text-[#00B4D8]" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 text-[24px] font-semibold leading-[1.2]">Services</h4>
            <ul className="flex flex-col gap-3">
              {["Réservation en ligne", "Paiement Sécurisé", "Ticket digital", "Support voyageur"].map((s) => (
                <li key={s} className="flex items-center gap-2 text-[15px] text-white/80">
                  <ChevronRight size={14} className="text-[#00B4D8]" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-[24px] font-semibold leading-[1.2]">Contact</h4>
            <ul className="flex flex-col gap-4 text-[15px] text-white/80">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-[#00B4D8]" />
                {contact.adresse}
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-1 shrink-0 text-[#00B4D8]" />
                <a href={contact.telHref} className="hover:text-[#00B4D8]">{contact.telAffiche}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-1 shrink-0 text-[#00B4D8]" />
                <a href={`mailto:${contact.email}`} className="hover:text-[#00B4D8]">{contact.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-1 shrink-0 text-[#00B4D8]" />
                {contact.horaires}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-5 py-6 text-[14px] text-white/80 md:flex-row md:justify-between">
          <p>© 2026 SENAN Travel. Tous droits réservés</p>
          <p className="flex gap-8">
            <span>Mentions Légales</span>
            <span>Confidentialité</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
