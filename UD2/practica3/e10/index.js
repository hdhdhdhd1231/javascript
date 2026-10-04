let numero = Math.floor(Math.random() * 10) + 1;
let intento = prompt("Adivina el número entre el 1-10 (incluidos):");
while (intento != numero) {
    if (intento < numero) {
        intento = prompt("Inténtalo de nuevo (tu número es menor):");
    } else {
        intento = prompt("Inténtalo de nuevo (tu número es mayor):");
    }
};
alert("Acertaste");