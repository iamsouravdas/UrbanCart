import { NextFunction, Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
import { User } from '../../../entity/User';
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
        console.log("this is login controller")
        try {
            const loginInfo = request.body;
            console.log("Login Info:", loginInfo);
            const user = await this.userService.login(loginInfo);
            return response.status(200).json({
                message: "User logged in successfully.",
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