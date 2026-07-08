function validar(numbA, numbB) {
    return typeof numbA === 'number' && !Number.isNaN(numbA) && 
           typeof numbB === 'number' && !Number.isNaN(numbB);
}

module.exports = { validar };
