// Chrome y Edge exponen la API con el prefijo "webkit"; otros navegadores,
// sin prefijo. Se usa la que exista. Si ninguna existe, el valor es undefined.
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// añadido por mi
const btnStart = document.getElementById('btnStart');
const statusText = document.getElementById('statusText');

// Si el navegador no soporta la API, se avisa y no se ejecuta el resto.
if (!SpeechRecognition) {
  alert("Tu navegador no soporta la Web Speech API. Prueba con Google Chrome u Edge.");
    // añadido por mi
    statusText.textContent = "error, tu navegador no admite el reconocimiento por voz.";
    btnStart.disabled = true;
} else {
  // Se crea el objeto que se encargará de escuchar y transcribir.
  const recognition = new SpeechRecognition();

  // Idioma esperado del habla: español de España.
  recognition.lang = 'es-ES';
  // true: sigue escuchando tras cada frase, hasta que se llame a stop().
  // false (por defecto) pararía solo después de la primera frase.
  recognition.continuous = true;
  // false: solo se reciben resultados finales, no las transcripciones parciales.
  recognition.interimResults = false;

  // Se guardan referencias a los elementos del HTML con los que se va a trabajar.
  const btnStart = document.getElementById('btnStart');
  const statusText = document.getElementById('statusText');
  const commandText = document.getElementById('commandText');

    // añadido por mi
    const btnAumentarTxt = document.getElementById('btnAumentarTxt');
    const btnDisminuirTxt = document.getElementById('btnDisminuirTxt');
    const card = document.querySelector('.card');
    const btnLight = document.getElementById('btnLight');
    const btnDark = document.getElementById('btnDark');
    const respuestaTxt = document.getElementById('respuestaTxt');

  // Variable de control para saber si el micrófono está activo ahora mismo.
  let isListening = false;

  // El botón alterna entre iniciar y detener la escucha.
  // start() debe llamarse tras una acción del usuario: así el navegador
  // puede pedir el permiso del micrófono.
  btnStart.addEventListener('click', () => {
    if (!isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }
  });

  // Se dispara cuando el navegador empieza a escuchar de verdad.
  // Aquí se actualiza la interfaz para reflejar el nuevo estado.
  recognition.onstart = () => {
    isListening = true;
    statusText.textContent = "Estado: Escuchando...";
    btnStart.textContent = "Detener Micrófono";
  };

  // Se dispara siempre que la escucha termina: por stop(), por un error
  // o porque el navegador la cierra. Se restaura la interfaz al estado inicial.
  recognition.onend = () => {
    isListening = false;
    statusText.textContent = "Estado: Inactivo";
    btnStart.textContent = "Activar Micrófono";
  };

  // Se dispara cada vez que el servicio reconoce una frase.
  recognition.onresult = (event) => {
    // Con continuous = true, event.results acumula todas las frases de la sesión.
    // La que acaba de llegar es la última de la lista.
    const lastIndex = event.results.length - 1;

    // [lastIndex] es el resultado y [0] su mejor alternativa (la más probable).
    // trim() quita espacios sobrantes y toLowerCase() pasa a minúsculas
    // para que "Rojo" y "rojo" se traten igual.
    const transcript = event.results[lastIndex][0].transcript.trim().toLowerCase();

    // Se muestra en pantalla lo que se ha entendido.
    commandText.textContent = transcript;

    // añadido por mi
    let respuesta = "";

    // Se busca una palabra clave dentro de la frase y se aplica la acción.
    // includes() permite que funcione con frases como "pon el fondo en rojo".
    // Si no coincide ningún comando, no se cambia nada.
    if (transcript.includes('rojo')) {
      document.body.style.backgroundColor = '#f8d7da';
        // añadido por mi
        respuesta = "Fondo cambiado a rojo";
    } else if (transcript.includes('verde')) {
      document.body.style.backgroundColor = '#d4edda';
        // añadido por mi
        respuesta = "Fondo cambiado a verde";
    } else if (transcript.includes('azul')) {
      document.body.style.backgroundColor = '#cce5ff';
        // añadido por mi
        respuesta = "Fondo cambiado a azul";
    } else if (transcript.includes('restablecer') || transcript.includes('blanco')) {
      document.body.style.backgroundColor = '#ffffff';
        // añadido por mi
        respuesta = "Fondo restablecido";
    }

    // añadido por mi
    respuestaTxt.textContent = respuesta;
    if ('speechSynthesis' in window) {
        const mensaje = new SpeechSynthesisUtterance(respuesta);
        mensaje.lang = "es-ES";
        window.speechSynthesis.speak(mensaje);
    }
  };

  // Se dispara si algo falla (permiso denegado, sin micrófono, sin red...).
  // event.error contiene el código, por ejemplo "not-allowed" o "no-speech".
  // Después del error, el navegador lanza también "end".
  recognition.onerror = (event) => {
    console.error("Error en el reconocimiento de voz:", event.error);
    statusText.textContent = "Error: " + event.error;

    // añadido por mi (not-allowed y service-not-allowed buscado en internet, para saber/conocer cuales son los errores)
    if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        statusText.textContent = "error, se ha denegado el permiso del microfono";
    } else {
        statusText.textContent = "error, no se ha podido reconocer la voz";
    }
  };

    // añadido por mi
    btnAumentarTxt.addEventListener('click', () => {
        commandText.style.fontSize = "24px";
    });

    btnDisminuirTxt.addEventListener('click', () => {
        commandText.style.fontSize = "14px";
    });

    btnLight.addEventListener('click', () => {
        document.body.style.backgroundColor = "#f3eaea";
        card.style.backgroundColor = "#d8bfbf";
    });

    btnDark.addEventListener('click', () => {
        document.body.style.backgroundColor = "#252323";
        card.style.backgroundColor = "rgb(56, 55, 55)";
    });
}