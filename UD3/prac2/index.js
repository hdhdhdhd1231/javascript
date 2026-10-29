// he probado los dos casos de error que he predefinido, el uso de voz de las 3 acciones y por texto tambien

// API RECONOCER VOZ
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// CAPTURACIÓN DE LAS ETIQUETAS HTML PARA LA INTERACCIÓN VIA DOM
const btnVoz = document.getElementById('btnVoz');
const respuestaTxt = document.getElementById('respuestaTxt');
const productoInp = document.getElementById('productoInp');
const btnAnadir = document.getElementById('btnAnadir');
const btnQuitar = document.getElementById('btnQuitar');
const btnVaciar = document.getElementById('btnVaciar');
const listaUl = document.getElementById('lista');

// RESPUESTAS POR VOZ Y TXT
function responder(txt) {
    respuestaTxt.textContent = txt; // escribo en el 'status' también por si no tiene soporte 'speechSynthesis' el navegador
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // cancelo cualquiera cosa que estuviera en el mismo proceso
        const respuesta = new SpeechSynthesisUtterance(txt);
        respuesta.lang = 'es-ES';
        window.speechSynthesis.speak(respuesta);
        // y con el texto que le envio ejecuto el speaker
    }
}

// LISTA
let lista = JSON.parse(localStorage.getItem('listaCompra')) || []; // he decidido usar el localStorage para almacenar la lista (he buscado información para sabe como implementar esto y como funciona localStorage, tambien sobre la idea para guardar)

function guardarLista() {
    localStorage.setItem('listaCompra', JSON.stringify(lista)); // aqui se guarda en la 'value' de la 'key = listaCompra' en formato JSON la lista
}

function mostrarItemsLista() {
    listaUl.innerHTML = lista.map(p => `<li>${p}</li>`).join(''); // uso metodos de arrays como map para recorrer y aplicar a cada producto lo mismo que seria añadirlo a una lista y por ultimo lo paso a string con join('')
}

// ACCIONES LISTA
function anadirProducto(producto) {
    if (producto === '') { // si el producto esta vacio envia a responder este texto predefinido
        responder('Orden no entendida.');
        return;
    }
    lista.push(producto); // añadir producto a la lista
    guardarLista(); // guardar en localStorage la lista actualizada
    mostrarItemsLista(); // mostrar la lista
    responder(`He añadido ${producto}.`); // indicar por texto y voz la acción
}

function quitarProducto(producto) {
    if (producto === '') { // si el producto esta vacio envia a responder este texto predefinido
        responder('Orden no entendida.');
        return;
    }
    const idx = lista.indexOf(producto); // obtengo el idx (índice) del producto
    if (idx === -1) { // si es '-1' es que no existe entonces decimos que el producto no esta en la lista
        responder(`${producto} no esta en la lista.`);
        return;
    }
    lista.splice(idx, 1); // con splice eliminamos el producto que seria solo 1 hueco
    guardarLista(); // actualizamos
    mostrarItemsLista(); // mostramos actualizada la lista
    responder(`He quitado ${producto}.`); // indicar por texto y voz la acción
}

function vaciarLista() {
    lista = []; // vaciamos lista
    guardarLista(); // actualizamos
    mostrarItemsLista(); // mostramos
    responder('He vaciado la lista.'); // indicar por texto y voz la acción
}

// INTERPRETACIÓN VOZ
function despuesDeClave(txt, palabra) {
    return txt.slice(txt.indexOf(palabra) + palabra.length).trim(); // con slice a partir del idx (índice) de la palabra clave (añade, quita, vacía) obtenemos todo el texto a partir de ahi hasta el tamaño maximo de la frase y con trim quitamos espacios alante y atras
}

function interpretarFrase(txt) { // este es el interprete que al texto reconocido por la api si incluye alguna de las 3 palabras hace una accion y sino acaba en un responder() generico
    if (txt.includes('añade')) {
        anadirProducto(despuesDeClave(txt, 'añade'));
    } else if (txt.includes('quita')) {
        quitarProducto(despuesDeClave(txt, 'quita'));
    } else if (txt.includes('vacía') || txt.includes('vacia')) {
        vaciarLista();
    } else {
        responder('Orden no entendida.');
    }
}

// SIN VOZ (todo esto a partir de eventos que capture anteriormente del HTML)
btnAnadir.addEventListener('click', () => {
    anadirProducto(productoInp.value.trim().toLowerCase()); // obtengo la value transformada a limpia y minuscula
    productoInp.value = ''; // limpio la value del input
});

btnQuitar.addEventListener('click', () => {
    quitarProducto(productoInp.value.trim().toLowerCase()); // obtengo la value transformada a limpia y minuscula
    productoInp.value = ''; // limpio la value del input
});

btnVaciar.addEventListener('click', () => {
    vaciarLista(); // vacio lista
});

// RECONOCIMIENTO DE VOZ
if (!SpeechRecognition) {
    btnVoz.disabled = true; // pongo el boton deshabilitado (creo recordar que era un estilo)
    responder('El navegador no admite el reconocimiento de voz. Usa los botones.'); // responder con el mensaje generico de que use los botones porque el navegador no admite voz
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = false; // escucha una sola frase y se para sola, para que no se filtre lo que dice responder()
    recognition.interimResults = false; // solo recibir resultado final
    recognition.maxAlternatives = 1; // solo devolver la transscripcion con mas score

    let isListening = false;

    // para parar y activar el boton manual
    btnVoz.addEventListener('click', () => {
        if (!isListening) {
            recognition.start();
        } else {
            recognition.stop();
        }
    });

    // para cuando este iniciado cambiar el estado de isListening y el contenido del boton (btnVoz)
    recognition.onstart = () => {
        isListening = true;
        btnVoz.textContent = 'Escuchando... (pulsa de nuevo para detener)';
    };

    // para cuando este terminado cambiar el estado de isListening y el contenido del boton (btnVoz)
    recognition.onend = () => {
        isListening = false;
        btnVoz.textContent = 'Activar Micrófono';
    };

    // para los resulados obtenemos la primera como hemos indicado antes que solo da una y se lo pasamos a interpretarFrase()
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim().toLowerCase();
        interpretarFrase(transcript);
    };

    // cuando no hay match de transcripción
    recognition.onnomatch = () => {
        responder('Orden no entendida.');
    };

    // control de todos los errores por el uso de event.error y 2 de los mas tipicos controlados con error personalizado
    recognition.onerror = (event) => {
        console.error('error:', event.error);
        if (event.error === 'not-allowed') {
            responder('Permiso del micrófono denegado. Puedes usarlo via texto.');
        } else if (event.error === 'no-speech') {
            responder('No has dicho nada.');
        } else {
            responder(event.error);
        }
    };
}

mostrarItemsLista(); // para mostrar la lista que se guardo anteriormente, al abrir la pagina