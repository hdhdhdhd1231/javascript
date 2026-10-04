let numero = prompt("Introduce un número:");
for (let x = 1; x <= numero; x++) {
    if (numero % x === 0) {
        console.log(x);
    }
};