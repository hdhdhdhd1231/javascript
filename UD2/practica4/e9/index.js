const generarNumSecreto = () => Math.floor(Math.random() * 100) + 1;
const esValido = n => n !== "" && !isNaN(n) && n >= 1 && n <= 100;
const comparador = (intento, secreto) => intento < secreto ? "mayor" : intento > secreto ? "menor" : "acierto";

function intentosPorNvl(nvl) {
    switch (nvl) {
        case "1": 
            return 10;
        case "2":
            return 7;
        case "3":
            return 5;
        default:
            return 0;
    }
}

function jugarPartida(intentos) {
    const secreto = generarNumSecreto();
    for (let x = 1; x <= intentos; x++) {
        let num = prompt(`intento ${x} de ${intentos}:`);
        while (!esValido(num)) {
            num = prompt("debe ser un num entre 1 & 100:");
        }
        const resultado = comparador(Number(num), secreto);
        if (resultado === "acierto") {
            console.log("acertado");
            return 11 - x;
        }
        console.log(`el secreto es ${resultado} a tu num`);
    }
    console.log("no tienes mas intentos, era el " + secreto);
    return -intentos;
}

function jugar(nvlInicial = "1") {
    let total = 0;
    while (true) {
        const nvl = prompt(`1: facil, 2: normal, 3: dificil, 4: salir (undefinned === " ${nvlInicial})`) || nvlInicial;
        if (nvl === "4")
            break;
        const intentos = intentosPorNvl(nvl);
        if (intentos === 0) {
            console.log("opc invalida");
            continue;
        }
        const puntos = jugarPartida(intentos);
        total += puntos;
        console.log(`Ronda: ${puntos} y Total: ${total}`);
    }
    console.log("puntuacion final: " + total);
}

jugar();