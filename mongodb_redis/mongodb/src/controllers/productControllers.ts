import * as productServices from "../service/productServices";


const getListProducts = async (req: any, res: any) => {
    try {
        const products = await productServices.getListProducts();
        if (products.length === 0) {
            res.status(200).send("The product list is empty");
        }
        res.status(200).send(products);
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