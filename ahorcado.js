import { diccionario } from "./diccionario.js";
//Variables Globales
var ahorcado = document.getElementById("ahorcado");
var resultado = document.getElementById("resultado");
var final = document.getElementById("final");
var repetir = document.getElementById("repetir");
var teclado = document.getElementById("teclado");
var juego = document.getElementById("juego");
var facil = document.getElementById("facil")
var normal = document.getElementById("normal")
var dificil = document.getElementById("dificil")
var niveles = document.getElementById("niveles")
var descripcionFacil = document.getElementById("descripcion1")
var descripcionNormal = document.getElementById("descripcion2")
var descripcionDificil = document.getElementById("descripcion3")
var faciles = []
var normales = []
var dificiles = []
let secreto = ""
let palabra = ocultarPalabra()

let vidas = 6;
resultado.innerHTML = palabra;
let abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
separarDiccionario()
function separarDiccionario() {
    for (let i = 0; i < diccionario.length; i++) {
        if (diccionario[i].length <= 4) {
            faciles.push(diccionario[i])
        }
        else if (4 < diccionario[i].length && diccionario[i].length <= 6) {
            normales.push(diccionario[i])
        }
        else if (diccionario[i].length > 6) {
            dificiles.push(diccionario[i])
        }
    }
}
function crearTeclado() {
    let contador = 0;
    for (let i = 0; i < abecedario.length; i++) {
        contador++;
        console.log(contador)
        var boton = document.createElement("button");
        boton.setAttribute("id", abecedario[i]);
        boton.setAttribute("value", abecedario[i]);
        boton.setAttribute("class", "letra");
        boton.innerHTML = abecedario[i];
        boton.addEventListener("click", comprobar)
        teclado.appendChild(boton);
        if (contador % 9 == 0 && contador > 0) {
            teclado.appendChild(document.createElement("br"));
        }
    }
}

function elegirNivel() {
    if (this.id == "facil") {
        niveles.classList.add("invisible")
        secreto = adivinanza(faciles);
        palabra = ocultarPalabra();
        resultado.innerHTML = palabra
        console.log(palabra)
        juego.classList.remove("invisible")
        teclado.classList.remove("invisible")
    }
    else if (this.id == "normal") {
        niveles.classList.add("invisible")
        secreto = adivinanza(normales);
        palabra = ocultarPalabra();
        resultado.innerHTML = palabra
        juego.classList.remove("invisible")
        teclado.classList.remove("invisible")
    }
    else if (this.id == "dificil") {
        niveles.classList.add("invisible")
        console.log(dificiles)
        secreto = adivinanza(dificiles);
        palabra = ocultarPalabra();
        resultado.innerHTML = palabra
        juego.classList.remove("invisible")
        teclado.classList.remove("invisible")
    }
}

function adivinanza(posibilidades) {
    return posibilidades[
        Math.floor(Math.random() * (posibilidades.length - 1))
    ];
}
// Función que usaremos para comprobar si el intento es un acierto o un fallo y aplicar las consecuencias pertinentes
function comprobar() {
    let acierto = false;
    palabra = palabra.replace(/\s+/g, ""); //Expresión regular para eliminar espacios en blanco
    palabra = palabra.split(""); //Separamos la cadena de guiones
    for (let i = 0; i < secreto.length; i++) { //Comprobamos si alguna letra de la palabra a adivinar coincide, en caso afirmativo sustituimos el guión bajo pertinente
        console.log(secreto[i])
        console.log(this.value)
        if (secreto[i] == this.value) {
            acierto = true;
            palabra[i] = this.value;
        }
    }
    palabra = palabra.join(" "); //Unimos de nuevo la cadena de guiones con un espacio entre cada uno para que se pueda apreciar la cantidad de letras
    resultado.innerHTML = palabra;
    if (acierto == true) {
        if (palabra.replace(/\s+/g, "") == secreto) {
            final.innerHTML = `Has acertado la palabra!! Te han sobrado ${vidas} vidas`;
            deshabilitar();
            repetir.removeAttribute("disabled");
        }
        this.style.backgroundColor = "red";
        this.setAttribute("disabled", "true");
    } else {
        this.style.backgroundColor = "red";
        this.setAttribute("disabled", "true");
        vidas -= 1;
        ahorcado.setAttribute("src", `imagenes/ahorcado${vidas}.png`);
        if (vidas == 1) {
            repetir.removeAttribute("disabled");
            final.innerHTML = `Has perdido, la palabra secreta es: ${secreto}`;
            deshabilitar();
            repetir.removeAttribute("disabled");
        }
    }
    resultado.innerHTML = palabra;
}
// Función para generar la cadena donde se va a mostrar los intentos acertados, simplemente creamos una cadena de guiones bajos con la misma longitud que la palabra a adivinar
function ocultarPalabra() {
    let palabra = "";
    for (let i = 0; i < secreto.length; i++) {
        palabra += "_ ";
    }
    return palabra;
}
// Función para jugar otra partida, resetea los valores, activa los botones y elige una nueva palabra a adivinar
function jugarOtraVez() {
    niveles.classList.remove("invisible")
    juego.classList.add("invisible")
    teclado.classList.add("invisible")
    vidas = 6;
    resultado.innerHTML = "";
    ahorcado.setAttribute("src", "imagenes/ahorcado6.png");
    final.innerHTML = "";
    for (let i = 0; i < abecedario.length; i++) {
        document
            .getElementById(abecedario[i])
            .removeAttribute("disabled");
        document.getElementById(abecedario[i]).style.backgroundColor = "green";
    }
    repetir.setAttribute("disabled", "true")
}

// Función para deshabilitar los botones en caso de victoria o derrota
function deshabilitar() {
    for (let i = 0; i <= 26; i++) {
        document.getElementById(abecedario[i]).setAttribute("disabled", "true");
    }
}

crearTeclado();
repetir.addEventListener("click", jugarOtraVez)
facil.addEventListener("click", elegirNivel)
normal.addEventListener("click", elegirNivel)
dificil.addEventListener("click", elegirNivel)
facil.addEventListener("mouseover", () => {
    descripcionFacil.classList.remove("invisible")
})
facil.addEventListener("mouseleave", () => {
    descripcionFacil.classList.add("invisible")
})
normal.addEventListener("mouseover", () => {
    descripcionNormal.classList.remove("invisible")
})
normal.addEventListener("mouseleave", () => {
    descripcionNormal.classList.add("invisible")
})
dificil.addEventListener("mouseover", () => {
    descripcionDificil.classList.remove("invisible")
})
dificil.addEventListener("mouseleave", () => {
    descripcionDificil.classList.add("invisible")
})
