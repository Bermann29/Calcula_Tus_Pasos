//Solo falta hacer una funcionalidad que cuando el resultado de decimales
//diga que el resultado no es un entero y se le restarian puntos
//por ende habria que hacer un condicional antes de crear el resultado que diga
//que solamente si es entero se cree el resultado sino que mande la alarma y quite puntos
//ademas de poner bonito el juego



// Constantes
const tipos = ["trebol", "diamante", "corazon", "espada"];
const botonSuma = document.querySelector(".Suma")


// Datos
let mazo = [];
let barajado = [];
let cartasServidas = [];
let mano = [];
let operando = [];
let EspacioOperacion = [];
var gameModeOn = false;
var cartaClickeada = null;
var start = null
var target = null
let popSound = new Audio ('Efectos de sonido/cartaPuesta.wav')
popSound.volume = 0.2;
let failSound = new Audio ('Efectos de sonido/lose.wav')
failSound.volume = 0.5;
let winSound = new Audio ('Efectos de sonido/win.wav')
winSound.volume = 0.7;

track = Math.floor(5*Math.random())+1;

let fondo = new Audio (`Musica de fondo/Track${track}.mp3`);
fondo.volume = 0.1

function setFondo(track) {
fondo = new Audio (`Musica de fondo/Track${track}.mp3`);
fondo.volume = 0.1
}

const crearCarta = (carta) => {
  if (carta) {
    const cartaHTML = document.createElement("dive");
  const imagen = document.createElement("img");
  if (elMazoEstaVacio < 36) {
    imagen.src = `${carta.estaDadaVuelta ? "dorso" : carta.img}`;
  }

  cartaHTML.dataset.numero = carta.numero;
  cartaHTML.dataset.tipo = carta.tipo;
  cartaHTML.dataset.img = carta.img;
  cartaHTML.dataset.pila = carta.pila;
  cartaHTML.classList.add("carta");
  
  cartaHTML.appendChild(imagen);

  cartaHTML.onclick = () =>{ 
    if (limiteDeOperandos < 4 && asincopa == 1) {
      ComprobarClickEnMano(carta);
      escribeResultado();
      asincopa = 0;
    }
  }
  popSound.play ();

  return cartaHTML;
  }
};

const ponerCartasEnLaMano = () => {
  for (let i = 0; i < 6; i++) {
    const dive = document.querySelector(`#mano-${i}`);
    dive.innerHTML = "";
    const carta = crearCarta(mano[i][0]);
    if(carta){dive.appendChild(carta);}
  }
};

limiteDeOperandos = 0;
const ponerCartasEnOperando = () => {
    if (limiteDeOperandos < 4){
      const operandoContenedor = document.querySelector(`#operando-${limiteDeOperandos}`);
      operandoContenedor.innerHTML = "";
      const carta = crearCarta(cartaClickeada);
      operandoContenedor.appendChild(carta);
      limiteDeOperandos++;
    }
};

const ComprobarClickEnMano = (carta) => {
  cartaClickeada = carta ;
  ponerCartasEnOperando();
  operando.push (carta);
  mano[carta.pila].pop ();
  ponerCartasEnLaMano();
  comprobarClickEnMazo();
}

const comprobarClickEnMazo = () => {
  const cartaMazo = document.querySelector(`#Sacar-Mazo`);
  cartaMazo.onclick = () => {
    seconds = 0;
    for (let i = 0; i < 6; i++) {
      if (mano[i][0] != null) {
        mano[i].shift();
      }
      
      if (elMazoEstaVacio == 30) {
        const cartaHTML = document.querySelector("#Sacar-Mazo");
        cartaImagen = document.createElement("p")
        cartaImagen.textContent = ""
        cartaHTML.innerHTML = ""
        cartaHTML.appendChild(cartaImagen)
        gameModeOn = false;
      }
      if (elMazoEstaVacio < 30) {
        cartaSacada = barajado[0];
        cartaSacada.estaDadaVuelta = false;
        mano[i].push (cartaSacada);
        mano[i][0].pila = i;
        barajado.shift ();
        elMazoEstaVacio++;
        } else{}
      }
      if (elMazoEstaVacio == 30 && gameModeOn == true) {
        const cartaHTML = document.querySelector("#Sacar-Mazo");
        cartaImagen = document.createElement("img")
        cartaImagen.src = "img/dorso2.png"
        cartaHTML.innerHTML = ""
        cartaHTML.appendChild(cartaImagen)
      }
      if (elMazoEstaVacio == 30 && gameModeOn == false) {
        if (PuntajeGlobal>0) {
          winSound.play()
          alert (`Bien jugado!, tu puntuación es: ${PuntajeGlobal}`)
        }
        else{ 
          failSound.play()
          alert (`Buen intento!, mejor suerte para la próxima, tu puntuación es: ${PuntajeGlobal}`)
        }
      }
    limpiarTablero();
    ponerCartasEnLaMano();  
  }
}

