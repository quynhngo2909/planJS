import * as mongoose from "mongoose";

export const connectToMongoDB = async(mongoDbURI: any) => {
    return await mongoose.connect(mongoDbURI);
}