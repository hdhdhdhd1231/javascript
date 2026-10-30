const URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon/';

const estado = document.querySelector('#estado-ficha');
const ficha = document.querySelector('#ficha-pokemon');
if (estado === null || ficha === null) {
    throw new Error("Falta un elemento del 'ficha.html'.");
}

async function obtenerDatos(url) {
    const resp = await fetch(url);
    if (!resp.ok) {
        throw new Error(`Error HTTP: ${resp.status}`);
    }
    return resp.json();
}

function mostrarEstado(txt, esError = false) {
    estado.textContent = txt;
    if (esError) {
        estado.classList.add('error');
    } else {
        estado.classList.remove('error');
    }
}

function formatearPokeNum(num) {
    if (num >= 100) {
        return `#${num}`;
    }
    return `#${('00' + num).slice(-3)}`;
}

function obtenerImg(pokemon) {
    const otros = pokemon.sprites.other;
    if (otros && otros['official-artwork'] && otros['official-artwork'].front_default) {
        return otros['official-artwork'].front_default;
    }
    return pokemon.sprites.front_default;
}

function crearDato(nombreDato, valor) {
    const fila = document.createElement('div');

    const txtNombre = document.createElement('dt');
    txtNombre.textContent = nombreDato;

    const txtValor = document.createElement('dd');
    txtValor.textContent = valor;

    fila.append(txtNombre, txtValor);
    return fila;
}

function crearStat(stat) {
    const fila = document.createElement('li');

    const txtNombre = document.createElement('span');
    txtNombre.textContent = stat.stat.name;

    const txtValor = document.createElement('strong');
    txtValor.textContent = stat.base_stat;

    fila.append(txtNombre, txtValor);
    return fila;
}

function mostrarFicha(pokemon) {
    const cabecera = document.createElement('header');

    const txtNum = document.createElement('p');
    txtNum.textContent = formatearPokeNum(pokemon.id);

    const txtNombre = document.createElement('h2');
    txtNombre.textContent = pokemon.name;

    cabecera.append(txtNum, txtNombre);

    const img = document.createElement('img');
    img.src = obtenerImg(pokemon);
    img.alt = `Imagen de ${pokemon.name}`;

    const tipos = pokemon.types.map((tipo) => tipo.type.name).join(', ');
    const habilidades = pokemon.abilities.map((habilidad) => habilidad.ability.name).join(', ');

    const datos = document.createElement('dl');
    datos.append(
        crearDato('Tipo', tipos),
        crearDato('Altura', `${pokemon.height / 10} m`),
        crearDato('Peso', `${pokemon.weight / 10} kg`),
        crearDato('Habilidades', habilidades)
    );

    const cuerpo = document.createElement('div');
    cuerpo.append(img, datos);

    const txtStats = document.createElement('h3');
    txtStats.textContent = 'Estadísticas base';

    const stats = document.createElement('ul');
    for (const stat of pokemon.stats) {
        stats.append(crearStat(stat));
    }

    ficha.replaceChildren(cabecera, cuerpo, txtStats, stats);
}

async function cargarFicha(nombrePoke) {
    mostrarEstado('Cargando ficha…');
    ficha.replaceChildren();
    try {
        const pokemon = await obtenerDatos(`${URL_POKEMON}${encodeURIComponent(nombrePoke)}`);
        mostrarFicha(pokemon);
        mostrarEstado('');
    } catch (error) {
        console.error('Error:', error);
        if (error.message === 'Error HTTP: 404') {
            mostrarEstado('No se ha encontrado ese Pokémon.', true);
        } else {
            mostrarEstado('No se pudo cargar la ficha.', true);
        }
    }
}

const parametros = new URLSearchParams(window.location.search);
const nombrePoke = parametros.get('pokemon');

if (nombrePoke === null || nombrePoke.trim() === '') {
    mostrarEstado('No se ha indicado ningún Pokémon.', true);
} else {
    cargarFicha(nombrePoke.trim().toLowerCase());
}