// Importar dependencias
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

// Cargar configuración (de api key)
dotenv.config(); // Se cargan las variables de entorno

// Cargar express
const app = express();
const PORT = process.env.PORT || 3000;

// Servir  el frontend (carpeta public)
app.use("/", express.static("public"));

// Middleware para procesar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Crear instancia de openai y pasar la api key
const openai = new OpenAI({
  apikey: process.env.OPENAI_API_KEY,
});

// Ruta / endpoint / url
app.post("/api/traducir", async (req, res) => {
  // Funcionalidad de traducir con IA
  const { texto, targetLang } = req.body;

  const promptSystem1 = "Eres un traductor profesional.";
  const promptSystem2 =
    "Solo puedes responder con una traducción directa del texto que el usuario te envíe." +
    "Cualquier otra respuesta o conversación está prohibida.";
  const promptUser = `Traduce el siguente texto al ${targetLang}: ${texto}`;

  // Llamar al LLM o modelo de openai
  try {
    //Es una petición con autocompletado de IA
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        // role, permite dar contexto al sistema
        { role: "system", content: promptSystem1 },
        { role: "system", content: promptSystem2 },
        { role: "user", content: promptUser },
      ],
      //Si no se indica se podrían consumir más token de lo que se necesita
      max_completion_tokens: 500,
      response_format: { type: "text" },
    });

    const translatedText = completion.choices[0].message.content;
    return res.status(200).json({ translatedText });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al traducir." });
  }
});

// Servir el backend
app.listen(PORT, () => {
  console.log("Servidor corriendo correctamente en http//localhost:" + PORT);
});
