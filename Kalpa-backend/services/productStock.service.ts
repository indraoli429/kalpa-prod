import { CRUD } from "../common/crud.interface";
import { productStockDto } from "../dto/productStock.dto";
import productStockDao from "../dao/productStock.dao";
import { orderDto } from "../dto/order.dto";
import orderService from "./order.service";

class productStockService implements CRUD {
  async create(products: productStockDto) {
    return productStockDao.create(products);
  }

  async readById() {}

  async readAll() {
    return productStockDao.readAll();
  }

  async updateById(product: productStockDto) {
    return productStockDao.updateById(product);
  }

  async deleteById(id: number) {
    return productStockDao.deleteById(id);
  }

  /**
   *
   * @param {billingId, orders}
   * returns nothing one way
   * update productStock quantity to respect to orders
   */

  async orderMinus(billingId: number) {
    let productStock: any = await productStockDao.readAll();

    let orders: any = await orderService.readAllById(billingId);

    console.log(`product stock`);
    console.log(productStock);

    orders.forEach((order: orderDto) => {
      let orderQty: number = order.orderQuantity;

      let product: productStockDto = productStock.find(
        (product: any) => product.productStockId === order.productStockId 
      );
      let stockQty: number = product.quantity;

      let updateQty: number = stockQty - orderQty;

      // update qty
      productStockDao.updateQtyById(product.productStockId!, updateQty);
    });
  }
}

export default new productStockService();
