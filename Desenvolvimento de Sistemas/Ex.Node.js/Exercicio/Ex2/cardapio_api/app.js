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
        database: 'cardapio_db'
    });
}

app.get('/api/categorias', async (req, res) => {
    const client = criarCliente();
    
    try {
        await client.connect();
        const resultado = await client.query(
            'SELECT * FROM categorias'
        );
        res.json(resultado.rows);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao buscar categorias' });
    } finally {
        await client.end();
    }
});

app.get('/api/pratos', async (req, res) => { 
    const client = criarCliente();

    try {
        await client.connect();
        const resultado = await client.query(
            'SELECT pratos.*, categorias.nome AS categoria_nome FROM pratos INNER JOIN categorias ON pratos.categoria_id = categorias.id'
        );
        res.json(resultado.rows);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao buscar pratos' });
    } finally {
        await client.end();
    }
});

app.get('/api/pratos/:id', async (req, res) => {
    const client = criarCliente();
    const { id } = req.params;

    try {
        await client.connect();
        const resultado = await client.query(
        'SELECT pratos.*, categorias.nome AS categoria_nome FROM pratos INNER JOIN categorias ON pratos.categoria_id = categorias.id WHERE pratos.id = $1',
        [id]
    );
        res.json(resultado.rows[0]);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao buscar prato' });
    } finally {
        await client.end();
    }
});

app.post('/api/pratos', async (req, res) => {
    const {nome, descricao, preco, disponivel, categoria_id} = req.body;
    const client = criarCliente();

    try {
    await client.connect();

    if (!nome || nome.trim() === '') {
        return res.status(400).json({ erro: 'Nome não pode ser vazio' });
    }

    if (preco <= 0) {
        return res.status(400).json({ erro: 'Preço deve ser maior que zero' });
    }

    if (!categoria_id) {
        return res.status(400).json({ erro: 'Categoria é obrigatória' });
    }

    const resultado = await client.query(
    'INSERT INTO pratos (nome, descricao, preco, disponivel, categoria_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nome, descricao, preco, disponivel, categoria_id]
    );
        res.status(201).json(resultado.rows[0]);
    } catch (erro) {
    console.error(erro);

    if (erro.code === '23503') {
        return res.status(400).json({ erro: 'Categoria não encontrada' });
    }

    res.status(500).json({ erro: 'Erro ao criar prato' });

    } finally {
        await client.end();
    }
});

app.put('/api/pratos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, disponivel, categoria_id } = req.body;
    const client = criarCliente();

    try {
        await client.connect();
        const resultado = await client.query(
            'UPDATE pratos SET nome = $1, descricao = $2, preco = $3, disponivel = $4, categoria_id = $5 WHERE id = $6 RETURNING *',
            [nome, descricao, preco, disponivel, categoria_id, id]
        );
        res.json(resultado.rows[0]);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao atualizar prato' });
    } finally {
        await client.end();
    }
});

app.delete('/api/pratos/:id', async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();

        const { id } = req.params;

        const resultado = await client.query(
            'DELETE FROM pratos WHERE id = $1',
            [id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({ erro: 'Prato não encontrado' });
        }
        else{
        res.json({ mensagem: 'Prato removido com sucesso' });
        }

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao remover prato' });

    } finally {
        await client.end();
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
