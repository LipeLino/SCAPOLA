"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/AdminHeader/AdminHeader";

const AdminDashboard = () => {
  const [postCount, setPostCount] = useState(0);
  const [logoCount, setLogoCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/qtd");
        const data = await res.json();

        if (res.ok) {
          setPostCount(data.postCount);
          setLogoCount(data.logoCount);
        } else {
          console.error("Erro ao buscar os dados:", data.error);
        }
      } catch (error) {
        console.error("Erro ao conectar com a API:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-200">
      <AdminHeader/>

      <main className="p-6">
        <div className="flex flex-col items-center gap-4 bg-white p-6 border border-gray-300 rounded-lg shadow-md w-1/4 mx-auto">
          <h1 className="text-3xl font-bold text-center text-black">
            Painel de Controle
          </h1>
          <h3>Controle de Postagens e de Logomarcas</h3>

          <Link href="/admin/novo-post" className="w-full">
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-500 rounded">
              Adicionar Postagem
            </button>
          </Link>

          <Link href="/admin/remover-post" className="w-full">
            <button className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-500 rounded">
              Deletar Postagens
            </button>
          </Link>

          <Link href="/admin/nova-logo" className="w-full">
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-500 rounded">
              Adicionar Marca
            </button>
          </Link>

          <Link href="/admin/remover-logo" className="w-full">
            <button className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-500 rounded">
              Deletar Marca
            </button>
          </Link>
        </div>

        <div className="flex flex-col mt-2 items-center gap-4 bg-white p-6 border border-gray-300 rounded-lg shadow-md w-1/4 mx-auto">
          <h1 className="text-3xl font-bold text-center text-black">Dashboard</h1>
          <p className="text-gray-500">
            Postagens:{" "}
            <span className="font-semibold text-black dark:text-white">{postCount}</span>
          </p>
          <p className="text-gray-500">
            Marcas:{" "}
            <span className="font-semibold text-black dark:text-white">{logoCount}</span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
