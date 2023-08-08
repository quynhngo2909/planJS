const express = require("express");
const productsController = require("../../controllers/productsController");

const productsRouter = express.Router();

productsRouter.get("/getAll", productsController.getListProducts);
productsRouter.get("", productsController.getListProducts);
productsRouter.get("/:id", productsController.getProductDetail);
productsRouter.post("/create", productsController.createProduct);
productsRouter.put("/update/", productsController.updateProduct);
productsRouter.get("/delete/:id", productsController.deleteProduct);
module.exports = productsRouter;