/*
 * Modulo para conectar con WhatsApp Web a traves de Baileys.
 *
 * Esta implementacion inicializa una sesion de WhatsApp, imprime el
 * codigo QR cuando es necesario, escucha mensajes entrantes y decide
 * cuando responder usando las reglas y el modulo de IA. Mantiene un
 * historial sencillo por contacto para proporcionar contexto a
 * ChatGPT.
 */
const { default: makeWASocket, useMultiFileAuthState, Browsers } = require('@whiskeysockets/baileys');
const P = require('pino');
const { clasificarMensaje } = require('./rules');
const { generarRespuesta } = require('./ai');

// Carpeta donde Baileys almacenara el estado de autenticacion.
const authFolder = 'whatsapp_auth';

// Mapear contactos a un pequeno historial de mensajes. Solo guardamos
// mensajes de la IA para dar contexto al modelo.
const historialPorContacto = {};

/**
 * Inicializa la sesion de WhatsApp y configura los manejadores de eventos.
 */
async function inicializarWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState(authFolder);
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: P({ level: 'silent' }),
    browser: Browsers.macOS('Bot')
  });

  // Guardar credenciales cuando se actualicen
  sock.ev.on('creds.update', saveCreds);

  // Evento de mensajes
  sock.ev.on('messages.upsert', async (msgUpdate) => {
    const msg = msgUpdate.messages[0];
    if (!msg || msg.key.fromMe) return; // ignorar mensajes enviados por el bot

    const remoteJid = msg.key.remoteJid;
    const texto = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
    if (!texto) return;

    // Clasificar mensaje para decidir accion
    const accion = clasificarMensaje(texto);
    if (accion === 'ignorar') return;

    if (accion === 'saludo') {
      const saludo = 'Hola! Soy Juan Pablo, a la orden 😊 ¿En que te puedo ayudar hoy?';
      await sock.sendMessage(remoteJid, { text: saludo });
      // Anadir saludo al historial de este contacto
      if (!historialPorContacto[remoteJid]) historialPorContacto[remoteJid] = [];
      historialPorContacto[remoteJid].push(saludo);
      return;
    }

    // Accion 'venta': generar respuesta con IA
    // Obtener el historial de este contacto
    const historial = historialPorContacto[remoteJid] || [];
    const respuesta = await generarRespuesta({ historial, mensaje: texto });
    if (respuesta) {
      await sock.sendMessage(remoteJid, { text: respuesta });
      // Guardar respuesta para contexto futuro (maximo 5 mensajes)
      if (!historialPorContacto[remoteJid]) historialPorContacto[remoteJid] = [];
      historialPorContacto[remoteJid].push(respuesta);
      if (historialPorContacto[remoteJid].length > 5) {
        historialPorContacto[remoteJid] = historialPorContacto[remoteJid].slice(-5);
      }
    }
  });

  console.log('Sesion de WhatsApp iniciada. Escanea el QR si se muestra en la terminal.');
}

module.exports = {
  inicializarWhatsApp
};
