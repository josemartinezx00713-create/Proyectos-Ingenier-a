document.addEventListener("DOMContentLoaded", () => {
  const sendbutton = document.querySelector("#sendButton");
  const inputText = document.querySelector("#inputText");
  //permitir enviar con la tecla enter
  inputText.addEventListener("keydown", (event) => {
    if(event.key === "Enter" && !event.shiftkey) {
      event.preventDefault();
      sendbutton.click();
    }
  });
  sendbutton.addEventListener("click", async () => {
  //Sacar el valor del input(pregunta del usuario)
  const myMessage = inputText.value.trim();

  if(!myMessage) return false;

  //crear y mostrar el mensaje del usuario
  const userMessage = document.createElement("div");
  userMessage.className = "chat-message chat-message-user";
  userMessage.textContent = "Yo: " + myMessage;

  const messageContainer = document.querySelector(".chat-messages");
    messageContainer.appendChild(userMessage);
    messageContainer.scrollTop = messageContainer.scrollHeight;

  //limpiar input
  inputText.value = "";
  inputText.focus();

  //peticion al backend para que responda la IA
  try {
    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: myMessage,
      }),
    });

    //crear y mostrar el mensaje del bot
    const data = await response.json();

    const botMessage = document.createElement("div");
    botMessage.className = "chat-message chat-message-bot";
    botMessage.textContent = "Carmen: " + data.reply;

    messageContainer.appendChild(botMessage);
    messageContainer.scrollTop = messageContainer.scrollHeight;

  } catch(error) {
    console.log("Error: ", error);
  }
  });
});
