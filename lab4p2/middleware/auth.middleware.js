import { verifyToken } from '../utils/jwt.utils.js';
import User from '../models/user.model.js';

/**
 * Middleware para verificar autenticación
 */
export const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No se proporcionó token de autenticación'
            });
        }

        // Obtener token
        const token = authHeader.split(' ')[1];

        // Verificar token
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Token inválido o expirado'
            });
        }

        const user = await User.findById(decoded.id).select('-password');
        if (!user || !user.active) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no encontrado o desactivado'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al autenticar usuario',
            error: error.message
        });
    }
};

/**
 * Middleware para verificar rol de administrador
 */
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado. Se requiere rol de administrador'
        });
    }
};