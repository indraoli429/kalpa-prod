//abstract common routes code to avoid copy & paste

import { Express, Application } from "express";

export abstract class CommonRoutesConfig {
  app: Application;
  name: string;

  constructor(app: Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
    console.log(this.getName());
    
  }

  getName() {
    return this.name;
  }

  abstract configureRoutes(): Application;
}
