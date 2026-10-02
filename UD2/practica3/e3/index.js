let opcion = prompt("Elige una opción:\n1. Usuario principiante\n2. Usuario intermedio\n3. Usuario avanzado\n4. Salir");
switch (opcion) {
    case "1":
        console.log("Usuario principiante");
        break;
    case "2":
        console.log("Usuario intermedio");
        break;
    case "3":
        console.log("Usuario avanzado");
        break;
    case "4":
        console.log("Salir");
        break;
    default:
        console.log("Opción invalida");
}