"use client";
import React, { useEffect, useState } from "react";
import { getAllPlushies } from "@/lib/data.js" ;
import PlushiesCard from "@/components/PlushiesCard";
const page = () => {
  const [plushies, setPlushies] = useState(null);

  useEffect(() => {
    const plushies = async () => {
      const response = await getAllPlushies();
      setPlushies(response);
    };
    plushies();
  }, []);

  if (!plushies) return <>No hay datos</>;
  return (
    <div>
      <h1 className="text-3xl font-bold my-6 text-center text-slate-100">Todos los peluches</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4 md:gap-6 lg:gap-10 bg" >
        {plushies?.map((plushie) => (
          <div key={plushie.id}>
            <PlushiesCard plushie={plushie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
