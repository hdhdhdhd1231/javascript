let numero1 = prompt("Dime el primer número:");
let numero2 = prompt("Dime el segundo número:");
if (isNaN(numero1) || isNaN(numero2) || numero1 === 0 || numero2 === 0) {
    alert("Error");
} else if (numero1 === numero2) {
    alert("Iguales");
} else if (numero1 > numero2) {
    alert("Primer número mayor que el segundo");
} else {
    alert("Segundo número mayor que el primero");
}