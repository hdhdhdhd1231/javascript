let contrasena = "ok";
let intento = prompt("Introduce la contraseña:");
while (intento !== contrasena) {
    intento = prompt("Incorrecta. Introduce la contraseña:");
}
console.log("Correcta");