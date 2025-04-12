import jwt from 'jsonwebtoken';
import config from '../config/config.js';

/**
 * Genera un token JWT
 * @param {Object} payload - Datos a incluir en el token
 * @returns {String} Token JWT
 */
export const generateToken = (payload) => {
    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn
    });
};

/**
 * Verifica un token JWT
 * @param {String} token - Token a verificar
 * @returns {Object|null} Payload decodificado o null si es inválido
 */
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (error) {
        return null;
    }
};