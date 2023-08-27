import { Application } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import logController from "../controller/log.controller";

export class LogRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "BillingRoutes");
  }

  configureRoutes(): Application {
    this.app
      .route("/logs")
      .post(logController.create)
      .get(logController.readAll);

    return this.app;
  }
}
