import { config } from "../orm/configs/ormconfig";
import { Product } from "../orm/entities/Product";

const productRepository = config.getRepository(Product);

const getListProducts = async () => {
    return await productRepository.find({
        relations: {
            brand: true,
        }
    });
}

const getProductByName = async (productName) => {
    return await productRepository.findOne({
        where: {
            name: productName.toUpperCase(),
        },
    });
};

const getProductById = async (productId) => {
   return await productRepository.findOne({
        relations: {
            brand: true,
        },
        where: {
            id: productId,
        },
    });
};

const updateProduct =async (productId, updatedProduct) => {
    await productRepository.update(productId, {
        name: updatedProduct.name,
        price: updatedProduct.price,
        brand: updatedProduct.brand,
    });
};

const saveProduct = async (newProduct) => {
    await productRepository.save(newProduct);
};

const deleteProduct = async (deleteProduct) => {
    await productRepository.remove(deleteProduct);
};

export {
    getListProducts,
    getProductByName,
    saveProduct,
    getProductById,
    updateProduct,
    deleteProduct,
}