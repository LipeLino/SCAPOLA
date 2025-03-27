import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

async function getConnection() {
  return mysql.createConnection({
      host: process.env.DB_HOST_1,
      user: process.env.DB_USER_1,
      password: process.env.DB_PASSWORD_1,
      database: process.env.DB_DATABASE_1
  });
}

export async function DELETE(req, {params}) {
    const { id } = await params;
    const conexao = await getConnection();
  
    if (!id) {
      return NextResponse.json({ message: "ID da categoria não fornecido" }, { status: 400 });
    }
  
    try {
      const [result] = await conexao.execute(
        'DELETE FROM categorias WHERE id = ?', [id]
      );
  
      if (result.affectedRows === 0) {
        return NextResponse.json({ message: "Categoria não encontrada" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Categoria excluída com sucesso!" }, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Erro ao excluir a categoria" }, { status: 500 });
    } finally {
      await conexao.end();
    }
  }

  export async function GET(req, {params}) {
      const { id } = await params;
      const conexao = await getConnection();

      if (!id) {
        return NextResponse.json({ message: "Categoria não informada." }, { status: 400 });
      }
  
      try {
          const [rows] = await conexao.execute(
            'SELECT * FROM categorias WHERE id = ?', [id]);

          if (rows.length === 0) {
            return NextResponse.json({message: "Categoria não identificada."}, {status: 404})
          }
  
          const formattedBrand = {
            id: rows[0].id,
            nome: rows[0].nome,
            cor: rows[0].cor,
          };

          return NextResponse.json(formattedBrand, { status: 200 });
      } catch (err) {
          return NextResponse.json({ message: "Erro ao buscar categorias." }, { status: 500 });
      } finally {
          await conexao.end();
      }
  }

  export async function PUT(req, {params}) {
    const { id } = await params;
    const conexao = await getConnection();

    if (!id) {
      return NextResponse.json({ message: "Categoria não informada." }, { status: 400 });
    }

    const { nome, cor, url } = await req.json();

    try {
      const [result] = await conexao.execute(
        'UPDATE categorias SET nome = ?, cor = ? WHERE id = ?',
        [nome, cor, id]
      )
      
      if (result.affectedRows === 0) {
        return NextResponse.json({ message: "Marca não encontrada" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Categoria editada com sucesso!" }, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Erro ao excluir a categoria." }, { status: 500 });
    } finally {
      await conexao.end();
    }
  }