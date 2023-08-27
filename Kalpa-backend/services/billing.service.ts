import moment from "moment";
import IRDApi from "../API/IRD.api";
import { CRUD } from "../common/crud.interface";
import billingDao from "../dao/billing.dao";
import orderDao from "../dao/order.dao";
import productStock from "../db/model/ProductStock.model";
import { billingDto } from "../dto/billing.dto";
import createInvoiceNO from "../helper/createInvoiceNo";
import { getCurrentFiscalYear } from "../helper/fiscalYear";
import printFromMachine from "../helper/Print";
import productStockService from "./productStock.service";

class BillingService implements CRUD {
  async create(billing: billingDto) {
    console.log();

    // Get count of NULL ROWS
    let countData: any = await billingDao.getNullRowsCount();
    let count: number = Number(Object.values(countData[0])[0]);

    if (count === 0) {
      return billingDao.create(billing);
    }
    return `bill Not created because other pending bill still exist`;
  }

  async readById() {}

  async readByInvoiceNo(invoiceNo: string) {
    return billingDao.readBillByInvoiceNo(invoiceNo);
  }

  async getActiveBill() {
    return billingDao.getActiveBill();
  }
  async readAll() {
    return billingDao.readAll();
  }

  async updateById(billing: billingDto) {
    return billingDao.updateByid(billing);
  }

  async deleteById(id: number) {}

  async deleteByInvoiceId(invoiceId: string) {
    return billingDao.deleteByInvoiceId(invoiceId);
  }

  async pay(billing: billingDto) {
    console.log(`inside billing service`);
    console.log(JSON.stringify(billing));

    const paid: any = await this.updateById(billing);
    const changedRows = paid.changedRows;
    if (changedRows === 1) {
      const dbBill: billingDto | any = await billingDao.readBillById(
        billing.billingId
      );

      // Disbled IRDApi
      // let irdRes = await IRDApi(dbBill);

      let irdRes = `dummy response`;

      //print bill
      let billId = Number(billing.billingId);

      this.printBill(billId);

      // Decrease stocks by order
      await productStockService.orderMinus(billId);

      return irdRes;
    }

    return 500;
  }

  // Print servic

  async printBill(billId: number) {
    console.log(`about to be print`);

    const billData = await billingDao.readBillById(Number(billId));
    const orders = await orderDao.readAllByBillId(billId);

    console.log(billData);
    console.log(orders);

    let billInfo = {
      customerName: billData.customer_name,
      printDate: moment().format(),
      invoiceNo: billData.invoiceNo,
      staffName: billData.entered_by,
      subTotal: billData.amount,
      discount: billData.discount,
      totalAmount: billData.total_amount,
    };

    console.log(`bill info`);
    console.log(billInfo);

    printFromMachine(billInfo, orders);
  }

  async increasePrintCount(billingId: number) {
    const billData = await billingDao.readBillById(Number(billingId));
    const orders = await orderDao.readAllByBillId(billingId);

    console.log(billData);
    console.log('bill orders: ');
    
    console.log(orders);

    let billInfo = {
      customerName: billData.customer_name,
      printDate: billData.bill_date,
      invoiceNo: billData.invoiceNo,
      staffName: billData.entered_by,
      subTotal: billData.amount,
      discount: billData.discount,
      totalAmount: billData.total_amount,
    };

    let printCount: number = Number(billData.print_count);

    // Increase print count and print bill
    billingDao.increasePrintCount(billingId, printCount);
    printFromMachine(billInfo, orders);
  }
}

export default new BillingService();
