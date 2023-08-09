const express = require("express");
const productsController = require("../../controllers/productsController");

const productsRouter = express.Router();

productsRouter.get("", productsController.getListProducts);
productsRouter.get("/:productId", productsController.getProductDetail);
productsRouter.post("", productsController.createProduct);
productsRouter.put("/:productId", productsController.updateProduct);
productsRouter.delete("/:productId", productsController.deleteProduct);
module.exports = productsRouter;