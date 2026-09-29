"use client";

import { useEffect, useState } from "react";
import { User, Ticket, Receipt, Download, Trash2, Check, Smartphone } from "lucide-react";
import { useApp } from "../_components/AppProvider";

const field = "h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-[#00B4D8]";

export default function ProfilPage() {
  const { profile, saveProfile, tickets, resetAll, ready, installed, canInstall, promptInstall } = useApp();
  const [nom, setNom] = useState(profile.nom);
  const [telephone, setTelephone] = useState(profile.telephone);
  const [email, setEmail] = useState(profile.email);
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    setNom(profile.nom);
    setTelephone(profile.telephone);
    setEmail(profile.email);
  }, [profile]);

  if (!ready) return null;

  const initiale = (nom || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="pb-6">
      <div className="mb-6 flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00B4D8] text-2xl font-bold text-white">
          {initiale}
        </span>
        <div>
          <h1 className="text-xl font-bold text-[#1B263B]">{nom || "Voyageur SENAN"}</h1>
          <p className="text-sm text-slate-500">{telephone || "Ajoute ton numéro"}</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white p-4 text-center shadow-[0_3px_15px_rgba(0,0,0,0.06)]">
          <Ticket className="mx-auto mb-2 text-[#00B4D8]" size={22} />
          <p className="text-2xl font-bold text-[#1B263B]">{tickets.length}</p>
          <p className="text-xs text-slate-500">Tickets</p>
        </div>
        <div className="rounded-2xl bg-white p-4 text-center shadow-[0_3px_15px_rgba(0,0,0,0.06)]">
          <Receipt className="mx-auto mb-2 text-[#00B4D8]" size={22} />
          <p className="text-2xl font-bold text-[#1B263B]">{tickets.length}</p>
          <p className="text-xs text-slate-500">Reçus</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-[0_3px_15px_rgba(0,0,0,0.06)] sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 font-bold text-[#1B263B]"><User size={18} /> Mes informations</h2>
        <div className="grid gap-4">
          <div>
            <label htmlFor="p-nom" className="mb-2 block text-sm font-semibold text-slate-500">Nom complet</label>
            <input id="p-nom" value={nom} onChange={(e) => setNom(e.target.value)} className={field} />
          </div>
          <div>
            <label htmlFor="p-tel" className="mb-2 block text-sm font-semibold text-slate-500">Téléphone</label>
            <input id="p-tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} className={field} />
          </div>
          <div>
            <label htmlFor="p-mail" className="mb-2 block text-sm font-semibold text-slate-500">E-mail (optionnel)</label>
            <input id="p-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
          </div>
        </div>
        <button
          onClick={() => {
            saveProfile({ nom, telephone, email });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          className="mt-5 flex items-center gap-2 rounded-full bg-[#FF8C42] px-6 py-3 font-semibold text-white"
        >
          {saved ? <Check size={18} /> : null}
          {saved ? "Enregistré" : "Enregistrer"}
        </button>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-[0_3px_15px_rgba(0,0,0,0.06)] sm:p-6">
        <h2 className="mb-2 flex items-center gap-2 font-bold text-[#1B263B]"><Download size={18} /> Installer l&apos;app</h2>
        <p className="mb-4 text-sm text-slate-500">
          Installe SENAN Travel sur ton téléphone pour réserver plus vite, sans repasser par le site.
        </p>
        {installed ? (
          <p className="flex items-center gap-2 text-sm font-semibold text-[#00B4D8]">
            <Smartphone size={18} /> App déjà installée sur cet appareil
          </p>
        ) : canInstall ? (
          <button
            onClick={promptInstall}
            className="flex items-center gap-2 rounded-full bg-[#1B263B] px-6 py-3 font-semibold text-white"
          >
            <Download size={18} />
            Installer l&apos;app
          </button>
        ) : (
          <p className="text-sm text-slate-400">
            L&apos;installation n&apos;est pas proposée par ton navigateur pour le moment (déjà installée, ou navigateur non compatible).
          </p>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-5 sm:p-6">
        <h2 className="mb-2 flex items-center gap-2 font-bold text-red-600"><Trash2 size={18} /> Réinitialiser mes données</h2>
        <p className="mb-4 text-sm text-red-500/80">
          Supprime ton profil, tes tickets et tes notifications enregistrés sur cet appareil. Cette action est irréversible.
        </p>
        {confirmReset ? (
          <div className="flex flex-wrap gap-3">
            <button onClick={() => { resetAll(); setConfirmReset(false); }} className="rounded-full bg-red-600 px-5 py-2.5 font-semibold text-white">
              Confirmer la suppression
            </button>
            <button onClick={() => setConfirmReset(false)} className="rounded-full border border-red-200 px-5 py-2.5 font-semibold text-red-600">
              Annuler
            </button>
          </div>
        ) : (
          <button onClick={() => setConfirmReset(true)} className="rounded-full border border-red-300 px-5 py-2.5 font-semibold text-red-600">
            Réinitialiser
          </button>
        )}
      </div>
    </div>
  );
}
