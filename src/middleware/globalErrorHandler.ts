import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";

export const globalErrorHandler = (
    err: ApiError | Error,
    request: Request,
    response: Response,
    next: NextFunction) => {

    const statusCode = err instanceof ApiError ? err.statusCode : 500;
    const message = err.message ?? "Something went wrong"

    return response.status(statusCode).json({
        success: false,
        message,
        ...{
            stack: err.stack
        }
    })
}