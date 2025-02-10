"use server";

import { emailSchema } from "@/zod/auth";

type ActionStateType = {
  errors: [];
  success: "";
};

export async function forgotPassword(
  revState: ActionStateType,
  formData: FormData
) {
  // clear data to send
  const forgotPasswordCredentials = {
    email: formData.get("email"),
  };
  // check with zod
  const validationResult = emailSchema.safeParse(forgotPasswordCredentials);
  if (!validationResult.success) {
    const errors = validationResult.error.errors.map((error) => error.message);
    return {
      errors,
      success: "",
    };
  }

  // send request to backend
  const url = `${process.env.API_URL}/auth/forgot-password`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: validationResult.data.email,
    }),
  });
  const json = await req.json();
  console.log(json);

  // response management
  if (!req.ok) {
    console.log(json);

    return {
      errors: ["Something went wrong..."],
      success: "",
    };
  }

  return {
    errors: [],
    success: json,
  };
}
