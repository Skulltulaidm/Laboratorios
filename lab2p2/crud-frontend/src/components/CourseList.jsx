import React, { useState, useEffect } from 'react';
import { getCourses, deleteCourse } from '../services/api';
import CourseItem from './CourseItem.jsx';
import CourseForm from './CourseForm.jsx';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const data = await getCourses();
            setCourses(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar los cursos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este curso?')) {
            try {
                await deleteCourse(id);
                setCourses(courses.filter(course => course.id !== id));
            } catch (err) {
                setError('Error al eliminar el curso');
            }
        }
    };

    const handleEdit = (id) => {
        setEditingId(id);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const handleFormSubmit = () => {
        fetchCourses();
        setEditingId(null);
    };

    if (loading) return <div>Cargando cursos...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="course-list">
            <h2>Catálogo de Cursos y Certificaciones</h2>

            {!editingId && (
                <div className="new-course">
                    <h3>Agregar Nuevo Curso</h3>
                    <CourseForm onSubmitSuccess={handleFormSubmit} />
                </div>
            )}

            <div className="courses">
                {courses.length === 0 ? (
                    <p>No hay cursos registrados.</p>
                ) : (
                    courses.map(course => (
                        <div key={course.id}>
                            {editingId === course.id ? (
                                <div className="edit-form">
                                    <h3>Editar Curso</h3>
                                    <CourseForm
                                        course={course}
                                        onSubmitSuccess={handleFormSubmit}
                                        onCancel={handleCancelEdit}
                                    />
                                </div>
                            ) : (
                                <CourseItem
                                    course={course}
                                    onDelete={() => handleDelete(course.id)}
                                    onEdit={() => handleEdit(course.id)}
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CourseList;