const pool = require('../db');

// Obtener todos los cursos
exports.getAllCourses = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM course ORDER BY title');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
        res.status(500).json({ error: 'Error al obtener los cursos' });
    }
};

// Obtener un curso por ID
exports.getCourseById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM course WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener el curso:', error);
        res.status(500).json({ error: 'Error al obtener el curso' });
    }
};

// Crear un nuevo curso
exports.createCourse = async (req, res) => {
    const { title, description, duration, level } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'El título del curso es obligatorio' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO course (title, description, duration, level) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, duration, level]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear el curso:', error);
        res.status(500).json({ error: 'Error al crear el curso' });
    }
};

// Actualizar un curso existente
exports.updateCourse = async (req, res) => {
    const { title, description, duration, level } = req.body;
    const courseId = req.params.id;

    if (!title) {
        return res.status(400).json({ error: 'El título del curso es obligatorio' });
    }

    try {
        const checkResult = await pool.query('SELECT * FROM course WHERE id = $1', [courseId]);
        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }

        const updateResult = await pool.query(
            'UPDATE course SET title = $1, description = $2, duration = $3, level = $4 WHERE id = $5 RETURNING *',
            [title, description, duration, level, courseId]
        );
        res.json(updateResult.rows[0]);
    } catch (error) {
        console.error('Error al actualizar el curso:', error);
        res.status(500).json({ error: 'Error al actualizar el curso' });
    }
};

// Eliminar un curso
exports.deleteCourse = async (req, res) => {
    const courseId = req.params.id;

    try {
        const checkResult = await pool.query('SELECT * FROM course WHERE id = $1', [courseId]);
        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }

        await pool.query('DELETE FROM course WHERE id = $1', [courseId]);
        res.json({ message: 'Curso eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el curso:', error);
        res.status(500).json({ error: 'Error al eliminar el curso' });
    }
};