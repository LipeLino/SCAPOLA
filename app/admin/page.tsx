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
    <div className="flex flex-col h-screen">
      <AdminHeader/>
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white flex-shrink-0">          
            
              <div className="bg-blue-600 text-white p-4 font-bold">
                Dashboard
              </div>
            
            <Link href="/admin/logos">
              <div className="p-4 hover:bg-gray-700 cursor-pointer">
                Gerenciar Marcas
              </div>
            </Link>

            <Link href="/admin/posts">
              <div className="p-4 hover:bg-gray-700 cursor-pointer">
                Gerenciar Blog
              </div>
            </Link>
            
            <Link href="/admin">
              <div className="p-4 hover:bg-gray-700 cursor-pointer">
                Gerenciar Categorias
              </div>
            </Link>
        </div>
        
        {/* Conteúdo principal */}
        <div className="flex-grow p-8 bg-slate-100 overflow-y-auto">
          <h3 className="text-4xl font-medium font-bold text-black mb-8">Dashboard</h3>
          
          {/* Cards de estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Card Marcas */}
            <div className="bg-slate-300 p-6 rounded-md shadow-md">
              <h3 className="text-lg text-black font-bold mb-2">Marcas</h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">{logoCount}</p>
              <Link href="/admin/logos">
                <p className="text-blue-500 hover:text-blue-700">Gerenciar marcas</p>
              </Link>
            </div>
            
            {/* Card Posts do Blog */}
            <div className="bg-slate-300 p-6 rounded-md shadow-md">
              <h3 className="text-lg text-black font-bold mb-2">Posts do Blog</h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">{postCount}</p>
              <Link href="/admin/posts">
                <p className="text-blue-500 hover:text-blue-700">Gerenciar posts</p>
              </Link>
            </div>

            <div className="bg-slate-300 p-6 rounded-md shadow-md">
              <h3 className="text-lg text-black font-bold mb-2">Autores</h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">100</p>
              <Link href="/admin">
                <p className="text-blue-500 hover:text-blue-700">Gerenciar autores</p>
              </Link>
            </div>
            
            {/* Card Categorias */}
            <div className="bg-slate-300 p-6 rounded-md shadow-md">
              <h3 className="text-lg text-black font-bold mb-2">Categorias</h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">100</p>
              <Link href="/admin">
                <p className="text-blue-500 hover:text-blue-700">Gerenciar categorias</p>
              </Link>
            </div>
          </div>
          
          {/* Seção Ações Rápidas */}
          <h3 className="text-xl font-medium text-gray-600 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Adicionar Nova Marca */}
            <div className="bg-gray-300 p-6 rounded-md hover:bg-gray-200 transition">
              <h4 className="text-lg font-bold text-gray-700 mb-2">Adicionar Nova Marca</h4>
              <p className="text-gray-600 mb-4">Adicione uma nova marca ao site</p>
              <Link href="/admin/logos/adicionar">
                <button className="text-blue-600 hover:text-blue-800">Adicionar</button>
              </Link>
            </div>
            
            {/* Criar Novo Post */}
            <div className="bg-gray-300 p-6 rounded-md hover:bg-gray-200 transition">
              <h4 className="text-lg font-bold text-gray-700 mb-2">Criar Novo Post</h4>
              <p className="text-gray-600 mb-4">Publique um novo artigo no blog</p>
              <Link href="/admin/posts/adicionar">
                <button className="text-blue-600 hover:text-blue-800">Criar</button>
              </Link>
            </div>
            
            {/* Visualizar Site */}
            <div className="bg-gray-300 p-6 rounded-md hover:bg-gray-200 transition">
              <h4 className="text-lg font-bold text-gray-700 mb-2">Visualizar Site</h4>
              <p className="text-gray-600 mb-4">Veja o site como um visitante</p>
              <Link href="/" target="_blank">
                <button className="text-blue-600 hover:text-blue-800">Visualizar</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;