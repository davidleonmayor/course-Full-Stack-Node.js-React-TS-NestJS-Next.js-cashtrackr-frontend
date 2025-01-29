"use client";

import { register } from "@/actions/auth";
import { useFormState } from "react-dom";
import ErrorMessage from "@/components/auth/ErrorMessage";
import SuccessMessage from "@/components/auth/SuccessMessage";
import { useEffect, useRef } from "react";

export default function RegisterForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [state, dispatch] = useFormState(register, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      ref.current?.reset();
    }
  }, [state]);

  return (
    <form ref={ref} className="mt-14 space-y-5" noValidate action={dispatch}>
      {state.errors.map((error) => (
        <ErrorMessage key={error}>{error}</ErrorMessage>
      ))}
      {state.success && <SuccessMessage>{state.success}</SuccessMessage>}

      <div className="flex flex-col gap-2">
        <label className="font-bold text-xl" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email de Registro"
          className="w-full border border-gray-300 p-1 rounded-sm"
          name="email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-xl">Nombre</label>
        <input
          type="text"
          placeholder="Nombre de Registro"
          className="w-full border border-gray-300 p-1 rounded-sm"
          name="name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-xl">Password</label>
        <input
          type="password"
          placeholder="Password de Registro"
          className="w-full border border-gray-300 p-1 rounded-sm"
          name="password"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-xl">Repetir Password</label>
        <input
          id="password_confirmation"
          type="password"
          placeholder="Repite Password de Registro"
          className="w-full border border-gray-300 p-1 rounded-sm"
          name="password_confirmation"
        />
      </div>

      <input
        type="submit"
        value="Registrarme"
        className="bg-purple-950 hover:bg-purple-800 w-full p-2 rounded-sm text-white font-black  text-xl cursor-pointer block"
      />
    </form>
  );
}
