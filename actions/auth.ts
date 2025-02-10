"use server";

import { Register, SuccessResponse, GenericErrorResponse } from "@/zod/auth";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function register(
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  const registerData = {
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  };

  const register = Register.safeParse(registerData);
  if (!register.success) {
    const errors = register.error.errors.map((error) => error.message);
    return {
      errors,
      success: prevState.success,
    };
  }

  const url = `${process.env.API_URL}/auth/create-account`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: register.data.name,
      password: register.data.password,
      email: register.data.email,
    }),
  });

  const json = await req.json();

  // console.log(json);

  if (!req.ok) {
    if (req.status === 409) {
      return {
        errors: [json.error || "Este usuario ya está registrado"],
        success: "",
      };
    }

    // Intentar analizar con GenericErrorResponse
    const errorResponse = GenericErrorResponse.safeParse(json);
    if (errorResponse.success) {
      const errors = errorResponse.data.errors.map((error) => error.msg);
      return {
        errors,
        success: "",
      };
    }

    // Manejar errores simples
    if (typeof json.error === "string") {
      return {
        errors: [json.error],
        success: "",
      };
    }

    return {
      errors: ["Unexpected error format."],
      success: "",
    };
  }

  const success = SuccessResponse.parse(json);
  return {
    errors: [],
    success,
  };
}
