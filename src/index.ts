import dotenv from "dotenv";
import express from "express";
import appConfigs from "./configs/appConfigs";
import AppDataSource from "./data-source";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import appRoute from "./routes/appRoute";

// Load environment variables from .env file
dotenv.config();
// Create an instance of Express
const app = express();
// Middleware configuration 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Configuration
app.use("/api", appRoute);

// Global Error Handling Configuration
app.use(globalErrorHandler);

// TODO: Cors Handling Configuration

// Initialize the data source and start the server
AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
    app.listen(appConfigs.database.PORT, () => {
        console.log(`Server is running on port ${appConfigs.database.PORT}`);
    })
}).catch((error) => {
    console.error("Error starting the server:", error);
});

