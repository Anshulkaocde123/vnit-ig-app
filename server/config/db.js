const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI environment variable is not set');
        }
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.error('Make sure MONGODB_URI is set in environment variables');
        // Don't exit immediately, let the app start without DB for debugging
        console.warn('⚠️  App starting without MongoDB - some features may not work');
    }
};

module.exports = connectDB;

