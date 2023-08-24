import { ProductsModel } from "../models/productsModel";
import { Repository } from "redis-om";
import { productSchemaRedis } from "../models/productModelRedis";
import { redis } from "../configs/redisConnection";

const productRepoRedis = new Repository(productSchemaRedis, redis);

const getListProducts = async () => {
    const productList = await ProductsModel.find();
    for (const p of productList) {
        let product = {
            name: p.name,
            brand: p.price,
            image: p.image,
            price: p.price,
          }

          await productRepoRedis.save(product);
    }
    return productList;
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
