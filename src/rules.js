/*
 * Reglas para clasificar y decidir como responder a los mensajes.
 *
 * Estas funciones se encargan de determinar si el bot debe
 * responder de manera automatica, enviar un saludo o esperar tu
 * intervencion. Puedes extender estas reglas segun tus flujos.
 */

const { WORKING_HOURS, KEYWORDS_VENTAS } = require('./config');

// Comprueba si la hora actual esta dentro del horario de atencion.
function estaDentroDeHorario() {
  const now = new Date();
  const hour = now.getHours();
  const { start, end } = WORKING_HOURS;
  if (start < end) {
    return hour >= start && hour < end;
  }
  // Si end < start, se considera que pasa la medianoche
  return hour >= start || hour < end;
}

// Determina si el texto es un saludo simple.
function esSaludoSimple(texto) {
  if (!texto) return false;
  const t = texto.toLowerCase();
  return (
    t.includes('hola') ||
    t.includes('buenas') ||
    t.includes('buenos dias') ||
    t.includes('buenas tardes') ||
    t.includes('buenas noches')
  );
}

// Revisa si el texto contiene alguna palabra clave de ventas.
function tienePalabrasDeVenta(texto) {
  if (!texto) return false;
  const t = texto.toLowerCase();
  return KEYWORDS_VENTAS.some((k) => t.includes(k.toLowerCase()));
}

/**
 * Clasifica el mensaje entrante y decide que hacer:
 *
 * - 'ignorar': fuera de horario, no responder.
 * - 'saludo': enviar un mensaje de bienvenida corto.
 * - 'venta': delegar a la IA la generacion de la respuesta.
 */
function clasificarMensaje(texto) {
  if (!estaDentroDeHorario()) return 'ignorar';
  if (esSaludoSimple(texto)) return 'saludo';
  if (tienePalabrasDeVenta(texto)) return 'venta';
  return 'venta'; // valor por defecto
}

module.exports = {
  clasificarMensaje,
  estaDentroDeHorario,
  esSaludoSimple,
  tienePalabrasDeVenta
};
