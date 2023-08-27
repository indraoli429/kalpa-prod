import { Request, Response, NextFunction, Application } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import productStockController from "../controller/productStock.controller";

const express = require("express");

// const router = express.Router();
const db = require("../server");

export class productStockRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "productStockRoutes");
  }

  configureRoutes(): Application {
    this.app.route("/productStock")
    .get(productStockController.readAll)
    .post(productStockController.create)
    .patch(productStockController.updateById)
    .delete(productStockController.deleteById);

    return this.app;
  }
}

// router.get(
//   "/stock",
//   function (req: Request, res: Response, next: NextFunction) {
//     db.query("SELECT * FROM productStock", function (err, rs) {
//       res.status(200).send("dskjvn");
//     });
//   }
// );
