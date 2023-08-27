import { CRUD } from "../common/crud.interface";
import productStockDao from "../dao/productStock.dao";
import reportDao from "../dao/report.dao";
import productStock from "../db/model/ProductStock.model";
import billBoys from "../helper/billBoys";
import makePDF from "../helper/createPDF";
import productStockService from "./productStock.service";

class ReportService implements CRUD {
  async create() {}

  async readAll() {}

  async readAllByDate(givenDate: Date) {
    const report = await reportDao.readAllByDate(givenDate);

    return report;
  }

  async readById() {}

  async updateById() {}

  async deleteById() {}

  /**
   *
   * @param givenDate : date
   */
  async exportPdf(givenDate: Date) {
    try {
    // makePDF(customerName);

    // TODO
    // GET Multiple bills and respective orders data in pdf

    let bills: any = await reportDao.readAllByDate(givenDate);
    let stocks: any = await productStockDao.readAll();

    console.log(`stocks in pdf`);
    console.log(stocks);

    // form billBoy
    const BillBoys = await billBoys(bills);
    makePDF(BillBoys, stocks);

    return [BillBoys, stocks];
  } catch (error){
    console.error(error);
    
  }
  }
}

export default new ReportService();
