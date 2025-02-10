"use client";

import { forgotPassword } from "@/actions/forgot-password";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function ForgotPasswordForm() {
  const [state, dispatch] = useFormState(forgotPassword, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    console.log(state);
    if (state.errors) {
      console.log("error here..");
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
    if (state.success) {
      console.log("success here..");
      toast.success(state.success);
    }
  }, [state]);

  return (
    <form className=" mt-14 space-y-5" noValidate action={dispatch}>
      <div className="flex flex-col gap-2 mb-10">
        <label className="font-bold text-2xl">Email</label>

        <input
          type="email"
          placeholder="Email de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="email"
        />
      </div>

      <input
        type="submit"
        value="Enviar Instrucciones"
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer "
      />
    </form>
  );
}
