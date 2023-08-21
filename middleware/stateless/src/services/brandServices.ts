import { Brand } from "../orm/entities/Brand";
import { config } from "../orm/configs/ormconfig";

const brandRepository =  config.getRepository(Brand);

const getListBrands = async () => {
    return await brandRepository.find();
};

const getBrandByName = async (brandName) => {
    return await brandRepository.findOne({
        where: {
            name: brandName.toUpperCase(),
        },
    });
};

const getBrandById = async (brandId) => {
    return await brandRepository.findOne({
         where: {
             id: brandId,
         },
     });
 };

const saveBrand = async (newBrand) => {
    await brandRepository.save(newBrand);
};

const updateBrand =async (brandId, updatedBrand) => {
    await brandRepository.update(brandId, {
        name: updatedBrand.name,
    });
};

const deleteBrand = async (deleteBrand) => {
    await brandRepository.remove(deleteBrand);
};


export {
    getListBrands,
    saveBrand,
    getBrandById,
    getBrandByName,
    updateBrand,
    deleteBrand
}