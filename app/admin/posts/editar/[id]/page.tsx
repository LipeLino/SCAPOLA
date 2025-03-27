"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminHeader from "@/components/AdminHeader/AdminHeader";
import { useRouter, useParams } from 'next/navigation';

export default function EditarPosts() {
  const params = useParams();
  const id = params?.id as string;

  const router = useRouter();
  const [mensagem, setMensagem] = useState<React.ReactNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState<{
    _id: number;
    title: string;
    body: string;
    category: string;
    author: string;
    mainImage: string;
  } | null>(null);

useEffect(() => {
    async function getPostEspecifico() {
    try {
        const response = await fetch (`/api/posts/${id}`);
        
        if (!response.ok) {
        throw new Error('Problema ao encontrar postagem');
        }

        const data = await response.json();
        setPostData(data);
        console.log(data);
        console.log("oi");
        
        const form = document.getElementById('postForm') as HTMLFormElement;

        if (form) {
        (form.elements.namedItem("titulo") as HTMLInputElement).placeholder = data.title || '';
        (form.elements.namedItem("corpo") as HTMLTextAreaElement).placeholder = data.metadata || '';
        }
    } catch (error) {
        setMensagem('Erro ao carregar marca');
    }
    };

    if (id) {
    getPostEspecifico();
    }
}, [id]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
    
    const form = event.currentTarget;
    
    const titulo = (form.elements.namedItem("titulo") as HTMLInputElement).value;
    const corpo = (form.elements.namedItem("corpo") as HTMLTextAreaElement).value;
    const categoria = (form.elements.namedItem("categoria") as HTMLSelectElement).value;
    const autor = (form.elements.namedItem("autor") as HTMLSelectElement).value;
    const img = (form.elements.namedItem("imagem") as HTMLInputElement).files?.[0];

    if (!titulo || !corpo) {
        // setMensagem(<span className="text-red-600 font-bold">Por favor, preencha o nome da marca!</span>);
        setMensagem('Por favor, preencha os itens necessários!');
        setIsLoading(false);
        return;
    }

    try {
        let imgUrlFinal = postData?.mainImage;

        if (img) {
        const formData = new FormData();
        formData.append("imagem", img);

        const imagemResposta = await fetch ("/api/imgs-blog", {
            method: "POST", body: formData
        });

        if (!imagemResposta.ok) {
            throw new Error("Erro no envio");
        }

        const imgFinal = await imagemResposta.json();
        imgUrlFinal = imgFinal.urlFinal;
        }

        const resposta = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            titulo, corpo, categoria, autor, url: imgUrlFinal
        })
        });
        
        const resultado = await resposta.json();

        if (resposta.ok) {
        setMensagem(
            <>
                <span className="text-green-600 font-bold block break-words">
                    Post atualizado com sucesso!
                </span>
            </>
        );
        
        setTimeout(() => {
            router.push('/admin/posts');
        }, 2000);
    } else {
        setMensagem(<span className="text-red-600 font-bold">{resultado.message || "Erro ao atualizar post!"}</span>);
    }
} catch (error) {
    setMensagem(<span className="text-red-600 font-bold">Erro: {(error as Error).message}</span>);
} finally {
    setIsLoading(false);
}
}


// export default function PostForm() {
//     const [mensagem, setMensagem] = useState<React.ReactNode | null>(null);

//     async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//         event.preventDefault();
        
//         const form = event.currentTarget;
        
//         const titulo = (form.elements.namedItem("titulo") as HTMLInputElement).value;
//         const corpo = (form.elements.namedItem("corpo") as HTMLTextAreaElement).value;
//         const categoria = (form.elements.namedItem("categoria") as HTMLSelectElement).value;
//         const autor = (form.elements.namedItem("autor") as HTMLSelectElement).value;
//         const img = (form.elements.namedItem("imagem") as HTMLInputElement).files?.[0];

//         if (!img) {
//             setMensagem(<span className="text-red-600 font-bold">Por favor, selecione uma imagem!</span>);
//             return;
//         }

//         const fulldate = new Date();
//         const listaMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
//         const mesNome = listaMeses[fulldate.getMonth()];
//         const data = `${fulldate.getDate()} de ${mesNome}, ${fulldate.getFullYear()}`;
//         const slug = "post-titulo";

//         const formData = new FormData();
//         formData.append("imagem", img);

