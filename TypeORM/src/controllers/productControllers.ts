import { Product } from "../orm/entities/Product";
import * as productService from "../services/productServices";

const getListProducts = async (req, res) => {
    try {
        const products = await productService.getListProducts();
        res.status(200).send(products);
    }
    catch (err) {
        console.log(err + "");
        res.status(400).send();
    }
};

const saveProduct = async (req, res) => {
    try {
        const newProduct = new Product();
        newProduct.name = req.body.name.toUpperCase();
        newProduct.price = req.body.price;
        newProduct.brand = req.body.brand;
        const product = await productService.getProductByName(newProduct.name);
        if (product === null) {
            await productService.saveProduct(newProduct);
            res.status(201).send();
        } else {
            res.status(400).send("The product " + newProduct.name + " exists!");
        }
    }
    catch (err) {
        console.log(err + "");
        res.status(400).send();
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.status(200).send(product);
    }
    catch (err) {
        console.log(err + "");
        res.status(400).send();
    }
};


const updatedProduct = async (req, res) => {
    try {
        const updatedProduct = new Product();
        const productId = req.body.id;
        const product = await productService.getProductById(productId);
        if (product) {
            updatedProduct.name = req.body.name.toUpperCase();
            updatedProduct.price = req.body.price;
            updatedProduct.brand = req.body.brand;
            await productService.updateProduct(productId, updatedProduct);
            res.status(200).send();
        } else {
            res.status(400).send("The product " + req.body.name + " does not exist!");
        }
    }
    catch (err) {
        console.log(err + "");
        res.status(400).send();
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productService.getProductById(productId);
        if (product) {
            await productService.deleteProduct(product);
            res.status(200).send();
        } else {
            res.status(400).send("The product " + req.body.name + " does not exist!");
        }
    }
    catch  (err) {
        console.log(err + "");
        res.status(400).send();
    }
};

export {
    getListProducts,
    saveProduct,
    updatedProduct,
    getProductById,
    deleteProduct,
}