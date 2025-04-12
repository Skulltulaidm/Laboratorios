import { Router } from 'express';
import {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
} from '../controllers/item.controller.js';
import { authenticateToken, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/api/items', getItems);
router.get('/api/items/:id', getItemById);

router.post('/api/items', authenticateToken, createItem);
router.put('/api/items/:id', authenticateToken, updateItem);
router.delete('/api/items/:id', authenticateToken, deleteItem);

router.delete('/api/admin/items/:id', authenticateToken, isAdmin, deleteItem);

export default router;