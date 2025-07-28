import * as dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3030;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
