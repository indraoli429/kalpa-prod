import { Request, Response } from "express";
import reportService from "../services/report.service";

class ReportController {
  async readAllByDate(req: Request, res: Response) {
    let date: any = req.query.date;
    const report = await reportService.readAllByDate(date);

    
    
    res.status(200).send(report);
  }

  async exportPdf(req: Request, res: Response) {
    const report = await reportService.exportPdf(req.body.date);
    res.status(200).send(report);
  }
}

export default new ReportController();
