let palabra = prompt("Escribe una palabra:");
let vocales = 0;
for (let x of palabra) {
    if ("aeiouáéíóúAEIOUÁÉÍÓÚ".includes(x)) {
        vocales++;
    }
};
console.log("Vocales: " + vocales);