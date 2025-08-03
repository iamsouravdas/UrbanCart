import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
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
}