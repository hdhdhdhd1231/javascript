const edad = prompt("Dime tu edad: ")
const notaMedia = promtp("Dime tu nota media (con 3 decimales): ")
console.log(notaMedia.toFixed(2));
console.log("Suma: ", edad + notaMedia);
console.log("Resta: ", edad - notaMedia);
console.log("Multiplicación: ", edad * notaMedia);
console.log("División: ", edad / notaMedia);
console.log("División string:", String(edad / notaMedia));
let verdadero = true;
console.log(typeof edad);
console.log(typeof notaMedia);
console.log(typeof verdadero);
console.log("¿La edad es un número?", !isNaN(edad));
console.log("¿La nota es un número?", !isNaN(notaMedia));
console.log("¿La nota está entre 0 & 10?", notaMedia >= 0 && notaMedia <= 10);
console.log("¿Se puede dividir entre la nota?", notaMedia !== 0);