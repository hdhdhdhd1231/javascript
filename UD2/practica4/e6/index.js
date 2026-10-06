const precioFijo = 1.60;
const litrosNecesarios = (distancia, consumo) => distancia * consumo / 100
const costeTotal = (distancia, consumo, precio = precioFijo) => litrosNecesarios(distancia, consumo) * precio;
const costePorPasajero = (distancia, consumo, viajeros, precio = precioFijo) => costeTotal(distancia, consumo, precio) / viajeros;
const imprimir = (texto, calculo) => console.log(texto + ": " + calculo().toFixed(2) + " €");

let distancia = prompt("Distancia del viaje (km):");
while (isNaN(distancia) || distancia < 0) {
    console.log("la distancia tiene que ser un numero mayor que 0");
    distancia = prompt("Distancia del viaje (km):");
}

let consumo = prompt("Consumo del vehículo en litros (cada 100 km):");
while (isNaN(consumo) || consumo < 0) {
    console.log("el consumo tiene que ser un numero mayor que 0");
    consumo = prompt("Consumo del vehículo en litros (cada 100 km):");
}

let precio = prompt("Precio del litro (underfined === 1.60):");
while (precio !== "" && (isNaN(precio) || precio < 0)) {
    console.log("el precio tiene que ser un numero mayor que 0 o puedes no ponerlo");
    precio = prompt("Precio del litro (underfined === 1.60):");
}
if (precio === "") precio = undefined;

let pasajero = prompt("Numero de pasajeros:");
// recordatorio: while siempre sigue cuando alguna de las condiciones da true (por eso aplico ! aunque sea correcto para que de false y salga)
while (!Number.isInteger(Number(pasajero)) || pasajero <= 0) {
    console.log("Los pasajeros tienen que ser un número entero mayor que 0");
    pasajero = prompt("Número de pasajeros:");
}

// recordatorio: () => se podria evitar si imprimir no hiciera calculo()... y solo recibiera un numero, pero el enunciado dice que debe ser una func que llame a otra func
console.log(`combustible estimado: ${litrosNecesarios(distancia, consumo).toFixed(2)} litros`);
imprimir("coste total", () => costeTotal(distancia, consumo, precio));
imprimir("Coste por pasajero", () => costePorPasajero(distancia, consumo, pasajero, precio));