import React, { useState, useEffect } from 'react';
import { createCourse, updateCourse } from '../services/api';

const CourseForm = ({ course, onSubmitSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        level: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (course) {
            setFormData({
                title: course.title || '',
                description: course.description || '',
                duration: course.duration || '',
                level: course.level || ''
            });
        }
    }, [course]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            setError('El título del curso es obligatorio');
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            if (course) {
                await updateCourse(course.id, formData);
            } else {
                await createCourse(formData);
            }
            setFormData({ title: '', description: '', duration: '', level: '' });
            if (onSubmitSuccess) onSubmitSuccess();
        } catch (err) {
            setError('Error al guardar el curso');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="course-form">
            {error && <div className="error">{error}</div>}

            <div className="form-group">
                <label htmlFor="title">Título*:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    disabled={submitting}
                    rows="3"
                />
            </div>

            <div className="form-group">
                <label htmlFor="duration">Duración (horas):</label>
                <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    disabled={submitting}
                    min="1"
                />
            </div>

            <div className="form-group">
                <label htmlFor="level">Nivel:</label>
                <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    disabled={submitting}
                >
                    <option value="">Seleccionar nivel</option>
                    <option value="Básico">Básico</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                </select>
            </div>

            <div className="form-actions">
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Guardando...' : course ? 'Actualizar' : 'Crear'}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} disabled={submitting}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default CourseForm;