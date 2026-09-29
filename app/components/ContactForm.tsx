"use client";

import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";

const field =
  "rounded-[6px] border border-[#eaeaea] bg-white px-4 py-3 outline-none focus:border-[#00B4D8]";

/**
 * Il n'y a pas encore de serveur ni de service d'e-mail branché sur ce site.
 * En attendant, le formulaire ouvre WhatsApp avec le message pré-rempli,
 * vers le numéro de SENAN Travel : c'est la seule façon de faire arriver
 * réellement le message à quelqu'un sans backend.
 */
export default function ContactForm({ whatsappNumber }: { whatsappNumber: string }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nom = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const tel = String(form.get("tel") || "").trim();
    const message = String(form.get("message") || "").trim();

    if (!nom || !tel || !message) {
      setError("Merci de renseigner au moins ton nom, ton numéro et ton message.");
      return;
    }
    setError(null);

    const texte = [
      `Bonjour SENAN Travel, je m'appelle ${nom}.`,
      email && `E-mail : ${email}`,
      `Téléphone : ${tel}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(texte)}`, "_blank", "noopener,noreferrer");
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={onSubmit} className="mt-10 grid gap-4 rounded-[10px] border border-[#eaeaea] bg-white p-[30px] shadow-[0_3px_15px_rgba(0,0,0,0.05)] sm:grid-cols-2">
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-2 text-sm font-semibold text-[#1B263B]">Nom complet</label>
        <input id="name" name="name" type="text" required placeholder="KODJO Eric" className={field} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 text-sm font-semibold text-[#1B263B]">Votre adresse e-mail</label>
        <input id="email" name="email" type="email" placeholder="kodjoeric@gmail.com" className={field} />
      </div>
      <div className="flex flex-col sm:col-span-2">
        <label htmlFor="tel" className="mb-2 text-sm font-semibold text-[#1B263B]">Votre numéro WhatsApp</label>
        <input id="tel" name="tel" type="tel" required placeholder="+2290197000000" className={field} />
      </div>
      <div className="flex flex-col sm:col-span-2">
        <label htmlFor="message" className="mb-2 text-sm font-semibold text-[#1B263B]">Votre message</label>
        <textarea id="message" name="message" required rows={5} placeholder="Bonjour je souhaite...." className={field} />
      </div>

      {error && <p className="sm:col-span-2 text-sm font-medium text-[#FF8C42]">{error}</p>}
      {sent && (
        <p className="sm:col-span-2 flex items-center gap-2 text-sm font-medium text-[#00B4D8]">
          <Check size={16} /> WhatsApp s&apos;est ouvert avec ton message pré-rempli, il ne reste qu&apos;à l&apos;envoyer.
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="hover-sweep flex items-center gap-2 rounded-[6px] bg-[#FF8C42] px-8 py-3.5 font-semibold text-white"
          style={{ "--sweep-color": "#1B263B" } as React.CSSProperties}
        >
          <Send size={18} />
          Envoyer sur WhatsApp
        </button>
      </div>
    </form>
  );
}
