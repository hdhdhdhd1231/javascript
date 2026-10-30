const URL_LISTADO = 'https://pokeapi.co/api/v2/pokemon?limit=20';
const URL_POKEMON = 'https://pokeapi.co/api/v2/pokemon/';
const URL_IMAGEN = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
const URL_IMAGEN_ALTERNATIVA = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

const formulario = document.querySelector('#formulario-busqueda');
const nombre = document.querySelector('#nombre-pokemon');
const estado = document.querySelector('#estado-busqueda');
const listado = document.querySelector('#listado-pokemon');
if (formulario === null || nombre === null || estado === null || listado === null) {
    throw new Error("Falta un elemento del 'index.html'.");
}

async function obtenerDatos(url) {
    const resp = await fetch(url);
    if (!resp.ok) {
        throw new Error(`Error: ${resp.status}`);
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

function obtenerPokeNum(url) {
    return url.split('/')[url.split('/').length - 2];
}

function formatearPokeNum(num) {
    return `#${('00' + num).slice(-3)}`;
}

function crearCard(resultado) {
    const num = obtenerPokeNum(resultado.url);

    const card = document.createElement('article');

    const txtNum = document.createElement('p');
    txtNum.textContent = formatearPokeNum(num);

    const img = document.createElement('img');
    img.src = `${URL_IMAGEN}${num}.png`;
    img.alt = `Imagen de ${resultado.name}`;
    img.loading = 'lazy';

    let altProbada = false;
    img.addEventListener('error', () => {
        if (!altProbada) {
            altProbada = true;
            img.src = `${URL_IMAGEN_ALTERNATIVA}${num}.png`;
        }
    });

    const txtNombre = document.createElement('h3');
    txtNombre.textContent = resultado.name;

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = 'Ficha completa';
    boton.setAttribute('data-nombre', resultado.name);

    card.append(txtNum, img, txtNombre, boton);
    return card;
}

async function cargarListado() {
    mostrarEstado('Cargando Pokémon…');
    listado.replaceChildren();
    try {
        const datos = await obtenerDatos(URL_LISTADO);
        for (const resultado of datos.results) {
            listado.append(crearCard(resultado));
        }
        mostrarEstado(`Se han cargado ${datos.results.length} Pokémon.`);
    } catch (error) {
        console.error('Error:', error);
        mostrarEstado('No se pudo cargar el listado de Pokémon.', true);
    }
}

function abrirFicha(nombrePoke) {
    window.location.href = `ficha.html?pokemon=${encodeURIComponent(nombrePoke)}`;
}

listado.addEventListener('click', (evento) => {
    if (!(evento.target instanceof Element)) {
        return;
    }
    const boton = evento.target.closest('button[data-nombre]');
    if (boton !== null && listado.contains(boton)) {
        abrirFicha(boton.getAttribute('data-nombre'));
    }
});

formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const nombrePoke = nombre.value.trim().toLowerCase();
    if (nombrePoke === '') {
        mostrarEstado('Escribe el nombre o el número de un Pokémon.', true);
        return;
    }

    mostrarEstado('Buscando…');
    try {
        const pokemon = await obtenerDatos(`${URL_POKEMON}${encodeURIComponent(nombrePoke)}`);
        abrirFicha(pokemon.name);
    } catch (error) {
        console.error('Error:', error);
        if (error.message === 'Error: 404') {
            mostrarEstado('No se ha encontrado ese Pokémon.', true);
        } else {
            mostrarEstado('No se pudo realizar la búsqueda.', true);
        }
    }
});

cargarListado();