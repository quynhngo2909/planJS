import { Router } from "express";
import * as express from "express";
import * as brandControllers from "../../controllers/brandControllers";
import { auth } from "../../middlewares/auth";

export const brandRouters = Router();

brandRouters.get("/", brandControllers.getListBrands);
brandRouters.post("/", ...auth("ADMIN"), brandControllers.saveBrand);
brandRouters.put("/", ...auth("ADMIN"), brandControllers.updatedBrand);
brandRouters.delete("/:id", ...auth("ADMIN"), brandControllers.deleteBrand);