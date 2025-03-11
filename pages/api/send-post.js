import mysql from 'mysql2';
//import fs from 'fs';

export default function handler (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: "Método não suportado"});
    }

    const {titulo, corpo, categoria, autor, data, imgUrlFinal, slug} = req.body;

    if (!titulo || !corpo || !categoria || !autor) {
        return res.status(400).json({message: "Todos os campos são obrigatórios"});
    }

    const conn = mysql.createConnection({
        host: 'srv1549.hstgr.io',
        user: 'u348493890_scapola_adm',
        password: 'Root123root',
        database: 'u348493890_blog_scapola'
    });

    conn.connect((err) => {
        if (err) {
            conn.end();
            return res.status(500).json({message: "Erro na conexão.", error: err.message});
        }
        //{titulo, corpo, categoria, autor, data, slug}
        //const query = 'INSERT INTO pub_testes (titulo, corpo, categoria) VALUES (?, ?, ?)';
        const query = 'INSERT INTO publicacoes (titulo, corpo_texto, categoria_id, autor_id, data_pub, img1, slug) VALUES (?, ?, ?, ?, ?, ?, ?)';
        
        conn.query (query, [titulo, corpo, categoria, autor, data, imgUrlFinal, slug], (err, result) => {

            if (err) {
                conn.end();
                return res.status(500).json({message: "Erro na inserção", error: err.message})
            }
            conn.end();
            return res.status(201).json({message: "Sucesso"});
        });
    });
}