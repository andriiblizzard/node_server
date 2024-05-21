import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectToDB = async () => {
    try {
        mongoose.set('bufferCommands', false); // Disable command buffering
        mongoose.set('bufferTimeoutMS', 30000); // Set buffer timeout to 30 seconds
        if (!process.env.MONGODB_URI) {
            console.log('You should set the mongodb uri in the .env file.');
            return;
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected!");
    } catch (err) {
        console.error('MongoDB connection error', err);
    }
};

const disconnectToDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("MongoDB Disconnected!");
    } catch (err) {
        console.error('MongoDB Not Disconnected!', err);
    }
};

export { connectToDB, disconnectToDB };