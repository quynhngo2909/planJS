import { Router } from "express";
import * as brandControllers from "../../controllers/brandControllers";

export const brandRouters = Router();

brandRouters.get("/", brandControllers.getListBrands);
brandRouters.post("/", brandControllers.saveBrand);
brandRouters.put("/", brandControllers.updatedBrand);
brandRouters.delete("/:id", brandControllers.deleteBrand);