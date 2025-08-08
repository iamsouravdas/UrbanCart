import { NextFunction, Request, Response } from 'express';
import { helpers } from '../../../helper/utils';
import UserRepository from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
import { ref } from 'process';
export class UserController {
    private userService: UserService
    constructor() {
        const userRepo = new UserRepository;
        this.userService = new UserService(userRepo);
    }

    register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const userDto = req.body;
            const user = await this.userService.registerUser(userDto);

            return res.status(201).json({
                message: "User registered successfully.",
                data: user
            });
        } catch (err) {
            next(err);
        }
    };


    login = async (request: Request, response: Response, next: NextFunction): Promise<Response> => {

        try {
            const loginInfo = request.body;
            const user = await this.userService.login(loginInfo);

            let accessToken: string | undefined;
            let refreshToken: string | undefined;

            if (user) {
                const accessPayload = {
                    id: user.id,
                    email: user.email,
                    role: user.roleName
                };
                accessToken = helpers.appAccess.generateJwtToken(accessPayload);
                refreshToken = helpers.appAccess.generateRefreshToken(accessPayload);

                //saverefreesh token in the Http Only Cookie
                response.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    // secure: process.env.ENV_TYPE === "development",
                    sameSite: "strict",
                    maxAge: 1 * 24 * 60 * 60 * 1000
                });
            }
            return response.status(200).json({
                message: "User logged in successfully.",
                accessToken: accessToken,
                refreshToken: refreshToken,
                data: user
            });
        }
        catch (err) {
            next(err);
        }
    }


    getAllRegisteredUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const users = await this.userService.getUsers();
            return res.status(200).json({
                message: "Retrived all users successfully",
                data: users
            });
        }
        catch (error: any) {
            return res.status(500).json({
                message: "Could not get all user",
                error: error.message
            })
        }
    }
}