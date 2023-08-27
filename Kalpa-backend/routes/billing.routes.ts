import { Application } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import billingController from "../controller/billing.controller";

export class BillingRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "BillingRoutes");
  }

  configureRoutes(): Application {
    this.app
      .route("/billing")
      .post(billingController.create)
      .get(billingController.readAll)
      .patch(billingController.updateById)
      .delete(billingController.deleteByInvoiceId);

    this.app.route("/billing/invoiceNo").get(billingController.readByInvoiceNo);

    this.app.route("/billing/activeBill").get(billingController.getActiveBill);
    this.app.route("/billing/pay").patch(billingController.pay);
    this.app.route("/billing/print").post(billingController.print);



    return this.app;
  }
}
