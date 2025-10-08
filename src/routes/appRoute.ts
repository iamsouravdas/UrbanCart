import { Router } from "express";
import { UserController } from "../modules/user/contoller/UserController";
import { verifyAccessToken } from "../middleware/verifyAccessToken";
import { ProductController } from "../modules/products/controller/ProductController";

const appRoute = Router();

// User Routes
const userController = new UserController();
appRoute.post("/urban-cart/user/register", userController.register);
appRoute.post("/urban-cart/user/login", userController.login);
appRoute.get("/urban-cart/user/get", verifyAccessToken, userController.getAllRegisteredUsers);


//Product Routes
const productController = new ProductController();
appRoute.get("/urban-cart/products/get_product", verifyAccessToken, productController.getProductList);
appRoute.get("/urban-cart/products/get_product/:id", productController.getProductById);
appRoute.post('/urban-cart/products/create_produuct', productController.createProduct)

export default appRoute;

