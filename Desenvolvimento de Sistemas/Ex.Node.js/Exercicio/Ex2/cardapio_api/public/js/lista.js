async function carregarPratos() { //Cria funcao
    const resposta = await fetch('/api/pratos'); //cria constante e integra o fetch ou seja pede para o back enviar os dados
    const pratos = await resposta.json(); // cria constante, await pausa e depois le a resposta

    const pratosContainer = document.getElementById('pratos'); 

    pratos.forEach(prato => {// repete pra todos 

        let classeStatus;

        if (prato.disponivel === true) {//verifica se esta disponivel
            classeStatus = 'disponivel'
        } else {
            classeStatus = 'indisponivel'
        }

        const card = document.createElement('div'); //cria um div pra cada card no HTML 
        card.classList.add('card'); //permite utilizar o css de um jeito mais facil 

        card.innerHTML = `
        <h2>${prato.nome}</h2>
        <p>${prato.descricao}</p>
        <p>${prato.categoria_nome}</p>
        <p>${prato.preco}</p>
        <span class="${classeStatus}">
        ${prato.disponivel ? 'Disponível' : 'Indisponível'}
        </span>
        `;

    pratosContainer.appendChild(card); //coloca card no HTML

    });
}
    carregarPratos(); //inicializa a funcao

async function carregarCategorias(){
    const resposta = await fetch('/api/categorias');
    const categorias = await resposta.json();

    const select = document.getElementById('categorias');

    categorias.forEach(categorias => {
        const option = document.createElement('option');
        option.classList.add('option');

        option.textContent = categorias.nome;
        
        select.appendChild(option);
    });
}