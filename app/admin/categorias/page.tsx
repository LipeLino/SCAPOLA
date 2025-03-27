"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminHeader from '@/components/AdminHeader/AdminHeader';

const GerenciarCategorias = () => {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState<string>("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('/api/category');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Erro ao carregar as categorias:', error);
        setMensagem('Erro ao carregar as categorias');
      }
    };

    fetchBrands();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/category/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem(data.message);
        setCategorias(categorias.filter((categorias) => categorias.id !== id));
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
            
            <Link href="/admin/logos">
              <div className="p-4 hover:bg-gray-700 cursor-pointer hover:rounded">
                Gerenciar Marcas
              </div>
            </Link>
            
            <Link href="/admin/posts">
              <div className="p-4 hover:bg-gray-700 cursor-pointer hover:rounded">
                Gerenciar Blog
              </div>
            </Link>

            <Link href="/admin/categorias">
              <div className="bg-blue-600 text-white p-4 font-bold rounded">
                Gerenciar Categorias
              </div>
            </Link>
        </div>

        <div className="flex-grow p-8 bg-slate-200 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-4xl font-medium font-bold text-black">Gerenciar Categorias</h3>
            <Link href="/admin/categorias/adicionar">
              <button className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-800">
              <p>+ Nova Categoria</p>
              </button>
            </Link>
          </div>
            <div className="bg-white shadow-sm rounded overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="p-3 text-center text-slate-600 border-b border-gray-300">Cor</th>
                    <th className="p-3 text-center text-slate-600 border-b border-gray-300">Categoria</th>
                    <th className="p-3 text-center text-slate-600 border-b border-gray-300">Ações</th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-gray-200">
                    {categorias.map((categoria) => (
                      <tr key={categoria.id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div 
                            className="w-10 h-10 rounded mx-auto"
                            style={{ backgroundColor: categoria.cor }}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800">
                          {categoria.nome}
                        </td>
                        <td className="py-4 whitespace-nowrap text-center text-gray-800 space-x-1">
                          <Link href={`/admin/categorias/editar/${categoria.id}`} className="flex-1">
                              <button 
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500">
                                Editar
                              </button>
                            </Link>
                          <button 
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                            onClick={() => handleDelete(categoria.id)}>
                            Deletar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>

            </div>
          </div>
        </div>
    </div>
  );
};

export default GerenciarCategorias;