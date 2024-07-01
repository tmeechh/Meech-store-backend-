import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI } = process.env;

export const connectDB = async () => {
    if (!MONGODB_URI) {
        throw new Error('MONGO_URI is not defined');
    }

    await mongoose.connect(MONGODB_URI)
        .then(() => console.log("DB Connected"))
        .catch((err) => {
            console.error('Error connecting to the database', err);
            process.exit(1);
        });
};


export default connectDB;