const express = require("express");
const productsRouter = require("./products/productsRouter");

const rootRouter = express.Router();

rootRouter.use("/products", productsRouter);
rootRouter.get("", (req, res) => {
    res.render("home.ejs");
});

rootRouter.get("**", (req, res) => {
    res.render("err.ejs");
});

module.exports = rootRouter;


