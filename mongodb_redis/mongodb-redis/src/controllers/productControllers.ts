import * as productServiceRedis from "../service/productServiceRedis";
import * as productServices from "../service/productServices";

const getListProducts = async (req: any, res: any) => {
    try {
        // const products = await productServices.getListProducts();
        // return res.status(200).send(products);

        // const sample = await redis.hGetAll("products:01H8K67F4HKPWXR9M4TTZZ1TNP");
        // const sample = await productServiceRedis.getProductByKey("products:01H8K67F4HKPWXR9M4TTZZ1TNP");
        const sample = await productServiceRedis.getProductById("64d43d5454a9cc844dea6ccc");
        console.log(sample);

        const productsRedis = await productServiceRedis.getProducts;
        console.log("get products redis");

        if (productsRedis.length === 0) {
            console.log("productListRedis is empty");
            const products = await productServices.getListProducts();
            if (products.length === 0)
                return res.status(200).send("The product list is empty");
            return res.status(200).send(sample);
        }
        res.status(200).send(sample);
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
    createProduct, deleteProduct, getListProducts,
    getProductDetail, updateProduct
};
