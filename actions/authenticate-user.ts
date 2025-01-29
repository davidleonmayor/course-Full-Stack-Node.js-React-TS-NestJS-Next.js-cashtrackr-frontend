"use server";
import { cookies } from "next/headers";
import { GenericErrorResponse, Login } from "@/zod/auth";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function authenticate(
  revState: ActionStateType,
  formData: FormData
) {
  const loginCredentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const auth = Login.safeParse(loginCredentials);
  if (!auth.success) {
    const errors = auth.error.errors.map((error) => error.message);
    return {
      errors,
      success: "",
    };
  }

  const req = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: auth.data.email,
      password: auth.data.password,
    }),
  });

  const json = await req.json();
  if (!req.ok) {
    if (req.status === 400) {
      return {
        errors: ["Email o contraseña incorrectos"],
        success: "",
      };
    }
    if (req.status === 404) {
      return { errors: ["Usuario no encontrado"], success: "" };
    }
    if (req.status === 403) {
      return { errors: ["La Cuenta no ha sido confirmada"], success: "" };
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

  // Setear Cookies
  cookies().set({
    name: "CASHTRACKR_TOKEN",
    value: json,
    httpOnly: true,
    path: "/",
  });

  return {
    errors: [],
    success: "User authenticated",
  };
}
