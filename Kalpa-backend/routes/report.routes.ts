import { Application } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import reportController from "../controller/report.controller";

export class ReportRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "ReportRoutes");
  }

  configureRoutes(): Application {
    this.app.route("/report").get(reportController.readAllByDate);

    this.app.route("/report/exportPdf").post(reportController.exportPdf);

    return this.app;
  }
}
