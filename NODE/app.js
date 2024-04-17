const express = require('express');
const path = require('path');
const app = express();
app.set('view engine', 'pug');
app.set('view engine', 'ejs'); 

const images = [
    { src: 'img/postre1.jpg', name: 'Tres Leches' },
    { src: 'img/postre2.jpg', name: 'Chocolate Cake' },
    { src: 'img/postre3.jpg', name: 'Pastel de Naranja' },
    { src: 'img/postre4.jpg', name: 'Torta Helada' }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const shuffledImages = shuffle(images);
    res.render('index', { images: shuffledImages });
});


app.get('/pug', (req, res) => {
    res.render('index', { title: 'Usuario Pug' });
  });

app.get('/nosotros', (req, res) => {
    res.render('nosotros', { title: 'Sobre Nosotros' });
});

app.get('/gallery', (req, res) => {
    res.render('gallery', { title: 'Nuestros Servicios' });
});

app.get('/contacto', (req, res) => {
    res.render('contacto', { title: 'Contacto' });
});

app.get('/confirmacion', (req, res) => {
    res.render('confirmacion', { title: 'Confirmación' });
});

app.listen(3000, () => {
    console.log('Servidor en funcionamiento en http://localhost:3000');
});
