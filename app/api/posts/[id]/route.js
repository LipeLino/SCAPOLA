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

export async function GET(req, {params}) {
    const { id } = await params;
    const conexao = await getConnection();
    const placeholderImg = "https://placehold.co/1280x720?text=Sem+Imagem";

    if (!id) {
        return NextResponse.json({message: "ID vazia."}, {status: 400});
    }

    try {
        const [rows] = await conexao.execute(`
            SELECT publicacoes.id, titulo, autor_id, data_pub, categoria_id, slug, corpo_texto, img1, img2,
            categorias.nome AS categoria_nome,
            autores.nome AS autor_nome
            FROM publicacoes
            INNER JOIN categorias
            ON publicacoes.categoria_id = categorias.id
            INNER JOIN autores
            ON publicacoes.autor_id = autores.id
            WHERE publicacoes.id = ?
            ORDER BY publicacoes.id DESC;
            `, [id]);

        if (rows.length === 0) {
            return NextResponse.json({message: "Post não identificado."}, {status: 404})
        }

        const post = {
            _id: rows[0].id, 
            title: rows[0].titulo,
            metadata: rows[0].corpo_texto,
            body: rows[0].corpo_texto,
            mainImage: rows[0].img1 || placeholderImg,
            // optionalImage: rows[0].img2,
            publishedAt: rows[0].data_pub,
            category: rows[0].categoria_nome,
            author: rows[0].autor_nome,
        };

        return NextResponse.json(post, { status: 200 });

        } catch (err) {
            return NextResponse.json({ message: "Erro ao buscar o post." }, {status: 500});
        } finally {
            conexao.end()
        }
}

export async function DELETE(req, {params}) {
    const { id } = await params;
    const conexao = await getConnection();
  
    if (!id) {
      return NextResponse.json({ message: "ID da postagem não fornecido" }, { status: 400 });
    }
  
    try {
      const [result] = await conexao.execute(
        'DELETE FROM publicacoes WHERE id = ?',
        [id]
      );
  
      if (result.affectedRows === 0) {
        return NextResponse.json({ message: "Post não encontrado" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Post excluído com sucesso!" }, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ message: "Erro ao excluir o post" }, { status: 500 });
    } finally {
      await conexao.end();
    }
  }  