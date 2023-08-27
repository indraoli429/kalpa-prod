import { Request, Response } from "express";
import logService from "../services/log.service";

class LogController {
  async create(req: Request, res: Response) {
    const log = await logService.create(req.body);
    res.status(200).send(log);
  }

  async readAll(req: Request, res: Response) {
    const log = await logService.readAll();
    res.status(200).send(log);
  }
}

export default new LogController();
