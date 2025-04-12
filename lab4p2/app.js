import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import itemRoutes from './routes/item.routes.js';

// Inicializar la aplicación Express
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas API
app.use(authRoutes);
app.use(itemRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a la API REST',
        author: 'Luis Alberto',
        version: '1.0.0',
        endpoints: {
            auth: [
                { method: 'POST', path: '/api/auth/register', description: 'Registrar nuevo usuario' },
                { method: 'POST', path: '/api/auth/login', description: 'Iniciar sesión' },
                { method: 'GET', path: '/api/auth/profile', description: 'Obtener perfil (protegido)' }
            ],
            items: [
                { method: 'GET', path: '/api/items', description: 'Obtener todos los items' },
                { method: 'GET', path: '/api/items/:id', description: 'Obtener item por ID' },
                { method: 'POST', path: '/api/items', description: 'Crear nuevo item (protegido)' },
                { method: 'PUT', path: '/api/items/:id', description: 'Actualizar item (protegido)' },
                { method: 'DELETE', path: '/api/items/:id', description: 'Eliminar item (protegido)' }
            ]
        }
    });
});

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado'
    });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

export default app;