"use client";
import React, { useEffect, useState } from "react";
import { getPlushie, getAllAccessories, saveCustomizedPlushie } from "@/lib/data";


import toast from "react-hot-toast";
import PhotosCarousel from "@/components/PhotosCarousel";

const Page = ({ params }) => {
  const [plushie, setPlushie] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [accessories, setAccessories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlushie = async () => {
    try {
      const plushieResponse = await getPlushie(params.id);
      setPlushie(plushieResponse);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching plushie:", error);
      toast.error("Error al cargar el peluche");
    }
  };

  const fetchAccessories = async () => {
    try {
      const accessoriesResponse = await getAllAccessories();
      setAccessories(accessoriesResponse);
    } catch (error) {
      console.error("Error fetching accessories:", error);
      toast.error("Error al cargar los accesorios");
    }
  };

  useEffect(() => {
    fetchPlushie();
    fetchAccessories();
  }, []);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleAccessoryChange = (accessory) => {
    setSelectedAccessory(accessory);
  };

  const handleSaveCustomizedPlushie = async () => {
    try {
      const body = {
        customized_plushies: {
          plushies: {
            ...plushie,
            colors: selectedColor
          },
          accessories: selectedAccessory,
        }
      }
      const response = await saveCustomizedPlushie(body)
      console.log(response);

      toast.success("Peluche personalizado guardado");
    } catch (error) {
      console.error("Error saving customized plushie:", error);
      toast.error("Error al guardar el peluche personalizado");
    }
  }

  if (isLoading || !plushie) {
    return <div>Cargando...</div>;
  }

  return (
    <section className="bg-white p-6 rounded-md shadow-md mt-10">
      <h1 className="text-2xl font-semibold text-gray-800">{plushie.type}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <PhotosCarousel
          photos={selectedColor ? selectedColor.image : [plushie.image]}
        />
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold text-gray-700">Colores:</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {plushie.colors.map((color) => (
              <button
                key={color._id}
                onClick={() => handleColorChange(color)}
                className={`w-20 h-10 rounded-md border-2 ${
                  selectedColor === color
                    ? "border-yellow-500"
                    : "border-gray-300"
                } text-gray-700 hover:border-yellow-500 transition-colors`}
              >
                {color.name}
              </button>
            ))}
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mt-4">
            Accesorios:
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {accessories.map((accessory) => (
              <button
                key={accessory._id}
                onClick={() => handleAccessoryChange(accessory)}
                className={`w-20 h-10 rounded-md border-2 ${
                  selectedAccessory === accessory
                    ? "border-yellow-500"
                    : "border-gray-300"
                } hover:border-yellow-500 transition-colors`}
              >
                <img
                  src={accessory.image}
                  alt={accessory.name}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Imagen seleccionada:
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedAccessory && (
                <img
                  src={selectedAccessory.image}
                  alt={selectedAccessory.name}
                  className="w-32 h-32 object-cover rounded-md border-2 border-gray-300"
                />
              )}
            </div>
          </div>
        </div>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleSaveCustomizedPlushie}>guardar</button>
      </div>
    </section>
  );
};

export default Page;
