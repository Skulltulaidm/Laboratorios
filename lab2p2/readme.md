# Base de Datos de Cursos


## Tabla: `course`

```sql
CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER,
    level VARCHAR(50)
);

INSERT INTO course (title, description, duration, level) VALUES
('Introducción a React', 'Curso básico para aprender los fundamentos de React y creación de componentes', 20, 'Básico'),
('Desarrollo Backend con Node.js', 'Aprende a crear APIs RESTful con Node.js, Express y PostgreSQL', 30, 'Intermedio'),
('Certificación en Gestión de Proyectos Ágiles', 'Preparación para la certificación oficial de Scrum Master', 40, 'Avanzado'),
('Fundamentos de SQL', 'Aprende a diseñar y consultar bases de datos relacionales', 15, 'Básico');
