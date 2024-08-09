// src/backend/src/schema.js
const mongoose = require('mongoose');

// Definir el esquema de coordenadas
const CoordinateSchema = new mongoose.Schema({
  latitude: { type: Number },
  longitude: { type: Number }
});

// Definir el esquema de información del transporte
const InfoSchema = new mongoose.Schema({
  nombre: { type: String },
  color: { type: String },
  horario: { type: String },
  bidireccional: { type: Boolean }
});

// Definir el esquema principal
const TransportSchema = new mongoose.Schema({
  info: { type: InfoSchema },
  ruta: [CoordinateSchema]
});

// Crear y exportar el modelo
const Transport = mongoose.model('Transport', TransportSchema);

module.exports = Transport;
