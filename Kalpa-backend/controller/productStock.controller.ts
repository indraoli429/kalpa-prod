import { Request, Response } from "express";
import productStockService from "../services/productStock.service";

class productStockController {
  async create(req: Request, res: Response) {
    const productStock = await productStockService.create(req.body);
    res.status(200).send(productStock);
  }
  
  async readAll(req: Request, res: Response) {
    const productStock = await productStockService.readAll();
    res.status(200).send(productStock);
  }

  //   async readById(req: Request, res: Response) {}

    async updateById(req: Request, res: Response) {
    const productStock = await productStockService.updateById(req.body);
    res.status(200).send(productStock);
    }

    async deleteById(req: Request, res: Response) {
      // console.log(req);
      
      const id = Number(req.query.id);
      
    const productStock = await productStockService.deleteById(id);
    res.status(200).send(productStock);

    }
}

export default new productStockController();
