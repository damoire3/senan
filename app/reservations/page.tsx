import Link from "next/link";
import { PhoneIcon, MapPinIcon, Mail, Clock, MessageCircle } from "lucide-react";
import EtapeTrajet from "./_components/EtapeTrajet";
import PromoBanner from "./_components/PromoBanner";
import { contact } from "../data/senan";

export default function Reservation() {
  return (
    <div className="pb-10">
      <PromoBanner />

      <div className="mb-8 text-center sm:text-left">
        <p className="mb-2 text-sm font-bold text-[#00B4D8]">RÉSERVER EN LIGNE</p>
        <h1 className="text-2xl font-bold text-[#1B263B] sm:text-3xl">Réserve ton billet en 4 étapes</h1>
        <p className="mt-2 text-sm text-slate-500">
          C&apos;est ici, dans l&apos;app, que tout se passe : réservation, ticket, reçu et notifications.
        </p>
      </div>

      <EtapeTrajet />

      <div className="mt-10 rounded-2xl bg-white p-5 shadow-[0_3px_15px_rgba(0,0,0,0.06)] sm:p-8">
        <p className="mb-2 text-sm font-bold text-[#00B4D8]">BESOIN D&apos;AIDE ?</p>
        <h2 className="mb-2 text-xl font-bold text-[#1B263B] sm:text-2xl">Vous préférez réserver autrement ?</h2>
        <p className="mb-5 text-sm text-slate-500">
          Notre équipe vous accompagne par téléphone, WhatsApp ou en agence. Réponse rapide, 7j/7.
        </p>

        <div className="mb-6 flex flex-wrap gap-3">
          <a href={contact.telHref} className="flex items-center gap-2 rounded-full bg-[#00B4D8] px-4 py-2.5 font-semibold text-white shadow-lg">
            <PhoneIcon size={18} />
            Appeler
          </a>
          <a
            href={`https://wa.me/${contact.telAffiche.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#00B4D8] px-4 py-2.5 font-semibold text-[#1B263B]"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-[#00B4D8] bg-[#e5eff1] p-2">
              <MapPinIcon size={20} className="text-[#00B4D8]" />
            </div>
            <div>
              <p className="text-sm font-bold">Agence</p>
              <p className="text-sm text-slate-500">{contact.adresse}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-[#00B4D8] bg-[#e5eff1] p-2">
              <PhoneIcon size={20} className="text-[#00B4D8]" />
            </div>
            <div>
              <p className="text-sm font-bold">Téléphone</p>
              <Link className="text-sm text-slate-500" href={contact.telHref}>{contact.telAffiche}</Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-[#00B4D8] bg-[#e5eff1] p-2">
              <Mail size={20} className="text-[#00B4D8]" />
            </div>
            <div>
              <p className="text-sm font-bold">Email</p>
              <Link className="text-sm text-slate-500" href={`mailto:${contact.email}`}>{contact.email}</Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-[#00B4D8] bg-[#e5eff1] p-2">
              <Clock size={20} className="text-[#00B4D8]" />
            </div>
            <div>
              <p className="text-sm font-bold">Horaire</p>
              <p className="text-sm text-slate-500">{contact.horaires}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
