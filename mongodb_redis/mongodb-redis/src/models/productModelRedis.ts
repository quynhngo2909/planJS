import { Schema } from "redis-om";

export const productSchemaRedis = new Schema('products', {
    name: { type: "string" },
    brand: { type: "string" },
    image: { type: "string" },
    price: { type: "number" },
}, {
    dataStructure: "HASH",
});
