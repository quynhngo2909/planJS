import { Router } from "express";
import * as productController from "../../controllers/productControllers";

const productRouters = Router();

productRouters.get("", productController.getListProducts);
productRouters.get("/:id", productController.getProductById);
productRouters.post("", productController.saveProduct);
productRouters.put("", productController.updatedProduct);
productRouters.delete("/:id",productController.deleteProduct);

export default productRouters;