//Seleccionar los elementos
const pContar = document.getElementById("contenedor");
const btnDisminuir = document.getElementById("Disminuir");
const btnIncrementar = document.getElementById("Aumentar");

//Inicializar el contador

let contador = 20;


//Función para contar click
function disminuirContador() {
    contador--;
    pContar.textContent = contador + "°C";
    if(contador <= 15){
        pContar.style.backgroundColor = "Blue";
    }
    if(contador >15 && contador <25)
        pContar.style.backgroundColor = "Green";
}

function incrementarContador() {
    contador++;
    pContar.textContent = contador + "°C";
    if(contador >= 25){
        pContar.style.backgroundColor = "Red";
    }
    if(contador <25 && contador >15)
        pContar.style.backgroundColor = "Green";
}




//Asignar la función al boton
btnDisminuir.addEventListener("click", disminuirContador);
btnIncrementar.addEventListener("click", incrementarContador);

