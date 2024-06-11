"use client ";
import React from "react";
import Link from "next/link";

const PlushiesCard = ({ plushie }) => {
  return (
    <div className="bg-white h-80 md:h-96 w-full border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105">
      <Link href={`/dashboard/products/${plushie._id}`}>
        <img
          src={plushie.image}
          alt="plushie"
          className="h-2/4 md:h-2/3 w-full object-cover"
        />

        <div className="text-gray-700 font-medium mt-2 p-2">
          <h3 className="text-base font-bold text-gray-800 text-center">
            {plushie.type}
          </h3>
          <p className="text-xs md:text-sm mt-2">{plushie.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default PlushiesCard;
