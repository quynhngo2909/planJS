import { Repository } from "redis-om";
import { productSchemaRedis } from "../models/productModelRedis";
import { redis } from "../configs/redisConnection";

const productRepoRedis = new Repository(productSchemaRedis, redis);

const saveProducts = async (products: any) => {
    if (!Array.isArray(products)) {
        let product = {
            name: products.name,
            brand: products.brand,
            image: products.image,
            price: products.price,
        }
        return await productRepoRedis.save(JSON.stringify(products._id).substring(1, 25), product);
    }

    for (const p of products) {
        let product = {
            name: p.name,
            brand: p.brand,
            image: p.image,
            price: p.price,
        }
        await productRepoRedis.save(JSON.stringify(p._id).substring(1, 25), product);
    }
};

const getProducts = async () => {
    await productRepoRedis.createIndex();
    return await productRepoRedis.search().return.all()
};

const getProductByKey = async (productKey: any) => {
    return await redis.hGetAll(productKey);
};

const getProductByName = async (productName: any) => {
    const prodName = productName.toUpperCase();
    return await productRepoRedis.search().where("name").equal(prodName).returnAll();
};

const getProductById = async (productId: any) => {
    return await productRepoRedis.fetch(productId);
};

const deleteProductById = async(productId: any) => {
    await productRepoRedis.remove(productId);
};


export {
    saveProducts,
    getProducts,
    getProductByKey,
    getProductById,
    deleteProductById,
    getProductByName,
}