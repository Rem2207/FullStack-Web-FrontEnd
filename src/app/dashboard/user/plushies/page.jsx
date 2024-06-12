"use client";
import React, { useEffect, useState } from "react";
import { deletePlushies } from "@/lib/data";
import { getUser } from "@/lib/data.js";
import toast from "react-hot-toast";
import { revalidateClientPath } from "@/lib/actions";


const Page = () => {
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    const response = await getUser();
    setUser(response);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const CustomPlushieItem = ({ custom }) => {
    const deleteCustomizedPlushie = async () => {
      try {
        const body = {
          customized_plushie_id: custom,
        }
        await deletePlushies(body)
        fetchUser()
        toast.success("Peluche personalizado eliminado");
      } catch (error) {
        console.error("Error deliting customized plushie:", error);
        toast.error("Error al eliminar el peluche personalizado");
      }
    };
    return (
      <div
        key={custom._id}
        className="w-full md:max-w-sm mx-auto rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl bg-gray-100 hover:bg-gray-200 relative"
      >
        <img
          src={custom.plushies.image}
          alt={custom.plushies.type}
          className="w-full h-64 object-cover rounded-t-lg border border-gray-200 hover:scale-105 transition-transform duration-300"
        />
        <div
          onClick={() => deleteCustomizedPlushie()}
          className="p-2.5 text-2xl absolute top-1.5 right-1.5 text-red-700 bg-white rounded-full leading-3 opacity-80 cursor-pointer hover:opacity-100 transition-opacity duration-300 hover:scale-105"
        >
          x
        </div>
        <p className="text-gray-800 text-lg font-semibold mt-2 text-center">
          {custom.plushies.type}
        </p>
        <div className="grid grid-cols-2 gap-4 p-6">
          <div className="text-center">
            <p className="mb-2 font-semibold">Color:</p>
            <p className="h-16">{custom.plushies.colors.name}</p>
            <img
              src={custom.plushies.colors.image}
              alt={custom.plushies.colors.name}
              className="w-20 h-20 object-cover rounded-full mx-auto border-2 border-gray-200 hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="text-center">
            <p className="mb-2 font-semibold">Accesorio:</p>
            <p className="h-16">{custom.accessories.name}</p>
            <img
              src={custom.accessories.image}
              alt={custom.accessories.name}
              className="w-20 h-20 object-cover rounded-full mx-auto border-2 border-gray-200 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    );
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-white">
        Loading...
      </div>
    );

  if (user?.customized_plushies?.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-white">
        No tiene peluches
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-slate-100">
        Todos los peluches personalizados de {user?.name}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {user.customized_plushies?.map((custom) => (
          <CustomPlushieItem key={custom._id} custom={custom} />
        ))}
      </div>
    </div>
  );
};

export default Page;
