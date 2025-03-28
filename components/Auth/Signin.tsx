"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const response = await res.json();

      if (!res.ok) {
        toast.error('Erro ao fazer login. Verifique suas credenciais');
        throw new Error(response.error || "Erro ao fazer login");
      } else {
        toast.success('Login realizado! Redirecionando...');
      }

      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <section className="pt-32.5 lg:pt-45 xl:pt-50">
      <div className="relative z-1 w-full px-5 backdrop-blur-xs dark:bg-transparent dark:backdrop-blur-xs">
          {/* <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div> */}
          <div className="rounded-lg bg-white dark:bg-black border shadow-lg dark:border dark:border-slate-600 dark:drop-shadow-[0_4px_10px_rgba(255,255,255,0.5)] px-16 pt-16 max-w-3xl mx-auto">
            <h2 className="text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
              Entrar no Painel
            </h2>

            <p className="text-center text-black dark:text-white pt-6">Insira suas credenciais para acessar o painel de gerenciamento do blog.</p>
            <hr className="my-8 h-0.5 bg-[#cccccc] dark:bg-white/10"/>

            <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-7.5">
                <input
                  type="text"
                  placeholder="Insira seu login aqui"
                  name="username"
                  value={data.username}
                  onChange={(e) => setData({ ...data, username: e.target.value })}
                  className="w-full border rounded-lg pt-4 pl-2 border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white"
                />

                <input
                  type="password"
                  placeholder="Insira sua senha aqui"
                  name="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="w-full border rounded-lg pt-4 pl-2 border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white"
                />
              </div>

              <div className="mt-7 text-center">
              <button
                  aria-label="login with email and password"
                  className="inline-flex items-center gap-2.5 rounded-full bg-blue-700 mb-4 px-6 py-3 font-light text-white duration-300 ease-in-out hover:bg-blue-900 dark:bg-btndark dark:hover:bg-blackho"
                >
                  Entrar
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
              </svg>
                </button>
              </div>
              </form>
              <div className="text-center mb-1">
              <button
                  onClick={() => router.push("/")}
                  aria-label="login with email and password"
                  className="inline-flex items-center gap-2.5 rounded-full bg-slate-600 mb-4 px-6 py-3 font-light text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                    <path d="M3.5233 6.16701L7.9933 1.69701L6.815 0.518677L0.3333 7.00034L6.815 13.482L7.9933 12.3037L3.5233 7.83368H13.6667V6.16701H3.5233Z" />  
                  </svg>Retornar ao site
                </button>
              </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
