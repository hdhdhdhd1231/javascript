const textoCafe = `{
  "title": "Latte",
  "description": "As the most popular coffee drink out there, the latte is made with a shot of espresso and steamed milk, with just a touch of foam. It can be ordered plain or flavored with everything from vanilla to pumpkin spice.",
  "ingredients": [
    "Espresso",
    "Steamed milk"
  ],
  "image": "https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxhdHRlfGVufDB8fDB8fHww",
  "id": 2
}`;

let cafe = JSON.parse(textoCafe); // recordatorio: str > obj y JSON.stringify: obj > str
console.log(cafe);

let contadorPropiedadesObj = 1;
document.body.innerHTML += `<h2>propiedades del objeto</h2>`
for (let clave in cafe) { // recorre las claves del obj
    document.body.innerHTML += `<h3>propiedad ${contadorPropiedadesObj}</h3>`;
    document.body.innerHTML += `<p>clave: ${clave} | valor: ${cafe[clave]}</p>`;
    contadorPropiedadesObj++;
}

const fichaCafe = {
    "id": cafe['id'],
    "nombre": cafe['title'],
    "ingredientes": cafe['ingredients'],
    "imagen": cafe['image']
};
// document.body.innerHTML += `<pre>${JSON.stringify(fichaCafe, null, 2)}</pre>`; // recordatorio: etiqueta <pre> para mostrar codigo en html

document.body.innerHTML += `<h2><b>${fichaCafe['nombre']}</b></h2>`;
document.body.innerHTML += `<img src="${fichaCafe['imagen']}" style="max-height: 300px"></img>`;

const fichaCafe2 = {
    "id": fichaCafe['id'],
    "nombre": fichaCafe['nombre'],
    "ingredientes": fichaCafe['ingredientes']
};
let cafe2 = JSON.stringify(fichaCafe2, null, 2);
console.log(cafe2);
document.body.innerHTML += `<h2><b>Ficha en formato JSON</b></h2>`; // podria haber usado style con la propiedad 'font-weight' y poner bold, pero use la etiqueta <b> por comodidad
document.body.innerHTML += `<pre>${cafe2}</pre>`;

cafe2.includes('imagen') ? console.log("¿Incluye img? Si") : console.log("¿Incluye img? No");