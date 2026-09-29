"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Direction = "up" | "left" | "right" | "none";

/**
 * Reproduit le comportement Gutenverse du modèle :
 * l'animation se joue une seule fois quand le haut de l'élément
 * atteint 75 % de la hauteur de la fenêtre (ou quand on est en bas de page).
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      const top = el.getBoundingClientRect().top;
      const inView = top <= window.innerHeight * 0.75;
      const atBottom =
        top > 0 &&
        window.innerHeight + Math.ceil(window.pageYOffset) >=
          document.body.offsetHeight - window.innerHeight * 0.25;

      if (inView || atBottom) {
        setVisible(true);
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const dirClass = direction === "none" ? "fade" : direction;

  return (
    <div
      ref={ref}
      className={`reveal reveal-${dirClass} ${visible ? "is-visible" : ""} ${className}`}
      style={visible && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
