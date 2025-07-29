import dotenv from "dotenv";
import express, { Request, Response } from "express";
import appConfigs from "./configs/appConfigs";
import AppDataSource from "./data-source";

// Load environment variables from .env file
dotenv.config();
// Create an instance of Express
const app = express();

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Initialize the data source and start the server
AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");

    app.get("/", (req: Request, res: Response) => {
        res.send("Hello World!");
    });

    app.listen(appConfigs.PORT, () => {
        console.log(`Server is running on port ${appConfigs.PORT}`);
    })
}).catch((error) => {
    console.error("Error starting the server:", error);
});

