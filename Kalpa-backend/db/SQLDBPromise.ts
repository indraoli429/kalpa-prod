import * as dotenv from "dotenv";
dotenv.config();
import mysqlPromise from "mysql2";

const host = process.env.HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB;

const dbPromise = mysqlPromise
  .createPool({
    host: host,
    user: user,
    password: password,
    database: database,
  })
  .promise();

export default dbPromise;
