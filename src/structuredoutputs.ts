import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI();

async function generarSnippets(promptUsuario: string) {
  try {
    console.log(`Generando snippets para: "${promptUsuario}"...\n`);

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: promptUsuario,
      config: {
        // 1. Forzamos la respuesta a formato JSON
        responseMimeType: 'application/json',

        // 2. Definimos la estructura exacta que debe tener el JSON para VS Code
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            snippets: {
              type: Type.ARRAY,
              description: 'Lista de snippets formateados para VS Code',
              items: {
                type: Type.OBJECT,
                properties: {
                  name: {
                    type: Type.STRING,
                    description: 'Nombre descriptivo del snippet',
                  },
                  prefix: {
                    type: Type.STRING,
                    description: 'El atajo que activa el snippet en VS Code',
                  },
                  body: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Líneas del código del snippet',
                  },
                  description: {
                    type: Type.STRING,
                    description: 'Breve explicación de lo que hace el snippet',
                  },
                  scope: {
                    type: Type.STRING,
                    description: 'Lenguaje o lenguajes donde aplica (ej: javascript, typescript)',
                  },
                },
                required: ['name', 'prefix', 'body', 'description'],
              },
            },
          },
          required: ['snippets'],
        },
      },
    });

    if (!response.text) {
        console.log('Respuesta nula:', response.text)
        return
    }

    // Como Gemini responde en formato JSON plano, podemos usar JSON.parse directamente
    const resultadoJSON = JSON.parse(response.text);

    console.log('--- JSON Recibido de Gemini ---');
    console.log(JSON.stringify(resultadoJSON, null, 2));

    return resultadoJSON;

  } catch (error) {
    console.error('Error al generar snippets:', error);
  }
}

// Probar con una solicitud
generarSnippets('Creame snippets para escribir codigo react con typescript mas rapidos y tambien para los hooks');