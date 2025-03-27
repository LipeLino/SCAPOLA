"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader/AdminHeader';
import { useRouter, useParams } from 'next/navigation';

export default function EditarLogos() {
  const params = useParams();
  const id = params?.id as string;

  const router = useRouter();
  const [mensagem, setMensagem] = useState<React.ReactNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [marcaData, setMarcaData] = useState<{
    id: number;
    titulo: string;
    descricao: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    async function getMarcaEspecifica() {
      try {
        const response = await fetch (`/api/brand/${id}`);
        
        if (!response.ok) {
          throw new Error('Problema ao encontrar marca');
        }

        const data = await response.json();
        setMarcaData(data);
        
        const form = document.getElementById('postForm') as HTMLFormElement;

        if (form) {
          (form.elements.namedItem('titulo') as HTMLInputElement).placeholder = data.titulo || '';
          (form.elements.namedItem('descricao') as HTMLInputElement).placeholder = data.descricao || '';
        }
      } catch (error) {
        setMensagem('Erro ao carregar marca');
      }
    };

    if (id) {
      getMarcaEspecifica();
    }
  }, [id]);


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    
    const form = event.currentTarget;
    
    const titulo = (form.elements.namedItem("titulo") as HTMLInputElement).value;
    const descricao = (form.elements.namedItem("descricao") as HTMLInputElement).value;
    const img = (form.elements.namedItem("imagem") as HTMLInputElement).files?.[0];

    if (!titulo || !descricao) {
        // setMensagem(<span className="text-red-600 font-bold">Por favor, preencha o nome da marca!</span>);
        setMensagem('Por favor, preencha o nome da marca!');
        setIsLoading(false);
        return;
    }

    try {
      let imgUrlFinal = marcaData?.url;

      if (img) {
        const formData = new FormData();
        formData.append("imagem", img);

        const imagemResposta = await fetch ("/api/brand-img", {
          method: "POST", body: formData
        });

        if (!imagemResposta.ok) {
          throw new Error("Erro no envio");
        }

        const imgFinal = await imagemResposta.json();
        imgUrlFinal = imgFinal.urlFinal;
      }

      const resposta = await fetch(`/api/brand/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          titulo, descricao, url: imgUrlFinal
        })
      });
      
      const resultado = await resposta.json();

      if (resposta.ok) {
        setMensagem(
            <>
                <span className="text-green-600 font-bold block break-words">
                    Marca atualizada com sucesso!
                </span>
            </>
        );
        
        setTimeout(() => {
            router.push('/admin/logos');
        }, 2000);
    } else {
        setMensagem(<span className="text-red-600 font-bold">{resultado.message || "Erro ao atualizar a marca!"}</span>);
    }
} catch (error) {
    setMensagem(<span className="text-red-600 font-bold">Erro: {(error as Error).message}</span>);
} finally {
    setIsLoading(false);
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
        
        <div className="flex-grow p-8 bg-slate-200 overflow-y-auto">
          <div className="flex flex-col items-center justify-center w-full flex-1 mt-8">
                <form onSubmit={handleSubmit} id="postForm" className="w-full max-w-lg bg-white p-6 border border-gray-300 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-center mb-6 text-black">Editar Logo</h1>

                    <label className="font-semibold block">Nome:</label>
                    <input type="text" name="titulo" required className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3" />

                    <label className="font-semibold block">Descrição:</label>
                    <input type="text" name="descricao" required className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3" />

                    <label className="font-semibold block">Insira a logo:</label>
                    <input type="file" name="imagem" accept="image/*" required className="w-full border border-gray-300 rounded-md p-2 bg-white cursor-pointer mb-3" />

                    <input type="submit" value={isLoading ? "Salvando..." : "Salvar Alterações"} disabled={isLoading} className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition cursor-pointer mt-3 ${isLoading ? "opacity-50" : ""}`}/>

                    <div className="mt-0">{mensagem}</div>
                </form>
                <div className="mt-4 flex flex-col justify-center items-center">
                  <Link href="/admin/logos/">
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