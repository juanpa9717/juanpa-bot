# Bot de WhatsApp para ventas

Este repositorio contiene un ejemplo de proyecto para automatizar conversaciones de WhatsApp usando Node.js, la libreria Baileys y la API de OpenAI. El objetivo es responder de forma automatica a clientes en WhatsApp simulando el estilo de Juan Pablo.

## Estructura

- `package.json` contiene las dependencias y los scripts para iniciar la aplicacion.
- `.env.example` es un ejemplo de archivo de variables de entorno. Copielo a `.env` y configure sus claves.
- `src/index.js` arranca un servidor Express y prepara los servicios de WhatsApp y de inteligencia artificial.
- `src/whatsapp.js` maneja la conexion a WhatsApp Web a traves de Baileys.
- `src/ai.js` se encarga de enviar mensajes a OpenAI y devolver las respuestas.
- `src/config.js` define la configuracion base como las horas de atencion, palabras clave y el prompt de Juan Pablo.
- `src/rules.js` contiene la logica para clasificar los mensajes de los clientes y decidir si se responde.

## Instalacion

1. Instale Node.js (v18 o superior).
2. Clone este repositorio o descargue el zip y descomprimalo.
3. Ejecute `npm install` para instalar las dependencias.
4. Copie el archivo `.env.example` a `.env` y agregue su clave de OpenAI (`OPENAI_API_KEY`).
5. Ejecute `npm start` para iniciar el servidor.
6. En la consola se mostrara un codigo QR. Escaneelo con WhatsApp (Dispositivos vinculados) para conectar el bot a su numero.

## Uso

- El bot escuchara los mensajes entrantes y, segun las reglas definidas, contestara automaticamente con texto o audio utilizando el estilo de Juan Pablo.
- Si un mensaje no coincide con ningun flujo, se puede responder manualmente en el mismo chat.
- Puede modificar las reglas en `src/rules.js` para adaptarlas a su negocio.

## Advertencia

Este proyecto se proporciona como ejemplo educativo. El uso de automatizaciones sobre WhatsApp Web debe realizarse con responsabilidad para no violar los terminos de servicio de WhatsApp. Use este codigo bajo su propio riesgo.
Use este codigo bajo su propio riesgo.
