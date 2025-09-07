import { NextFunction, Request, Response } from 'express';
import { helpers } from '../../../helper/utils';
import UserRepository from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
import { errorUtils } from '../../../helper/errorUtils';


export class UserController {
    // * The UserController class handles user-related requests and responses.
    // * It uses the UserService to perform operations like registration, login, and fetching users
    // * It provides methods to handle HTTP requests and send appropriate responses.
    // * The controller is initialized with an instance of UserService, which interacts with the User
    private userService: UserService

    /**
     * Initializes the UserController with a UserService instance.
     * This allows the controller to handle user-related operations
     * such as registration, login, and fetching users.
     */
    constructor() {
        const userRepo = new UserRepository;
        this.userService = new UserService(userRepo);
    }

    /**
     * Handles user registration by validating input, hashing the password,
     * and saving the user to the database.
     *
     * @param req - The request object containing user registration data.
     * @param res - The response object to send the result.
     * @param next - The next middleware function in the stack.
     * @returns A JSON response with user data if successful, or an error if not.
     */
    register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const userDto = req.body;
            const user = await this.userService.registerUser(userDto);
            if (!user) {
                return helpers.globalResponse.errorResponse(res, 400, "User registration failed");
            }
            return helpers.globalResponse.successResponse(res, 201, "User registered successfully", user);
        } catch (err) {
            next(err);
        }
    };

    /**
     * Handles user login by validating credentials and generating tokens.
     *
     * @param request - The request object containing user credentials.
     * @param response - The response object to send the result.
     * @param next - The next middleware function in the stack.
     * @returns A JSON response with user data and tokens if successful, or an error if not.
     */
    login = async (request: Request, response: Response, next: NextFunction): Promise<Response> => {

        try {
            const loginInfo = request.body;
            const user = await this.userService.login(loginInfo);

            let accessToken: string;
            let refreshToken: string;

            if (user) {
                const accessPayload = {
                    id: user.id,
                    email: user.email,
                    role: user.roleName
                };
                accessToken = helpers.appAccess.generateJwtToken(accessPayload);
                if (!accessToken) {
                    throw errorUtils.internalServerError("Failed to generate access token");
                }
                refreshToken = helpers.appAccess.generateRefreshToken(accessPayload);
                if (!refreshToken) {
                    throw errorUtils.internalServerError("Failed to generate refresh token");
                }
                //saverefreesh token in the Http Only Cookie
                response.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    // secure: process.env.ENV_TYPE === "development",
                    sameSite: "strict",
                    maxAge: 1 * 24 * 60 * 60 * 1000
                });
            }
            return helpers.globalResponse.successResponse(response, 200, "User logged in successfully", {
                user, tokens: {
                    accessToken,
                    refreshToken
                }
            }
            );
        }
        catch (err) {
            next(err);
        }
    }

    /**
     * Retrieves all registered users.
     *
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next middleware function.
     * @returns A JSON response containing all users or an error message.
     */
    getAllRegisteredUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const users = await this.userService.getUsers();
            return helpers.globalResponse.successResponse(res, 200, "All registered users fetched successfully", users);
        }
        catch (error: any) {
            next(error);
        }
    }
}