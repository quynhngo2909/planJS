import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const productsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    brand: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

export const ProductsModel = mongoose.model("products", productsSchema);