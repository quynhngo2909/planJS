const fileUtils = require("../utils/file");

const getListProducts = async (req, res) => {
    try {
        const products = await fileUtils.readFileFromData("products.json");
        res.render("listProducts.ejs", {products: JSON.parse(products)});
    } catch {
        res.render("err.ejs");
    }
};


const productsController = {
    getListProducts
};

module.exports = productsController;