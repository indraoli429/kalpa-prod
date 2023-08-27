/**
 * Initializes SQL database for Queries
 */

import mysql from "mysql2";
import { Billing } from "../db/model/Billing.model";
import Logs from "../db/model/Logs.model";
import OrderProductStock from "../db/model/OrderProductStock.model";
import Orders from "../db/model/Orders.model";
import productStock from "../db/model/ProductStock.model";

/**
 * Create database
 */

export function createDB() {
  console.log(`GOD the created the Database out of necesssity`);

  const host = process.env.HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB;

  const dbForCreate = mysql.createConnection({
    host: host,
    user: user,
    password: password,
  });

  let query = "CREATE DATABASE kalpa";

  dbForCreate.query(query, (err: any, result: any) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });

  dbForCreate.end();
}

/**
 * Create tables
 * input connection DB
 */

export function createTables(db: any) {
  Billing(db);
  Logs(db);
  productStock(db);
  Orders(db);

  // Don't need 
  // OrderProductStock(db);
}
