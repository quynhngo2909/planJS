const ProductsModel = require("../models/productsModel");

const getListProducts = async () => {
    return await ProductsModel.find();
};

const getProductDetail = async (productId) => {
    return await ProductsModel.findOne({ _id: productId });
};

const createProduct = async (newProduct) => {
    return ProductsModel.create(newProduct);
};


const updateProduct = async (productId, updatedProduct) => {
    return await ProductsModel.updateOne({ _id: productId }, updatedProduct);
};

const deleteProduct = async (productId) => {
    return await ProductsModel.deleteOne({ _id: productId});
};

const productsService = {
    getListProducts,
    getProductDetail,
    createProduct,
    updateProduct,
    deleteProduct,
};

module.exports = productsService;
