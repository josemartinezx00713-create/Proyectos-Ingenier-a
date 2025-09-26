//elementos del DOM
// elementos del DOM
const btnEvaluar = document.getElementById("btnEvaluar");
const inputNota = document.getElementById("nota");
const resultado = document.getElementById("resultado");

// funcion principal que se ejecuta al hacer click
function evaluarNota() {
    const nota = parseInt(inputNota.value);
    const calificacion = obtenerCalificacion(nota);
    resultado.textContent = `La calificacion es: ${calificacion}`;
}

// funcion que determina la calificacion segun la nota
function obtenerCalificacion(nota) {
    if (isNaN(nota) || nota < 0 || nota > 100) {
        return "La nota es invalida"
    }
    if (nota >= 90) return "Exelent";
    if (nota >= 80) return "Muy bueno";
    if (nota >= 70) return "Bueno";
    if (nota >= 60) return "Regular";
    return "Reprobado";
}

// Evento para el boton
btnEvaluar.addEventListener("click", evaluarNota);

inputNota.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        evaluarNota();
    }
})