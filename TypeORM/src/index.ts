import * as express from "express";
import { dbCreateConnection } from './orm/dbCreateConnection';
import * as dotenv from "dotenv";
import { rootRouter } from "./routers";

dotenv.config();

const startServer = async () => {
    try {
        await dbCreateConnection();
    
        const app = express();
        app.use(express.urlencoded({extended: false}));
        app.use(express.json());
        app.use("/", rootRouter);

        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log("Server is running.");
        })
    }
    catch (err) {
        console.log(err + "");
        process.exit(1);
    }
};

startServer();