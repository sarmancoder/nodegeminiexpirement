import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Cargar las variables del archivo .env
dotenv.config();

// Inicializar el SDK. Tomará automáticamente la variable GEMINI_API_KEY del entorno.
const ai = new GoogleGenAI();

async function main() {
  try {
    console.log("Enviando mensaje a Gemini...\n");

    // Llamada básica de generación de contenido
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: 'Escribe un poema corto sobre la programación en Node.js y la inteligencia artificial.',
    });

    console.log("--- Respuesta de Gemini ---");
    console.log(response.text);

  } catch (error) {
    console.error("Ocurrió un error:", error);
  }
}

main();