const productsService = require("../service/productsService");

const getListProducts = async (req, res) => {
    try {
        const products = await productsService.getListProducts();
        if (products.length === 0) {
            res.status(200).send("The product list is empty");
        }
        res.status(200).send(products);
    }
    catch {
        res.status(404).send();
    }
};

const getProductDetail = async (req, res) => {
    try {
        const product = await productsService.getProductDetail(req.params.productId);
        res.status(200).send(product);
    }
    catch {
        res.status(404).send();
    }
};

const createProduct = async (req, res) => {
    try {
        const newProduct = {
            name: req.body.name,
            brand: req.body.brand,
            image: req.body.image,
            price: req.body.price,
        };

        await productsService.createProduct(newProduct);
        res.status(201).send("New product was created: " + `${newProduct.name}`);
    }
    catch (err) {
        res.status(500).send(err + "");
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const updatedProduct = {
            name: req.body.name,
            brand: req.body.brand,
            image: req.body.image,
            price: req.body.price,
        };
        await productsService.getProductDetail(productId);
        await productsService.updateProduct(productId, updatedProduct);
        res.status(200).send("Product was updated.");
    }
    catch (err) {
        res.status(500).send(err + "");
    }
};

const deleteProduct = async (req, res) => {
    try {
        await productsService.getProductDetail(req.params.productId);
        await productsService.deleteProduct(req.params.productId);
        res.status(200).send("Product was deleted.");
    }
    catch (err) {
        res.status(500).send(err + "");
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