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
      return NextResponse.json({ message: "ID da postagem não fornecido" }, { status: 400 });
    }
  
    try {
      const [result] = await conexao.execute(
        'DELETE FROM brands WHERE id = ?', [id]
      );
  
      if (result.affectedRows === 0) {
        return NextResponse.json({ message: "Logo não encontrada" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Logo excluída com sucesso!" }, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Erro ao excluir a logo" }, { status: 500 });
    } finally {
      await conexao.end();
    }
  }

  export async function GET(req, {params}) {
      const { id } = await params;
      const conexao = await getConnection();

      if (!id) {
        return NextResponse.json({ message: "ID não informado." }, { status: 400 });
      }
  
      try {
          const [rows] = await conexao.execute(
            'SELECT * FROM brands WHERE id = ?', [id]);

          if (rows.length === 0) {
            return NextResponse.json({message: "Marca não identificada."}, {status: 404})
          }
  
          const formattedBrand = {
            id: rows[0].id,
            titulo: rows[0].nome,
            descricao: rows[0].descricao,
            url: rows[0].url,
          };

          return NextResponse.json(formattedBrand, { status: 200 });
      } catch (err) {
          return NextResponse.json({ message: "Erro ao buscar os posts." }, { status: 500 });
      } finally {
          await conexao.end();
      }
  }

  export async function PUT(req, {params}) {
    const { id } = await params;
    const conexao = await getConnection();

    if (!id) {
      return NextResponse.json({ message: "ID não informado." }, { status: 400 });
    }

    const { titulo, descricao, url } = await req.json();

    try {
      const [result] = await conexao.execute(
        'UPDATE brands SET nome = ?, descricao = ?, url = ? WHERE id = ?',
        [titulo, descricao, url, id]
      )
      
      if (result.affectedRows === 0) {
        return NextResponse.json({ message: "Marca não encontrada" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Marca editada com sucesso!" }, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Erro ao excluir a marca." }, { status: 500 });
    } finally {
      await conexao.end();
    }
  }