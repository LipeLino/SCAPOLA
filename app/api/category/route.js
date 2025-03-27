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

export async function POST(req) {
    try {
        const {titulo, cor} = await req.json();

        if (!titulo || !cor) {
            return NextResponse.json({ message: "Todos os campos são obrigatórios" }, { status: 400 });
        }

        const conexao = await getConnection();

        const query = 'INSERT INTO categorias (nome, cor) VALUES (?, ?)';

        await conexao.execute(query, [titulo, cor]);
        await conexao.end();

        return NextResponse.json({ message: "Categoria inserida com sucesso!" }, { status: 201 });
        } catch (err) {
            console.error("Erro no POST:", err);
        return NextResponse.json({ message: "Erro ao inserir categoria", error: err.message }, { status: 500 });
    }
}

export async function GET() {
    const conexao = await getConnection();

    try {
        const [rows] = await conexao.execute(`
            SELECT * FROM categorias ORDER BY id`);

        const formattedCat = rows.map(post => ({
            id: post.id,
            nome: post.nome,
            cor: post.cor,
        }));

        console.log(formattedCat);

        return NextResponse.json(formattedCat, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Erro ao buscar os posts." }, { status: 500 });
    } finally {
        await conexao.end();
    }
}