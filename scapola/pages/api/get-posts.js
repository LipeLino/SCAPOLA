import mysql from "mysql2/promise";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({message: "Método inválido."})
    }

    const conexao = await mysql.createConnection({
        host: 'srv1549.hstgr.io',
        user: 'u348493890_scapola_adm',
        password: 'Root123root',
        database: 'u348493890_blog_scapola'
    });

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
            mainImage: post.img1,
            author: post.autor_nome,
            category: post.categoria_nome,
            publishedAt: post.data_pub,
        }));

        res.status(200).json(formattedPosts);
    }
    catch (err) {
        res.status(500).json({message: "Erro ao buscar os posts."});
    }
    finally {
        conexao.end();
    }
}