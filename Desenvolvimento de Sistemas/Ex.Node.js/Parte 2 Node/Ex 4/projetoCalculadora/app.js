const operacoes = require("./utils/operacoes");
const { validar } = require("./utils/validacoes");

let numbA = 6;
let numbB = 7;

if (validar(numbA, numbB)) {
    console.log("Resultado da soma:", operacoes.somar(numbA, numbB));
    console.log("Resultado da subtrair:", operacoes.subtrair(numbA, numbB));
    console.log("Resultado da Multiplicar:", operacoes.multiplicar(numbA, numbB));
    console.log("Resultado da Divisão:", operacoes.dividir(numbA, numbB));
} else {
    console.log("Os números não estão passando pela validação!");
}
