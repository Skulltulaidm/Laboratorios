import { useEffect, useState } from 'react';
import { Message } from './Message';
import './SimpleForm.css';

export const SimpleForm = () => {
    const [formState, setFormState] = useState({
        matricula: '',
        nombre: '',
        apellidos: '',
        edad: '',
        universidad: '',
        carrera: ''
    });

    const { matricula, nombre, apellidos, edad, universidad, carrera } = formState;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    useEffect(() => {
        // console.log('useEffect called!');
    }, []);

    useEffect(() => {
        // console.log('formState changed!');
    }, [formState]);

    useEffect(() => {
        // console.log('matricula changed!');
    }, [matricula]);

    return (
        <div className="contact-us">
            <h1>Formulario Simple</h1>
            <hr />

            <form>
                <input
                    type="text"
                    placeholder="Matrícula"
                    name="matricula"
                    value={matricula}
                    onChange={onInputChange}
                    required=""
                />

                <input
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={onInputChange}
                    required=""
                />

                <input
                    type="text"
                    placeholder="Apellidos"
                    name="apellidos"
                    value={apellidos}
                    onChange={onInputChange}
                    required=""
                />

                <input
                    type="number"
                    placeholder="Edad"
                    name="edad"
                    value={edad}
                    onChange={onInputChange}
                    required=""
                />

                <input
                    type="text"
                    placeholder="Universidad"
                    name="universidad"
                    value={universidad}
                    onChange={onInputChange}
                    required=""
                />

                <input
                    type="text"
                    placeholder="Carrera"
                    name="carrera"
                    value={carrera}
                    onChange={onInputChange}
                    required=""
                />

                <button
                    type="button"
                    onClick={() => console.log(formState)}
                >
                    ENVIAR
                </button>
            </form>

            <div className="form-results">
                <p>Matrícula: {matricula}</p>
                <p>Nombre: {nombre}</p>
                <p>Apellidos: {apellidos}</p>
                <p>Edad: {edad}</p>
                <p>Universidad: {universidad}</p>
                <p>Carrera: {carrera}</p>
            </div>

            {matricula === 'strider2' && <Message />}
        </div>
    );
};