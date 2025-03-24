import dotenv from 'dotenv';
import pkg from 'pg';
import express from 'express';
import client from '../src/db.js';

const { Client } = pkg;
const app = express();
const port = process.env.PORT;
dotenv.config();

console.log('holamundo');




// Controlador para obtener un alumno por id

export const getAlumnoById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT p.*, p.nombre_alumno,
            p.clave_grupo,
            p.fecha_inicio,
            p.fecha_fin,
            p.cali,
            c.nombre_curso,
            c.clave_curso,
            c.duracion_curso,
            c.ata_curso,
            m.nombre_materia,
            m.duracion_t,
            m.duracion_p
            FROM participantes p
            LEFT JOIN cursos c ON p.id_curso = c.id
            LEFT JOIN materias m ON c.id = m.id_curso
            WHERE p.id = $1
        `;
        
        const result = await client.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Alumno no encontrado' });
        }

        // Datos del alumno (única fila)
        const alumnoData = {
            id: result.rows[0].id,
            nombre_alumno: result.rows[0].nombre_alumno,
            clave_grupo: result.rows[0].clave_grupo,
            fecha_inicio: result.rows[0].fecha_inicio,
            fecha_fin: result.rows[0].fecha_fin,
            cali: result.rows[0].cali,
            nombre_curso: result.rows[0].nombre_curso,
            clave_curso: result.rows[0].clave_curso,
            duracion_curso: result.rows[0].duracion_curso,
            ata_curso: result.rows[0].ata_curso
        };

        // Lista de materias (pueden ser varias)
        const materias = result.rows.map(row => ({
            nombre_materia: row.nombre_materia,
            duracion_t: row.duracion_t,
            duracion_p: row.duracion_p
        }));

        // Enviar ambos conjuntos de datos
        res.json({
            alumno: alumnoData,
            materias: materias
        });

    } catch (error) {
        console.error('Error al obtener al alumno', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};



