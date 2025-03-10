"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminHeader from '@/components/AdminHeader/AdminHeader';

const DeletarPostagens = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/brand');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Erro ao carregar os posts:', error);
        setMensagem('Erro ao carregar os posts');
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/brand/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem(data.message);
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        setMensagem(data.message);
      }
    } catch (error) {
      console.error('Erro ao deletar o post:', error);
      setMensagem('Erro ao deletar o post');
    }
  };

  return (
    <div className="min-h-screen bg-slate-200">
      <AdminHeader/>
      <div className="flex flex-col items-center justify-center w-full flex-1 mt-8">
        <div className="w-full max-w-4xl bg-white p-6 border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Excluir Logo</h1>

          {mensagem && <p className="text-center text-red-500">{mensagem}</p>}

          <table className="min-w-full table-auto">
            <thead>
              <tr>
                {/* <th className="px-4 py-2 border-b text-left">Imagem Principal</th> */}
                <th className="px-4 py-2 border-b font-bold text-left">NOME</th>
                <th className="px-4 py-2 border-b font-bold text-left">IMAGEM</th>
                <th className="px-4 py-2 border-b font-bold text-left">AÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {
              posts.map((post) => (
                <tr key={post.id} className='odd:bg-gray-50'>
                  {/* <td className="px-4 py-2 border-b">{post._id}</td> */}
                  <td className="px-4 py-2 font-bold text-black border-b">{post.name}</td>
                  <td className="px-4 py-2 border-b"> 
                    <div className="relative w-20 h-20">
                    <Image src={post.image} alt="title" fill className="object-cover rounded-md"/>
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-200"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
};

export default DeletarPostagens;
