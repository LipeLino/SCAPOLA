"use client";

import AdminHeader from "@/components/AdminHeader/AdminHeader";
import React, { useState } from "react";
import Link from "next/link";

export default function PostForm() {
    const [mensagem, setMensagem] = useState<React.ReactNode | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        const form = event.currentTarget;
        
        const titulo = (form.elements.namedItem("titulo") as HTMLInputElement).value;
        const descricao = (form.elements.namedItem("descricao") as HTMLInputElement).value;
        const img = (form.elements.namedItem("imagem") as HTMLInputElement).files?.[0];

        if (!img || !titulo) {
            setMensagem(<span className="text-red-600 font-bold">Por favor, selecione uma imagem!</span>);
            return;
        }

        const formData = new FormData();
        formData.append("imagem", img);

        try {
            const imagemResposta = await fetch("/api/brand-img", { method: "POST", body: formData });

            if (imagemResposta.ok) {
                const imgFinal = await imagemResposta.json();
                const imgUrlFinal = imgFinal.urlFinal;

                const resposta = await fetch("/api/brand", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ titulo, descricao, imgUrlFinal })
                });

                const resultado = await resposta.json();

                if (resposta.ok) {
                    setMensagem(
                        <>
                            <span className="text-green-600 font-bold block break-words">
                                Logo inserida com sucesso!
                            </span>
                            <span className="text-green-600 font-bold block break-words">
                                URL da imagem: <a href={imgUrlFinal} target="_blank" className="text-blue-600 underline">{imgUrlFinal}</a>
                            </span>
                        </>
                    );
                    form.reset();
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
        <div className="min-h-screen bg-slate-200">
        <AdminHeader/>
            <div className="flex flex-col items-center justify-center w-full flex-1 mt-8">
                <form onSubmit={handleSubmit} id="postForm" className="w-full max-w-lg bg-white p-6 border border-gray-300 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-center mb-6 text-black">Nova Logo</h1>

                    <label className="font-semibold block">Nome:</label>
                    <input type="text" name="titulo" required className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3" />

                    <label className="font-semibold block">Descrição:</label>
                    <input type="text" name="descricao" required className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3" />

                    <label className="font-semibold block">Insira a logo:</label>
                    <input type="file" name="imagem" accept="image/*" required className="w-full border border-gray-300 rounded-md p-2 bg-white cursor-pointer mb-3" />

                    <input type="submit" value="Enviar" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition cursor-pointer mt-3" />

                    <div className="mt-3">{mensagem}</div>
                </form>
                <div className="mt-4">
                <Link href="/admin">
                    <button className="flex items-center bg-gray-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200">
                        <span className="mr-2">⬅</span> Voltar para o Painel
                    </button>
                </Link>
            </div>
            </div>
        </div>
    );
}
