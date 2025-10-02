// Importar dependencias
import express, { text } from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

// Cargar configuración (de api key)
dotenv.config();

// Cargar express
const app = express();
const PORT = process.env.PORT || 3000;

// Servir el frontend (carpeta public)
app.use("/", express.static("public"));

// Middleware para procesar jason
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Crear una instancia de openai y pasar la api key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Ruta / endpoint / url
app.post("/api/chatbot", async(req, res) => {
  const contexto = `
    Eres un asistente de soporte para el supermercado "Familiar".
    Informacion del negocio:
      - Ubicacion: Rivas, Nicaragua, Barrio Gaspar Garcia Laviana de la escuela San Martin 2 cuadras al Oeste.
      - Horario: Lunes a Sabado 08:00 pm a 9:00 pm, Domingos de 9:00 amm a 6:00 pm.
      - Productos: Pan, Leche, Huevos, Frutas, Verduras, Carnes, Refrescos (solo y exclusivamente tenemos estos productos).
      - Marcas: Bimbo, La Perfecta, Parmalac, Coca cola, Pepsi cola, Prix cola, Big cola.
      - Metodos de pago: Efectivo y tarjetas de credito/debito.
    Solo puedes responder preguntas de la tienda. Cualquier otra pregunts esta prohibida.
    Debes responder de la forma mas corta y directa posible, Usando los minimos tokens posibles.
  `;

  //Recibir pregunta del usuario
  const { message } = req.body;

  if(!message)
    return res.status(400).json({ error: "Has enviado un mensaje vacio"});

  //Peticion al modelo de IA
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: contexto },
        { role: "user", content: message }
      ],
      max_completion_tokens: 200,
    });

    //devolver respuesta
    const reply = response.choices[0].message.content;
    return res.status(200).json({ reply });

  } catch (error) {
    console.log("Error: ", error);

    return res.status(500).json({
      error: "Error al generar la respuesta.",
    });
  }
});

// Servir el backend
app.listen(PORT, () => {
  console.log("Servidor corriendo correctamente en http//localhost:" + PORT);
});
