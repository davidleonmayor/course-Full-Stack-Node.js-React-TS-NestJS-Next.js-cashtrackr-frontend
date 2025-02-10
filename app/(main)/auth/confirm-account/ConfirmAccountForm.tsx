"use client";
import { PinInput } from "@/components/auth/PinInput";

export default function ConfirmAccountForm() {
  return (
    <>
      <div className="flex justify-center gap-5 my-10">
        <PinInput length={6} />
      </div>
    </>
  );
}
