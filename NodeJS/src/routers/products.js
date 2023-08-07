const express = require("express");
const productsController = require("../controllers/productsController");

const productsRouter = express.Router();

productsRouter.get("/", productsController.getListProducts);
productsRouter.get("/list", productsController.getListProducts);

productsRouter.get("**", (req, res) => {
    res.render("err.ejs");
});

module.exports = productsRouter;
