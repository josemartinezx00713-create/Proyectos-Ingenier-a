//Seleccionar los elementos
const pContar = document.getElementById("contador");
const btnIncrementar = document.getElementById("btnIncrementar");
const btnResetear = document.getElementById("btnResetear");

//Inicializar el contador

let contador = 0;


//Función para contar click
function incrementarContador() {
    contador++;
    pContar.textContent = contador;

}


//Asignar la función al boton
btnIncrementar.addEventListener("click", incrementarContador);
btnResetear.addEventListener("click", () => {
    contador = 0;
    pContar.textContent = contador
})
