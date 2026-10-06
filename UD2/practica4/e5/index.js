let nota;
const notas = [];
// recordatorio: ! == lo contrario & !! == hacer lo contrario dos veces (conservando estados tras aplicar uno)
const revisarNota = nota => nota !== null && nota.trim() !== "" && !isNaN(nota) && nota >= 0 && nota <= 10;
const calificar = nota => nota < 5 ? "Suspenso" : nota < 7 ? "Aprobado" : nota < 9 ? "Notable" : "Sobresaliente";
function calcularMedia(notas) {
    let suma = 0;
    for (let i = 0; i < notas.length; i++) {
        suma += notas[i];
    }
    return suma / notas.length;
}

while ((nota = prompt("Nota entre 0 y 10; -1 para terminar:")) !== "-1") {
    if (revisarNota(nota)) {
        notas.push(Number(nota));
        console.log(`Nota: ${nota} (${calificar(Number(nota))})`);
    } else {
        console.log("Nota invalida");
    }
}

if (notas.length === 0) {
    console.log("no hay valores en 'notas'");
} else {
    console.log("Notas validas:", notas.length);
    console.log("Media:", calcularMedia(notas).toFixed(2));
    console.log("Maxima:", Math.max(...notas));
    console.log("Minima:", Math.min(...notas));
}