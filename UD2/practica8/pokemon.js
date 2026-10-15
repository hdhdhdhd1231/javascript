const LISTADO_API = 'https://pokeapi.co/api/v2/pokemon?limit=5';
const DETALLE_API = 'https://pokeapi.co/api/v2/pokemon/pikachu';


// Paso 1
// 1
const resp_listado = fetch(LISTADO_API);
/*resp_listado.then(() => {
  console.log(resp_listado);
})*/

// 2
fetch(LISTADO_API)
  .then(resp => {
    if (!resp.ok) throw new Error(`Error HTTP: ${resp.status}`)
    return resp.json()
  })
  .then(resp => {
    console.log(resp);
    console.log(typeof resp);
    console.log(resp.results);
  })
  .catch(error => console.log(`Error: ${error}`))


// Paso 2
fetch(LISTADO_API)
  .then(resp => {
    if (!resp.ok) throw new Error(`Error HTTP: ${resp.status}`)
    return resp.json()
  })
  .then(resp => {
    const pokemons = resp.results
    .map(pokemons => `<li>${pokemons.name} | ${pokemons.url}</li>`)
    .join('');

    document.body.innerHTML += `
      <h2>Pokemons</h2>
      <article>
        <ul>${pokemons}</ul>
      </article>
    `;
  })
  .catch(error => console.log(`Error: ${error}`))


// Paso 3
fetch(DETALLE_API)
  .then(resp => {
    if (!resp.ok) throw new Error(`Error HTTP: ${resp.status}`)
    return resp.json()
  })
  .then(resp => {
    // console.log(resp)
    document.body.innerHTML += `
      <h2>Pokemons: ${resp.name}</h2>
      <article>
        <ul>
          <li>Id: ${resp.id}</li>
          <li>Tipo: ${resp.types[0].type.name}</li>
          <img src=${resp.sprites.other['official-artwork'].front_default} style="max-height:150px" alt="${resp.name}"></img>
        </ul>
      </article>
    `;
  })
  .catch(error => console.log(`Error: ${error}`))


// Paso 4
fetch(LISTADO_API)
  .then(resp => {
    if (!resp.ok) throw new Error(`Error HTTP: ${resp.status}`)
    return resp.json()
  })
  .then(resp => {
    const pokemonUrl = resp.results[0].url;
    console.log(pokemonUrl);
  })
  .catch(error => console.log(`Error: ${error}`))

// Pide el listado y, cuando lo recibas, guarda la URL del primer elemento de results. En el siguiente .then(), realiza una segunda petición usando esa URL. Devuelve esa segunda promesa con return para que la cadena la espere. Convierte también su respuesta a JSON y muestra la tarjeta del Pokémon obtenido.
// por aqui me he quedado