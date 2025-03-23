import { Router } from 'express';
import { getAlumnoById } from '../controllers/alumnoController.js';

const router = Router();

// Definimos las rutas relacionadas con los alumnos
router.get('/certificados/:id', getAlumnoById);


export { router as alumnoRoutes };
