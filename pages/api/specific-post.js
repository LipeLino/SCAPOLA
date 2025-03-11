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
            return res.status(404).json({message: "Post não identificado."})
        }

        const post = {
            _id: rows[0].id, 
            title: rows[0].titulo,
            metadata: rows[0].corpo_texto,
            body: rows[0].corpo_texto,
            mainImage: rows[0].img1,
            optionalImage: rows[0].img2,
            publishedAt: rows[0].data_pub,
            category: rows[0].categoria_nome,
            author: rows[0].autor_nome,
        };

        res.status(200).json(post);

        } catch (err) {
            res.status(500).json({ message: "Erro ao buscar o post." });
        } finally {
            conexao.end()
        }
}