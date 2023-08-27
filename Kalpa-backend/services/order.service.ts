import { CRUD } from "../common/crud.interface";
import orderDao from "../dao/order.dao";
import { orderDto } from "../dto/order.dto";

class OrderService implements CRUD {
  async create(order: orderDto) {
    let orderExist: any = await orderDao.orderProductExist(
      order.billingId,
      order.productStockId
    );

    let count: any = Object.values(orderExist[0])[0];

    // In case of product already exist as order
    if (count != 0) {
      console.log(`product already exist as order`);
      return `Order with same product already exist`;
    }

    return orderDao.create(order);
  }

  async readAll() {}

  async readAllById(id: number) {
    return orderDao.readAllByBillId(id);
  }

  async readById() {}

  async updateById() {}

  async updateOrderQuantityById(orderId: number, orderQuantity: number) {
    return orderDao.updateByid(orderId, orderQuantity);
  }

  async deleteById(id: number) {
    return orderDao.deleteById(id);
  }
}

export default new OrderService();
