"use client";

import { Calendar, MapPin, User } from "lucide-react";
import { useState } from "react";

export default function EtapeTrajet() {

    const horaires = [
      {
        heure: "06:00",
        prix: 5000,
      },
      {
        heure: "09:30",
        prix: 5000,
      },
      {
        heure: "13:00",
        prix: 5500,
      },
      {
        heure: "17:00",
        prix: 5500,
      },
     ];
    
      const [departure, setDeparture] = useState("Cotonou");
      const [destination, setDestination] = useState("Parakou");
      const [date, setDate] = useState("");
      const [passengers, setPassengers] = useState(1);
      const [selectedTime, setSelectedTime] = useState("06:00");
      const [price, setPrice] = useState(5000);
  return (
   <>
          <div className="flex gap-5">
            <div className="flex-2 shadow-2xl py-5 px-4 rounded-2xl">
              <div className="flex gap-4 items-center mb-5">
                <div className="bg-orange-100 px-4 py-2 rounded-full text-sm font-semibold">
                  <p className="text-[#FF8C42] ">Etape 1/4</p>
                </div>
                <div>
                  <p className="text-xl font-bold">Choisis ton trajet</p>
                </div>
               </div>
               <form action="">
                <div className="flex gap-3 mb-5">
                  <div className="flex-1">
                  <label className="block mb-2 text-sm font-semibold text-slate-500">
                    Ville de départ
                  </label>

                  <div className="relative">
                    <MapPin
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600"
                    />

                    <select
                    value={departure}
                    onChange={(e)=> setDeparture(e.target.value)} 
                    className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-10 focus:border-[#00B4D8] appearance-none">
                      <option value={"Cotonou"}>Cotonou</option>
                      <option value={"Calavi"}>Calavi</option>
                      <option value={"Bohicon"}>Bohicon</option>
                    </select>
                  </div>
                  </div>
                  <div className="flex-1">
                  <label className="block mb-2 text-sm font-semibold text-slate-500">
                    Destination
                  </label>

                  <div className="relative">
                    <MapPin
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600"
                    />

                    <select
                    value={destination}
                    onChange={(e)=> setDestination(e.target.value)}
                    className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-10 focus:border-[#00B4D8] appearance-none">
                      <option value={"Djougou"}>Djougou</option>
                      <option value={"Parakou"}>Parakou</option>
                      <option value={"Natitingou"}>Natitingou</option>
                    </select>
                  </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                  <label
                  htmlFor="date" className="block mb-2 text-sm font-semibold text-slate-500">
                    Date de départ
                  </label>

                  <div className="relative">
                    <Calendar
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600"
                    />

                    <input 
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e)=> setDate(e.target.value)}
                     className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-10 focus:border-[#00B4D8]">
                    </input>
                  </div>
                  </div>
                  <div className="flex-1">
                  <label 
                   htmlFor="passager" className="block mb-2 text-sm font-semibold text-slate-500">
                    Passagers
                  </label>

                  <div className="relative">
                    <User
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600"
                    />

                    <input 
                     id="passager"
                     type="text"
                     min={"1"}
                     value={passengers}
                     onChange={(e)=>setPassengers(Number(e.target.value))}
                     placeholder="1 Adulte" 
                     className="w-full h-14 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-10 focus:border-[#00B4D8]">
                    </input>
                  </div>
                  </div>
                </div>
               </form>
               <div className="mt-10">
                <h3 className="font-semibold mb-5">
                  Horaire de départ
                </h3>

                <div className="flex flex-wrap gap-4">
                    {horaires.map((horaire) => (
                      <button
                        key={horaire.heure}
                        type="button"
                        onClick={() => {
                          setSelectedTime(horaire.heure);
                          setPrice(horaire.prix);
                        }}
                        className={`px-5 py-2 rounded-full border-2 transition ${
                          selectedTime === horaire.heure
                            ? "border-cyan-500 text-cyan-600 bg-cyan-50"
                            : "border-gray-300 text-gray-700"
                        }`}
                      >
                        {horaire.heure} - {horaire.prix.toLocaleString("fr-FR")} F
                      </button>
                    ))}
                  </div>
               </div>
               <div className="flex justify-between mt-14">
                <button
                className="border border-gray-300 px-4 py-2 rounded-full">
                  ← Retour
                </button>

                <button 
                className="bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
                  Continuer →
                </button>
               </div>
             </div>
              <div className="flex-1 ">
               <div className="bg-slate-100 rounded-3xl p-8 h-fit">
                  <h3 className="text-2xl font-bold mb-8">
                    Récapitulatif
                  </h3>

                  <div className="space-y-6">

                    <div className="flex justify-between">
                      <span>Trajet</span>
                      <span className="font-semibold">
                        {departure} → {destination}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Date</span>
                      <span> {date || "À choisir"} </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Départ</span>
                      <span> {selectedTime} </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Passagers</span>
                      <span> {passengers} {passengers > 1 ? "adultes" : "adulte"} </span>
                    </div>

                    <hr />

                    <div className="flex justify-between items-center">
                      <span className="text-xl">
                        Total
                      </span>

                      <span className="text-2xl font-bold">
                        {(price * passengers).toLocaleString("fr-FR")} FCFA
                      </span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
   </>
  );
}
