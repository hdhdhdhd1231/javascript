class Libro {
    constructor(titulo, autor, numPags) {
        this.titulo = titulo;
        this.autor = autor;
        this.numPags = numPags;
    }

    esExtenso() {
        return this.numPags >= 300;
    }
}

class Catalogo {
    constructor() {
        this.libros = [];
    }

    agregarLibro(libro) {
        const existe = this.libros.some(x => x.titulo.toLowerCase() === libro.titulo.toLowerCase());
        if (existe) {
            throw new Error("ya existe");
        }
        this.libros.push(libro);
    }

    eliminarLibroPorTitulo(titulo) {
        const idx = this.libros.findIndex(x => x.titulo.toLowerCase() === titulo.toLowerCase());
        if (idx === -1) {
            throw new Error("no existe");
        }
        /*this.libros.forEach(x => {
            if (titulo === x.titulo) this.libros.pop(x); // use mejor splice
        });*/
        this.libros.splice(idx, 1);
    }

    consultarLibroPorTitulo(titulo) {
        const libro = this.libros.find(x => x.titulo.toLowerCase() === titulo.toLowerCase());
        if (!libro) {
            throw new Error("no existe ningun libro");
        }
        return libro;
    }

    listarLibros() {
        return this.libros;
    }
}

function esLimpio(titulo, autor, numPags) {
    if (titulo.trim() === "" || titulo === null || titulo === undefined) {
        document.body.innerHTML += `<h2>titulo no puede estar vacio</h2></br>`;
        return false;        
    }

    if (autor.trim() === "" || autor === null || autor === undefined) {
        document.body.innerHTML += `<h2>autor no puede estar vacio</h2></br>`;
        return false;        
    }

    if (isNaN(numPags) || numPags < 0 || !Number.isInteger(numPags)) {
        document.body.innerHTML += `<h2>debe ser un numero, mayor a 0 y entero</h2></br>`;
        return false;
    }
    return true;
}


const catalog = new Catalogo();

const titulo1 = "ok1";
const autor1 = "pepe1";
const numPags1 = 299;

const titulo2 = "ok2";
const autor2 = "pepe2";
const numPags2 = 300;

const titulo3 = "ok3";
const autor3 = "pepe3";
const numPags3 = 300;

// cambiar de aqui los valores para probar que la funcion esLimpio funciona correctamente
const titulo4 = "ok4"; // "" || undefined || null
const autor4 = "oo"; // "" || undefined || null
const numPags4 = -100; // negativo || "" || null || undefined

function main () {
	let mostrarTodo = catalog.listarLibros();
	document.body.innerHTML += `<h2>Catalogo: ${JSON.stringify(mostrarTodo)}</h2></br>`;
	if (esLimpio(titulo1, autor1, numPags1)) {
		const ok1 = new Libro(titulo1, autor1, numPags1);
		catalog.agregarLibro(ok1);
		document.body.innerHTML += `<h2>Tiene más o igual a 300 paginas 'ok1'? ${ok1.esExtenso() ? 'Si' : 'No'}</h2></br>`;
	}
	if (esLimpio(titulo2, autor2, numPags2)) {
		const ok2 = new Libro(titulo2, autor2, numPags2);
		catalog.agregarLibro(ok2);
		document.body.innerHTML += `<h2>Tiene más o igual a 300 paginas 'ok2'? ${ok2.esExtenso() ? 'Si' : 'No'}</h2></br>`;
	}
	
	if (esLimpio(titulo3, autor3, numPags3)) {
		const ok3 = new Libro(titulo3, autor3, numPags3);
		catalog.agregarLibro(ok3);
		document.body.innerHTML += `<h2>Tiene más o igual a 300 paginas 'ok3'? ${ok3.esExtenso() ? 'Si' : 'No'}</h2></br>`;
	}
	
	if (esLimpio(titulo4, autor4, numPags4)) {  }
	
    document.body.innerHTML += `<h2>Catalogo: ${JSON.stringify(mostrarTodo)}</h2></br>`; // buscado en internet el 'JSON.stringify' que ha dicho el maestro para mostrar el obj en formato json y que no salga el typeof
	
	document.body.innerHTML += `<h2>Consulta 'ok1': ${JSON.stringify(catalog.consultarLibroPorTitulo("ok1"))}</h2></br>`;
	
    catalog.eliminarLibroPorTitulo("ok1");
	document.body.innerHTML += `<h2>'ok1' eliminado</h2></br>`;
	
    document.body.innerHTML += `<h2>Catalogo: ${JSON.stringify(mostrarTodo)}</h2></br>`;
	
	catalog.consultarLibroPorTitulo("ok5"); // en consola sale el exception
	
	// obj duplicado
	if (esLimpio(titulo3, autor3, numPags3)) {
		const ok3 = new Libro(titulo3, autor3, numPags3);
		catalog.agregarLibro(ok3);
		document.body.innerHTML += `<h2>Tiene más o igual a 300 paginas 'ok3'? ${ok3.esExtenso() ? 'Si' : 'No'}</h2></br>`;
	}
}

main();