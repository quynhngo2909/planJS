import { Brand } from "../orm/entities/Brand";
import * as brandServices from "../services/brandServices";

const getListBrands = async (req, res) => {
    try {
        const brands = await brandServices.getListBrands();
        res.status(200).send(brands);
    }
    catch (err) {
        console.log(err + "");
        res.status(400).send();
    }
};

const saveBrand = async (req, res) => {
    try {
        const newBrand = new Brand();
        newBrand.name = req.body.name.toUpperCase();
        const brand = await brandServices.getBrandByName(newBrand.name);
        if (brand === null) {
            await brandServices.saveBrand(newBrand);
            res.status(201).send();
        } else {
            res.status(400).send("The brand " + newBrand.name + " exists!");
        } 
    }
    catch (err) {
        console.log(err + "");
        res.status(400).send();
    }
};

const updatedBrand = async (req, res) => {
    try {
        const updatedBrand = new Brand();
        const brandId = req.body.id;
        const brand = await brandServices.getBrandById(brandId);
        if (brand) {
            updatedBrand.name = req.body.name.toUpperCase();
            await brandServices.updateBrand(brandId, updatedBrand);
            res.status(200).send();
        } else {
            res.status(400).send("The brand " + req.body.name + " does not exist!");
        }
    }
    catch (err) {
        console.log(err + "");
        res.status(400).send();
    }
};

const deleteBrand = async (req, res) => {
    try {
        const brandId = req.params.id;
        const brand = await brandServices.getBrandById(brandId);
        if (brand) {
            await brandServices.deleteBrand(brand);
            res.status(200).send();
        } else {
            res.status(400).send("The brand " + req.body.name + " does not exist!");
        }
    }
    catch  (err) {
        console.log(err + "");
        res.status(400).send();
    }
};

export {
    getListBrands,
    saveBrand,
    updatedBrand,
    deleteBrand,
}