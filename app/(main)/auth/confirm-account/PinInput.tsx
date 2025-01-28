"use client";
import React, { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { confirmAccount } from "@/actions/confirm-account";

type Props = {
  length: number;
};

const initialState = {
  message: "",
  success: false,
  errors: {},
};

export function PinInput({ length = 6 }: Props) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const [state, formAction] = useFormState(confirmAccount, initialState);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
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
      formAction(token);
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !values[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

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
            className={`h-10 w-10 border shadow rounded-lg text-center ${
              state.errors?.token
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-purple-500"
            }`}
            autoComplete="off"
          />
        ))}
      </div>

      {(state.errors?.token || state.message) && (
        <div
          className={`mt-4 p-3 rounded-lg ${
            state.success
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {state.errors?.token?.[0] || state.message}
        </div>
      )}
    </div>
  );
}
