import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import appConfigs from "./configs/appConfigs";
import { Role } from "./entity/Role";

const AppDataSource = new DataSource({
    type: "postgres",
    host: appConfigs.DB_HOST,
    port: appConfigs.DB_PORT,
    username: appConfigs.DB_USERNAME,
    password: appConfigs.DB_PASSWORD,
    database: appConfigs.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [User, Role],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
});

export default AppDataSource;