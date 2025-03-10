import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

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

    try {
        const [posts] = await conexao.execute("SELECT COUNT(*) as total FROM publicacoes");
        const [logos] = await conexao.execute("SELECT COUNT(*) as total FROM brands");

        await conexao.end();

        return NextResponse.json({
        postCount: posts[0].total,
        logoCount: logos[0].total,
        });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar os dados" }, { status: 500 });
    }

}
