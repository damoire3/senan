"use client";

import Link from "next/link";
import { Receipt, Printer } from "lucide-react";
import { useApp, formatDate, formatDateTime, fcfa } from "../_components/AppProvider";

export default function RecusPage() {
  const { tickets, ready } = useApp();

  if (!ready) return null;

  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-white py-16 text-center shadow-[0_3px_15px_rgba(0,0,0,0.06)]">
        <Receipt size={40} className="mb-4 text-[#00B4D8]" />
        <h2 className="text-lg font-bold text-[#1B263B]">Aucun reçu pour l&apos;instant</h2>
        <p className="mt-2 max-w-xs text-sm text-slate-500">Tes reçus de paiement apparaîtront ici après une réservation.</p>
        <Link href="/reservations" className="mt-6 rounded-full bg-[#FF8C42] px-6 py-3 font-semibold text-white">
          Réserver un trajet
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#1B263B]">Mes reçus</h1>
      <div className="space-y-5">
        {tickets.map((t) => (
          <div key={t.id} className="rounded-2xl bg-white p-5 shadow-[0_3px_15px_rgba(0,0,0,0.06)] sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-dashed border-slate-200 pb-4">
              <div>
                <p className="header-font text-lg font-bold text-[#1B263B]">SENAN Travel</p>
                <p className="text-xs text-slate-500">Reçu de paiement</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#1B263B]">Réf. {t.ref}</p>
                <p className="text-xs text-slate-500">{formatDateTime(t.creeLe)}</p>
              </div>
            </div>

            <div className="grid gap-4 py-4 text-sm sm:grid-cols-2">
              <div>
                <p className="text-slate-400">Passager</p>
                <p className="font-semibold text-[#1B263B]">{t.passager}</p>
              </div>
              <div>
                <p className="text-slate-400">Téléphone</p>
                <p className="font-semibold text-[#1B263B]">{t.telephone}</p>
              </div>
              <div>
                <p className="text-slate-400">Trajet</p>
                <p className="font-semibold text-[#1B263B]">{t.depart} → {t.destination}</p>
              </div>
              <div>
                <p className="text-slate-400">Date de voyage</p>
                <p className="font-semibold text-[#1B263B]">{formatDate(t.date)} · {t.heure}</p>
              </div>
              <div>
                <p className="text-slate-400">Passagers</p>
                <p className="font-semibold text-[#1B263B]">{t.passagers}</p>
              </div>
              <div>
                <p className="text-slate-400">Moyen de paiement</p>
                <p className="font-semibold text-[#1B263B]">{t.methode}</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-4">
              <span className="text-slate-500">Montant payé</span>
              <span className="text-xl font-bold text-[#1B263B]">{fcfa(t.total)}</span>
            </div>

            <button
              onClick={() => window.print()}
              className="mt-5 flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-[#1B263B] print:hidden"
            >
              <Printer size={16} />
              Imprimer / enregistrer en PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
