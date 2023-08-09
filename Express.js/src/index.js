const express = require("express");
const rootRouter = require("./routers/routers");
const path = require("path");
const connectToMongoDB = require("./configs/mongodbConnection");
const dotenv = require("dotenv");

dotenv.config();


const startApp = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        await connectToMongoDB(MONGODB_URI);
        console.log("Connected to DB.");

        const app = express();
        app.set("view engine", "ejs");
        app.set("views", path.resolve(__dirname, "views"));

        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());

        app.use("/v1", rootRouter);

        const PORT = parseInt(process.env.PORT) ?? 3000;
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