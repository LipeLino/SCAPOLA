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

export async function GET() {
    const conexao = await getConnection();
    const placeholderImg = "https://placehold.co/640x480?text=Sem+Imagem";

    try {
        const [rows] = await conexao.execute(`
            SELECT publicacoes.id, titulo, autor_id, data_pub, categoria_id, slug, corpo_texto, img1,
            categorias.nome AS categoria_nome,
            autores.nome AS autor_nome
            FROM publicacoes
            INNER JOIN categorias
            ON publicacoes.categoria_id = categorias.id
            INNER JOIN autores
            ON publicacoes.autor_id = autores.id
            ORDER BY publicacoes.id DESC;
            `);

        const formattedPosts = rows.map(post => ({
            _id: post.id,
            title: post.titulo,
            slug: 'empty',
            metadata: post.corpo_texto,
            body: post.corpo_texto,
            mainImage: post.img1 || placeholderImg,
            author: post.autor_nome,
            category: post.categoria_nome,
            publishedAt: post.data_pub,
        }));

        return NextResponse.json(formattedPosts, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Erro ao buscar os posts." }, { status: 500 });
    } finally {
        await conexao.end();
    }
}

export async function POST(req) {
    try {
        const {titulo, corpo, categoria, autor, data, imgUrlFinal, slug} = await req.json();

        if (!titulo || !corpo || !categoria || !autor || !imgUrlFinal) {
            return NextResponse.json({ message: "Todos os campos são obrigatórios" }, { status: 400 });
        }

        const conexao = await getConnection();

        const query = 'INSERT INTO publicacoes (titulo, corpo_texto, categoria_id, autor_id, data_pub, img1, slug) VALUES (?, ?, ?, ?, ?, ?, ?)';

        await conexao.execute(query, [titulo, corpo, categoria, autor, data, imgUrlFinal, slug]);
        await conexao.end();

        return NextResponse.json({ message: "Post criado com sucesso" }, { status: 201 });
        } catch (err) {
            console.error("Erro no POST:", err);
        return NextResponse.json({ message: "Erro ao inserir post", error: err.message }, { status: 500 });
    }
}