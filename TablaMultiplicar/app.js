const express = require('express');
const app = express();

app.use(express.static('public'));

// Configurar el motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

// Ruta para renderizar la plantilla Pug
app.get('/pug', (req, res) => {
  res.render('index', { nombre: 'Usuario Pug' });
});

// Configurar EJS como motor de plantillas para una ruta específica
app.engine('ejs', require('ejs').renderFile);

// Ruta para renderizar la plantilla EJS
app.get('/ejs', (req, res) => {
  res.render('index.ejs', { nombre: 'Usuario EJS' });
});

app.get('/perfil/:id', (req, res) => {
    const userId = req.params.id;
    // Aquí puedes buscar los datos del usuario en una base de datos, por ejemplo
    const user = { id: userId, nombre: 'Usuario ' + userId };
    res.render('perfil', { user: user });
  });  

// Ruta para renderizar la plantilla Pug
app.get('/miplantilla-pug', (req, res) => {
    res.render('miplantilla', { mensaje: '¡Hola desde la plantilla Pug!' });
  });
  
  // Ruta para renderizar la plantilla EJS
  app.get('/miplantilla-ejs', (req, res) => {
    res.render('miplantilla.ejs', { mensaje: '¡Hola desde la plantilla EJS!' });
  });

// Ruta para mostrar la tabla de multiplicar
app.get('/multiplicar-pug/:numero', (req, res) => {
    const numero = parseInt(req.params.numero);
    const multiplicacion = [];
    for (let i = 0; i <= 12; i++) {
      multiplicacion.push({
        multiplicando: i,
        resultado: i * numero
      });
    }
    res.render('multiplicar', { numero, multiplicacion });
  });
  app.get('/multiplicar-ejs/:numero', (req, res) => {
    const numero = parseInt(req.params.numero);
    const multiplicacion = [];
    for (let i = 0; i <= 12; i++) {
      multiplicacion.push({
        multiplicando: i,
        resultado: i * numero
      });
    }
    res.render('multiplicar.ejs', { numero, multiplicacion });
  });
  
// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Aplicación web dinámica ejecutándose en el puerto 3000');
});
