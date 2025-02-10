import { z } from "zod";

// create account
export const Register = z
  .object({
    email: z
      .string()
      .min(1, { message: "El Email es obligatorio" })
      .email({ message: "Email no válido" }),
    name: z.string().min(1, { message: "Tu nombre no puede ir vacio" }),
    password: z
      .string()
      .min(8, { message: "El password es muy corto, mínimo 8 caracteres" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Los passwords no son iguales",
    path: ["password_confirmation"],
  });

export const SuccessResponse = z.string();

export const ErrorResponse = z.object({
  errors: z.array(
    z.object({
      type: z.string(),
      value: z.string(),
      msg: z.string(),
      path: z.string(),
      location: z.string(),
    })
  ),
});

export const GenericErrorResponse = z.object({
  errors: z.array(
    z.object({
      type: z.string().optional(), // El tipo de error (opcional)
      value: z.string().optional(), // El valor relacionado con el error (opcional)
      msg: z.string(), // El mensaje de error (obligatorio)
      path: z.string().optional(), // El camino o campo que causó el error (opcional)
      location: z.string().optional(), // La ubicación del error (opcional)
    })
  ),
});

//  confirm account
export const ConfirmAccount = z.object({
  token: z.string().length(6, { message: "El token debe tener 6 dígitos" }),
});

// login
export const Login = z.object({
  email: z.string().email({ message: "Email no válido" }),
  password: z.string().min(8, { message: "El password es muy corto" }),
});

// Autorization
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

// forgot password
export const emailSchema = z.object({
  email: z.string().email({ message: "Email no válido" }),
});

// validate token
export const ValidateToken = z.object({
  token: z.string().length(6, { message: "El token debe tener 6 dígitos" }),
});
