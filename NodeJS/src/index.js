const express = require("express");
const path = require("path");
const productsRouter = require("../src/routers/products")
const port = 3000;

const app = express();



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use("", productsRouter);



app.listen(port, () => console.log(`Listen at http://localhost:${port}`));