"use client";

import { useState } from "react";
import { Ticket, ShieldCheck, Bell, ArrowRight, Bus } from "lucide-react";
import { useApp } from "./AppProvider";

const slides = [
  {
    icon: Bus,
    titre: "Réserve en 2 minutes",
    texte: "Choisis ta ville de départ, ta destination et ton horaire. Tout se fait depuis ton téléphone.",
  },
  {
    icon: ShieldCheck,
    titre: "Paiement sécurisé",
    texte: "Mobile Money ou carte bancaire : ton paiement est protégé, ton ticket digital arrive aussitôt.",
  },
  {
    icon: Bell,
    titre: "Suis tes voyages",
    texte: "Tickets, reçus et notifications de départ, toujours accessibles, même après le voyage.",
  },
];

const field = "h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-[#00B4D8]";

export default function Onboarding() {
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(0);
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isRegister = step === slides.length;

  const next = () => {
    if (!isRegister) {
      setStep((s) => s + 1);
      return;
    }
    if (nom.trim().length < 2) return setError("Indique ton nom pour continuer.");
    if (telephone.trim().length < 8) return setError("Indique un numéro de téléphone valide.");
    completeOnboarding({ nom, telephone });
  };

  const skip = () => completeOnboarding();

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-white">
      <div className="flex justify-end p-4">
        {!isRegister && (
          <button onClick={skip} className="text-sm font-semibold text-slate-400">
            Passer
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        {!isRegister ? (
          (() => {
            const Slide = slides[step];
            const Icon = Slide.icon;
            return (
              <>
                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#00B4D8]/10 text-[#00B4D8]">
                  <Icon size={44} />
                </div>
                <h1 className="text-2xl font-bold text-[#1B263B]">{Slide.titre}</h1>
                <p className="mt-3 max-w-xs text-slate-500">{Slide.texte}</p>
              </>
            );
          })()
        ) : (
          <div className="w-full max-w-sm text-left">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FF8C42]/10 text-[#FF8C42]">
                <Ticket size={28} />
              </div>
              <h1 className="text-2xl font-bold text-[#1B263B]">Créer ton compte</h1>
              <p className="mt-2 text-sm text-slate-500">Pour retrouver tes tickets et reçus à tout moment.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="on-nom" className="mb-2 block text-sm font-semibold text-slate-500">Nom complet</label>
                <input id="on-nom" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Ex : Adjovi Kponou" className={field} />
              </div>
              <div>
                <label htmlFor="on-tel" className="mb-2 block text-sm font-semibold text-slate-500">Numéro de téléphone</label>
                <input id="on-tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="+229 01 XX XX XX XX" className={field} />
              </div>
            </div>
            {error && <p className="mt-3 text-sm font-medium text-[#FF8C42]">{error}</p>}
          </div>
        )}
      </div>

      <div className="px-6 pb-10">
        {!isRegister && (
          <div className="mb-6 flex justify-center gap-2">
            {slides.map((_, i) => (
              <span key={i} className={`h-2 rounded-full transition-all ${i === step ? "w-6 bg-[#00B4D8]" : "w-2 bg-slate-200"}`} />
            ))}
          </div>
        )}
        <button
          onClick={next}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF8C42] py-4 font-semibold text-white shadow-lg"
        >
          {isRegister ? "Commencer" : "Suivant"}
          <ArrowRight size={18} />
        </button>
        {isRegister && (
          <button onClick={skip} className="mt-3 w-full text-center text-sm font-semibold text-slate-400">
            Plus tard
          </button>
        )}
      </div>
    </div>
  );
}
