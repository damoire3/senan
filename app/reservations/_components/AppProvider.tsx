"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Ticket = {
  id: string;
  ref: string;
  depart: string;
  destination: string;
  date: string; // YYYY-MM-DD
  heure: string;
  passagers: number;
  total: number;
  methode: string;
  passager: string;
  telephone: string;
  creeLe: string; // ISO
};

export type NewTicket = Omit<Ticket, "id" | "ref" | "creeLe">;

export type Notif = {
  id: string;
  titre: string;
  texte: string;
  date: string; // ISO
  lu: boolean;
};

export type Profile = { nom: string; telephone: string; email: string };

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type State = { profile: Profile; tickets: Ticket[]; notifs: Notif[]; onboarded: boolean };

const KEY = "senan-app-v1";
const empty: State = { profile: { nom: "", telephone: "", email: "" }, tickets: [], notifs: [], onboarded: false };

const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

const makeRef = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return "SNN-" + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

type Ctx = State & {
  ready: boolean;
  unread: number;
  addTicket: (t: NewTicket) => Ticket;
  saveProfile: (p: Profile) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
  resetAll: () => void;
  completeOnboarding: (p?: Partial<Profile>) => void;
  installed: boolean;
  canInstall: boolean;
  promptInstall: () => void;
};

const AppContext = createContext<Ctx | null>(null);

/**
 * État de l'app (tickets, reçus, notifications, profil).
 * Pour l'instant tout est stocké localement sur l'appareil (localStorage) :
 * il n'y a pas encore de serveur ni de vrai paiement.
 */
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(empty);
  const [ready, setReady] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw);
        setState({
          profile: { ...empty.profile, ...(p.profile ?? {}) },
          tickets: Array.isArray(p.tickets) ? p.tickets : [],
          notifs: Array.isArray(p.notifs) ? p.notifs : [],
          onboarded: !!p.onboarded,
        });
      }
    } catch {
      /* stockage indisponible */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* stockage indisponible */
    }
  }, [state, ready]);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setInstalled(isStandalone);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const promptInstall = useCallback(() => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.finally(() => setDeferredPrompt(null));
  }, [deferredPrompt]);

  const addTicket = useCallback((data: NewTicket): Ticket => {
    const ticket: Ticket = { ...data, id: uid(), ref: makeRef(), creeLe: new Date().toISOString() };
    const notif: Notif = {
      id: uid(),
      titre: "Réservation confirmée",
      texte: `${ticket.depart} → ${ticket.destination}, le ${ticket.date} à ${ticket.heure}. Réf. ${ticket.ref}`,
      date: ticket.creeLe,
      lu: false,
    };
    setState((s) => ({ ...s, tickets: [ticket, ...s.tickets], notifs: [notif, ...s.notifs] }));
    return ticket;
  }, []);

  const saveProfile = useCallback((profile: Profile) => setState((s) => ({ ...s, profile })), []);
  const markAllRead = useCallback(
    () => setState((s) => ({ ...s, notifs: s.notifs.map((n) => ({ ...n, lu: true })) })),
    []
  );
  const markRead = useCallback(
    (id: string) => setState((s) => ({ ...s, notifs: s.notifs.map((n) => (n.id === id ? { ...n, lu: true } : n)) })),
    []
  );
  const resetAll = useCallback(() => setState(empty), []);
  const completeOnboarding = useCallback(
    (p?: Partial<Profile>) =>
      setState((s) => ({ ...s, onboarded: true, profile: { ...s.profile, ...p } })),
    []
  );

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      ready,
      unread: state.notifs.filter((n) => !n.lu).length,
      addTicket,
      saveProfile,
      markAllRead,
      markRead,
      resetAll,
      completeOnboarding,
      installed,
      canInstall: !!deferredPrompt,
      promptInstall,
    }),
    [
      state,
      ready,
      addTicket,
      saveProfile,
      markAllRead,
      markRead,
      resetAll,
      completeOnboarding,
      installed,
      deferredPrompt,
      promptInstall,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp doit être utilisé dans <AppProvider>");
  return ctx;
}

export const formatDate = (iso: string) => {
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00` : iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
};

export const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
};

export const fcfa = (n: number) => `${n.toLocaleString("fr-FR")} FCFA`;
