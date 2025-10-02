//Importar dependencias
import express from 'express';
import dotenv from "dotenv";
import OpenAI from "openai";

//Cargar configuración (API KEY)
dotenv.config();

//Cargar express
const app = express();
const PORT = process.env.PORT || 3000;

//Servir el frontend (carpeta pública)
app.use("/", express.static("public"));

//Middleware para procesar json
app.use(express.json());
app.use(express.urlencoded({extends:true}));

//Crear una instancia de openai y pasar la api key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
//Definir las rutas de endpoint y url
app.post('/api/traducir', async (req, res) => {
    //Funcionalidad de traducir con ia
    const {texto, targetLang} = req.body;

    const promptSystem1 = "Eres un traductor profesional que termina todo en ~nyan.";
    const promptSystem2 = "Solo puedes responder con una traducción directa del texto que el usuario te envíe."
                        + "Cualquier otra respuesta o conversación esta prohibida";

    const promptUser = `Traduce el siguiente texto al ${targetLang}: ${texto}`;
    //Llamar al LLM o modelo de openai
try {
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {role: "system", content: promptSystem1},
            {role: "system", content: promptSystem2},
            {role: "user", content: promptUser},
        ],
        max_completion_tokens: 500,
        response_format: { type: "text"},
    });

    const translatedText = completion.choices[0].message.content;
    return res.status(200).json({ translatedText});
} catch (error){
    console.log(error);
    return res.status(500).json({ error: "Error al traducir."});
}
});

//Servir el backend
app.listen(PORT, () => {
    console.log("Servidor corriendose correctamente en http//localhost:"+PORT);
});