import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import appConfigs from "./configs/appConfigs";
import { Role } from "./entity/Role";
import { OtpCode } from "./entity/OtpCode";
import { Categories } from "./entity/categories";
import { Products } from "./entity/Products";
import { ProductImages } from "./entity/ProductImages";
import { Inventory } from "./entity/Inventory";
import { ProductVariants } from "./entity/ProductVariants";
import { RefreshToken } from "./entity/RefreshToken";

const AppDataSource = new DataSource({
    type: "postgres",
    host: appConfigs.DB_HOST,
    port: appConfigs.DB_PORT,
    username: appConfigs.DB_USERNAME,
    password: appConfigs.DB_PASSWORD,
    database: appConfigs.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [User, Role, RefreshToken, OtpCode, Categories, Products, ProductImages, Inventory, ProductVariants],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
});

export default AppDataSource;