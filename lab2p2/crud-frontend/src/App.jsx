import React from 'react';
import CourseList from './components/CourseList.jsx';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Sistema de Gestión de Cursos y Certificaciones</h1>
                <p>Plataforma de administración para el desarrollo profesional</p>
            </header>
            <main>
                <CourseList />
            </main>
            <footer>
                <p>Sistema de Gestión de Capital Humano © 2025</p>
            </footer>
        </div>
    );
}

export default App;