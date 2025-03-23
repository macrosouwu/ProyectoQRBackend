import express from 'express';
import { alumnoRoutes } from '../routes/alumnoRoutes.js';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());



// Definimos una ruta basica

app.use('/api', alumnoRoutes);


// Ahora si Iniciamos el servidor en el puerto definido


app.listen(port, () => {
    console.log( `Servidor corriendo en localhost:${port}` );
    
})

