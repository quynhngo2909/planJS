import { Router } from "express";
import { productRouters } from "./productsRouters";

export const routerv1 = Router();

routerv1.use("/products", productRouters);