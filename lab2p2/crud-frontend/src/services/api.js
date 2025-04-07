import axios from 'axios';

const API_URL = 'http://localhost:3000/api/courses';

export const getCourses = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
        throw error;
    }
};

export const getCourse = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el curso:', error);
        throw error;
    }
};

export const createCourse = async (course) => {
    try {
        const response = await axios.post(API_URL, course);
        return response.data;
    } catch (error) {
        console.error('Error al crear el curso:', error);
        throw error;
    }
};

export const updateCourse = async (id, course) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, course);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el curso:', error);
        throw error;
    }
};

export const deleteCourse = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el curso:', error);
        throw error;
    }
};