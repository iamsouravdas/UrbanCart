import { User } from "../../../entity/User";

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    createUser(user: Partial<User>): Promise<User | null>

} 