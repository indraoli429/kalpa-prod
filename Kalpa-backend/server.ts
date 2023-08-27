/**
 * Server creation and configuration
 *  DB inital configuration
 *  Routing configuration
 */

import mysql from "mysql2";
import express, { Express } from "express";
import { createDB, createTables } from "./helper/SQLDBInit";
import { CommonRoutesConfig } from "./common/common.routes.config";
import cors from "cors";
import { Request, Response } from "express";

/**
 * Routes imported
 */
import { productStockRoutes } from "./routes/productStock.routes";
import db from "./db/SqlDB";
import { BillingRoutes } from "./routes/billing.routes";
import { OrderRoutes } from "./routes/order.routes";
import { LogRoutes } from "./routes/log.routes";
import { ReportRoutes } from "./routes/report.routes";

export default class BaseServer {
  // Constant to import
  public app: Express = express();
  public routes: Array<CommonRoutesConfig> = [];

  /**
   * env configure
   */
  public port: any = process.env.PORT;
  public host = process.env.HOST;
  public user = process.env.DB_USER;
  public password = process.env.DB_PASSWORD;
  public database = process.env.DB;

  constructor() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  /**
   * Listening server and routing
   */
  routing() {
    console.log('\x1b[32m%s\x1b[0m', 'API started with routing');

    this.routes.push(new productStockRoutes(this.app));
    this.routes.push(new BillingRoutes(this.app));
    this.routes.push(new OrderRoutes(this.app));
    this.routes.push(new LogRoutes(this.app));
    this.routes.push(new ReportRoutes(this.app));

    // Starting server
    this.app
      .listen(this.port, () => {
        console.log('\x1b[35m%s\x1b[0m', `Kalpa server listening at ${this.port}`);

        this.routes.forEach((route: CommonRoutesConfig) => {
          console.log(`Routes configured for ${route.getName()}`);
        });
      })
      .on("error", (err) => console.log('\x1b[31m%s\x1b[0m', err));

    this.app.get("/", (req: Request, res: Response) => {
      console.log('\x1b[32m%s\x1b[0m',`Server Running at ${this.port}`);

      res.send(`⚡⚡⚡⚡⚡⚡ server respond ⚡⚡⚡⚡⚡⚡⚡`);
    });
  }

  /**
   * Database Connection
   */
  connectDB() {
    console.log(`Connect Db logsss.......`);

    // create the connection to database
    db.connect((err: any) => {
      console.log('checking db connection');
      if (err) {
        console.log('\n');
        console.log('\x1b[31m%s\x1b[0m',`db got error and code is:----${err.errno}`);
        // In case of bad DB error or db does not exist
        // 1049 means BAD DB error
        console.log('now, lets create db here');
        // createDB();
        if (err.errno === 1049) {
          console.log(`going to init db from 1049......`)
          createDB();
          db.connect();
        }
      }
      else {
        console.log('MySql default connection started...')
        console.log('\x1b[32m%s\x1b[0m',`MySql connected...`);
        createTables(db);
      }
    });
  }
}
