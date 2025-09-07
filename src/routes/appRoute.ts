import { Router } from "express";
import { UserController } from "../modules/user/contoller/UserController";
import { verifyAccessToken } from "../middleware/verifyAccessToken";
import { ProductController } from "../modules/products/controller/ProductController";

const appRoute = Router();

// User Routes
const userController = new UserController();
appRoute.post("/urban-cart/user/register", userController.register);
appRoute.post("/urban-cart/user/login", userController.login);
appRoute.get("/urban-cart/user/get-all-users", verifyAccessToken, userController.getAllRegisteredUsers);


//Product Routes
const productController = new ProductController();
appRoute.get("/urban-cart/products/getProductList", productController.getProductList);


export default appRoute;

