import "reflect-metadata";
import { DataSource } from "typeorm";
import appConfigs from "./configs/appConfigs";
import { Categories } from "./entity/Categories";
import { Inventory } from "./entity/Inventory";
import { OtpCode } from "./entity/OtpCode";
import { ProductImages } from "./entity/ProductImages";
import { Products } from "./entity/Products";
import { ProductVariants } from "./entity/ProductVariants";
import { RefreshToken } from "./entity/RefreshToken";
import { Role } from "./entity/Role";
import { User } from "./entity/User";
import { Cart } from "./entity/Carts";
import { CartItems } from "./entity/CartItems";
import { Wishlist } from "./entity/Wishlist";

const AppDataSource = new DataSource({
    type: "postgres",
    host: appConfigs.DB_HOST,
    port: appConfigs.DB_PORT,
    username: appConfigs.DB_USERNAME,
    password: appConfigs.DB_PASSWORD,
    database: appConfigs.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [User, Role, RefreshToken, Wishlist, OtpCode, CartItems, Wishlist, Categories, Cart, Products, ProductImages, Inventory, ProductVariants],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
});

export default AppDataSource;