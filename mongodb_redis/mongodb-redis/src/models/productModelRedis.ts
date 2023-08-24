import { Schema } from "redis-om";

export const productSchemaRedis = new Schema('products', {
    _id: {type: "string" },
    name: { type: "string" },
    brand: { type: "string" },
    image: { type: "string" },
    price: { type: "number" },
}, {
    dataStructure: "HASH",
});
