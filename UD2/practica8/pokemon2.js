const LISTADO_API = 'https://pokeapi.co/api/v2/pokemon?limit=5';
const DETALLE_API = 'https://pokeapi.co/api/v2/pokemon/pikachu';


const resp_listado = fetch(LISTADO_API);
console.log(resp_listado);

async function obtenerListado() {
  try {
    const resp = await fetch(LISTADO_API)
    if (!resp.ok) throw new Error(`Error HTTP: ${resp.status}`)
    const datos = await resp.json()
    console.log(datos);
    console.log(typeof datos);
    console.log(datos.results);
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}
obtenerListado()


async function mostrarNombres() {
  try {
    const resp = await fetch(LISTADO_API)
    if (!resp.ok) throw new Error(`Error HTTP: ${resp.status}`)
    const datos = await resp.json()
    const pokemons = datos.results
    .map(pokemons => `<li>${pokemons.name} | ${pokemons.url}</li>`)
    .join('');
    document.body.innerHTML += `
      <h2>Pokemons</h2>
      <article>
        <ul>${pokemons}</ul>
      </article>
    `;
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}
mostrarNombres()


async function obtenerDetalle() {
  try {
    const resp = await fetch(DETALLE_API)
    if (!resp.ok) throw new Error(`Error HTTP: ${resp.status}`)
    const pokemon = await resp.json()
    console.log(pokemon.name);
    console.log(pokemon.id);
    console.log(pokemon.types[0].type.name);
    console.log(pokemon.sprites.front_default);
    document.body.innerHTML += `
      <h2>Pokemons: ${pokemon.name}</h2>
      <article>
        <ul>
          <li>Id: ${pokemon.id}</li>
          <li>Tipo: ${pokemon.types[0].type.name}</li>
          <img src=${pokemon.sprites.other['official-artwork'].front_default} style="max-height:150px" alt="${pokemon.name}"></img>
        </ul>
      </article>
    `;
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}
obtenerDetalle()


async function encadenarPeticiones() {
  try {
    const respListado = await fetch(LISTADO_API)
    if (!respListado.ok) throw new Error(`Error HTTP: ${respListado.status}`)
    const datos = await respListado.json()
    const pokemonUrl = datos.results[0].url;
    console.log(pokemonUrl);
    const respDetalle = await fetch(pokemonUrl)
    if (!respDetalle.ok) throw new Error(`Error HTTP: ${respDetalle.status}`)
    const pokemon = await respDetalle.json()
    document.body.innerHTML += `
      <h2>Pokemons: ${pokemon.name}</h2>
      <article>
        <ul>
          <li>Id: ${pokemon.id}</li>
          <li>Tipo: ${pokemon.types[0].type.name}</li>
          <img src=${pokemon.sprites.other['official-artwork'].front_default} style="max-height:150px" alt="${pokemon.name}"></img>
        </ul>
      </article>
    `;
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}
encadenarPeticiones()


async function obtenerDatos(url) {
  const resp = await fetch(url)
  if (!resp.ok) throw new Error(`Error HTTP: ${resp.status}`)
  return resp.json()
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


async function probarFunciones() {
  try {
    const pokemon = await obtenerDatos(DETALLE_API)
    mostrarPokemon(pokemon)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}
probarFunciones()


async function cargarPokemon() {
  document.body.innerHTML = '<p>Cargando...</p>';
  try {
    const pokemon = await obtenerDatos(DETALLE_API)
    mostrarPokemon(pokemon)
  } catch (error) {
    console.log(`Error: ${error}`)
    document.body.innerHTML = `<p>no se pudo cargar el pokémon: ${error.message}</p>`;
  } finally {
    console.log('peticion terminada')
  }
}
cargarPokemon()


function esperar(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}


async function cargarConEspera() {
  document.body.innerHTML = '<p>Cargando...</p>';
  try {
    await esperar(5000)
    const pokemon = await obtenerDatos(DETALLE_API)
    mostrarPokemon(pokemon)
  } catch (error) {
    console.log(`Error: ${error}`)
    document.body.innerHTML = `<p>no se pudo cargar el pokémon: ${error.message}</p>`;
  } finally {
    console.log('peticion terminada')
  }
}
cargarConEspera()


async function cargarPrimerPokemon() {
  document.body.innerHTML = '<p>Cargando...</p>';
  try {
    const datos = await obtenerDatos(LISTADO_API)
    const pokemon = await obtenerDatos(datos.results[0].url)
    mostrarPokemon(pokemon)
  } catch (error) {
    console.log(`Error: ${error}`)
    document.body.innerHTML = `<p>no se pudo cargar el pokémon: ${error.message}</p>`;
  } finally {
    console.log('peticion terminada')
  }
}
cargarPrimerPokemon()