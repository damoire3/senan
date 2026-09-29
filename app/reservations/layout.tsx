"use client";

import type { ReactNode } from "react";
import { AppProvider, useApp } from "./_components/AppProvider";
import AppShell from "./_components/AppShell";
import Onboarding from "./_components/Onboarding";

function Gate({ children }: { children: ReactNode }) {
  const { ready, onboarded } = useApp();
  if (!ready) return null;
  if (!onboarded) return <Onboarding />;
  return <AppShell>{children}</AppShell>;
}

export default function ReservationsLayout({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <Gate>{children}</Gate>
    </AppProvider>
  );
}
