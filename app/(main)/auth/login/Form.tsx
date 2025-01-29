"use client";
import { authenticate } from "@/actions/authenticate-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const [state, dispatch] = useFormState(authenticate, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    console.log("Estado actualizado:", state);

    if (state.errors.length > 0) {
      state.errors.forEach((error, index) => {
        setTimeout(() => {
          toast.error(error);
        }, index * 100); // Agregar un pequeño delay para evitar conflictos
      });
    }

    if (state.success) {
      toast.success(state.success || "Autenticado correctamente");

      const timer = setTimeout(() => {
        console.log("Redireccionando a /admin...");
        router.push("/admin");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state, router]);

  return (
    <>
      <form action={dispatch} className="mt-14 space-y-5" noValidate>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password"
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
