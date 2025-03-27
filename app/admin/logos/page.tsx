"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminHeader from '@/components/AdminHeader/AdminHeader';

const GerenciarLogos = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState<string>("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/api/brand');
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error('Erro ao carregar as logos:', error);
        setMensagem('Erro ao carregar as logos');
      }
    };

    fetchBrands();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/brand/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem(data.message);
        setBrands(brands.filter((brand) => brand.id !== id));
      } else {
        setMensagem(data.message);
      }
    } catch (error) {
      console.error('Erro ao deletar a marca:', error);
      setMensagem('Erro ao deletar a marca');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader/>
        <div className="flex flex-col md:flex-row h-full">
          {/* Sidebar */}
          <div className="w-full md:w-60 bg-gray-800 text-white flex-shrink-0 md:text-start p-4 text-center">
            
            <Link href="/admin">
              <div className="p-4 hover:bg-gray-700 cursor-pointer hover:rounded">
                Dashboard
              </div>
            </Link>
            
              <div className="bg-blue-600 text-white p-4 font-bold rounded">
                Gerenciar Marcas
              </div>
            
            <Link href="/admin/posts">
              <div className="p-4 hover:bg-gray-700 cursor-pointer hover:rounded">
                Gerenciar Blog
              </div>
            </Link>

            <Link href="/admin/categorias">
              <div className="p-4 hover:bg-gray-700 cursor-pointer hover:rounded">
                Gerenciar Categorias
              </div>
            </Link>
        </div>
        
        {/* Conteúdo principal */}
        <div className="flex-grow p-8 bg-slate-100 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-4xl font-medium font-bold text-black">Gerenciar Marcas</h3>
            <Link href="/admin/logos/adicionar">
              <button className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-800">
              <p>+ Nova Marca</p>
              </button>
            </Link>
          </div>
          
          {mensagem && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-black p-4 mb-6">
              <p>{mensagem}</p>
            </div>
          )}

          {/* Grid de marcas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {brands.map((brand) => (
              <div key={brand.id} className="bg-slate-50 border-slate-300 border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:shadow-slate-500 transition-shadow duration-200">
                <div className="relative h-50 w-full bg-white bg-slate-400">
                  <Image 
                    src={brand.image} 
                    alt={brand.name} 
                    fill 
                    className="object-contain p-1" 
                  />
                </div>
                <div className="p-4 bg-gradient-to-b from-slate-100 to-slate-200">
                <h3 className="font-bold text-black mb-2 text-center truncate">{brand.name}</h3>
                  <div className="flex space-x-1">
                    <Link href={`/admin/logos/editar/${brand.id}`} className="flex-1">
                      <button className="w-full bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
                        Editar
                      </button>
                    </Link>
                    <div className="flex-1">
                      <button
                        onClick={() => handleDelete(brand.id)}
                        className="w-full bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">
                        Deletar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {brands.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma marca encontrada.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GerenciarLogos;