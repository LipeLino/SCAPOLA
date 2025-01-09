import express from 'express';
import pkg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const { Pool } = pkg;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "",
    password: "123456789",
    port: 5432
});

const jwtSecret = "e951f50708ce8ae2f14ada209c1d8beb085534679c29220240c49fd6529d165b"

pool.on('error', (err) => {
    console.error('Erro no pool de conexões:', err);
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });}
    try {
        const result = await pool.query('SELECT * FROM login WHERE email = $1',[email]);
        if (result.rows.length===0) {
            return res.status(404).json({ error:'Usuário não encontrado', type: 'not-found' });
        }
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.senha);

        if (!validPassword) {return res.status(401).json({ error: 'Senha incorreta' });}

        const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
        res.json({ message: 'Login bem-sucedido', token });
    } catch (err) {
        console.error('Erro no servidor:', err.message);
        res.status(500).json({ error: 'Erro no servidor', details: err.message });
    }
});
process.on('SIGINT', async () => {
    console.log('Encerrando pool de conexões...');
    await pool.end();
    console.log('Pool encerrado com sucesso');
    process.exit(0);
});
pool.query('SELECT 1').then(() => {
    console.log('Conexão bem-sucedida');
}).catch(err => {
    console.error('Erro na conexão:', err.message);
});


app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
