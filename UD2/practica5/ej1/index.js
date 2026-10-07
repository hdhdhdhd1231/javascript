const arr = ["sol", "montaña", "río", "bosque", "mariposa", "luz", "montaña"];

function repeticion(palabra) {
    let contador = 0;
    arr.forEach((x) => {
        if (x === palabra) contador++
    });
    return contador;
};

// const newArr = Array.from(...arr, (x) => x.length === "4"); una prueba de una anonima con from pero prefeiro simplificarlo con un forEach
function newArr() {
    let arrN = [];
    arr.forEach((x) => {
        if (x.length > "4") arrN.push(x)
    });
    return arrN;
};

function idxPalabra(palabra) {
    for (const [idx, value] of arr.entries()) {
        if (value === palabra) {
            return idx
        }
    }
    return -1;
};

console.log(arr);
console.log(`Veces que aparece 'montaña': ${repeticion("montaña")}`);
console.log('Palabras con más de cuatro caracteres: ' + newArr());
console.log(`Primera posición de 'río': ${idxPalabra("río")}`);
console.log(`Primera posición de 'nube': ${idxPalabra("nube")}`);