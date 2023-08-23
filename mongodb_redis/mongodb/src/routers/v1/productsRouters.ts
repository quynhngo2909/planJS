import * as express from "express";
import * as productControllers from "../../controllers/productControllers";

export const productRouters = express.Router();

productRouters.get("", productControllers.getListProducts);
productRouters.get("/:productId", productControllers.getProductDetail);
productRouters.post("", productControllers.createProduct);
productRouters.put("/:productId", productControllers.updateProduct);
productRouters.delete("/:productId", productControllers.deleteProduct);