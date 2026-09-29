"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Users,
  ArrowLeft,
  ArrowRight,
  Check,
  Smartphone,
  CreditCard,
  Landmark,
  Loader2,
  PartyPopper,
} from "lucide-react";
import { useApp, fcfa, type Ticket } from "./AppProvider";
import { trajets } from "../../data/senan";

const villes = ["Cotonou", "Calavi", "Bohicon", "Parakou", "Djougou", "Natitingou"];

const horaires = [
  { heure: "06:00", prix: 5000 },
  { heure: "09:30", prix: 5000 },
  { heure: "13:00", prix: 5500 },
  { heure: "17:00", prix: 5500 },
];

const moyens = [
  { id: "mtn", label: "MTN Mobile Money", icon: Smartphone },
  { id: "moov", label: "Moov Money", icon: Smartphone },
  { id: "celtiis", label: "Celtiis Cash", icon: Landmark },
  { id: "carte", label: "Carte bancaire", icon: CreditCard },
];

const steps = ["Trajet", "Voyageur", "Paiement", "Ticket"];

const inputClass =
  "w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-[15px] outline-none focus:border-[#00B4D8]";

export default function EtapeTrajet() {
  const { profile, saveProfile, addTicket } = useApp();

  const [step, setStep] = useState(1);
  const [departure, setDeparture] = useState("Cotonou");
  const [destination, setDestination] = useState("Parakou");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [selectedTime, setSelectedTime] = useState("06:00");
  const [price, setPrice] = useState(5000);

  const [nom, setNom] = useState(profile.nom);
  const [telephone, setTelephone] = useState(profile.telephone);

  const [methode, setMethode] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState<string | null>(null);

  const total = price * passengers;
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // Pré-remplissage depuis la recherche faite sur le site (ex: /reservations?depart=Cotonou&destination=Parakou&date=...).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const d = params.get("depart");
    const a = params.get("destination");
    const dt = params.get("date");
    const p = Number(params.get("passagers"));
    if (d && villes.includes(d)) setDeparture(d);
    if (a && villes.includes(a)) setDestination(a);
    if (dt) setDate(dt);
    if (p >= 1 && p <= 8) setPassengers(p);
  }, []);

  const goNext = () => {
    if (step === 1) {
      if (!date) return setError("Choisis une date de départ pour continuer.");
      if (departure === destination) return setError("Le départ et la destination doivent être différents.");
    }
    if (step === 2) {
      if (nom.trim().length < 2) return setError("Indique ton nom complet pour continuer.");
      if (telephone.trim().length < 8) return setError("Indique un numéro de téléphone valide pour continuer.");
      saveProfile({ ...profile, nom, telephone });
    }
    setError(null);
    setStep((s) => Math.min(s + 1, 4));
  };
  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 1));
  };

  const payer = () => {
    if (!methode) return setError("Choisis un moyen de paiement pour continuer.");
    setError(null);
    setProcessing(true);
    // Paiement simulé : aucun gateway n'est encore branché.
    setTimeout(() => {
      const t = addTicket({
        depart: departure,
        destination,
        date,
        heure: selectedTime,
        passagers: passengers,
        total,
        methode: moyens.find((m) => m.id === methode)?.label ?? methode,
        passager: nom,
        telephone,
      });
      setTicket(t);
      setProcessing(false);
      setStep(4);
    }, 1400);
  };

  return (
    <div>
      {/* Fil d'étapes */}
      <div className="mb-8 flex items-center justify-between gap-2">
        {steps.map((label, i) => {
          const n = i + 1;
          const active = step === n;
          const done = step > n;
          return (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    done
                      ? "bg-[#00B4D8] text-white"
                      : active
                      ? "bg-[#FF8C42] text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {done ? <Check size={16} /> : n}
                </div>
                <span
                  className={`hidden text-[11px] font-semibold sm:block ${
                    active || done ? "text-[#1B263B]" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {n < steps.length && (
                <div className={`mx-1 h-0.5 flex-1 rounded ${done ? "bg-[#00B4D8]" : "bg-slate-100"}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl bg-white p-4 shadow-[0_3px_15px_rgba(0,0,0,0.06)] sm:p-6">
          {/* Étape 1 : trajet */}
          {step === 1 && (
            <div>
              <p className="mb-5 text-lg font-bold text-[#1B263B] sm:text-xl">Choisis ton trajet</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-500">Ville de départ</label>
                  <div className="relative">
                    <MapPin size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#00B4D8]" />
                    <select value={departure} onChange={(e) => setDeparture(e.target.value)} className={`${inputClass} appearance-none`}>
                      {villes.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-500">Destination</label>
                  <div className="relative">
                    <MapPin size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#00B4D8]" />
                    <select value={destination} onChange={(e) => setDestination(e.target.value)} className={`${inputClass} appearance-none`}>
                      {villes.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="date" className="mb-2 block text-sm font-semibold text-slate-500">Date de départ</label>
                  <div className="relative">
                    <Calendar size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#00B4D8]" />
                    <input id="date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="passager" className="mb-2 block text-sm font-semibold text-slate-500">Passagers</label>
                  <div className="relative">
                    <Users size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#00B4D8]" />
                    <input
                      id="passager"
                      type="number"
                      min={1}
                      max={8}
                      value={passengers}
                      onChange={(e) => setPassengers(Math.max(1, Math.min(8, Number(e.target.value) || 1)))}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {departure === destination && (
                <p className="mt-3 text-sm font-medium text-[#FF8C42]">Le départ et la destination doivent être différents.</p>
              )}

              <div className="mt-8">
                <h3 className="mb-4 font-semibold text-[#1B263B]">Horaire de départ</h3>
                <div className="flex flex-wrap gap-3">
                  {horaires.map((h) => (
                    <button
                      key={h.heure}
                      type="button"
                      onClick={() => {
                        setSelectedTime(h.heure);
                        setPrice(h.prix);
                      }}
                      className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
                        selectedTime === h.heure ? "border-[#00B4D8] bg-cyan-50 text-[#00B4D8]" : "border-slate-200 text-slate-600"
                      }`}
                    >
                      {h.heure} · {h.prix.toLocaleString("fr-FR")} F
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Étape 2 : voyageur */}
          {step === 2 && (
            <div>
              <p className="mb-5 text-lg font-bold text-[#1B263B] sm:text-xl">Tes informations</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="nom" className="mb-2 block text-sm font-semibold text-slate-500">Nom complet</label>
                  <input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Ex : Adjovi Kponou" className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-[#00B4D8]" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="tel" className="mb-2 block text-sm font-semibold text-slate-500">Numéro de téléphone</label>
                  <input id="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="+229 01 XX XX XX XX" className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-[#00B4D8]" />
                  <p className="mt-2 text-xs text-slate-500">Ton ticket et tes notifications de voyage seront liés à ce numéro.</p>
                </div>
              </div>
            </div>
          )}

          {/* Étape 3 : paiement */}
          {step === 3 && (
            <div>
              <p className="mb-5 text-lg font-bold text-[#1B263B] sm:text-xl">Moyen de paiement</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {moyens.map((m) => {
                  const Icon = m.icon;
                  const active = methode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethode(m.id)}
                      className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left font-semibold transition ${
                        active ? "border-[#00B4D8] bg-cyan-50 text-[#00B4D8]" : "border-slate-200 text-slate-600"
                      }`}
                    >
                      <Icon size={22} />
                      {m.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Paiement de démonstration : aucun prélèvement réel n&apos;est effectué pour le moment.
              </p>

              <button
                type="button"
                disabled={processing}
                onClick={payer}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#FF8C42] px-6 py-3.5 font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {processing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Paiement en cours…
                  </>
                ) : (
                  <>Payer {fcfa(total)}</>
                )}
              </button>
            </div>
          )}

          {/* Étape 4 : ticket */}
          {step === 4 && ticket && (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00B4D8]/10 text-[#00B4D8]">
                <PartyPopper size={30} />
              </div>
              <h3 className="text-xl font-bold text-[#1B263B] sm:text-2xl">Réservation confirmée !</h3>
              <p className="mt-2 text-sm text-slate-500">Ton ticket digital est prêt. Réf. {ticket.ref}</p>

              <div className="mx-auto mt-6 max-w-sm rounded-2xl border-2 border-dashed border-[#00B4D8] bg-cyan-50 p-6 text-left">
                <p className="text-sm text-slate-500">Trajet</p>
                <p className="text-lg font-bold text-[#1B263B]">{ticket.depart} → {ticket.destination}</p>
                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-slate-500">Date</span>
                  <span className="font-semibold text-[#1B263B]">{ticket.date} · {ticket.heure}</span>
                </div>
                <div className="mt-1 flex justify-between text-sm">
                  <span className="text-slate-500">Passager</span>
                  <span className="font-semibold text-[#1B263B]">{ticket.passager}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/reservations/tickets" className="rounded-full bg-[#00B4D8] px-6 py-3 font-semibold text-white">
                  Voir mon ticket
                </Link>
                <Link href="/reservations/recus" className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-[#1B263B]">
                  Voir le reçu
                </Link>
              </div>
            </div>
          )}

          {/* Navigation */}
          {step < 4 && (
            <div className="mt-10">
              {error && (
                <p className="mb-4 rounded-xl bg-orange-50 px-4 py-3 text-sm font-medium text-[#FF8C42]">{error}</p>
              )}
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 1}
                  className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 font-semibold text-slate-600 disabled:opacity-0"
                >
                  <ArrowLeft size={16} />
                  Retour
                </button>
                {step < 3 && (
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex items-center gap-2 rounded-full bg-[#FF8C42] px-6 py-2.5 font-semibold text-white shadow-lg"
                  >
                    Continuer
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Récapitulatif */}
        {step < 4 && (
          <div className="h-fit rounded-2xl bg-slate-100 p-6 sm:p-8">
            <h3 className="mb-6 text-xl font-bold text-[#1B263B]">Récapitulatif</h3>
            <div className="space-y-4 text-[15px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Trajet</span>
                <span className="font-semibold text-[#1B263B]">{departure} → {destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date</span>
                <span className="font-semibold text-[#1B263B]">{date || "À choisir"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Départ</span>
                <span className="font-semibold text-[#1B263B]">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Passagers</span>
                <span className="font-semibold text-[#1B263B]">{passengers} {passengers > 1 ? "adultes" : "adulte"}</span>
              </div>
              <hr className="border-slate-200" />
              <div className="flex items-center justify-between">
                <span className="text-lg text-[#1B263B]">Total</span>
                <span className="text-2xl font-bold text-[#1B263B]">{fcfa(total)}</span>
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase text-slate-400">Trajets populaires</p>
              <div className="flex flex-col gap-2">
                {trajets.map((t) => (
                  <button
                    key={t.numero}
                    type="button"
                    onClick={() => {
                      const [d, a] = t.ville.split(" - ");
                      if (d) setDeparture(d);
                      if (a) setDestination(a);
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm font-semibold text-[#1B263B] hover:border-[#00B4D8]"
                  >
                    {t.ville}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
