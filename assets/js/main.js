//Este código se ejecuta cuando la página termina de cargar
document.addEventListener("DOMContentLoaded", function () {
  const sendBtn = document.getElementById("sendBtn");
  const input = document.getElementById("messagesInput");
  const messages = document.getElementById("messages");

  //Diccionario con propiedades CSS
  const propiedadesCSS = {
    color: "La propiedad 'color' cambia el color del texto.",
    margin:
      "La propiedad 'margin' agrega espacio/margen alrededor de un elemento.",
    padding: "La propiedad 'padding' agrega espacio dentro de un elemento.",
  };

  //Función que permite agregar el mensaje del usuario al chat
  function agregarMensaje(texto, clase) {
    const msg = document.createElement("div"); //Crear un nuevo elemento
    msg.classList.add("message", clase); //Asignar clases
    msg.textContent = texto; //Asignar el texto al div
    messages.appendChild(msg); //Agregar el mensaje al área del chat
    messages.scrollTop = messages.scrollHeight; //Mandar al final del chat
  }

  //Función que analiza lo que escribió el usuario y genera una respuesta
  function analizarMensaje(texto) {
    const textoRecibido = texto.toLowerCase(); // Convertir todo a minúscula

    //Buscar si el mensaje contiene una propiedad CSS del diccionarioa
    for (const propiedad in propiedadesCSS) {
      if (textoRecibido.includes(propiedad)) {
        return propiedadesCSS[propiedad]; //Devolver la respuesta encontrada
      }
    }

    //Si no encuentra nada
    return "La propiedad no se encuentra en el diccionario CSS.";
  }

  //Función para enviar el mensaje
  function enviarMensaje() {
    const texto = input.value.trim(); //Obtener el texto sin espacios
    if (texto === "") return;

    agregarMensaje(texto, "user"); //Mostrar el mensaje del usuario
    input.value = "";
    input.focus();

    //Esperar 0.5 segundos antes de mostrar la respuesta de bot
    setTimeout(function () {
      const respuesta = analizarMensaje(texto); //Obtener la respuesta del bot
      agregarMensaje(respuesta, "bot");
    }, 500);
  }

  //Capturar eventos
  sendBtn.addEventListener("click", enviarMensaje);

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      enviarMensaje();
    }
  });
});
