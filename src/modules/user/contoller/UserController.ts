import { NextFunction, Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
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