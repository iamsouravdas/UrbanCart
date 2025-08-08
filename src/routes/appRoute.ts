import { Router } from "express";
import { UserController } from "../modules/user/contoller/UserController";
import { verifyAccessToken } from "../middleware/verifyAccessToken";

const appRoute = Router();
const userController = new UserController();

appRoute.post("/urban-cart/register", userController.register);
appRoute.post("/urban-cart/login", userController.login);
appRoute.get("/urban-cart/get-all-users", verifyAccessToken, userController.getAllRegisteredUsers);



export default appRoute;

