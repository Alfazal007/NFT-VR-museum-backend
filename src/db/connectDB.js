import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}`);
        console.log(`\n MongoDB connected !! DB Host : ${connectionInstance.connection.host}`);
    } catch (err) {
        console.log("MongoDB connection error ", err);
    }
};

export { connectDB };