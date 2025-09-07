import "reflect-metadata";
import { DataSource } from "typeorm";
import appConfigs from "./configs/appConfigs";
import { Categories } from "./entity/Categories";
import { Inventory } from "./entity/Inventory";
import { OtpCode } from "./entity/OtpCode";
import { ProductImages } from "./entity/ProductImages";
import { Products } from "./entity/Products";
import { ProductVariants } from "./entity/ProductVariants";
import { Role } from "./entity/Role";
import { User } from "./entity/User";
import { Cart } from "./entity/Carts";
import { CartItems } from "./entity/CartItems";
import { Wishlist } from "./entity/Wishlist";
import { OrderItems } from "./entity/OrderItems";
import { Orders } from "./entity/Orders";
import { Addresses } from "./entity/Addresses";

const AppDataSource = new DataSource({
    type: "postgres",
    host: appConfigs.database.DB_HOST,
    port: appConfigs.database.DB_PORT,
    username: appConfigs.database.DB_USERNAME,
    password: appConfigs.database.DB_PASSWORD,
    database: appConfigs.database.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [User, Role, Wishlist, OtpCode, CartItems, Wishlist, Categories, Cart, Addresses, Products, ProductImages, Inventory, ProductVariants, OrderItems, Orders],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
});

export default AppDataSource;