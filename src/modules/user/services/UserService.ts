import { createUserDto, UserDto } from '../../../dto/UserDto';
import { Role } from '../../../entity/Role';
import { User } from '../../../entity/User';
import { ApiError } from '../../../errors/ApiError';
import { helpers } from '../../../helper/utils';
import { IUserRepository } from "../repositories/IUserRepository";
import bcrypt from 'bcrypt'

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
    async login() {

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