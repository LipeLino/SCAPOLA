import mysql from "mysql2/promise";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({message: "Método inválido."})
    }

    const conexao = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'pub_testes'
        /*host: 'srv1549.hstgr.io',
        user: 'u348493890_scapola_adm',
        password: 'Root123root',
        database: 'u348493890_blog_scapola'*/
    });

    try {
        const [rows] = await conexao.execute("SELECT * FROM pub_testes order by ID");
        res.status(200).json(rows);
    }
    catch (err) {
        res.status(500).json({message: "Erro ao buscar os posts."});
    }
    finally {
        conexao.end();
    }
}