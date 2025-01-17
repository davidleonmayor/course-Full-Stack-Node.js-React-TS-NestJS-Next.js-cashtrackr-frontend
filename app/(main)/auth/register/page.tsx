import Link from "next/link";
import type { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "CashTrackr - Crear Cuenta",
  description: "CashTrackr - Crear Cuenta",
};

export default function RegisterPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Crea una Cuenta</h1>
      <p className="text-3xl font-bold">
        y controla tus <span className="text-amber-500">finanzas</span>
      </p>

      <RegisterForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link href="/auth/login" className="text-center text-gray-500">
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>

        <Link
          href="/auth/forgot-password"
          className="text-center text-gray-500"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  );
}

// export default function Page() {
//   return (
//     <main className=" h-full pt-[50px] lg:pt-0">
//       <div className="flex h-screen w-screen bg-orange-950">
//         <div className="relative w-1/2 flex flex-col items-center justify-center bg-orange-950 p-4">
//           <img
//             src="/logo.svg"
//             alt="Logo"
//             className="absolute top-5 h-60 w-60"
//           />
//           <img
//             src="/grafico.svg"
//             alt="Coverage"
//             className="absolute bottom-0 left-0 left-0"
//           />
//         </div>

//         <div className="w-1/2 flex items-center justify-center p-4">
//           <div>
//             <form action="" className="flex flex-col gap-4 w-full max-w-md">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 className="p-2 border border-gray-300 rounded"
//               />
//               <label htmlFor="name">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 className="p-2 border border-gray-300 rounded"
//               />
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 className="p-2 border border-gray-300 rounded"
//               />
//               <label htmlFor="repeat-password">Repeat password</label>
//               <input
//                 type="password"
//                 name="repeat-password"
//                 id="repeat-password"
//                 className="p-2 border border-gray-300 rounded"
//               />

//               <button
//                 type="submit"
//                 className="bg-slate-200 text-black p-2 mt-3 rounded"
//               >
//                 Create Account
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
