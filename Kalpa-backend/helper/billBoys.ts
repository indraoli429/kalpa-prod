/**
 * What are bill boys?
 * They are list of cool boys who got all your bills info along with respective order infos
 * just given them bills
 * And they will give you bills with orders
 * These guys were created to simpliy completion of RDBMS in billing and order in database
 * They simplify for us. That why they are cool guys :grinning :smile:
 */

import orderDao from "../dao/order.dao";
import { billingDto } from "../dto/billing.dto";
import { orderDto } from "../dto/order.dto";
import orderService from "../services/order.service";

export default async function billBoys(bills: [billingDto]) {
  const billBoys = await Promise.all(
    bills.map(async (bill) => {
      let billOrders: any = await orderService.readAllById(bill.billingId);

      let billBoy = new BillBoy(bill, billOrders);
      return billBoy;
    })
  );

  console.log(billBoys);
  
  
  return billBoys;
}

// Class for billBoy
class BillBoy {
  billingId: number;
  invoiceNo: number; // Sample : INV/79-80/1789
  fiscalYear: string;
  customerName: string;
  customerPAN: number;
  customerAddress: string;
  customerNo: number;
  billDate: Date;
  amount: number;
  discount: number;
  taxableAmount: number;
  taxAmount: number;
  totalAmount: number;
  syncWithIRD: boolean;
  isBillPrinted: boolean;
  isBillActive: boolean;
  printedTime: Date;
  enteredBy: string;
  printedBy: string;
  isRealTime: boolean;
  paymentMethod: string;
  vatRefundAmount: number;
  isDeleted: boolean;
  copyOfOrigin: string;
  printCount: number;

  orders: [orderDto];

  constructor(bill: any, orders: [orderDto]) {
    this.billingId = bill.billingId;
    this.invoiceNo = bill.invoiceNo; // Sample : INV/79-80/1789
    this.fiscalYear = bill.fiscal_year;
    this.customerName = bill.customer_name;
    this.customerPAN = bill.customer_PAN;
    this.customerAddress = bill.customer_address;
    this.customerNo = bill.customer_no;
    this.billDate = bill.bill_date;
    this.amount = bill.amount;
    this.discount = bill.discount;
    this.taxableAmount = bill.taxable_amount;
    this.taxAmount = bill.tax_amount;
    this.totalAmount = bill.total_amount;
    this.syncWithIRD = bill.sync_with_IRD;
    this.isBillPrinted = bill.is_bill_printed;
    this.isBillActive = bill.is_bill_active;
    this.printedTime = bill.printed_time;
    this.enteredBy = bill.entered_by;
    this.printedBy = bill.printed_by;
    this.isRealTime = bill.is_realTime;
    this.paymentMethod = bill.payment_method;
    this.vatRefundAmount = bill.vat_refund_amount;
    this.isDeleted = bill.is_deleted;
    this.copyOfOrigin = bill.copy_of_original;
    this.printCount = bill.print_count;

    this.orders = orders;
  }
}
