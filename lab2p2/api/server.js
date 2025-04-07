const express = require('express');
const cors = require('cors');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/courses', courseRoutes);

app.get('/', (req, res) => {
    res.send('API de Gestión de Cursos funcionando correctamente');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});