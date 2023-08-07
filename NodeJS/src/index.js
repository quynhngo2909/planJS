const express = require("express");
const path = require("path");
const rootRouter = require("../src/routers/rootRouter")
const port = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use("", rootRouter);

app.listen(port, () => console.log(`Listen at http://localhost:${port}`));