const express = require("express");
const rootRouter = require("./routers/routers");
const path = require("path");
const connectToMongoDB = require("./configs/mongodbConnection");

connectToMongoDB()
    .then(() => {
        console.log("Connected to MongoDB");
        const app = express();
        app.set("view engine", "ejs");
        app.set("views", path.resolve(__dirname, "views"));

        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());

        app.use("/api", rootRouter);

        const Port = 3000;
        app.listen(Port, () => {
            console.log(`Server is running at http://localhost:${Port}`);
        });
    });
