"use client";
import React from "react";
import { signup } from "@/lib/data"; // Asegúrate de que la función signup esté correctamente definida en este módulo
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createMsg = toast.loading("Cargando...");

    const showError = (message) => {
      toast.dismiss(createMsg);
      toast.error(message);
    };

    try {
      if (!name) {
        showError("Ingresa un nombre");
        return;
      }
      if (!email) {
        showError("Ingresa un correo");
        return;
      }
      if (!password) {
        showError("Ingresa una contraseña");
        return;
      }

      const response = await signup(name, email, password);
      toast.dismiss(createMsg);
      toast.success("Registro exitoso");
      router.push("/dashboard/products");
    } catch (error) {
      toast.dismiss(createMsg);
      if (error.message === "Ya existe un usuario registrado con este correo") {
        showError("El usuario ya está registrado");
      } else {
        showError("Error en el registro");
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-100">
            Regístrate
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-slate-100"
              >
                Nombre
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-slate-100"
              >
                Correo
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-slate-100"
                >
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrarse
              </button>
                <div className="text-sm mt-4">
                  <Link
                    href="/login"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Ya tienes un usuario? Inicia sesión
                  </Link>
                </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Page;
