import dotenv from "dotenv";
import express from "express";
import appConfigs from "./configs/appConfigs";
import AppDataSource from "./data-source";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import appRoute from "./routes/appRoute";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();
// Create an instance of Express
const app = express();
// Middleware configuration 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration

app.use(cors({
    origin: appConfigs.accessControl.ALLOWED_ORIGINS,
    methods: appConfigs.accessControl.ALLOWED_METHODS,
    allowedHeaders: appConfigs.accessControl.ALLOWED_HEADERS,
    exposedHeaders: appConfigs.accessControl.EXPOSED_HEADERS
}));


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

