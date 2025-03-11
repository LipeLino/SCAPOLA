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
        'DELETE FROM brands WHERE id = ?',
        [id]
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