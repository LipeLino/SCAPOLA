"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader/AdminHeader';
import Image from 'next/image';
import { Blog } from "@/types/blog";
import BlogData from "@/components/Blog/blogData";

const AdminPostsPage = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [mensagem, setMensagem] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Use o BlogData já importado
    const loadPosts = async () => {
      try {
        // Como BlogData já é o resultado da função pegaPost()
        // podemos usá-lo diretamente
        setPosts(BlogData);
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
        setMensagem('Erro ao carregar os posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este post?")) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setMensagem("Post excluído com sucesso!");
          // Atualiza a lista de posts removendo o excluído
          setPosts(posts.filter(post => post._id !== id));
        } else {
          setMensagem("Erro ao excluir o post");
        }
      } catch (error) {
        console.error('Erro ao deletar o post:', error);
        setMensagem('Erro ao deletar o post');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <AdminHeader/>
          <div className="flex flex-1">
            <div className="w-64 bg-gray-800 text-white flex-shrink-0">          
                  <div className="p-4 font-bold hover:bg-blue-700 cursor-pointer">
                    Dashboard
                  </div>
            
                  <div className="p-4 hover:bg-gray-700 cursor-pointer">
                    Gerenciar Marcas
                  </div>
                
                  <div className="bg-blue-600 text-white p-4 font-bold">
                    Gerenciar Blog
                  </div>
                
                  <div className="p-4 hover:bg-gray-700 cursor-pointer">
                    Gerenciar Categorias
                  </div>
            </div>
        
        {/* Conteúdo principal */}
        <div className="flex-grow p-8 bg-white overflow-y-auto">
            <div className="flex justify-center items-center h-screen">
              <p>Buscando todos os posts...</p>
            </div>
          </div>
        </div>
      </div>
    );
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h3 className="text-4xl font-medium font-bold text-black">Gerenciar Blog</h3>
            <Link href="/admin/posts/adicionar">
              <button className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-800">
              <p>+ Nova Postagem</p>
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
            {posts.map((post) => (
              <div key={post._id} className="bg-slate-50 border-slate-300 border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:shadow-slate-500 transition-shadow duration-200">
                <div className="relative h-48 w-full">
                  <Image 
                    src={post.mainImage} 
                    alt={post.title} 
                    fill 
                    className="object-contain p-1" 
                  />
                </div>
                <div className="p-4 bg-gradient-to-b from-slate-100 to-slate-200">
                  <h2 className="font-bold text-black text-lg mb-2 truncate">{post.title}</h2>
                  <p className="text-sm mb-1 mt-2 text-gray-500">Publicado em: <span className="font-semibold text-black dark:text-white">{post.publishedAt}</span></p>
                  <p className="text-sm text-gray-500">Autor: <span className="font-semibold text-black dark:text-white">{post.author}</span></p>
                  <div className="mt-1 mb-2">
                    <span className="py-1 px-3 rounded font-medium text-xs text-white inline-block" style={{ backgroundColor: post.color}}>
                      {post.category}
                    </span>
                  </div>         
                  <div className="flex space-x-1">
                    <Link href={`/admin/posts/editar/${post._id}`} className="flex-1">
                      <button className="w-full bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
                        Editar
                      </button>
                    </Link>
                    <div className="flex-1">
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="w-full bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">
                        Deletar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma postagem encontrada.</p>
            </div>
          )}
        </div>


    </div>
  </div>
  );
};

export default AdminPostsPage;