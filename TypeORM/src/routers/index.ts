import { Router } from "express";
import { routerv1 } from "./v1";

export const rootRouter = Router();
rootRouter.use("/v1", routerv1);
rootRouter.get("**", (req, res) => {
    res.status(404).send();
});