//         try {
//             const imagemResposta = await fetch("/api/imgs-blog", { method: "POST", body: formData });

//             if (imagemResposta.ok) {
//                 const imgFinal = await imagemResposta.json();
//                 const imgUrlFinal = imgFinal.urlFinal;

//                 const resposta = await fetch("/api/posts", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ titulo, corpo, categoria, autor, data, imgUrlFinal, slug })
//                 });

//                 const resultado = await resposta.json();

//                 if (resposta.ok) {
//                     setMensagem(
//                         <>
//                             <span className="text-green-600 font-bold block break-words">
//                                 Postagem feita com sucesso!
//                             </span>
//                             <span className="text-green-600 font-bold block break-words">
//                                 A URL da imagem: <a href={imgUrlFinal} target="_blank" className="text-blue-600 underline">{imgUrlFinal}</a>
//                             </span>
//                         </>
//                     );
//                     form.reset();
//                 } else {
//                     setMensagem(<span className="text-red-600 font-bold">{resultado.message || "Erro ao enviar a postagem!"}</span>);
//                 }
//             } else {
//                 setMensagem(<span className="text-red-600 font-bold">Erro ao enviar a imagem!</span>);
//             }
//         } catch (error) {
//             setMensagem(<span className="text-red-600 font-bold">Erro: {(error as Error).message}</span>);
//         }
//     }

    return (
        <div className="flex flex-col h-screen">
        <AdminHeader/>
          <div className="flex flex-col md:flex-row h-full">
            {/* Sidebar */}
            <div className="w-full md:w-60 bg-gray-800 text-white flex-shrink-0 md:text-start p-4 text-center">
  
                  <Link href="/admin">
                      <div className="p-4 hover:bg-blue-700 cursor-pointer hover:rounded">
                        Dashboard
                      </div>
                    </Link>
                
                    <Link href="/admin/logos">
                      <div className="p-4 hover:bg-gray-700 cursor-pointer hover:rounded">
                        Gerenciar Marcas
                      </div>
                    </Link>
                    
                      <div className="bg-blue-600 text-white p-4 font-bold rounded">
                        Gerenciar Blog
                      </div>
                    
                    <Link href="/admin/categorias">
                      <div className="p-4 hover:bg-gray-700 cursor-pointer hover:rounded">
                        Gerenciar Categorias
                      </div>
                    </Link>
                </div>

                <div className="flex-grow p-8 bg-slate-200 overflow-y-auto">
                    <div className="flex flex-col items-center justify-center w-full flex-1 mt-8">
                        <form onSubmit={handleSubmit} id="postForm" className="w-full max-w-lg bg-white p-6 border border-gray-300 rounded-lg shadow-md">
                        <h1 className="text-3xl font-bold text-center mb-6 text-black">Editar Postagem</h1>

                        <label className="font-semibold block">Título:</label>
                        <input type="text" name="titulo" required className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3" />

                        <label className="font-semibold block">Insira seu Texto:</label>
                        <textarea name="corpo" rows={4} required placeholder="Escreva seu texto aqui" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"></textarea>

                        <label className="font-semibold block">Autor:</label>
                        <select name="autor" className="w-full border border-gray-300 rounded-md p-2 mb-3">
                        <option value="1">Alexandre Diniz</option>
                        <option value="2">Rodrigo Scapolatempore</option>
                        <option value="3">Samira Batalha</option>
                        </select>

                        <label className="font-semibold block">Categoria:</label>
                        <select name="categoria" className="w-full border border-gray-300 rounded-md p-2 mb-3">
                        <option value="1">Emplacadas</option>
                        <option value="2">Institucional</option>
                        <option value="3">Clientes</option>
                        <option value="4">Destaques</option>
                        <option value="5">Outros</option>
                        </select>

                        <label className="font-semibold block">Insira uma imagem para o post:</label>
                        <input type="file" name="imagem" accept="image/*" required className="w-full border border-gray-300 rounded-md p-2 bg-white cursor-pointer mb-3" />

                        <input type="submit" value="Enviar" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition cursor-pointer mt-3" />

                        <div className="mt-0">
                            {mensagem}
                        </div>

                        </form>

                        <div className="mt-4 flex flex-col justify-center items-center">
                            <Link href="/admin/posts">
                                <button className="flex items-center bg-gray-800 mb-4 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700">
                                <span className="mr-2">⬅</span> Voltar para Postagens
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
}