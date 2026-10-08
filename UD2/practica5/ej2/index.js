// recordatorio: '==' solo compara el valor '===' compara valor & tipo
const arr = [".", ".", "#", ".", ".", "."];
const arrRechazos = [];

function inicializadorArr() {
    let idxs = [];
    for (let x = 0; x < arr.length; x++) {
        if (arr[x] === ".") idxs.push(x);
    };
    arr[idxs[Math.floor(Math.random() * idxs.length)]] = "S";
}

function estaBloqueado(movimiento) {
    const idxS = arr.indexOf("S");
    const despla = movimiento === "derecha" ? 1 : -1;
    const destino = idxS + despla; // + (+) - === -
    if (destino < 0 || destino >= arr.length) { // >= porque empezamos en 0, en este caso 6 seria salierse del limite porque el limite maximo es 5 (0,1,2,3,4,5)
        return "l";
    }
    if (arr[destino] === "#") {
        return "b";
    }
    return "ok";
}

function moverR(movimiento) {
    if (movimiento !== "derecha" && movimiento !== "izquierda") {
        document.body.innerHTML += "<h2>mov prohibido</h2>";
        return;
    }
    const idxS = arr.indexOf("S");
    const despla = movimiento === "derecha" ? 1 : -1;
    const destino = idxS + despla;
    const estado = estaBloqueado(movimiento);
    if (estado === "l") {
        arrRechazos.push(movimiento);
        document.body.innerHTML += `<h1>${movimiento}: rechazado; el destino queda fuera del pasillo</h1>`;
        return;
    }
    if (estado === "b") {
        arrRechazos.push(movimiento);
        document.body.innerHTML += `<h1>${movimiento}: rechazado; hay un obstáculo en la posición ${destino}</h1>`;
        return;
    }
    arr[idxS] = ".";
    arr[destino] = "S";
    document.body.innerHTML += `<h1>${movimiento}: aceptado; posición ${destino}</h1>`;
}

inicializadorArr();
document.body.innerHTML += `<h1>Arr Inicializado: ${arr}</h1>`;
moverR("derecha");
moverR("derecha");
moverR("izquierda");
moverR("izquierda");
document.body.innerHTML += `<h1>Órdenes rechazadas: ${arrRechazos}</h1>`;
document.body.innerHTML += `<h1>Pasillo final: ${arr[arr.indexOf("S")] = "R", arr}</h1>`;