const express = require("express");
const productsRouter = require("./products/productsRouter");

const rootRouter = express.Router();

rootRouter.use("/products", productsRouter);
rootRouter.get("", (req, res) => {
    res.status(200).send();
});

rootRouter.get("**", (req, res) => {
    res.status(404).send();
});

module.exports = rootRouter;


