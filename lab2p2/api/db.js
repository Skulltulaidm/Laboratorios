const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'tu_contraseña',
    database: process.env.DB_NAME || 'empleados_db',
    port: process.env.DB_PORT || 5432,
    max: 10,
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Conexión a PostgreSQL establecida con éxito');
        client.release();
    } catch (error) {
        console.error('Error al conectar a PostgreSQL:', error);
    }
}

testConnection();

module.exports = pool;