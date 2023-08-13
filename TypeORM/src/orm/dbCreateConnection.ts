import {config} from "./configs/ormconfig"

export const dbCreateConnection = async () => {
  config
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    });
};