"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const villes = ["Cotonou", "Calavi", "Bohicon", "Parakou", "Djougou", "Natitingou"];

export default function SearchForm() {
  const router = useRouter();
  const [depart, setDepart] = useState("Cotonou");
  const [destination, setDestination] = useState("Parakou");
  const [date, setDate] = useState("");
  const [passagers, setPassagers] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (depart === destination) {
      setError("Choisis deux villes différentes.");
      return;
    }
    setError(null);
    const params = new URLSearchParams({ depart, destination, passagers: String(passagers) });
    if (date) params.set("date", date);
    router.push(`/reservations?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className="rounded-[10px] bg-white p-5 shadow-[0_3px_15px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col items-end gap-4 lg:flex-row">
        <div className="flex w-full flex-1 flex-col">
          <label htmlFor="depart" className="mb-2 text-sm font-semibold text-[#1B263B]">Départ</label>
          <select id="depart" value={depart} onChange={(e) => setDepart(e.target.value)} className="rounded-[6px] border border-[#eaeaea] px-4 py-3 outline-none focus:border-[#00B4D8]">
            {villes.map((v) => (<option key={v} value={v}>{v}</option>))}
          </select>
        </div>
        <div className="flex w-full flex-1 flex-col">
          <label htmlFor="destination" className="mb-2 text-sm font-semibold text-[#1B263B]">Destination</label>
          <select id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} className="rounded-[6px] border border-[#eaeaea] px-4 py-3 outline-none focus:border-[#00B4D8]">
            {villes.map((v) => (<option key={v} value={v}>{v}</option>))}
          </select>
        </div>
        <div className="flex w-full flex-1 flex-col">
          <label htmlFor="date" className="mb-2 text-sm font-semibold text-[#1B263B]">Date</label>
          <input id="date" type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setDate(e.target.value)} className="rounded-[6px] border border-[#eaeaea] px-4 py-3 outline-none focus:border-[#00B4D8]" />
        </div>
        <div className="flex w-full flex-1 flex-col">
          <label htmlFor="passager" className="mb-2 text-sm font-semibold text-[#1B263B]">Passagers</label>
          <select id="passager" value={passagers} onChange={(e) => setPassagers(Number(e.target.value))} className="rounded-[6px] border border-[#eaeaea] px-4 py-3 outline-none focus:border-[#00B4D8]">
            {[1, 2, 3, 4].map((n) => (<option key={n} value={n}>{n} {n > 1 ? "adultes" : "adulte"}</option>))}
          </select>
        </div>
        <button
          type="submit"
          className="hover-sweep flex w-full items-center justify-center gap-2 rounded-[6px] bg-[#FF8C42] px-8 py-3 font-semibold text-white lg:w-auto"
          style={{ "--sweep-color": "#1B263B" } as React.CSSProperties}
        >
          <Search size={18} />
          Rechercher
        </button>
      </div>
      {error && <p className="mt-3 text-sm font-medium text-[#FF8C42]">{error}</p>}
    </form>
  );
}
