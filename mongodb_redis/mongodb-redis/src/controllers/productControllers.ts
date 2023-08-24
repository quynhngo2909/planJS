import { EntityId } from "redis-om";
import * as productServiceRedis from "../service/productServiceRedis";
import * as productServices from "../service/productServices";

const getListProducts = async (req: any, res: any) => {
    try {
        const productsRedis = await productServiceRedis.getProducts();

        if (productsRedis.length === 0) {
            const products = await productServices.getListProducts();
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
        const product = await productServiceRedis.getProductById(req.params.productId);
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

        if (await productServices.getProductByName(req.body.name))
            return res.status(400).send("The product: " + newProduct.name + " was existed.");

        await productServices.createProduct(newProduct);
        await productServiceRedis.saveProducts(await productServices.getProductByName(req.body.name));
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
        if (!await productServices.getProductDetail(req.params.productId))
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
    createProduct, deleteProduct, getListProducts,
    getProductDetail, updateProduct
};
