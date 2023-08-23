import { ProductsModel } from "../models/productsModel";

const getListProducts = async () => {
    return await ProductsModel.find();
};

const getProductDetail = async (productId: any) => {
    return await ProductsModel.findOne({ _id: productId });
};

const getProductByName = async (productName: string) => {
    return await ProductsModel.findOne({name: productName});
};


const createProduct = async (newProduct: any) => {
    await ProductsModel.create(newProduct);
};


const updateProduct = async (productId: any, updatedProduct: any) => {
    await ProductsModel.updateOne({ _id: productId }, updatedProduct);
};

const deleteProduct = async (productId: any) => {
    await ProductsModel.deleteOne({ _id: productId});
};

export {
    getListProducts,
    getProductDetail,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByName
}
