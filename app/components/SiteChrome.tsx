"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Affiche header/footer du site vitrine, mais pas dans l'app (/reservations). */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/reservations")) return null;
  return <>{children}</>;
}
