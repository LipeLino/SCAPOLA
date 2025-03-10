import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

async function getConnection() {
    return mysql.createConnection({
        host: 'srv1549.hstgr.io',
        user: 'u348493890_scapola_adm',
        password: 'Root123root',
        database: 'u348493890_blog_scapola'
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
