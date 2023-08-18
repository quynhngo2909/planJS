import { Router } from "express";
import { brandRouters } from "./brandRouters";
import { productRouters } from "./productRouters";
import { login } from "../../controllers/userControllers";
import * as passport from "passport";
import { auth } from "../../middlewares/auth";

export const routerv1 = Router();

routerv1.use("/brands", brandRouters);
routerv1.use("/products", ...auth("ADMIN", "USER"), productRouters);

routerv1.post("/login", passport.authenticate("local", {session: false}), login);