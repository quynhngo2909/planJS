const ProductsModel = require("../models/productsModel");

const getListProducts = async (req, res) => {
    const products = await ProductsModel.find();
    return new Promise((res, rej) => {
        if (products.length === 0) {
            res("The product list is empty");
        } else {
            res(products);
        }
    });
};

const getProductDetail = async (req, res) => {
    const product = await ProductsModel.find({ _id: req.params.id });
    return new Promise((res, rej) => {
        res(product);
    });
};

const createProduct = async (req, res) => {
    console.log(req.body.name);
    const newProduct = await ProductsModel.create({
        name: req.body.name,
        brand: req.body.brand,
        image: req.body.image,
        price: req.body.price,
    });

    console.log(req.body.price);
    return new Promise((res, rej) => {
        res(newProduct);
    });
};


const updateProduct = async (req, res) => {
};

const deleteProduct = async (req, res) => {
};

const productsService = {
    getListProducts,
    getProductDetail,
    createProduct,
};

module.exports = productsService;
