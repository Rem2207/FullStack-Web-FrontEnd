"use client";
import React, { useEffect, useState } from 'react'; // Importa useEffect desde React
import { getAllPlushies } from '@/lib/data.js';
import PlushiesCard from '@/components/PlushiesCard';
import Confetti from '@/components/Confetti'; // Importa el componente Confetti

export default function Page() {
  const [mostChosenPlushie, setMostChosenPlushie] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const fetchPlushies = async () => {
      try {
        const response = await getAllPlushies();
        
        if (response.length > 0) {
          const mostChosen = response.reduce((max, plushie) => (plushie.count > max.count ? plushie : max), response[0]);
          setMostChosenPlushie(mostChosen);
          setShowConfetti(true);
        }
      } catch (error) {
        console.error("Error fetching plushies:", error);
      }
    };

    fetchPlushies();
  }, []);

  if (!mostChosenPlushie) return <div>No hay datos</div>;

  return (
    <div className="p-4 relative">
      {showConfetti && <Confetti />} {/* Muestra el confeti cuando showConfetti es true */}
      <div className="bg-yellow-300 p-6 rounded-lg mb-6 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4">El peluche más elegido</h2>
        <div className="flex justify-center">
          <div className="animate-tada max-w-xs">
            <PlushiesCard plushie={mostChosenPlushie} />
          </div>
        </div>
      </div>
    </div>
  );
}