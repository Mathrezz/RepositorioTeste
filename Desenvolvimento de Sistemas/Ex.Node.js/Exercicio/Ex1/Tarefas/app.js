import express from 'express';
import pkg from 'pg';

const { Client } = pkg;

const app = express();
const PORT = 3000;

app.use(express.json());

function criarCliente() {
    return new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'root',
        database: 'teste_db'
    });
}

// GET /api/tarefas
app.get('/api/tarefas', async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();

        const resultado = await client.query(
            'SELECT * FROM tarefas'
        );

        res.json(resultado.rows);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: 'Erro ao buscar tarefas'
        });
    } finally {
        await client.end();
    }
});

// POST /api/tarefas
app.post('/api/tarefas', async (req, res) => {
    const client = criarCliente();

    try {
        const { titulo, status } = req.body;

        await client.connect();

        const resultado = await client.query(
            'INSERT INTO tarefas (titulo, status) VALUES ($1, $2) RETURNING *',
            [titulo, status]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: 'Erro ao cadastrar tarefa'
        });
    } finally {
        await client.end();
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});