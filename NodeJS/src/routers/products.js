const express = require("express");
const productsController = require("../controllers/productsController");

const productsRouter = express.Router();

productsRouter.get("/list", productsController.getListProducts)
productsRouter.get("/home", productsController.getListProducts);
productsRouter.get("/", productsController.getListProducts);

module.exports = productsRouter;
