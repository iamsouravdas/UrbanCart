import dotenv from 'dotenv';

dotenv.config();

const appConfigs = {
    database: {
        PORT: process.env.DEV_PORT || 3000,
        ENV: process.env.ENV_TYPE || '',
        DB_HOST: process.env.DB_HOST || "localhost",
        DB_PORT: parseInt(process.env.DB_PORT || "5432", 10),
        DB_USERNAME: process.env.DB_USERNAME || "postgres",
        DB_PASSWORD: process.env.DB_PASSWORD || "password",
        DB_NAME: process.env.DB_NAME || "ecommerce",
    },
    accessControl: {
        ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "*", // Use "*" for all origins or specify a comma-separated list of allowed origins
        ALLOWED_METHODS: process.env.ALLOWED_METHODS || "GET,POST,PUT,DELETE,OPTIONS",
        ALLOWED_HEADERS: process.env.ALLOWED_HEADERS || "Content-Type,Authorization",
        EXPOSED_HEADERS: process.env.EXPOSED_HEADERS || "Content-Length,Authorization",
    },
    authAndSecurity: {
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
        JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
        JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || "5m",
        JWT_REFRESH_EXPIRATION_TIME: process.env.JWT_REFRESH_EXPIRATION_TIME || "1d",
    }
}

export default appConfigs; 