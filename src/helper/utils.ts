import { Response } from 'express';
import jwt from 'jsonwebtoken';
import appConfigs from '../configs/appConfigs';
import crypto from 'crypto';

/**
 * Contains utility functions for validations, token generation,
 * and response handling.
 * @namespace helpers
 * @property {Object} validations - Contains validation functions.
 * @property {Object} appAccess - Contains functions for token generation and verification.
 * @property {Object} globalResponse - Contains functions for standardizing API responses.
 */

export const helpers = {
    validations: {
        /**
         * Validates if the provided email is in a correct format.
         * @param {string} email - The email to validate.
         * @returns {boolean} True if the email is valid, false otherwise.
         */
        isValidEmail: (email: string): boolean => {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(email);
        },

        /**
         * Validates if the provided password meets strong password criteria.
         * @param {string} password - The password to validate.
         * @returns {boolean} True if the password is strong, false otherwise.
         */

        isStrongPassword: (password: string): boolean => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
            return regex.test(password);
        }
    },
    appAccess: {
        /**
         * Generates a JWT token with a payload and expiration time.
         * @param {Object} payload - The data to encode in the token.
         * @returns {string} The generated JWT token.
         */
        generateJwtToken: (payload: object): string => {
            return jwt.sign(payload, appConfigs.authAndSecurity.JWT_SECRET_KEY, {
                expiresIn: '1m'
            });
        },
        /**
         * Generates a refresh token with a payload and expiration time.
         * @param {Object} payload - The data to encode in the refresh token.
         * @returns {string} The generated refresh token.
         */
        generateRefreshToken: (payload: object): string => {
            return jwt.sign(payload, appConfigs.authAndSecurity.JWT_REFRESH_SECRET_KEY, {
                expiresIn: '1d'
            });
        },
        /**
         * Verifies a JWT token and returns the decoded payload.
         * @param {string} token - The JWT token to verify.
         * @returns {Object} The decoded payload if the token is valid.
         * @throws {Error} If the token is invalid or expired.
         */
        verifyJwtToken: (token: string): jwt.JwtPayload | string => {
            try {
                return jwt.verify(token, appConfigs.authAndSecurity.JWT_SECRET_KEY);
            } catch (error) {
                throw new Error("Invalid token");
            }
        },
        /**
         * Verifies a refresh token and returns the decoded payload.
         * @param {string} token - The refresh token to verify.
         * @returns {Object} The decoded payload if the token is valid.
         * @throws {Error} If the refresh token is invalid or expired.
         */
        verifyRefreshToken: (token: string): jwt.JwtPayload | string => {
            try {
                return jwt.verify(token, appConfigs.authAndSecurity.JWT_REFRESH_SECRET_KEY);
            } catch (error) {
                throw new Error("Invalid refresh token");
            }
        }
    },
    globalResponse: {
        /**
         * Standardizes the success response format for API endpoints.
         * @param {Response} res - The Express response object.
         * @param {number} statusCode - The HTTP status code.
         * @param {string} message - A message describing the response.
         * @param {any} [data] - Optional data to include in the response.
         * @returns {Response} The standardized JSON response.
         */
        successResponse: (res: Response, statusCode: number, message: string, data?: any) => {
            return res.status(statusCode).json({
                status: "success",
                message,
                data,
            });
        },
        /**
         * Standardizes the error response format for API endpoints.
         * @param {Response} res - The Express response object.
         * @param {number} statusCode - The HTTP status code.
         * @param {string} message - A message describing the error.
         * @returns {Response} The standardized JSON error response.
         */
        errorResponse: (res: any, statusCode: number, message: string) => {
            return res.status(statusCode).json({
                status: "error",
                message
            });
        }
    },
    otp: {
        /**
         * Generates a random OTP of specified length.
         * 
         * explaination: This function uses the crypto module to generate a 
         * random integer within the range of 0 to 10^length - 1,
         * then converts it to a string and pads it with leading zeros
         * to ensure it has the specified length.
         * * @remarks
         * This is useful for generating one-time passwords for user 
         * verification or authentication.
         *
         * @param {number} length - The length of the OTP to generate.
         * @returns {string} The generated OTP as a string.
         */
        genrateOtp: (length: number): string => {
            const max = 10 ** length;
            const n = crypto.randomInt(0, max);

            console.log("Generated OTP:", n);
            return n.toString().padStart(length, '0');
        },

        /**
         * Hashes an OTP using SHA-256 algorithm.
         * 
         * explaination: This function takes an OTP and a secret key,
         * hashes the OTP using the SHA-256 algorithm, and returns the
         * hashed value as a hexadecimal string.
         *
         * @param {string} otp - The OTP to hash.
         * @param {string} secret - The secret key used for hashing.
         * @returns {string} The hashed OTP as a hexadecimal string.
         */
        hashOtp: (otp: string, secret: string): string => {
            return crypto.createHmac('sha256', secret).update(otp).digest('hex');
        },

        /**
         * Compares an OTP with a hashed OTP using a timing-safe comparison.
         * 
         * explaination: This function compares the provided OTP with the
         * hashed OTP using a timing-safe comparison to prevent timing attacks.
         * It returns true if they match, false otherwise.
         *
         * @param {string} otp - The OTP to compare.
         * @param {string} hashedOtp - The hashed OTP to compare against.
         * @returns {boolean} True if the OTP matches the hashed OTP, false otherwise.
         */
        compareOtp: (otp: string, hashedOtp: string): boolean => {
            if (otp && hashedOtp) {
                if (Buffer.from(otp, 'utf8').length !== Buffer.from(hashedOtp, 'utf8').length) return false;
                return crypto.timingSafeEqual(
                    Buffer.from(otp, 'utf8'),
                    Buffer.from(hashedOtp, 'utf8')
                )
            }
        },
        /**
         * Calculates the expiration time for an OTP based on the current time and a specified duration.
         * 
         * explaination: This function takes an expiration duration in minutes,
         * calculates the current time, and returns a new Date object representing
         * the expiration time.
         *
         * @param {number} expiresIn - The expiration duration in minutes.
         * @returns {Date} The calculated expiration time as a Date object.
         */
        otpExpiration: (expiresIn: number): Date => {
            const currentTime = new Date();
            return new Date(currentTime.getTime() + expiresIn * 60000); // Convert minutes to milliseconds
        }

    }
};