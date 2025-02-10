// app/components/PinInput.jsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { validateToken } from "@/actions/validate-token";
import { toast } from "sonner";

export function PinInput({ length = 6 }) {
  const [values, setValues] = useState(Array(length).fill(""));
  const router = useRouter();

  const handleChange = (index, value) => {
    if (value.length > 1) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < length - 1) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }

    if (newValues.every((val) => val !== "") && newValues.length === length) {
      const token = newValues.join("");
      validateToken(token)
        .then((data) => {
          if (data.success) {
            toast.success("Cuenta confirmada correctamente");
            router.push("/auth/login");
          } else {
            toast.error(data.message || "Error en la validación del token");
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !values[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-center gap-2">
        {values.map((value, index) => (
          <input
            key={index}
            id={`pin-${index}`}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="h-10 w-10 border shadow rounded-lg text-center"
            autoComplete="off"
          />
        ))}
      </div>
    </div>
  );
}
