
const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'pug'); // Puedes elegir solo uno de los motores de plantillas, aquí solo se usará 'pug'
app.set('view engine', 'ejs'); 

const uri = 'mongodb://localhost:27017/bd_pasteleria';

async function connectToDatabase() {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Conectado a la base de datos');

        const db = client.db('bd_pasteleria');  // Obtenemos una referencia a la base de datos

        const imagesCollection = db.collection('imagenes'); // Obtén una referencia a la colección 'imagenes'

        // Obtener imágenes de la colección y pasarlas al enrutador
        app.use(async (req, res, next) => {
            try {
                const images = await imagesCollection.find({}).toArray();
                req.images = images;
                next();
            } catch (error) {
                console.error('Error al obtener imágenes de la base de datos:', error);
                next(error);
            }
        });

        // Middleware para servir archivos estáticos
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(express.urlencoded({ extended: true }));

        // Rutas
        app.get('/', async (req, res) => {
            try {
                const shuffledImages = shuffle(req.images); // Obtén las imágenes desde req.images
                const testimoniosCollection = db.collection('testimonios');
                const testimonios = await testimoniosCollection.find({}).toArray();
                
                console.log('Testimonios obtenidos:', testimonios);
        
                res.render('index', { images: shuffledImages, testimonios: testimonios }); // Pasa las imágenes como parte del objeto en el método render
            } catch (error) {
                console.error('Error al procesar la solicitud:', error);
                res.status(500).send('Ocurrió un error al procesar la solicitud.');
            }
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

        app.post('/confirmacion', async (req, res) => {
            try {
                const { correo, nombre, mensaje } = req.body;
                console.log('Datos recibidos del formulario:');
                console.log('Correo:', correo);
                console.log('Nombre:', nombre);
                console.log('Mensaje:', mensaje);

                if (!correo || !nombre || !mensaje) {
                    return res.status(400).send('Por favor complete todos los campos del formulario.');
                }
        
                const testimoniosCollection = db.collection('testimonios');
        
                await testimoniosCollection.insertOne({ correo, nombre, mensaje });

                app.use((err, req, res, next) => {
                    console.error(err.stack);
                    res.status(500).send('Algo salió mal!');
                });
        
                res.render('confirmacion', { title: 'Confirmación' });
        
            } catch (error) {
                console.error('Error al guardar el testimonio en la base de datos:', error);
                res.status(500).send('Ocurrió un error al guardar el testimonio en la base de datos.');
            }
        });


        app.listen(3000, () => {
            console.log('Servidor en funcionamiento en http://localhost:3000');
        });

        // Asegúrate de cerrar la conexión a la base de datos cuando el servidor se detenga
        process.on('SIGINT', () => {
            client.close();
            console.log('Conexión cerrada a la base de datos');
            process.exit();
        });

    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

// Función para mezclar el array de imágenes
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Llamar a la función para conectar a la base de datos
connectToDatabase();
