function validarNome(nome){ 
    if(nome.length >= 3){
        console.log("Nome validado!", nome);
    }
    else{ 
        console.log("Nome inválidado pois tem menos de 3 letras.");
    }
}

function validarIdade(idade){
    if(idade >= 0){
        console.log("Idade validada!", idade);
    }
    else{
        console.log("Idade inválidada por estar com valor abaixo de 0.");
    }
}

module.exports = {
    validarNome,
    validarIdade
};