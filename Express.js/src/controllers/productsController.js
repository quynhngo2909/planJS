const productsService = require("../service/productsService");

const getListProducts = async (req, res) => {
    try {
        const products = await productsService.getListProducts();
        res.status(200).send(products);
    }
    catch {
        res.render("err.ejs");
    }
};

const getProductDetail = async (req, res) => {
    try {
        const product = await productsService.getProductDetail(req, res);
        res.status(200).send(product);
    }
    catch {
        res.render("err.ejs");
    }
};

const createProduct = async (req, res) => {
    try {
        const newProduct = await productsService.createProduct(req, res);
        res.status(201).send("New product was created.");
        console.log(req.body);
    }
    catch {
        res.render("err.ejs");
    }
};

const productsController = {
    getListProducts,
    getProductDetail,
    createProduct,
};

module.exports = productsController;