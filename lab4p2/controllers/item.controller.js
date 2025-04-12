import Item from '../models/item.model.js';

/**
 * Obtener todos los items
 * @route GET /api/items
 */
export const getItems = async (req, res) => {
    try {
        const items = await Item.find()
            .populate('createdBy', 'username')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: items.length,
            data: items
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener items',
            error: error.message
        });
    }
};

/**
 * Obtener un item por ID
 * @route GET /api/items/:id
 */
export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
            .populate('createdBy', 'username');

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: item
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el item',
            error: error.message
        });
    }
};

/**
 * Crear un nuevo item
 * @route POST /api/items
 */
export const createItem = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        const item = new Item({
            name,
            description,
            price,
            category,
            createdBy: req.user._id
        });

        await item.save();

        res.status(201).json({
            success: true,
            message: 'Item creado exitosamente',
            data: item
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el item',
            error: error.message
        });
    }
};

/**
 * Actualizar un item
 * @route PUT /api/items/:id
 */
export const updateItem = async (req, res) => {
    try {
        // find item
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item no encontrado'
            });
        }

        if (item.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para actualizar este item'
            });
        }

        // Actualizar item
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('createdBy', 'username');

        res.status(200).json({
            success: true,
            message: 'Item actualizado exitosamente',
            data: updatedItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el item',
            error: error.message
        });
    }
};

/**
 * Eliminar un item
 * @route DELETE /api/items/:id
 */
export const deleteItem = async (req, res) => {
    try {
        // Encontrar item
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item no encontrado'
            });
        }

        if (item.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para eliminar este item'
            });
        }

        // Eliminar item
        await Item.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Item eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el item',
            error: error.message
        });
    }
};