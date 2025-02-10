import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { UserSchema } from "@/zod/auth";
import getToken from "./token";

export const verifySession = cache(async () => {
  const token = getToken();
  if (!token) {
    redirect("/auth/login");
  }

  const url = `${process.env.API_URL}/auth/user`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Si la respuesta no es exitosa, redirige
  if (!req.ok) {
    redirect("/auth/login");
  }

  // Verifica si el cuerpo está vacío
  const contentLength = req.headers.get("content-length");
  if (contentLength === "0") {
    // No hay contenido, por lo que se asume que no hay sesión válida
    redirect("/auth/login");
  }

  let session;
  try {
    session = await req.json();
  } catch (error) {
    // Si ocurre un error al parsear, redirige
    redirect("/auth/login");
  }

  const result = UserSchema.safeParse(session);
  if (!result.success) {
    redirect("/auth/login");
  }

  return {
    user: result.data,
    isAuth: true,
  };
});
