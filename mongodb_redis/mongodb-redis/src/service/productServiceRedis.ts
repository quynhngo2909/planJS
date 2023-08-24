import { Repository } from "redis-om";
import { productSchemaRedis } from "../models/productModelRedis";
import { redis } from "../configs/redisConnection";

const productRepoRedis = new Repository(productSchemaRedis, redis);

const saveProducts = async (products: any) => {
    if (!Array.isArray(products)) {
        let product = {
            _id: JSON.stringify(products._id).substring(1, 25),
            name: products.name,
            brand: products.price,
            image: products.image,
            price: products.price,
        }
        return await productRepoRedis.save(product);
    }

    for (const p of products) {
        let product = {
            _id: JSON.stringify(p._id).substring(1, 25),
            name: p.name,
            brand: p.price,
            image: p.image,
            price: p.price,
        }
        await productRepoRedis.save(product);
    }
};

const getProducts = async () => {
    await productRepoRedis.createIndex();
    return await productRepoRedis.search().return.all()
};

const getProductByKey = async (productKey: any) => {
    return await redis.hGetAll(productKey);
};

const getProductById = async (productId: any) => {
    return await productRepoRedis.search().where("_id").equal(productId).returnAll();
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
}