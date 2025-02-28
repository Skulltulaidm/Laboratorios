import { useEffect, useState } from 'react'

export const useFetch = (url) => {
    const [state, setState] = useState({ data: null, isLoading: true, hasError: null });

    const getFetch = async (url) => {
        setState({ ...state, isLoading: true });

        try {
            // Hacer la solicitud fetch
            const response = await fetch(url);

            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }

            // Si la respuesta es exitosa, leer los datos como JSON
            const data = await response.json();

            // Actualizar el estado con los datos obtenidos
            setState({ data, isLoading: false, hasError: null });
        } catch (error) {
            // Manejar cualquier error, como problemas de red o error en la API
            setState({ data: null, isLoading: false, hasError: error.message });
        }
    }

    useEffect(() => {
        if (url) {
            getFetch(url);
        }
    }, [url]);

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError
    }
}
