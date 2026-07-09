import pg from 'pg';
import promptSync from 'prompt-sync';

const { Client } = pg;
const prompt = promptSync();

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'root',
    database: 'loja_db'
});

async function atualizarPreco() {

    try {
        await client.connect();

        // Primeiro mostra os produtos existentes
        const lista = await client.query('SELECT id, nome, preco FROM produtos ORDER BY id');

        console.log('\n📦 PRODUTOS DISPONÍVEIS\n');
        lista.rows.forEach(p => {
            console.log(`[${p.id}] ${p.nome} — R$ ${p.preco}`);
        });

        console.log('');
        const id        = Number(prompt('ID do produto a atualizar: '));
        const novoPreco = Number(prompt('Novo preço: '));

        const query = `
            UPDATE produtos
            SET preco = $1
            WHERE id = $2
            RETURNING *
        `;

        const resultado = await client.query(query, [novoPreco, id]);

        if (resultado.rows.length === 0) {
            console.log('\n❌ Produto não encontrado.');
        } else {
            console.log('\n✅ Preço atualizado com sucesso!');
            console.log(`${resultado.rows[0].nome}: R$ ${resultado.rows[0].preco}`);
        }

    } catch (erro) {
        console.log('❌ Erro ao atualizar produto:', erro.message);

    } finally {
        await client.end();
    }
}

atualizarPreco();