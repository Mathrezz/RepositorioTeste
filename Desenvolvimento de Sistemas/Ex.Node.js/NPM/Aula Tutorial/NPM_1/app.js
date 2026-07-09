import chalk from 'chalk';
import sillyname from 'sillyname';
import promptSync from 'prompt-sync';
import pg from 'pg';
const { Client } = pg;
const prompt = promptSync();


console.log(chalk.green("Mensagem colorida"));
console.log(chalk.red("Erro!"));

console.log(chalk.bgYellowBright("Blébléblé"));

const chimia = sillyname();

console.log("Nome gerado:", chimia);

console.log(chalk.blue(sillyname()));

const promptFn = promptSync();
const nome = promptFn('Qual é o seu nome? ');
console.log('Olá', nome);

console.log(chalk.bgBlueBright(`Olá ${nome}, seu novo nome é ${sillyname()}`));

// Configurações de conexão
// São as mesmas informações que você usa no pgAdmin!
const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'root',
    database: 'rpg_db'
});

// Conectar ao banco
async function cadastrarProduto() {

    try {
        await client.connect();

        console.log('\n🛒 CADASTRO DE PRODUTO\n');

        const nome      = prompt('Nome do produto: ');
        const preco     = Number(prompt('Preço: '));
        const estoque   = Number(prompt('Estoque: '));
        const categoria = prompt('Categoria: ');

        const query = `
            INSERT INTO produtos (nome, preco, estoque, categoria)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

        const valores = [nome, preco, estoque, categoria];

        const resultado = await client.query(query, valores);

        console.log('\n✅ Produto cadastrado com sucesso!');
        console.log('Dados salvos:', resultado.rows[0]);

    } catch (erro) {
        console.log('❌ Erro ao cadastrar produto:', erro.message);

    } finally {
        await client.end();
    }
}

cadastrarProduto();