const tasaa = 1.12; // mirado de internet
const aFahrenheit = celsius => celsius * 9 / 5 + 32; // mirado de internet la formula
const aMillas = km => km * 0.621371; // mirado de interent
const aDolares = (euros, tasa = tasaa) => euros * tasa;

function mostrar(valor, origen, destino, conver) {
    console.log(`${valor} (${origen}) equivalen a ${conver(valor).toFixed(2)}`)
}

function pedirNum(texto) {
    let valor = prompt(texto);
    while (valor === "" || isNaN(valor)) {
        console.log("tiene que ser un numero");
        valor = prompt(mensaje);
    }
    return Number(valor);
}

let opc;
while (opc !== "4") {
    opc = prompt("1. celsius > fahrenheit\n2. km > millas\n3. euros > dolares\n4. salir");
    switch (opc) {
        case "1":
            mostrar(pedirNum("celsius:"), "ºC", "ºF", aFahrenheit);
            break;
        case "2":
            mostrar(pedirNum("km:"), "km", "millas", aMillas);
            break;
        case "3":
            let euros = pedirNum("euros:");
            let tasa = prompt("tasa (undefined === 1.12):") || undefined;
            mostrar(euros, "€", "$", v => aDolares(v, tasa));
            break;
        case "4":
            break;
        default:
            console.log("opc invalida");
    }
}