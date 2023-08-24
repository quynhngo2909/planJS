import { Repository } from "redis-om";
import { productSchemaRedis } from "../models/productModelRedis";
import { redis } from "../configs/redisConnection";

const productRepoRedis = new Repository(productSchemaRedis, redis);


const saveProducts = async (productList: any) => {
    // await productRepoRedis.createIndex();
    for (const p of productList) {
        let product = {
            _id: JSON.stringify(p._id).substring(1,25),
            name: p.name,
            brand: p.price,
            image: p.image,
            price: p.price,
          }
          await productRepoRedis.save(product);
    }
};

const getProducts = async () => {
    return await productRepoRedis.search().return.all();
};

const getProductByKey = async (productKey: any) => {
    return await redis.hGetAll(productKey);
};

const getProductById = async (productId: any) => {
    return await productRepoRedis.search().where("_id").equals(productId).return.all();
}
export {
    saveProducts,
    getProducts,
    getProductByKey,
    getProductById,
}