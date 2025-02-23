import mysql from "mysql2/promise";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({message: "Método inválido."})
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({message: "ID vazia."});
    }

    const conexao = await mysql.createConnection({
        host: 'srv1549.hstgr.io',
        user: 'u348493890_scapola_adm',
        password: 'Root123root',
        database: 'u348493890_blog_scapola'
    });

    try {
        const [rows] = await conexao.execute("SELECT * FROM publicacoes WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({message: "Post não identificado."})
        }

        const post = {
            _id: rows[0].id, 
            title: rows[0].titulo,
            metadata: rows[0].corpo_texto,
            body: rows[0].corpo_texto,
            mainImage: rows[0].img1,
            publishedAt: rows[0].data_pub,
            category: rows[0].categoria_id,
            author: rows[0].autor_id,
        };

        res.status(200).json(post);

        } catch (err) {
            res.status(500).json({ message: "Erro ao buscar o post." });
        } finally {
            conexao.end()
        }
}