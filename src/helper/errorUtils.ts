import { ApiError } from "../errors/ApiError";

export const errorUtils = {
    /**
     * Generates a standardized error response for various HTTP status codes.
     * @param {string} message - The error message to include in the response.
     * @returns {Object} An object containing the status code and message.
     */
    badRequest: (message: string) => {
        new ApiError(400, message || "Bad Request");
    },
    unauthorized: (message: string) => {
        new ApiError(401, message || "Unauthorized");
    },
    notFound: (message: string) => {
        new ApiError(404, message || "Not Found");
    },
    internalServerError: (message: string) => {
        new ApiError(500, message || "Internal Server Error");
    },
    conflict: (message: string) => {
        new ApiError(409, message || "Conflict");
    },
    forbidden: (message: string) => {
        new ApiError(403, message || "Forbidden");
    },
    unprocessableEntity: (message: string) => {
        new ApiError(422, message || "Unprocessable Entity");
    },
    serviceUnavailable: (message: string) => {
        new ApiError(503, message || "Service Unavailable");
    },
    gatewayTimeout: (message: string) => {
        new ApiError(504, message || "Gateway Timeout");
    },
    notImplemented: (message: string) => {
        new ApiError(501, message || "Not Implemented");
    }

}