const mongoose = require("mongoose");

// require("dotenv").config();
// const MONGODB_URI = process.env.MONGODB_URI;

// const connectToMongoDB = async () => {
//     try {
//         await mongoose.connect(MONGODB_URI);
//         console.log("Connected to DB");
//     }
//     catch (err) {
//         console.log(err + "");
//     }
// };

// module.exports = connectToMongoDB;

module.exports = connectToMongoDB = (mongoDbURI) => {
    return mongoose.connect(mongoDbURI);
}