import { Request, Response } from "express";
import billingService from "../services/billing.service";

class BillingController {
  async create(req: Request, res: Response) {
    const billing = await billingService.create(req.body);
    res.status(200).send(billing);
  }

  async readAll(req: Request, res: Response) {
    const billing = await billingService.readAll();
    res.status(200).send(billing);
  }

  async readByInvoiceNo(req: Request, res: Response) {
    let invoiceNo = String(req.query.invoiceNo);
    const billing = await billingService.readByInvoiceNo(invoiceNo);

    res.status(200).send(billing);
  }

  async getActiveBill(req: Request, res: Response) {
    const billing = await billingService.getActiveBill();
    res.status(200).send(billing);
  }

  async updateById(req: Request, res: Response) {
    const billing = await billingService.updateById(req.body);
    res.status(200).send(billing);
  }

  async deleteById(req: Request, res: Response) {}

  async deleteByInvoiceId(req: Request, res: Response) {
    const invoiceId = String(req.query.invoiceId);
    const billing = await billingService.deleteByInvoiceId(invoiceId);
    res.status(200).send(billing);
  }

  async pay(req: Request, res: Response) {
    const paid = await billingService.pay(req.body);
    res.status(200).send(paid);
  }

  async print(req: Request, res: Response) {
    const print = await billingService.increasePrintCount(
      Number(req.body.billingId)
    );
    res.status(200).send(print);
  }
}

export default new BillingController();
