import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 3000,
    mongodbUri: process.env.MONGODB_URI || 'mongodb+srv://skulltulamn35:Y6RV9BlQIjL5LIYW@cluster0.s0ulyqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    jwtSecret: process.env.JWT_SECRET || '9d8e3459eeead8cb8ad76283733cf94392e18cd30baa9085a56070a66890e387',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d'
};