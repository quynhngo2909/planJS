import { config } from "./configs/ormconfig"

export const dbCreateConnection = async () => {
    try {
        await config.initialize();
        console.log("Data Source has been initialized!")
    }
    catch (err) {
        console.error("Error during Data Source initialization:", err);
    }
};