"use server";

import { ConfirmAccount } from "@/zod/auth";

interface ConfirmAccountState {
  success?: boolean;
  message?: string;
  errors?: {
    token?: string[];
  };
}

export async function confirmAccount(
  prevState: ConfirmAccountState | null,
  token: string
): Promise<ConfirmAccountState> {
  try {
    // Validar con Zod
    const result = ConfirmAccount.safeParse({ token });

    if (!result.success) {
      return {
        success: false,
        message: "Error de validación",
        errors: {
          token: result.error.errors.map((error) => error.message),
        },
      };
    }

    if (!process.env.API_URL) {
      return {
        success: false,
        message: "Error de configuración del servidor",
      };
    }

    const url = `${process.env.API_URL}/auth/confirm-account`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.error || "Error al confirmar la cuenta",
      };
    }

    return {
      success: true,
      message: "Cuenta confirmada correctamente",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error de conexión al servidor",
    };
  }
}
