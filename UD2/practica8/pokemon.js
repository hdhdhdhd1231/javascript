const LISTADO_API = 'https://pokeapi.co/api/v2/pokemon?limit=5';
const DETALLE_API = 'https://pokeapi.co/api/v2/pokemon/pikachu';


// Paso 1
// 1
const resp_listado = fetch(LISTADO_API);
console.log(resp_listado);
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
    console.log(resp.name);
    console.log(resp.id);
    console.log(resp.types[0].type.name);
    console.log(resp.sprites.front_default);
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
    return fetch(pokemonUrl)
  })
  .then(resp => {
    if (!resp.ok) throw new Error(`Error HTTP: ${resp.status}`)
    return resp.json()
  })
  .then(resp => {
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


function obtenerDatos(url) {
  return fetch(url).then(resp => {
    if (!resp.ok) throw new Error(`Error HTTP: ${resp.status}`)
    return resp.json()
  })
}


function mostrarPokemon(pokemon) {
  document.body.innerHTML = `
    <h2>Pokemons: ${pokemon.name}</h2>
    <article>
      <ul>
        <li>Id: ${pokemon.id}</li>
        <li>Tipo: ${pokemon.types[0].type.name}</li>
        <img src=${pokemon.sprites.other['official-artwork'].front_default} style="max-height:150px" alt="${pokemon.name}"></img>
      </ul>
    </article>
  `;
}


obtenerDatos(DETALLE_API)
  .then(pokemon => {
    mostrarPokemon(pokemon)
  })
  .catch(error => console.log(`Error: ${error}`))


document.body.innerHTML = '<p>Cargando...</p>';


obtenerDatos(DETALLE_API)
  .then(pokemon => {
    mostrarPokemon(pokemon)
  })
  .catch(error => {
    console.log(`Error: ${error}`)
    document.body.innerHTML = `<p>no se pudo cargar el pokémon: ${error.message}</p>`;
  })
  .finally(() => console.log('peticion terminada'))


function esperar(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}


document.body.innerHTML = '<p>Cargando...</p>';


esperar(5000)
  .then(() => obtenerDatos(DETALLE_API))
  .then(pokemon => {
    mostrarPokemon(pokemon)
  })
  .catch(error => {
    console.log(`Error: ${error}`)
    document.body.innerHTML = `<p>no se pudo cargar el pokémon: ${error.message}</p>`;
  })
  .finally(() => console.log('peticion terminada'))