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
    let productId;
    if (req.params.id) {
        productId = req.params.id;
    } else {
        productId = req.body._id;
    }

    const product = await ProductsModel.find({ _id: productId });
    return new Promise((res, rej) => {
        res(product);
    });
};

const createProduct = async (req, res) => {
    const newProduct = await ProductsModel.create({
        name: req.body.name,
        brand: req.body.brand,
        image: req.body.image,
        price: req.body.price,
    })
        .catch(err => console.log(err + ""));

    return new Promise((res, rej) => {
        res(newProduct);
    });
};


const updateProduct = async (req, res) => {
    const updateProduct = await ProductsModel.updateOne(
        { _id: req.body._id },
        {
            name: req.body.name,
            brand: req.body.brand,
            image: req.body.image,
            price: req.body.price,
        }
    )
        .catch(err => console.log(err + ""));

    return new Promise((res, rej) => {
        res(updateProduct);
    });
};

const deleteProduct = async (req, res) => {
    const deleteProduct = await ProductsModel.deleteOne({_id: req.params.id});
    return new Promise((res, rej) => {
        res(deleteProduct);
    });
};

const productsService = {
    getListProducts,
    getProductDetail,
    createProduct,
    updateProduct,
    deleteProduct,
};

module.exports = productsService;
