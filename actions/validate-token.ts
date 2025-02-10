// app/actions.js
"use server";

export async function validateToken(token) {
  try {
    const response = await fetch(`${process.env.API_URL}/auth/validate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la validación del token");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
