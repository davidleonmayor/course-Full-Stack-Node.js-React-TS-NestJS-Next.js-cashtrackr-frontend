"use client";

export default function Home() {
  return (
    <main className=" h-full pt-[50px] lg:pt-0">
      <div className="flex h-screen w-screen bg-orange-950">
        <div className="relative w-1/2 flex flex-col items-center justify-center bg-orange-950 p-4">
          <img
            src="/logo.svg"
            alt="Logo"
            className="absolute top-5 h-60 w-60"
          />
          <img
            src="/grafico.svg"
            alt="Coverage"
            className="absolute bottom-0 left-0 left-0"
          />
        </div>

        <div className="w-1/2 flex items-center justify-center p-4">
          <div>
            <form action="" className="flex flex-col gap-4 w-full max-w-md">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="p-2 border border-gray-300 rounded"
              />
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="p-2 border border-gray-300 rounded"
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="p-2 border border-gray-300 rounded"
              />
              <label htmlFor="repeat-password">Repeat password</label>
              <input
                type="password"
                name="repeat-password"
                id="repeat-password"
                className="p-2 border border-gray-300 rounded"
              />

              <button
                type="submit"
                className="bg-slate-200 text-black p-2 mt-3 rounded"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
