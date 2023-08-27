import productStock from "../db/model/ProductStock.model";
import { productStockDto } from "../dto/productStock.dto";
import { OkPacket } from "mysql2";
import { Request, Response, NextFunction } from "express";
import mysql from "mysql2/promise";
import dbPromise from "../db/SQLDBPromise";

class productStockDao {
  constructor() {
    console.log(`Generated new instance of productStock`);
    // this.connectDB();
  }

  async create(product: productStockDto) {
    console.log(`stock created`);

    let sql = `INSERT INTO productStock(productName, price, quantity) 
    values("${product.productName}" , ${product.price}, ${product.quantity})`;

    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async readAll() {
    let sql = `SELECT * FROM productStock`;

    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async updateById(product: productStockDto) {
    let sql = `
                UPDATE productStock
                SET productName="${product.productName}", price=${product.price}, quantity=${product.quantity}
                WHERE productStockId = ${product.productStockId}
              `;

    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async updateQtyById(productStockId: number, quantity: number) {
    let sql = `
                UPDATE productStock
                SET quantity=${quantity}
                WHERE productStockId = ${productStockId}
              `;

    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async deleteById(id: number) {
    const sql = `
                  DELETE FROM productStock WHERE productStockId = ${id};
                `;
    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }
}

export default new productStockDao();
