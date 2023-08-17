import { Router } from "express";
import * as productController from "../../controllers/productControllers";
import * as userController from "../../controllers/userControllers";
import { auth } from "../../middlewares/auth";

export const productRouters = Router();

productRouters.get("/", productController.getListProducts);
productRouters.get("/:id", productController.getProductById);
productRouters.post("/",productController.saveProduct);
productRouters.put("/",  productController.updatedProduct);
productRouters.delete("/:id", productController.deleteProduct);

productRouters.get("/users/:useremail", userController.getUserByEmail);
