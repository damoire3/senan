"use client";

import { useState } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { useApp } from "./AppProvider";

/** Alerte d'installation affichée en haut de l'app tant qu'elle n'est pas installée. */
export default function InstallBanner() {
  const { canInstall, installed, promptInstall } = useApp();
  const [dismissed, setDismissed] = useState(false);

  if (installed || !canInstall || dismissed) return null;

  return (
    <div className="border-b border-[#00B4D8]/20 bg-gradient-to-r from-[#00B4D8] to-[#0090ac] px-4 py-3 text-white print:hidden">
      <div className="mx-auto flex max-w-[1000px] items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
          <Smartphone size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">Installe l&apos;app SENAN Travel</p>
          <p className="truncate text-xs text-white/80">Réserve en un clic, sans repasser par le site.</p>
        </div>
        <button
          onClick={promptInstall}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#00B4D8]"
        >
          <Download size={16} />
          <span className="hidden sm:inline">Installer</span>
        </button>
        <button
          aria-label="Fermer"
          onClick={() => setDismissed(true)}
          className="shrink-0 text-white/80 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
