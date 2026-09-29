"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "A propos" },
  { href: "/services", label: "Services" },
  { href: "/destinations", label: "Nos destinations" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

/**
 * Header du modèle : carte flottante (rayon 10px, ombre douce), 3 colonnes 18% / 66% / 15,8 %.
 * Il est fixe : il se cache quand on descend et réapparaît dès qu'on remonte,
 * y compris tout en bas de la page.
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = Math.max(window.scrollY, 0);
      const delta = y - lastY.current;
      if (y < 80) setHidden(false);
      else if (delta > 6) setHidden(true); // on descend
      else if (delta < -6) setHidden(false); // on remonte
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[99] pt-3 transition-transform duration-500 lg:pt-[30px] ${
          hidden && !open ? "-translate-y-[150%]" : "translate-y-0"
        }`}
      >
        <div className="mx-auto max-w-[1200px] px-[10px]">
          <div className="flex items-stretch rounded-[10px] bg-white shadow-[0_3px_15px_rgba(0,0,0,0.1)] lg:[background:linear-gradient(90deg,#fff_84.1%,#FF8C42_84.2%)]">
            {/* Colonne logo */}
            <div className="flex w-[60%] items-center py-5 pl-5 md:w-[30%] lg:w-[18%]">
              <Link href="/">
                <span className="header-font text-2xl font-bold text-[#1B263B]">
                  SENAN <span className="header-font text-[#00B4D8]">Travel</span>
                </span>
              </Link>
            </div>

            {/* Colonne menu (desktop) */}
            <nav className="nav hidden w-[66.194%] items-center lg:flex">
              <ul className="flex w-full items-center justify-center">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      className={`block px-3 xl:px-5 ${pathname === link.href ? "active-link" : ""}`}
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Colonne action : accès à l'app */}
            <div className="hidden w-[15.8%] items-center justify-end pr-5 lg:flex">
              <Link href="/reservations" className="font-semibold text-white">
                Ouvrir l&apos;app →
              </Link>
            </div>

            {/* Hamburger (tablette / mobile) */}
            <div className="flex w-[40%] items-center justify-end pr-5 md:w-[70%] lg:hidden">
              <button
                aria-label="Ouvrir le menu"
                onClick={() => setOpen(true)}
                className="text-[#00B4D8] hover:text-[#1B263B]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M20 10.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 0 1.5m0-4H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 0 1.5m0 8H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 0 1.5m0 4H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 0 1.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay (hors du header pour que le transform ne casse pas le position:fixed) */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[100] bg-black/40 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panneau off-canvas : left -110% -> 0, 0.6s cubic-bezier(0.6,0.1,0.68,0.53) */}
      <aside
        className="fixed top-0 z-[101] flex h-full w-full max-w-[360px] flex-col overflow-y-auto bg-[#f7f7f7] px-5 pt-5 lg:hidden"
        style={{
          left: open ? 0 : "-110%",
          transition: "left 0.6s cubic-bezier(0.6, 0.1, 0.68, 0.53)",
        }}
      >
        <div className="flex justify-end">
          <button
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
            className="mt-[22px] mr-[18px] text-[#1B263B] hover:text-[#00B4D8]"
          >
            <X size={20} />
          </button>
        </div>
        <ul className="mt-4 flex flex-col">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className={`block py-[15px] pr-5 pl-[10px] ${
                  pathname === link.href ? "active-link" : "text-[#1B263B] hover:text-[#00B4D8]"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/reservations"
          className="mt-6 block rounded-[10px] bg-[#FF8C42] px-4 py-3 text-center font-semibold text-white"
        >
          Ouvrir l&apos;app →
        </Link>
      </aside>
    </>
  );
}
