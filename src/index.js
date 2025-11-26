require('dotenv').config();
const express = require('express');
const { inicializarWhatsApp } = require('./whatsapp');

const app = express();
const port = process.env.PORT || 3000;

// Endpoints de ejemplo
app.get('/', (_req, res) => {
  res.send('Bot de ventas de Juan Pablo esta ejecutandose \uD83D\uDE0E');
});

// Endpoint de salud
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Iniciar la conexion con WhatsApp. Esta funcion se define en
// src/whatsapp.js y se encarga de manejar la sesion.
inicializarWhatsApp().catch((err) => {
  console.error('Error al iniciar la sesion de WhatsApp:', err);
});

// Arrancar el servidor HTTP
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
