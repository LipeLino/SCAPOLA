"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AdminHeader from "@/components/AdminHeader/AdminHeader";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'

// Toolbar Component
const Toolbar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-100 rounded">
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={`
        w-10 h-10 flex items-center justify-center 
        ${editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-200'}
        rounded font-bold
      `}
    >
      <span className="font-bold text-xl">B</span>
    </button>
    <button
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={`
        w-10 h-10 flex items-center justify-center 
        ${editor.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-gray-200'}
        rounded
      `}
    >
      <span className="italic text-xl">I</span>
    </button>
    <button
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      className={`
        w-10 h-10 flex items-center justify-center 
        ${editor.isActive('underline') ? 'bg-blue-500 text-white' : 'bg-gray-200'}
        rounded
      `}
    >
      <span className="underline text-base">U</span>
    </button>
      <select 
        onChange={(e) => editor.chain().focus().setTextAlign(e.target.value).run()}
        className="p-1 rounded bg-gray-200"
      >
        <option value="left">Esquerda</option>
        <option value="center">Centro</option>
        <option value="right">Direita</option>
      </select>
      {/* <button
        onClick={() => {
          const url = window.prompt('URL da imagem')
          if (url) {
            editor.chain().focus().setImage({ src: url }).run()
          }
        }}
        className="p-1 rounded bg-gray-200"
      >
        Imagem
      </button> */}
    </div>
  )
}

export default function PostForm() {
    const [mensagem, setMensagem] = useState<React.ReactNode | null>(null);
    const [categorias, setCategorias] = useState<{ id: number; nome: string; cor: string }[]>([]);

    // Tiptap Editor
    const editor = useEditor({
      extensions: [
        StarterKit,
        Underline,
        Image,
        TextAlign.configure({
          types: ['paragraph'],
        }),
      ],
      content: '',
      editorProps: {
        attributes: {
          class: 'prose max-w-none p-2 min-h-[200px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400',
        },
      },
    });

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const response = await fetch("/api/category");
                if (!response.ok) throw new Error("Erro ao buscar categorias");

                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error("Erro ao carregar categorias:", error);
            }
        }
        fetchCategorias();
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        const form = event.currentTarget;
        
        const titulo = (form.elements.namedItem("titulo") as HTMLInputElement).value;
        const corpo = editor?.getHTML() || ''; // Get HTML content from Tiptap
        const categoria = (form.elements.namedItem("categoria") as HTMLSelectElement).value;
        const autor = (form.elements.namedItem("autor") as HTMLSelectElement).value;
        const img = (form.elements.namedItem("imagem") as HTMLInputElement).files?.[0];

        if (!img) {
            setMensagem(<span className="text-red-600 font-bold">Por favor, selecione uma imagem!</span>);
            return;
        }

        const fulldate = new Date();
        const listaMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        const mesNome = listaMeses[fulldate.getMonth()];
        const data = `${fulldate.getDate()} de ${mesNome}, ${fulldate.getFullYear()}`;
        const slug = "post-titulo";

        const formData = new FormData();
        formData.append("imagem", img);

        try {
            const imagemResposta = await fetch("/api/imgs-blog", { method: "POST", body: formData });

            if (imagemResposta.ok) {
                const imgFinal = await imagemResposta.json();
                const imgUrlFinal = imgFinal.urlFinal;

                const resposta = await fetch("/api/posts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ titulo, corpo, categoria, autor, data, imgUrlFinal, slug })
                });

                const resultado = await resposta.json();

                if (resposta.ok) {
                    setMensagem(
                        <>
                            <span className="text-green-600 font-bold block break-words">
                                Postagem feita com sucesso!
                            </span>
                            <span className="text-green-600 font-bold block break-words">
                                A URL da imagem: <a href={imgUrlFinal} target="_blank" className="text-blue-600 underline">{imgUrlFinal}</a>
                            </span>
                        </>
                    );
                    form.reset();
                    editor?.commands.clearContent(); // Clear Tiptap editor
                } else {
                    setMensagem(<span className="text-red-600 font-bold">{resultado.message || "Erro ao enviar a postagem!"}</span>);
                }
            } else {
                setMensagem(<span className="text-red-600 font-bold">Erro ao enviar a imagem!</span>);
            }
        } catch (error) {
            setMensagem(<span className="text-red-600 font-bold">Erro: {(error as Error).message}</span>);
        }
    }

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
                        <h1 className="text-3xl font-bold text-center mb-6 text-black">Nova Postagem</h1>

                        <label className="font-semibold block">Título:</label>
                        <input type="text" name="titulo" required className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3" />

                        <label className="font-semibold block">Insira seu Texto:</label>
                        <Toolbar editor={editor} />
                        <EditorContent editor={editor} />

                        <label className="font-semibold block mt-3">Autor:</label>
                        <select name="autor" className="w-full border border-gray-300 rounded-md p-2 mb-3">
                        <option value="1">Alexandre Diniz</option>
                        <option value="2">Rodrigo Scapolatempore</option>
                        <option value="3">Samira Batalha</option>
                        </select>

                        <label className="font-semibold block">Categoria:</label>
                        <select name="categoria" className="w-full border border-gray-300 rounded-md p-2 mb-3">
                        {categorias.length > 0 ? (
                            categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))
                        ) : (
                            <option>Carregando categorias...</option>
                        )}
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