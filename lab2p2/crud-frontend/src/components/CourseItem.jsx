import React from 'react';

const CourseItem = ({ course, onDelete, onEdit }) => {
    return (
        <div className="course-item">
            <div className="course-info">
                <h3>{course.title}</h3>
                <p className="description">{course.description || 'Sin descripción'}</p>
                <div className="course-details">
                    <span><strong>Duración:</strong> {course.duration || 'No especificada'} horas</span>
                    <span><strong>Nivel:</strong> {course.level || 'No especificado'}</span>
                </div>
            </div>
            <div className="course-actions">
                <button onClick={onEdit} className="edit-btn">Editar</button>
                <button onClick={onDelete} className="delete-btn">Eliminar</button>
            </div>
        </div>
    );
};

export default CourseItem;