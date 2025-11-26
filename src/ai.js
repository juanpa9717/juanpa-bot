/*
 * Modulo para interactuar con la API de OpenAI.
 *
 * Recibe el historial reciente de la conversacion y el mensaje del cliente
 * y devuelve una respuesta generada segun el prompt del sistema y la
 * personalidad de Juan Pablo.
 */
const { Configuration, OpenAIApi } = require('openai');
const { SYSTEM_PROMPT } = require('./config');

// Crear cliente de OpenAI con la clave API.
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

/**
 * Genera una respuesta usando la API de ChatGPT.
 * @param {Object} opts
 * @param {string[]} opts.historial - fragmentos de mensajes recientes del chat
 * @param {string} opts.mensaje - el mensaje del cliente
 * @returns {Promise<string>} texto de respuesta
 */
async function generarRespuesta({ historial, mensaje }) {
  // Construir la conversacion para el modelo. Incluimos el
  // prompt de sistema con la personalidad de Juan Pablo y anadimos
  // los mensajes recientes como contexto.
  const messages = [];
  messages.push({ role: 'system', content: SYSTEM_PROMPT.trim() });
  if (Array.isArray(historial)) {
    historial.forEach((linea) => {
      messages.push({ role: 'assistant', content: linea });
    });
  }
  messages.push({ role: 'user', content: mensaje.trim() });

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages,
      temperature: 0.6,
      max_tokens: 150
    });
    const respuesta = completion.data.choices[0].message?.content?.trim();
    return respuesta || '';
  } catch (err) {
    console.error('Error al generar respuesta de OpenAI:', err.response?.data || err.message);
    return 'Lo siento, hubo un problema al generar la respuesta. Podes volver a intentarlo?';
  }
}

module.exports = {
  generarRespuesta
};
