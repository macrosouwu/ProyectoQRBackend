import dotenv from 'dotenv';
import pkg from 'pg';
import express from 'express'

const { Client } = pkg;
const app = express();
const port = 3000;
dotenv.config();

// Nos conectamos a la base POSTGRE

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: "proyectoqrDB",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect()
.then(() => {
    console.log('Conectado a la base de datos');
    
}).catch((err) => {
    console.error('Error al conectar a la base de datos');
    
});

export default client;