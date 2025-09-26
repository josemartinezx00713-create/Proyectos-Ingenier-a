//Seleccionar el botón y el párrafo
const calcular = document.getElementById("btnCalcular");
const resultado = document.getElementById("Resultado");

calcular.addEventListener("click", () => {
    const anioNacimiento= prompt("Ingresa tu año de nacimiento");
    const anioActual= new Date().getFullYear();
    const edad= anioActual - anioNacimiento;

    //Mostrar el resultado
    resultado.textContent = `Tienes apróximadamente ${edad} años.`;
})