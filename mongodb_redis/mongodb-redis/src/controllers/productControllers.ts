import * as productServices from "../service/productServices";
import { Repository } from "redis-om";
import { productSchemaRedis } from "../models/productModelRedis";
import { redis } from "../configs/redisConnection";
import { json } from "express";

const productRepoRedis = new Repository(productSchemaRedis, redis);

const getListProducts = async (req: any, res: any) => {
    try {
        console.log("Controller getlist")
        // const products = await productServices.getListProducts();
        // return res.status(200).send(products);

        const sample = await redis.hGetAll("products:01H8JWFTDJ6Q7CP12VRQ1YC880");
        console.log(sample);

        await productRepoRedis.createIndex();
       

        const productsRedis = await productRepoRedis.search().return.all();
        console.log("get products redis");
        let products: any;
        if (productsRedis.length === 0) {
            console.log("productListRedis is empty");
            products = await productServices.getListProducts();
            if (products.length === 0)
                return res.status(200).send("The product list is empty");
            return res.status(200).send(products);
        }
        res.status(200).send(productsRedis);
    }
    catch (err) {
        console.log(err + "");
        res.status(404).send();
    }
};

const getProductDetail = async (req: any, res: any) => {
    try {
        const product = await productServices.getProductDetail(req.params.productId);
        res.status(200).send(product);
    }
    catch {
        res.status(404).send();
    }
};

const createProduct = async (req: any, res: any) => {
    try {
        const newProduct = {
            name: req.body.name,
            brand: req.body.brand,
            image: req.body.image,
            price: req.body.price,
        };

        const product = await productServices.getProductByName(req.body.name);
        if (product)
            return res.status(400).send("The product: " + newProduct.name + " was existed.");

        await productServices.createProduct(newProduct);
        res.status(201).send("New product was created: " + `${newProduct.name}`);
    }
    catch (err) {
        console.log(err + "");
        res.status(500).send(err + "");
    }
};

const updateProduct = async (req: any, res: any) => {
    try {
        const productId = req.params.productId;
        const updatedProduct = {
            name: req.body.name,
            brand: req.body.brand,
            image: req.body.image,
            price: req.body.price,
        };
        const product = await productServices.getProductDetail(productId);
        if (!product)
            return res.status(400).send("The product: " + updatedProduct.name + " is not existed.");

        await productServices.updateProduct(productId, updatedProduct);
        res.status(200).send("Product was updated.");
    }
    catch (err) {
        console.log(err + "");
        res.status(500).send(err + "");
    }
};

const deleteProduct = async (req: any, res: any) => {
    try {
        const product = await productServices.getProductDetail(req.params.productId);
        if (!product)
            return res.status(400).send("The product is not existed.");

        await productServices.deleteProduct(req.params.productId);
        res.status(200).send("Product was deleted.");
    }
    catch (err) {
        console.log(err + "");
        res.status(500).send(err + "");
    }
};

export {
    getListProducts,
    getProductDetail,
    createProduct,
    updateProduct,
    deleteProduct,
};