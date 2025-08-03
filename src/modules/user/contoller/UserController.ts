import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
import { User } from '../../../entity/User';
export class UserController {
    private userService: UserService
    constructor() {
        const userRepo = new UserRepository;
        this.userService = new UserService(userRepo);
    }

    register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const userDto = req.body

            // Call the service
            const user = await this.userService.registerUser(userDto);

            return res.status(201).json({
                message: "User registered successfully.",
                data: user
            });
        }
        catch (error: any) {
            return res.status(500).json({
                message: "Registration failed",
                error: error.message
            })
        }
    }


    getAllRegisteredUsers = async (req: Request, res: Response): Promise<Response> => {
        try {
            const users = await this.userService.getAllUser();
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