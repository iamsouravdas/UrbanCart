import { createUserDto } from '../../../dto/UserDto';
import { Role } from '../../../entity/Role';
import { User } from '../../../entity/User';
import { IUserRepository } from "../repositories/IUserRepository";

export class UserService {
    private userRepository: IUserRepository;

    constructor(_userRepository: IUserRepository) {
        this.userRepository = _userRepository;
    }

    async registerUser(userDto: createUserDto): Promise<User> {
        // TODO: hash password, validate uniqueness, etc.

        const newUser = {
            name: userDto.name,
            email: userDto.email,
            password: userDto.password,
            phone: userDto.phone,
            role: {
                id: userDto.roleid
            } as Role
        }
        return this.userRepository.createUser(newUser);
    }


}