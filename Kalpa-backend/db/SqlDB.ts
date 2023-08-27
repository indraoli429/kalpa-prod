import { createDB, createTables } from "../helper/SQLDBInit";
import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

const host = process.env.HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB;

console.log(`hello host...${host}`);

const db = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database
});

export default db;
