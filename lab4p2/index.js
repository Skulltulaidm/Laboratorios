import app from './app.js';
import mongoose from 'mongoose';
import config from './config/config.js';

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(config.mongodbUri, mongooseOptions)
    .then(() => {
        console.log('Conexión a MongoDB establecida correctamente');

        // Iniciar el servidor
        app.listen(config.port, () => {
            console.log(`Servidor corriendo en http://localhost:${config.port}`);
        });
    })
    .catch(error => {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1);
    });

mongoose.connection.on('error', error => {
    console.error('Error de MongoDB:', error.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB desconectado');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('onexión a MongoDB cerrada');
    process.exit(0);
});