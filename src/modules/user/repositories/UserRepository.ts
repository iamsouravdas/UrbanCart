import { Repository } from "typeorm";
import { User } from "../../../entity/User";
import { IUserRepository } from "./IUserRepository";
import AppDataSource from "../../../data-source";

class UserRepository implements IUserRepository {


    // * UserRepository is responsible for interacting with the database to perform CRUD operations on User entities.
    // * It implements the IUserRepository interface to ensure consistent method signatures.
    // * This class uses TypeORM's Repository pattern to manage User entities.
    // * It provides methods to get all users, find a user by email, and create
    // * a new user in the database.
    // * The repository is initialized with a TypeORM Repository instance for the User entity.
    // * The constructor can accept a custom repository instance or use the default one from AppDataSource.
    // * This allows for flexibility in testing and dependency injection.
    // * The class provides methods to interact with the User entity in the database.
    // * It includes methods to get all users, find a user by email, and create
    private repo: Repository<User>

    /**
     * Initializes the UserRepository with a TypeORM Repository instance.
     * @param _repo - An optional custom repository instance for User entity.
     */
    constructor(_repo?: Repository<User>) {
        this.repo = _repo ?? AppDataSource.getRepository(User);
    }

    /**
    * Retrieves a list of all registered users from the database.
    *
    * This function is part of the UserController and interacts with the
    * UserService layer to fetch user records. It returns a structured JSON
    * response including status, message, and user data.
    *
    * Throws an error if retrieval fails or if no users are found.
    *
    * @returns {User[]} JSON object containing all users
    */

    async getAll(): Promise<User[] | null> {
        return await this.repo.find({
            relations: ["role"],
        });
    }

    /**
     * Creates a new user and persists it to the database.
     *
     * @remarks
     * This method uses the repository to create and save a new user entity.
     * It expects a partial `User` object containing the necessary fields.
     *
     * @param user - A partial User object with the required properties
     *               (e.g., name, email, password).
     * @returns A promise that resolves to the created {@link User} entity.
     *
     * @throws Will throw an error if saving the user fails.
     */

    async createUser(user: Partial<User>): Promise<User | null> {
        const newUser = await this.repo.create(user);
        return this.repo.save(newUser)
    }

    /**
    * Finds a user by their email address.
    *
    * @param email - The email address to search for.
    * @returns A promise that resolves to the {@link User} entity
    *          if found, or `null` if no user exists with that email.
    *
    * @remarks
    * This method queries the database using the repository's `findOne`
    * method with a `where` clause on the email column.
    */

    async findByEmail(email: string): Promise<User | null> {
        return await this.repo.findOne({
            where: { email },
            relations: ["role"],
        })
    }

}

export default UserRepository;