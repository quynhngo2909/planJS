const express = require("express");
const productsRouter = require("./products");

const rootRouter = express.Router();

rootRouter.get("", (req, res) => {
    res.render("home.ejs");
});

rootRouter.use("/products", productsRouter);

rootRouter.get("**", (req, res) => {
    res.render("err.ejs");
});

module.exports = rootRouter;