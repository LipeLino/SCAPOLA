import mysql from 'mysql2';
//import fs from 'fs';

export default function handler (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: "Método não suportado"});
    }

    const {titulo, categoria, corpo} = req.body;

    if (!titulo || !corpo || !categoria) {
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

        const query = 'INSERT INTO pub_testes (titulo, corpo, categoria) VALUES (?, ?, ?)';
        
        conn.query (query, [titulo, corpo, categoria], (err, result) => {

            if (err) {
                conn.end();
                return res.status(500).json({message: "Erro na inserção"})
            }
            conn.end();
            return res.status(201).json({message: "Sucesso"});
        });
    });
}