import { Router } from "express";
import { brandRouters } from "./brandRouters";
import { productRouters } from "./productRouters";

export const routerv1 = Router();

routerv1.use("/brands", brandRouters);
routerv1.use("/products", productRouters);