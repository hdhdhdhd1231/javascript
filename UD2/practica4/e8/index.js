function analizar(...numeros) {
    if (numeros.length === 0) return "no hay datos";
    let todos = 0;
    for (let x of numeros) {
        if (!Number.isFinite(x)) return `valor no valido (${x})`;
        todos += x;
    }
    return { todos, media: todos / numeros.length, minimo: Math.min(...numeros), maximo: Math.max(...numeros) };
}

function imprimirInforme(info) {
    // recordatorio: typeof obtiene el tipo del obj y comparar el rtrn con un str
    if (typeof info === "string") {
        console.log(info);
    } else {
        console.log("suma:", info.todos, "media:", info.media.toFixed(2), "minimo:", info.minimo, "maximo:", info.maximo);
    }
}

imprimirInforme(analizar(1, 2, 3));
imprimirInforme(analizar(...[]));
imprimirInforme(analizar(...[1]));
imprimirInforme(analizar(...[1, 1, 1]));
imprimirInforme(analizar(...[1, -2, -3]));
imprimirInforme(analizar(1, 2, "ok"));