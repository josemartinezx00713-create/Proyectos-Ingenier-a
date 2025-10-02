//Este codigo se ejecuta cuando la pagina termina de cargar
document.addEventListener("DOMContentLoaded", function() {
    const sendBtn = document.getElementById("sendBtn");
    const input = document.getElementById("messagesInput");
    const messages = document.getElementById("messages");
    const sonidoMensaje = new Audio("./assets/img/notification.mp3");

//Diccionario con propiedades CSS
const propiedadesCSS = {
    css: "Css es el lenguaje de programación encargado de darle un estilo a nuestra página web. Ejemplo: body { background-color: white; color: black; }",
    color: "La propiedad 'color' cambia el color del elemento. Ejemplo: h1 { color: blue; }",
    margin: "La propiedad 'Margin' agrega un espacio o margen alrededor de un elemento. Ejemplo: div { margin: 20px; }",
    padding: "La propiedad 'Padding' agrega espacio dentro de un elemento. Ejemplo: div { padding: 10px; }",
    fontfamily: "Define el tipo de fuente que se mostrará, se le puede cambiar el tamaño con la propiedad Font-size. Ejemplo: p { font-family: 'Arial', sans-serif; }",
    width: "Define el ancho de un elemento, el valor se puede escribir en pixels, ems o porcentaje. Se le puede asignar un ancho mínimo o máximo (max-width/min-width). Ejemplo: img { width: 100%; max-width: 600px; }",
    height: "Define el alto de un elemento, el valor se puede escribir en pixels, ems o porcentaje. Se le puede asignar un alto mínimo o máximo (max-height/min-height). Ejemplo: img { height: 300px; min-height: 100px; }",
    border: "Define el borde de un elemento, su color, su estilo y grosor. Ejemplo: div { border: 2px solid black; }",
    background: "Define los fondos de un objeto. El fondo puede ser una imagen (background-image) o un color (background-color). Ejemplo: section { background-image: url('fondo.jpg'); background-color: #f0f0f0; }",
    display: "La propiedad 'display' define cómo se muestra un elemento en la página (por ejemplo: en bloque, en línea o como flexbox). Ejemplo: nav { display: flex; }",
    flex: "La propiedad 'flex' especifica los componentes de una longitud flexible: el factor de crecimiento flexible, el factor de contracción flexible y la base flexible. Ejemplo: .item { flex: 1 1 auto; }",
    justifycontent: "La propiedad 'justify-content' alinea los elementos horizontalmente dentro de un contenedor flex. Ejemplo: .container { justify-content: center; }",
    alignitems: "La propiedad 'align-items' alinea los elementos verticalmente dentro de un contenedor flex. Ejemplo: .container { align-items: flex-start; }",
    overflow: "La propiedad 'overflow' decide qué hacer si el contenido se sale del tamaño del elemento (puede ocultarlo o poner scroll). Ejemplo: div { overflow: scroll; }",
    borderradius: "La propiedad 'border-radius' redondea las esquinas de un elemento. Ejemplo: button { border-radius: 8px; }",
    boxshadow: "La propiedad 'box-shadow' agrega una sombra alrededor del elemento. Ejemplo: .card { box-shadow: 0 4px 8px rgba(0,0,0,0.2); }",
    textalign: "La propiedad 'text-align' alinea el texto (izquierda, centro o derecha). Ejemplo: p { text-align: center; }",
    fontsize: "La propiedad 'font-size' cambia el tamaño del texto. Ejemplo: h1 { font-size: 32px; }",
    gap: "La propiedad 'gap' agrega espacio entre elementos dentro de un contenedor con display:flex o grid. Ejemplo: .grid { display: grid; gap: 20px; }",
    position: "La propiedad 'position' define cómo se posiciona un elemento en la página (static, relative, absolute, fixed, sticky). Ejemplo: .box { position: absolute; top: 50px; left: 100px; }",
    zindex: "La propiedad 'z-index' controla la superposición de los elementos. Ejemplo: .modal { z-index: 999; }",
    opacity: "La propiedad 'opacity' define la transparencia de un elemento. Ejemplo: .fondo { opacity: 0.5; }",
    visibility: "La propiedad 'visibility' controla si un elemento es visible o no, sin afectar el layout. Ejemplo: .mensaje { visibility: hidden; }",
    transition: "La propiedad 'transition' permite animar cambios en otras propiedades CSS. Ejemplo: button { transition: background-color 0.3s ease; }",
    transform: "La propiedad 'transform' permite modificar la forma o posición de un elemento. Ejemplo: .imagen { transform: rotate(45deg); }",
    cursor: "La propiedad 'cursor' cambia el tipo de cursor al pasar sobre un elemento. Ejemplo: a { cursor: pointer; }",
    objectfit: "La propiedad 'object-fit' define cómo se ajusta una imagen dentro de su contenedor. Ejemplo: img { object-fit: cover; }",
    textdecoration: "La propiedad 'text-decoration' modifica el estilo del texto (subrayado, tachado, etc.). Ejemplo: a { text-decoration: none; }"
};

//Función que permite agregar el mensaje del usuario al chat

    function agregarMensaje(texto, clase) {
        const msg = document.createElement("div"); //Crea un nuevo elemento
        msg.classList.add("message", clase); //Asignar clases
        msg.textContent = texto; //Asignar el texto al div
        messages.appendChild(msg); //Agregar el mensaje al area del chat
        messages.scrollTop = messages.scrollHeight; //Mandar al final del chat
        }

       //Función que analiza lo que escribió el usuario para generar una respuesta
       function analizarMensaje(texto) {
            const textoRecibido = texto.toLowerCase(); //Convierte todo a minusculas

            //Buscar si el mensaje contiene una propiedad css del diccionario
            for (const propiedad in propiedadesCSS) {
                if(textoRecibido.includes(propiedad)) {
                    return propiedadesCSS[propiedad]; //Devolver la resp. Encontrada
                }
            }

            //Si no encuentra nada
            return `"${texto}" No tiene una respuesta en el diccionario CSS. Por lo tanto, no sabria responder a tu duda. Lo siento.`;
       }

      //enviar mensaje

      function enviarMensaje() {
        const texto = input.value.trim(); //Obtener el texto sin espacios
        if(texto === "") return;
        
        agregarMensaje(texto, "user"); //Mostrar el mensaje del usuario
        input.value = "";
        input.focus();
      

      //Esperar 0.5 seg antes de mostrar la respuesta del bot
      setTimeout(function () {
        const respuesta = analizarMensaje(texto); //Obtener la repsuesta del bot
        agregarMensaje(respuesta, "bot");
        sonidoMensaje.play();
      }, 500);
    }

//Capturar eventos
    sendBtn.addEventListener("click", enviarMensaje);

    input.addEventListener("keypress", function (e) {
        if(e.key === "Enter") {
            enviarMensaje();
        }
    });
});