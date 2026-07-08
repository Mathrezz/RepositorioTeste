import chalk from 'chalk';
import sillyname from 'sillyname';
import PromptSync from 'prompt-sync';

console.log(chalk.green("Mensagem colorida"));
console.log(chalk.red("Erro!"));

console.log(chalk.bgYellowBright("Blébléblé"));

const chimia = sillyname();

console.log("Nome gerado:", chimia);

console.log(chalk.blue(sillyname()));

const promptFn = PromptSync();
const nome = promptFn('Qual é o seu nome? ');
console.log('Olá', nome);

console.log(chalk.bgBlueBright(`Olá ${nome}, seu novo nome é ${sillyname()}`));
