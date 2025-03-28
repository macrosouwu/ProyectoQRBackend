import express from 'express';
import { alumnoRoutes } from '../routes/alumnoRoutes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT;
console.log(port);

app.use(express.json());
app.use(cors());
app.use(cors({
    origin: ['http://localhost:5500', 'https://macrosouwu.github.io/ProyectoQR'],  // Aquí pones el origen de tu frontend (puede ser otro puerto o dominio)
    methods: ['GET', 'POST'],        // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type'] // Encabezados permitidos
  }));


// Definimos una ruta basica
// Ruta base
app.get('/', (req, res) => {
  res.json({
    status: "API funcionando correctamente",
    code: 200
  });
});

// Ruta para verificar que /api responde
app.get('/api', (req, res) => {
  res.json({
    status: "Apuntando a /api correctamente",
    code: 200
  });
});

// Aquí deben ir las rutas de alumnos
app.use('/api', alumnoRoutes);



// Ahora si Iniciamos el servidor en el puerto definido


app.listen(port, () => {
    console.log( `Servidor corriendo en localhost:${port}` );
    
})

