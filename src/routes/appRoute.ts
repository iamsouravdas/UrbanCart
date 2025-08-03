import { Router } from "express";
import { UserController } from "../modules/user/contoller/UserController";

const appRoute = Router();
const userController = new UserController();

appRoute.post("/urban-cart/register", userController.register);


export default appRoute;

