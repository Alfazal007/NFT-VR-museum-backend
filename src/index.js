import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
    path: ".env",
});


const startServer = () => {
    connectDB()
        .then(() => {
            app.listen(process.env.PORT || 8000, () => {
                console.log(`Server is running on port: ${process.env.PORT || 8000}`);
            });
        })
        .catch((err) => {
            console.log("MongoDB connection error. Please make sure MongoDB is up and running. " + err);
        });
};

export { startServer };