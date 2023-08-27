import { Application } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import orderController from "../controller/order.controller";

export class OrderRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "OrderRoutes");
  }

  configureRoutes(): Application {
    this.app.route("/order")
    .post(orderController.create)
    .get(orderController.readAllByBillId)
    .patch(orderController.updateOrderQuantityById)
    .delete(orderController.deleteById);

    return this.app;
  }
}