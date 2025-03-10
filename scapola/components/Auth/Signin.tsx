"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

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
        throw new Error(response.error || "Erro ao fazer login");
      }

      //document.cookie = `token=${response.token}; path=/; max-age=43200; Secure; HttpOnly; SameSite=lax`;
      router.push("/admin"); // Redireciona para o painel
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* <!-- ===== SignIn Form Start ===== --> */}
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
            <Image
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },

              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
          >
            <h2 className="mb-12 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
              Login
            </h2>

            <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-7.5">
                <input
                  type="text"
                  placeholder="Email"
                  name="username"
                  value={data.username}
                  onChange={(e) => setData({ ...data, username: e.target.value })}
                  className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white"
                />

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="w-full border-b border-stroke !bg-white focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white"
                />
              </div>

              <div className="mt-7 py-5 text-center">
              <button
                  aria-label="login with email and password"
                  className="inline-flex items-center gap-2.5 rounded-full bg-black mb-4 px-6 py-3 font-light text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                >
                  Log in
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== SignIn Form End ===== --> */}
    </>
  );
};

export default Signin;
