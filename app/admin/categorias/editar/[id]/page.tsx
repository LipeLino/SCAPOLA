"use client";

import { useRouter, useParams } from 'next/navigation';
import AdminHeader from "@/components/AdminHeader/AdminHeader";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function EditarCategoria() {
  const params = useParams();
  const id = params?.id as string;

  const router = useRouter();
    const [mensagem, setMensagem] = useState<React.ReactNode | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [categoriaCor, setCategoriaCor] = useState<string>("#3B82F6");
    const [categoriaNome, setCategoriaNome] = useState<string>("");
    const [categoriaData, setCategoriaData] = useState<{
      id: number;
      titulo: string;
      cor: string;
    } | null>(null);

    useEffect(() => {
        async function getCatEspecifica() {
          try {
            const response = await fetch (`/api/category/${id}`);
            
            if (!response.ok) {
              throw new Error('Problema ao encontrar categoria');
            }
    
            const data = await response.json();
            setCategoriaData(data);
            setCategoriaCor(data.cor);
            setCategoriaNome(data.nome);
            
            const form = document.getElementById('postForm') as HTMLFormElement;
    
            if (form) {
              (form.elements.namedItem('titulo') as HTMLInputElement).value = data.nome || '';
              (form.elements.namedItem('cor') as HTMLInputElement).value = data.cor;
            }

          } catch (error) {
            setMensagem('Erro ao carregar marca');
          }
        };
    
        if (id) {
          getCatEspecifica();
        }
      }, [id]);
      
            async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
                event.preventDefault();
                
                const form = event.currentTarget;
                
                const titulo = (form.elements.namedItem("titulo") as HTMLInputElement).value;
                const cor = (form.elements.namedItem("cor") as HTMLInputElement).value;
        
                if (!titulo) {
                    setMensagem(<span className="text-red-600 font-bold">Por favor, digite um título!</span>);
                    return;
                }
        
                try {
                  const response = await fetch('/api/category', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ titulo, cor })
                  });
          
                  const data = await response.json();
          
                  if (response.ok) {
                      setMensagem(<span className="text-green-600 font-bold">{data.message}</span>);
                      setCategoriaNome('');
                      setCategoriaCor('#3B82F6');
                  } else {
                      setMensagem(<span className="text-red-600 font-bold">{data.message}</span>);
                  }
              } catch (error) {
                  setMensagem(<span className="text-red-600 font-bold">Erro ao enviar categoria</span>);
                  console.error('Erro:', error);
              }
          }

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
          <div className="flex flex-col items-center justify-center w-full flex-1 mt-8">
                <form onSubmit={handleSubmit} id="postForm" className="w-full max-w-lg bg-white p-6 border border-gray-300 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-center mb-6 text-black">Nova Categoria</h1>

                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex-grow">
                          <label className="font-semibold block">Nome:</label>
                          <input 
                              type="text" 
                              name="titulo" 
                              required 
                              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              onChange={(e) => setCategoriaNome(e.target.value)}
                          />
                      </div>
                      <div>
                          <label className="font-semibold block">Cor:</label>
                          <input 
                              type="color" 
                              name="cor" 
                              defaultValue="#3B82F6"
                              className="h-10 w-20 p-1 border border-gray-300 rounded-md cursor-pointer"
                              onChange={(e) => setCategoriaCor(e.target.value)}
                              style={{ 
                                  appearance: 'none', 
                                  WebkitAppearance: 'none',
                                  padding: '4px',
                                  backgroundColor: 'white'
                              }}
                          />
                      </div>
                  </div>
                  
                  <hr className="mt-4 mb-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-400 to-transparent opacity-90"/>
                  
                  <h1 className="text-3xl font-bold text-center mb-3 text-black">Prévia</h1>
                  <div className="flex justify-center">
                    <span className="py-1 px-3 rounded font-medium text-xs text-white inline-block" style={{ backgroundColor: categoriaCor }}>
                      {categoriaNome || 'Pré-visualização'}
                    </span>
                  </div>

                    <input type="submit" value="Enviar" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition cursor-pointer mt-3" />
                    <div className="mt-0">{mensagem}</div>
                </form>
                
                <div className="mt-4 flex flex-col justify-center items-center">
                  <Link href="/admin/categorias">
                      <button className="flex items-center bg-gray-800 mb-4 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700">
                          <span className="mr-2">⬅</span> Voltar para Marcas
                      </button>
                  </Link>

                  <Link href="/admin">
                      <button className="flex items-center bg-gray-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700">
                          <span className="mr-2">⬅</span> Voltar para o Dashboard
                      </button>
                  </Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};