import { Request, Response, NextFunction } from "express";
import { helpers } from "../helper/utils";

export function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access token is missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = helpers.appAccess.verifyJwtToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid access token" });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ message: "Something went Wrong" });
    }

}