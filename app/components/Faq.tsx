"use client";

import { useState } from "react";

export default function Faq({ items }: { items: { q: string; r: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div>
      {items.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={faq.q}
            onClick={() => setOpen(isOpen ? -1 : i)}
            className={`mb-4 cursor-pointer rounded-[10px] border bg-white px-5 shadow-[0_3px_15px_rgba(0,0,0,0.05)] transition-colors ${
              isOpen ? "border-[#00B4D8]" : "border-[#eaeaea]"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="py-4 text-[18px] font-semibold leading-[1.2] text-[#1B263B]">{faq.q}</h3>
              <span
                className={`flex h-[28px] w-[38px] shrink-0 items-center justify-center rounded-2xl bg-[#00B4D8] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="0.7em" height="0.7em" viewBox="0 0 1024 1024">
                  <path
                    fill="#fff"
                    d="M8.2 275.4c0-8.6 3.4-17.401 10-24.001c13.2-13.2 34.8-13.2 48 0l451.8 451.8l445.2-445.2c13.2-13.2 34.8-13.2 48 0s13.2 34.8 0 48L542 775.399c-13.2 13.2-34.8 13.2-48 0l-475.8-475.8c-6.8-6.8-10-15.4-10-24.199"
                  />
                </svg>
              </span>
            </div>
            <div
              className="grid transition-all duration-300"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-[15px] leading-[1.7] text-[#575a5f]">{faq.r}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
