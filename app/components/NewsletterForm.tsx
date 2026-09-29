"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

/** Pas encore de service d'e-mailing branché : l'inscription est enregistrée localement pour la démo. */
export default function NewsletterForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("mail") || "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Entre une adresse e-mail valide.");
      return;
    }
    setError(null);
    setSent(true);
    e.currentTarget.reset();
  };

  if (sent) {
    return (
      <p className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 rounded-[6px] bg-white/15 px-6 py-3.5 font-semibold">
        <Check size={18} />
        Merci, ton adresse est enregistrée !
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-xl">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="mail"
          required
          placeholder="Entrer votre adresse mail"
          className="flex-1 rounded-[6px] bg-white px-4 py-3.5 text-black outline-none placeholder:text-black/60"
        />
        <button
          type="submit"
          className="hover-sweep rounded-[6px] bg-[#FF8C42] px-7 py-3.5 font-semibold text-white"
          style={{ "--sweep-color": "#1B263B" } as React.CSSProperties}
        >
          Je m&apos;inscris
        </button>
      </div>
      {error && <p className="mt-3 text-sm font-medium text-white">{error}</p>}
    </form>
  );
}
