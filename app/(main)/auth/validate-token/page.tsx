import React from "react";
import Form from "./Form";

interface PageProps {
  params: {
    token: string;
  };
}

export default function Page({ params }: PageProps) {
  return (
    <div>
      <h1 className="font-black text-6xl text-purple-950">Valida tu cuenta</h1>
      <p className="text-3xl font-bold">
        Ingresa el código que recibiste
        <span className="text-amber-500"> por email</span>
      </p>
      <Form token={params.token} />
    </div>
  );
}
