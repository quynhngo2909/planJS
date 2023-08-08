const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://localhost:27017/products";

const connectToMongoDB = async () => {
    return mongoose.connect(MONGODB_URI);
};

module.exports = connectToMongoDB;