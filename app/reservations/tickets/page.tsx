"use client";

import Link from "next/link";
import { Ticket as TicketIcon, MapPin, Calendar, User } from "lucide-react";
import { useApp, formatDate, fcfa, type Ticket } from "../_components/AppProvider";

function TicketCard({ t }: { t: Ticket }) {
  const passe = new Date(`${t.date}T00:00:00`) < new Date(new Date().toDateString());
  return (
    <div
      className={`overflow-hidden rounded-2xl border-2 border-dashed bg-white shadow-[0_3px_15px_rgba(0,0,0,0.06)] ${
        passe ? "border-slate-200 opacity-70" : "border-[#00B4D8]"
      }`}
    >
      <div className="flex items-center justify-between bg-[#1B263B] px-5 py-3 text-white">
        <span className="text-sm font-semibold tracking-wide">{t.ref}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${passe ? "bg-white/15" : "bg-[#00B4D8]"}`}>
          {passe ? "Voyage effectué" : "À venir"}
        </span>
      </div>
      <div className="p-5">
        <p className="text-lg font-bold text-[#1B263B]">{t.depart} → {t.destination}</p>
        <div className="mt-3 grid gap-2 text-sm text-slate-600">
          <span className="flex items-center gap-2"><Calendar size={16} className="text-[#00B4D8]" /> {formatDate(t.date)} · {t.heure}</span>
          <span className="flex items-center gap-2"><User size={16} className="text-[#00B4D8]" /> {t.passager} · {t.passagers} {t.passagers > 1 ? "places" : "place"}</span>
          <span className="flex items-center gap-2"><MapPin size={16} className="text-[#00B4D8]" /> {t.telephone}</span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="font-bold text-[#1B263B]">{fcfa(t.total)}</span>
          <Link href="/reservations/recus" className="text-sm font-semibold text-[#00B4D8]">Voir le reçu →</Link>
        </div>
      </div>
    </div>
  );
}

export default function TicketsPage() {
  const { tickets, ready } = useApp();

  if (!ready) return null;

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-white py-16 text-center shadow-[0_3px_15px_rgba(0,0,0,0.06)]">
        <TicketIcon size={40} className="mb-4 text-[#00B4D8]" />
        <h2 className="text-lg font-bold text-[#1B263B]">Aucun ticket pour l&apos;instant</h2>
        <p className="mt-2 max-w-xs text-sm text-slate-500">Réserve ton premier trajet, ton ticket digital apparaîtra ici.</p>
        <Link href="/reservations" className="mt-6 rounded-full bg-[#FF8C42] px-6 py-3 font-semibold text-white">
          Réserver un trajet
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#1B263B]">Mes tickets</h1>
      <div className="grid gap-5 sm:grid-cols-2">
        {tickets.map((t) => (
          <TicketCard key={t.id} t={t} />
        ))}
      </div>
    </div>
  );
}
