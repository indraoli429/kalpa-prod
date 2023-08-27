import { Request, Response } from "express";
import orderService from "../services/order.service";

class OrderController {
  async create(req: Request, res: Response) {
    const order = await orderService.create(req.body);
    res.status(200).send(order);
  }

  async readAllByBillId(req: Request, res: Response) {
    const id = Number(req.query.id);

    const order = await orderService.readAllById(id);
    res.status(200).send(order);
  }

  async readAll(req: Request, res: Response) {}

  async updateById(req: Request, res: Response) {}

  async updateOrderQuantityById(req: Request, res: Response) {
    const orderId = req.body.orderId;
    const orderQuantity = req.body.orderQuantity;

    const order = await orderService.updateOrderQuantityById(
      orderId,
      orderQuantity
    );
    res.status(200).send(order);
  }

  async deleteById(req: Request, res: Response) {
    const order = await orderService.deleteById(Number(req.query.id));
    res.status(200).send(order);
  }
}

export default new OrderController();
