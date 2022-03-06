const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/errors");

app.use(express.json());
//import all products
const products = require("./routes/product");
app.use("/api/v1/", products);

//middleware to handle errors
app.use(errorMiddleware);
module.exports = app;
