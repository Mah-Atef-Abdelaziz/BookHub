import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const connectiontDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/bookhub'; // Default to local if env var is not set

        if (!uri) {
            throw new Error('MongoDB URI is undefined');
        }

        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

export default connectiontDB;
