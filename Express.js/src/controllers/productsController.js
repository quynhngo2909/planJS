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
        console.log(res.body);
    }
    catch {
        res.render("err.ejs");
    }
};

const createProduct = async (req, res) => {
    try {
        const newProduct = await productsService.createProduct(req, res);
        res.status(201).send("New product was created: " + `${newProduct.name}`);
    }
    catch {
        res.render("err.ejs");
    }
};

const updateProduct = async (req, res) => {
    try {
        await getProductDetail(req, res);
        await productsService.updateProduct(req, res);
        res.status(200).send("Product was updated.");
    }
    catch {
        res.render("err.ejs");
    }
};

const deleteProduct = async (req, res) => {
    console.log("delete controller")
    try {
        await productsService.deleteProduct(req, res);
        res.status(200).send("Product was deleted.");
    }
    catch {
        res.render("err.ejs");
    }
};

const productsController = {
    getListProducts,
    getProductDetail,
    createProduct,
    updateProduct,
    deleteProduct,
};

module.exports = productsController;