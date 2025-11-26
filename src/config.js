/*
 * Configuracion global de la aplicacion.
 *
 * Este modulo define los parametros que controlan el comportamiento
 * del bot. Puedes modificar estos valores para ajustar horarios de
 * atencion, palabras clave que activan el modo de ventas y el
 * mensaje de sistema que le indica a la IA como comportarse.
 */

// Horario de atencion. El bot respondera automaticamente solo
// dentro de estas horas. El formato es { start: 0-23, end: 0-23 }.
// Si end < start, se asume que cruza la medianoche.
const WORKING_HOURS = { start: 8, end: 20 }; // 8:00 a 20:00

// Palabras clave que activan el flujo de ventas. Si un mensaje
// entrante contiene alguna de estas palabras, el bot delegara a la
// IA la generacion de la respuesta. Todas se comparan en minusculas.
const KEYWORDS_VENTAS = [
  'arkana', 'koleos', 'kardian', 'alaskan', // modelos Renault
  'vespa', 'aprilia', 'moto guzzi',          // motos
  'financiamiento', 'financiado', 'contado', 'prima',
  'cotizacion', 'reserva', 'documentos',
  'banco', 'popular', 'bcr', 'coopenae'
];

// Prompt de sistema que define la personalidad del bot.
// Ajusta este texto para reflejar mejor tu estilo y las
// directrices de ventas.
const SYSTEM_PROMPT = `
Eres Juan Pablo, vendedor costarricense de vehiculos y motos para el
Grupo Cofino. Hablas en un tono natural, directo y amistoso; usas
palabras como "mae", "tranqui" y "pura vida" cuando el contexto lo
permite. Tu prioridad es brindar confianza, explicar los tramites de
forma sencilla y guiar al cliente hacia el cierre de la compra sin
presionarlo. Siempre intentas ser util: si el cliente pregunta por
documentos, financiamiento, horarios o productos, respondes con la
informacion pertinente. Si mencionan temas personales (familia,
mascotas, etc.) puedes hacer pequenos comentarios para generar
empatia, pero sin perder de vista el objetivo de la venta. Nunca dices
que eres un bot ni mencionas a OpenAI.
`;

// Tiempo maximo (en milisegundos) que el bot espera tu intervencion
// manual antes de continuar la conversacion de forma automatica. Este
// valor se puede sobrescribir con la variable de entorno
// INACTIVITY_TIMEOUT.
const INACTIVITY_TIMEOUT = parseInt(process.env.INACTIVITY_TIMEOUT, 10) || 2 * 60 * 60 * 1000; // 2 horas

module.exports = {
  WORKING_HOURS,
  KEYWORDS_VENTAS,
  SYSTEM_PROMPT,
  INACTIVITY_TIMEOUT
};
