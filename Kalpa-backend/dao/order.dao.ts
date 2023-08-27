import dbPromise from "../db/SQLDBPromise";
import { orderDto } from "../dto/order.dto";

class OrderDAO {
  constructor() {
    console.log(`Generate new instance of OrderDAO`);
  }

  async create(order: orderDto) {
    const sql = `
    INSERT INTO orders (billingId, productStockId, productName, price, orderQuantity) 
    VALUES(${order.billingId}, ${order.productStockId}, "${order.productName}", ${order.price},  ${order.orderQuantity});
    `;

    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async readAllByBillId(id: number) {
    const sql = `
    SELECT  *
    FROM orders
    WHERE orders.billingId = ${Number(id)}
    `;

    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  /**
   * Find order by billId and productId
   * use to validate if same product order already exits in bill
   * @param billId
   * @param  productStockId
   * @returns boolean
   */

  async orderProductExist(billId: number, productStockId: number) {
    const sql = `
    SELECT COUNT(orderId)
    FROM orders
    WHERE billingId = ${billId} AND productStockId = ${productStockId};
    `;

    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  /**
   *
   * @param orderId
   * @param orderQuantity
   * @returns
   */
  async updateByid(orderId: number, orderQuantity: number) {
    const sql = `
    UPDATE orders 
    SET orderQuantity = ${orderQuantity}
    WHERE orderId = ${orderId} 
    
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
    const sql = `DELETE FROM orders WHERE orderId = ${id}`;

    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }
}

export default new OrderDAO();
