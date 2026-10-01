let nombre = "sergio";
let apellidos = "garcía conde";
const concatenado = nombre + " " + apellidos;
const bienvenido = "Bienvenido/a";

console.log(concatenado);
console.log(concatenado.length);
console.log(concatenado.slice(6,10));
console.log(apellidos.replace("Conde", "Gómez"));
console.log(concatenado.toUpperCase());
console.log(concatenado.charAt(1));
const arrayConcatenado = concatenado.split(" ");
console.log(arrayConcatenado);
console.log(apellidos.indexOf("Conde"));
alert(bienvenido);
console.log((nombre.charAt(0) + apellidos.split(" ")[0].charAt(0) + apellidos.split(" ")[1].charAt(0)).toUpperCase())