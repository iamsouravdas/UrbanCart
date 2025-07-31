import express, { Request, Response } from "express";
import appConfigs from "./configs/appConfigs";
import AppDataSource from "./data-source";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Configuration



// Initialize the data source and start the server
AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");

    app.get("/", (req: Request, res: Response) => {
        res.send("Hello World!");
    });


    app.get("/home", (request: Request, response: Response) => {
        response.send("Welcome to the E-commerce Backend!");
    });

    app.listen(appConfigs.PORT, () => {
        console.log(`Server is running on port ${appConfigs.PORT}`);
    })
}).catch((error) => {
    console.error("Error starting the server:", error);
});

