import bcrypt from 'bcrypt';
import { LoginDto } from '../../../dto/LoginDto';
import { createUserDto, UserDto } from '../../../dto/UserDto';
import { Role } from '../../../entity/Role';
import { User } from '../../../entity/User';
import { ApiError } from '../../../errors/ApiError';
import { errorUtils } from '../../../helper/errorUtils';
import { helpers } from '../../../helper/utils';
import { IUserRepository } from "../repositories/IUserRepository";

export class UserService {
    // * The UserService class provides methods for user registration, login, and retrieval of all users.
    // * It interacts with the IUserRepository to perform database operations.
    private userRepository: IUserRepository;
    /**
     * Initializes the UserService with a user repository.
     * @param _userRepository - An instance of IUserRepository to interact with user data.
     */
    constructor(_userRepository: IUserRepository) {
        this.userRepository = _userRepository;
    }

    /**
    * =========================
    *     USER REGISTRATION
    * =========================
    *
    * Registers a new user by validating the input data,
    * hashing the password, and saving the user to the database.
    *
    * Checks for a strong password and valid email format,
    * and ensures that the email is not already registered.
    *
    * @param userDto - The DTO containing user registration details.
    * @throws {ApiError} If the password is not strong, the email format is invalid,
    *                    or a user with the same email already exists.
    * @returns {Promise<User | null>} The created user object if successful,
    *                                 or null if the user could not be created.
    */

    async registerUser(userDto: createUserDto): Promise<User | null> {
        const { email, password, name, phone, roleid } = userDto;

        if (!helpers.validations.isStrongPassword(password)) {
            throw errorUtils.badRequest("Password must be at least 8 characters long, contain uppercase and lowercase letters, numbers, and special characters.");
        }

        if (!helpers.validations.isValidEmail(email)) {
            throw errorUtils.badRequest("Invalid email format.");
        }


        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw errorUtils.conflict("User with this email already exists.");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            name,
            email,
            password: hashedPassword,
            phone,
            role: { id: roleid } as Role,
        };

        return this.userRepository.createUser(newUser);
    }


    /**
  * =========================
  *        USER LOGIN
  * =========================
  *
  * Logs in a user by validating the provided email and password.
  *
  * Checks if the user exists, compares the provided password with the stored hashed password,
  * and returns the user data if successful.
  *
  * @param loginInfo - The DTO containing user login details.
  * @remarks
  * Uses bcrypt to compare the provided password with the stored hashed password.
  * Returns a UserDto object containing the user's id, name, email, phone, role id, and role name.
  *
  * @throws {ApiError} If the user is not found or if the password is invalid.
  * @returns {Promise<UserDto>} User data if login is successful.
  */
    async login(loginInfo: LoginDto): Promise<UserDto> {
        const { email, password } = loginInfo
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw errorUtils.notFound("User not found with this email.");
        }
        const idPasswordMatch = await bcrypt.compare(password, user.password);

        if (!idPasswordMatch) {
            throw errorUtils.unauthorized("Invalid password.");
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            roleid: user.role.id,
            roleName: user.role.name,
        } as UserDto;
    }

    /**
     *  =========================
     *      GET ALL USERS
     * ========================
     * * Retrieves all registered users from the database.
     * * This method interacts with the UserRepository to fetch user records
     * * and returns a structured array of UserDto objects.
     * * @throws {ApiError} If no users are found.
     * * @throws {ApiError} If there is an issue retrieving users from the database
     * 
     * @returns {Promise<UserDto[]>}
     * Retrieves all registered users from the database.
     */
    async getUsers(): Promise<UserDto[]> {
        const allUserData = await this.userRepository.getAll();

        if (!allUserData || allUserData.length === 0) {
            throw errorUtils.notFound("No users found.");
        }
        return allUserData.map((data: User) => ({
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            roleid: data.role.id,
            roleName: data.role.name,

        }));
    }

}