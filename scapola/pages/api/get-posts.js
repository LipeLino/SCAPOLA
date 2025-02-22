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
        const [rows] = await conexao.execute("SELECT * FROM pub_testes order by id DESC");

        const formattedPosts = rows.map(post => ({
            _id: post.id,
            title: post.titulo,
            metadata: post.corpo,
            mainImage: "/images/blog/blog-05.png",
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