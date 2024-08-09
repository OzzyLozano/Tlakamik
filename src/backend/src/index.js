const express = require('express')
const mongoose = require('mongoose')
const Transport = require('./schema')

const app = express()
const port = 3000

// URL de conexión a MongoDB Atlas
const mongoUrl = 'mongodb+srv://prueba:tlakamik1234@prueba.aicce.mongodb.net/?retryWrites=true&w=majority&appName=prueba'

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Database connected')
  })
  .catch((e) => {
    console.log(e)
  })

// Ruta para obtener datos de la colección 'matamoros'
app.get('/Matamoros', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const collection = db.collection('Matamoros');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error('Error retrieving data:', err);
    res.status(500).send('Error retrieving data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
