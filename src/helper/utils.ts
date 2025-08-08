import jwt from 'jsonwebtoken';
import appConfigs from '../configs/appConfigs';

export const helpers = {
    validations: {
        isValidEmail: (email: string): boolean => {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(email);
        },

        isStrongPassword: (password: string): boolean => {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
            return regex.test(password);
        }
    },
    appAccess: {
        generateJwtToken: (payload: object): string => {
            return jwt.sign(payload, appConfigs.authAndSecurity.JWT_SECRET_KEY, {
                expiresIn: '1m'
            });
        },
        generateRefreshToken: (payload: object): string => {
            return jwt.sign(payload, appConfigs.authAndSecurity.JWT_REFRESH_SECRET_KEY, {
                expiresIn: '1d'
            });
        },
        verifyJwtToken: (token: string): jwt.JwtPayload | string => {
            try {
                return jwt.verify(token, appConfigs.authAndSecurity.JWT_SECRET_KEY);
            } catch (error) {
                throw new Error("Invalid token");
            }
        },
        verifyRefreshToken: (token: string): jwt.JwtPayload | string => {
            try {
                return jwt.verify(token, appConfigs.authAndSecurity.JWT_REFRESH_SECRET_KEY);
            } catch (error) {
                throw new Error("Invalid refresh token");
            }
        }
    }

};