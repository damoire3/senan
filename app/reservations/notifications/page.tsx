"use client";

import Link from "next/link";
import { Bell, BellOff } from "lucide-react";
import { useApp, formatDateTime } from "../_components/AppProvider";

export default function NotificationsPage() {
  const { notifs, ready, unread, markAllRead, markRead } = useApp();

  if (!ready) return null;

  if (notifs.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-white py-16 text-center shadow-[0_3px_15px_rgba(0,0,0,0.06)]">
        <BellOff size={40} className="mb-4 text-[#00B4D8]" />
        <h2 className="text-lg font-bold text-[#1B263B]">Pas encore de notification</h2>
        <p className="mt-2 max-w-xs text-sm text-slate-500">Tu seras notifié ici pour chaque réservation et rappel de voyage.</p>
        <Link href="/reservations" className="mt-6 rounded-full bg-[#FF8C42] px-6 py-3 font-semibold text-white">
          Réserver un trajet
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1B263B]">Notifications</h1>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-sm font-semibold text-[#00B4D8]">
            Tout marquer comme lu
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifs.map((n) => (
          <button
            key={n.id}
            onClick={() => markRead(n.id)}
            className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left shadow-[0_3px_15px_rgba(0,0,0,0.04)] ${
              n.lu ? "border-slate-100 bg-white" : "border-[#00B4D8]/30 bg-cyan-50"
            }`}
          >
            <span className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${n.lu ? "bg-slate-100 text-slate-400" : "bg-[#00B4D8] text-white"}`}>
              <Bell size={16} />
            </span>
            <span className="flex-1">
              <span className="flex items-center justify-between gap-2">
                <span className="font-semibold text-[#1B263B]">{n.titre}</span>
                {!n.lu && <span className="h-2 w-2 shrink-0 rounded-full bg-[#FF8C42]" />}
              </span>
              <span className="mt-1 block text-sm text-slate-500">{n.texte}</span>
              <span className="mt-1 block text-xs text-slate-400">{formatDateTime(n.date)}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
