"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Bus, Ticket, Receipt, Bell, User, Globe } from "lucide-react";
import { useApp } from "./AppProvider";
import InstallBanner from "./InstallBanner";

const tabs = [
  { href: "/reservations", label: "Réserver", icon: Bus },
  { href: "/reservations/tickets", label: "Tickets", icon: Ticket },
  { href: "/reservations/recus", label: "Reçus", icon: Receipt },
  { href: "/reservations/notifications", label: "Notifs", icon: Bell },
  { href: "/reservations/profil", label: "Profil", icon: User },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { unread } = useApp();

  const isActive = (href: string) =>
    href === "/reservations" ? pathname === href : pathname.startsWith(href);

  const badge = (href: string) =>
    href.endsWith("notifications") && unread > 0 ? (
      <span className="absolute -top-1 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF8C42] px-1 text-[10px] font-bold text-white">
        {unread > 9 ? "9+" : unread}
      </span>
    ) : null;

  return (
    <div className="min-h-screen bg-[#f4fbfd] pb-[88px] md:pb-10">
      {/* Barre du haut */}
      <header className="sticky top-0 z-40 bg-white shadow-[0_3px_15px_rgba(0,0,0,0.06)] print:hidden">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between gap-4 px-4 py-3">
          <Link href="/reservations" className="header-font text-xl font-bold text-[#1B263B]">
            SENAN <span className="text-[#00B4D8]">Travel</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {tabs.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive(href) ? "bg-[#00B4D8]/10 text-[#00B4D8]" : "text-[#1B263B] hover:text-[#00B4D8]"
                }`}
              >
                <Icon size={18} />
                {label}
                {badge(href)}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-[#eaeaea] px-3 py-2 text-sm font-semibold text-[#1B263B] hover:text-[#00B4D8]"
          >
            <Globe size={16} />
            <span className="hidden sm:inline">Site</span>
          </Link>
        </div>
      </header>

      <InstallBanner />

      <main className="mx-auto max-w-[1000px] px-4 pt-6">{children}</main>

      {/* Navigation basse (mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-[#eaeaea] bg-white pb-[env(safe-area-inset-bottom)] md:hidden print:hidden">
        {tabs.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold ${
              isActive(href) ? "text-[#00B4D8]" : "text-slate-500"
            }`}
          >
            <span className="relative">
              <Icon size={22} />
              {badge(href)}
            </span>
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
