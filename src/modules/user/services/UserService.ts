import { RefreshToken } from './../../../entity/RefreshToken';
import appConfigs from '../../../configs/appConfigs';
import { LoginDto, LoginResponse } from '../../../dto/LoginDto';
import { createUserDto, UserDto } from '../../../dto/UserDto';
import { Role } from '../../../entity/Role';
import { User } from '../../../entity/User';
import { ApiError } from '../../../errors/ApiError';
import { helpers } from '../../../helper/utils';
import { IUserRepository } from "../repositories/IUserRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
    private userRepository: IUserRepository;

    constructor(_userRepository: IUserRepository) {
        this.userRepository = _userRepository;
    }

    // Create new user.
    async registerUser(userDto: createUserDto): Promise<User | null> {
        const { email, password, name, phone, roleid } = userDto;

        if (!helpers.validations.isStrongPassword(password)) {
            throw new ApiError(400, "Strong password needed");
        }

        if (!helpers.validations.isValidEmail(email)) {
            throw new ApiError(400, "Invalid email format.");
        }


        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new ApiError(400, "User with this email already exists.");
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


    //User Login
    async login(loginInfo: LoginDto): Promise<LoginResponse> {
        const { email, password } = loginInfo
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new ApiError(404, "User not found.");
        }
        const idPasswordMatch = await bcrypt.compare(password, user.password);
        if (!idPasswordMatch) {
            throw new ApiError(401, "Invalid password.");
        }

        console.log("User found:", user);
        // Create access token and refresh token

        const accessToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role.name },
            appConfigs.authAndSecurity.JWT_SECRET_KEY,
            { expiresIn: '1m' }
        );



        const userDto: UserDto = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            roleid: user.role.id,
            roleName: user.role.name,
        };
        return { accessToken, user: userDto };
    }

    // Get all users
    async getUsers(): Promise<UserDto[]> {
        const allUserData = await this.userRepository.getAll();

        // TODO: Implement Paginations and number of rows


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