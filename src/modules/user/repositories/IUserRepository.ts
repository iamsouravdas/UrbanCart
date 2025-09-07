import { User } from "../../../entity/User";

export interface IUserRepository {
    getAll(): Promise<User[] | null>
    findByEmail(email: string): Promise<User | null>;
    createUser(user: Partial<User>): Promise<User | null>

} 