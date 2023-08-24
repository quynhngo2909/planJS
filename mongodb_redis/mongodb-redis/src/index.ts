import * as dotenv from "dotenv";
import express from "express";
import { rootRouter } from "./routers";
import { connectToMongoDB } from "./configs/mongodbConnection";
import { redis } from "./configs/redisConnection";

dotenv.config();

const startApp = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        await connectToMongoDB(MONGODB_URI);
        console.log("Connected to DB.");
    
        redis.on("error", (err) => console.log('Redis Client Error', err)) 
        await redis.connect();
        console.log("Connected to Redis: " + redis.isReady);

        const app = express();

        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());

        app.use("/", rootRouter);

        const PORT =  process.env.PORT;;
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error(err + "");
        process.exit(1);
    }
};

startApp();