import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.utils.js';

/**
 * Registrar un nuevo usuario
 * @route POST /api/auth/register
 */
export const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Verificar
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'El nombre de usuario o email ya está en uso'
            });
        }

        // create user
        const user = new User({
            username,
            password,
            email
        });

        // saver user
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al registrar usuario',
            error: error.message
        });
    }
};

/**
 * Iniciar sesión de usuario
 * @route POST /api/auth/login
 */
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // existe o nel?
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // accoubt active?
        if (!user.active) {
            return res.status(401).json({
                success: false,
                message: 'La cuenta ha sido desactivada'
            });
        }

        // password match?
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // token
        const token = generateToken({
            id: user._id,
            username: user.username,
            role: user.role
        });

        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                },
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al iniciar sesión',
            error: error.message
        });
    }
};

/**
 * Obtener perfil del usuario actual
 * @route GET /api/auth/profile
 */
export const getProfile = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: req.user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener perfil',
            error: error.message
        });
    }
};