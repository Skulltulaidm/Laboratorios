import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/api/auth/register', register);
router.post('/api/auth/login', login);

router.get('/api/auth/profile', authenticateToken, getProfile);

export default router;