function limpiarTablero() {
  if (gameModeOn==true) {
      clearBoard();
      clearOperandos();
      clearResultado();
      asincopa = 0;
      operando = [];
      limiteDeOperandos = 0;
      displayNumbers()
    }
}

let SumaContenedor = [];
let SumaDisplay = [];
OP = 0;
var asincopa = 0;

function EscribeOperacion(Operacion) {
  if (gameModeOn == true & OP < 4 & asincopa == 0) {
  SumaContenedor[OP] = document.querySelector(`#Operacion-${OP+1}`)
  SumaDisplay[OP] = document.createElement("p");
  if (Operacion == Suma) {
    SumaDisplay[OP].textContent = "+";
    OperacionEfectuada = 1;
  } else {if (Operacion == Resta) {
    SumaDisplay[OP].textContent = "-";
    OperacionEfectuada = 2;
  } else {if (Operacion == Producto) {
    SumaDisplay[OP].textContent = "x";
    OperacionEfectuada = 3;
  } else {if (Operacion == Division) {
    SumaDisplay[OP].textContent ="÷";
    OperacionEfectuada = 4;
  }}}} 
  SumaContenedor[OP].appendChild(SumaDisplay[OP]);
  OP=OP+1;

  asincopa = 1;
  return OP;
  }
  return OperacionEfectuada;
}

var resultado = null;
var noIguales = null;
const escribeResultado = () =>{
  creaTexto (`#Resultado-${OP}`)
  if (OperacionEfectuada == 1) {
    resultado  = start + operando[OP - 1].numero;
    Display.textContent = resultado;
  } else {
    if (OperacionEfectuada == 2) {
      resultado  = start - operando[OP - 1].numero;
      Display.textContent = resultado;
    } else {
      if (OperacionEfectuada == 3) {
        resultado  = start * operando[OP - 1].numero;
        Display.textContent = resultado;
      } else {
        if (OperacionEfectuada == 4) {
          if ((start / operando[OP - 1].numero) - Math.floor(start / operando[OP - 1].numero) == 0) {
          resultado  = start / operando[OP - 1].numero;
          Display.textContent = resultado;
          } else{
            failSound.play();
            alert("El resultado no es entero por ende se te restan 10 puntos");
            limpiarTablero();
            seconds = 0;
            noIguales = 1
            }
        }
      }
    }
  }
  CalculaResultado5();
  if (noIguales != 1) {
    start = resultado;
  }else{
    noIguales = 0
    CalculaPuntaje(20)
    displayNumbers();
  }
    

}

function CalculaResultado5() {
  if (Contenedor == document.querySelector(`#Resultado-4`)) {
    creaTexto("#Resultado-5");
    PuntajePartida = Math.abs(resultado - target);
    Display.textContent = resultado - target;
    CalculaPuntaje(PuntajePartida);

  }
}

var PuntajeGlobal = 0;
function CalculaPuntaje(PuntajePartida) {
  PuntajeGlobal = PuntajeGlobal + (10 - PuntajePartida);
  creaTexto("#Puntaje");
  Display.textContent = PuntajeGlobal;
  if (PuntajePartida>10) {
    failSound.play();
  }else{winSound.play()}
}

function creaTexto (id) {
  Contenedor = document.querySelector ( `${id}`);
  Display = document.createElement ("p");
  Contenedor.innerHTML = "";
  Contenedor.appendChild(Display);
}

seconds = 0;
frames = 0;
function timer() {
  window.requestAnimationFrame (timer)
  frames++
  if (frames == 60){
    seconds ++;
    frames = 0;
    checktimeLimit();
    actualizarTimer();
    if (fondo.ended) {
      track ++;
      if (track == 6) {
        track = 1;
      }
      setFondo(track);
      fondo.play()
    }
  }
}

timer();


function actualizarTimer() {
  x = seconds;
  const relojHTML = document.querySelector (`#Reloj`);
  relojDisplay = document.createElement("p")
  relojDisplay.textContent = x;
  relojHTML.innerHTML = "";
  relojHTML.appendChild (relojDisplay)
}  

function checktimeLimit() {
  if (seconds == 61) {
    alert("glin glin tiempoooo. -10 puntos");
    seconds = 0;
    frames = 0;
    limpiarTablero();
  }
}
  