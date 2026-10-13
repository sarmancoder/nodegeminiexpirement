import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Inicializar el SDK
const ai = new GoogleGenAI();

async function listarModelos() {
    try {
        console.log("Consultando los modelos disponibles en la API de Gemini...\n");

        // Obtener la lista de modelos
        const response = await ai.models.list();

        console.log("--- Listado de Modelos ---");

        // Iterar sobre el resultado (es un iterador asíncrono)
        for await (const model of response) {
            // if (!model.displayName?.includes('small')) continue
            console.log(`• Nombre del recurso: ${model.name}`);
            console.log(`  Nombre visible:      ${model.displayName}`);
            console.log(`  Descripción:         ${model.description || 'N/A'}`);
            console.log(`  Tokens de entrada:   ${model.inputTokenLimit || 'N/A'}`);
            console.log("--------------------------------------------------");
        }

    } catch (error) {
        console.error("Ocurrió un error al listar los modelos:", error);
    }
}

listarModelos();