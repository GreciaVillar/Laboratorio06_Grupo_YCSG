const express = require('express');
const app = express();

// Configurar el motor de plantillas Pug
app.set('view engine', 'pug');
app.set('views', './views');

// Ruta para servir archivos estáticos desde las carpetas 'public', 'js', 'css' y 'images'
app.use(express.static('public'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));

// Ruta para renderizar la plantilla Pug
app.get('/miplantilla-pug', (req, res) => {
  res.render('miplantilla', { mensaje: '¡Hola desde la plantilla Pug!', imagenperrito: '/images/pug.png'});
});

// Ruta para renderizar la plantilla EJS
app.get('/miplantilla-ejs', (req, res) => {
  res.render('miplantilla.ejs', { mensaje: '¡Hola desde la plantilla EJS!' , imagen: '/images/ejs.gif'});
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Aplicación web dinámica ejecutándose en el puerto 3000');
});
