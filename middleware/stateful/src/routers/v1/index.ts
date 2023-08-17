import { Router } from "express";
import { brandRouters } from "./brandRouters";
import productRouters from "./productRouters";
import * as passport from "passport";
import { auth } from "../../middlewares/auth";
import * as productController from "../../controllers/productControllers";
import * as userControllers from "../../controllers/userControllers";

export const routerv1 = Router();

routerv1.use("/brands", brandRouters);

// 
routerv1.use("/products", ...auth("ADMIN", "USER"), productRouters);

routerv1.post("/login", passport.authenticate("local", {session: true}), userControllers.login);