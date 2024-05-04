const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Maneja la solicitud POST para enviar el correo electrónico
app.post('/enviar-correo', async (req, res) => {
  const { motivo, correo, mensaje } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      // Configura el transporte de correo electrónico (por ejemplo, utilizando un servidor SMTP)
      service: 'gmail',
      auth: {
        user: 'ozzy.tlakamik@gmail.com',
        pass: 'tlakamik1234'
      }
    });

    // Configura el mensaje de correo electrónico
    const mailOptions = {
      from: correo,
      to: 'ozzy.tlakamik@gmail.com',
      subject: motivo,
      text: `
        Mensaje: ${mensaje}
      `
    };

    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);

    // Envía una respuesta de éxito
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
