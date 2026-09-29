import type { ReactNode } from "react";

/**
 * Titre de section du modèle : petit label coloré (Barlow 18px/700),
 * grand titre (42px, interligne 1.1) avec mots mis en couleur, puis texte.
 */
export default function SectionHeading({
  label,
  title,
  text,
  align = "left",
  light = false,
}: {
  label: string;
  title: ReactNode;
  text?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="mb-3 text-[18px] font-bold leading-[1.2] text-[#00B4D8]">{label}</p>
      <h2
        className={`mb-4 text-[34px] font-bold leading-[1.1] md:text-[38px] lg:text-[42px] ${
          light ? "text-white" : "text-[#1B263B]"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p
          className={`text-[15px] leading-[1.7] ${
            light ? "text-white/80" : "text-[#575a5f]"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
}

export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-[#00B4D8]">{children}</span>;
}
