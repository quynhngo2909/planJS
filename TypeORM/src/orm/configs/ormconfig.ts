import { DataSource } from "typeorm"
import * as dotenv from "dotenv";

dotenv.config();

export const config = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    entities: ["src/orm/entities/**/*.ts"],
    migrations: ["src/orm/migrations/**/*.ts"]
});
