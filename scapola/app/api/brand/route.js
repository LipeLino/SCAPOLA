import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

async function getConnection() {
    return mysql.createConnection({
        host: 'srv1549.hstgr.io',
        user: 'u348493890_scapola_adm',
        password: 'Root123root',
        database: 'u348493890_blog_scapola'
    });
}

export async function POST(req) {
    try {
        const {titulo, descricao, imgUrlFinal} = await req.json();

        if (!titulo || !descricao || !imgUrlFinal) {
            return NextResponse.json({ message: "Todos os campos são obrigatórios" }, { status: 400 });
        }

        const conexao = await getConnection();

        const query = 'INSERT INTO brands (nome, descricao, url) VALUES (?, ?, ?)';

        await conexao.execute(query, [titulo, descricao, imgUrlFinal]);
        await conexao.end();

        return NextResponse.json({ message: "Logomarca inserida com sucesso!" }, { status: 201 });
        } catch (err) {
            console.error("Erro no POST:", err);
        return NextResponse.json({ message: "Erro ao inserir logomarca", error: err.message }, { status: 500 });
    }
}

export async function GET() {
    const conexao = await getConnection();

    try {
        const [rows] = await conexao.execute(`
            SELECT * FROM brands ORDER BY id`);

        const formattedBrands = rows.map(post => ({
            id: post.id,
            name: post.nome,
            description: post.descricao,
            image: post.url,
        }));

        console.log(formattedBrands);

        return NextResponse.json(formattedBrands, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Erro ao buscar os posts." }, { status: 500 });
    } finally {
        await conexao.end();
    }
}