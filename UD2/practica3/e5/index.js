let numero = prompt("Dime un número:");
let suma = 0;
let cantidad = 0;
while (numero >= 0) {
    suma = suma + numero;
    cantidad = cantidad + 1;

    numero = prompt("Dime otro número:");
}
console.log("Suma:", suma);
console.log("Media:", suma / cantidad);