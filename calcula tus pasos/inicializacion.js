
function displayNumbers() {
    // Generar número de inicio aleatorio entre 11 y 99
    var startNumber = Math.floor(Math.random() * 89) + 11;
  
    // Generar número objetivo aleatorio entre 11 y 99
    var targetNumber = Math.floor(Math.random() * 89) + 11;
  
    var inputContainer = document.getElementById("Inicio-Objetivo");
    inputContainer.innerHTML = "";
  
    var Inicio = document.getElementById("Resultado-0");
    Inicio.innerHTML = "";
  
    var Final = document.getElementById("Objetivo");
    Final.innerHTML = "";
  
    var startNumberDisplay = document.createElement("p");
    startNumberDisplay.textContent = "Numero de inicio: " + startNumber;
    inputContainer.appendChild(startNumberDisplay);
  
    var targetNumberDisplay = document.createElement("p");
    targetNumberDisplay.textContent = "Numero objetivo: " + targetNumber;
    inputContainer.appendChild(targetNumberDisplay);
  
    var InicioDisplay = document.createElement("p");
    InicioDisplay.textContent = startNumber;
    Inicio.appendChild(InicioDisplay);
  
    var FinalDisplay = document.createElement("p");
    FinalDisplay.textContent = targetNumber;
    Final.appendChild(FinalDisplay);
  
    start =startNumber;
    target = targetNumber;
}

const crearMazo = () => {
    mazo = [];
    for (let i = 1; i <= 9; i++) {
      for (let j = 0; j < tipos.length; j++) {
        const carta = {
          numero: i,
          tipo: tipos[j],
          estaDadaVuelta: true,
          img: `img/${i}_de_${tipos[j]}.png`,
          id: i * j,
          pila : 0
        };
        mazo.push(carta);
      }
    }
};
  
const barajar = () => {
    barajado = mazo
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
};
  
const servir = () => {
    for (let i = 0; i < 6; i++) {
      if(mano[i] == []){
      }
      else{
        barajado[0].estaDadaVuelta = false;
        mano[i].push(barajado[0]);
        mano[i][0].pila = i;
        barajado.shift();
      }
    }
    ponerCartasEnLaMano();
}

  
function clearBoard() {
    for (let i = 0; i < 4; i++) {
      clearText(`#Operacion-${i+1}`);
    }
    OP = 0;
}
  
function clearResultado() {
    for (let i = 0; i < 5; i++) {
      clearText(`#Resultado-${i+1}`);
    }
}
  
const clearOperandos = () => {
    for (let i = 0; i < 4; i++) {
      clearText (`#operando-${i}`);
    }
    limiteDeOperandos = 0 ;
}

const clearPuntaje = () => {
  clearText("#Puntaje");
  PuntajeGlobal = 0;
}

function clearText(id) {
  for (let i = 0; i < 4; i++) {
    Contenedor = document.querySelector(`${id}`)
    Display = document.createElement("p");
    Display.textContent ="";
    Contenedor.innerHTML = "";
    Contenedor.appendChild(Display);
  }
}

elMazoEstaVacio = 0
  
function playGame() {
    fondo.play()
    mano = [[],[],[],[],[],[]];
    operando = [];
    seconds = 0;
    frames = 0;
  
    displayNumbers();
  
    crearMazo ();
    barajar ();
    servir ();
    clearBoard();
    clearOperandos();
    clearResultado();
    clearPuntaje();
    asincopa = 0;
    elMazoEstaVacio = 0
    const Contenedor = document.querySelector(`#Sacar-Mazo`);
    Contenedor.innerHTML = "";
    imagen = document.createElement ("img");
    imagen.src="img/dorso.png";
    Contenedor.appendChild (imagen)
      
    
    gameModeOn = true;

  }