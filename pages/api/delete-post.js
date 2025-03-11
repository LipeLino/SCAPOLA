import mysql from "mysql2/promise";

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({message: "Método inválido."})
    }

    const {id} = req.query;

    if (!id) {
        return res.status(400).json({ message: "ID da postagem não fornecido" });
    }

    const conexao = await mysql.createConnection({
        host: 'srv1549.hstgr.io',
        user: 'u348493890_scapola_adm',
        password: 'Root123root',
        database: 'u348493890_blog_scapola'
    });

    try {
        const [result] = await conexao.execute(
            'DELETE FROM publicacoes WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Postagem não encontrada" });
        }

        res.status(200).json({ message: "Postagem excluída com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao excluir a postagem" });
    } finally {
        await conexao.end();
    }
}
    