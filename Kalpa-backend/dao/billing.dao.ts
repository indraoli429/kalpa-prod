/**
 *
 */

import dbPromise from "../db/SQLDBPromise";
import { billingDto } from "../dto/billing.dto";
import createInvoiceNO from "../helper/createInvoiceNo";
import { getCurrentFiscalYear } from "../helper/fiscalYear";
import moment from "moment";

class billingDAO {
  constructor() {
    console.log(`Generate new instance of billingDAO`);
  }

  async create(billing: billingDto) {
    const sql = `
    INSERT INTO billing(is_bill_active) values (true);
    `;

    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async readAll() {
    const sql = `
                SELECT * FROM billing
    `;

    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  /**
   *
   * get second last row invoice no
   */
  async getPrevRow() {
    const sql = `
    SELECT * from billing WHERE invoiceNo IS NOT NULL;
    `;

    try {
      const [rows, fields] = await dbPromise.execute(sql);

      let resultRows: any = rows;

      let rowL = resultRows.length;

      // In case of no row data
      if (rowL === 0) {
        return [null, 1];
      }
      // else return previous fiscal year and bill no
      let prevFY = resultRows[rowL - 1].fiscal_year;
      let prevInvNo = resultRows[rowL - 1].invoiceNo;
      let prevBillNo = prevInvNo.split("/")[2];

      return [prevFY, prevBillNo];
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  /**
   * Get bill based on invoiceNo
   */
  async readBillByInvoiceNo(invoiceNo: string) {
    const sql = `
                  SELECT * FROM billing WHERE invoiceNo = "${invoiceNo}"
                `;

    try {
      const [rows, fields]: any = await dbPromise.execute(sql);
      return rows[0];
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  /**
   * Read bill by billingId
   */
  async readBillById(id: number) {
    const sql = `
                  SELECT * FROM billing WHERE billingId = ${id}
    `;
    try {
      const [rows, fields]: any = await dbPromise.execute(sql);
      return rows[0];
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  /**
   * get bill which is active True
   */
  async getActiveBill() {
    const sql = `
                  SELECT * FROM billing WHERE is_bill_active = true;
        `;
    try {
      const [rows, fields]: any = await dbPromise.execute(sql);
      return rows[0];
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  /**
   * Get billing records whose rows invoiceNo IS NULL
   *
   */

  async getNullRowsCount() {
    const sql = `
                  SELECT COUNT(*) FROM billing WHERE invoiceNo IS NULL;
                `;

    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async updateByid(billing: billingDto) {
    const invoiceNo = await createInvoiceNO();
    const fiscalYear = getCurrentFiscalYear();
    const date = moment().format();

    const sql = `
UPDATE billing
SET 
invoiceNo = "${invoiceNo}",
fiscal_year = "${fiscalYear}",
customer_name = "${billing.customerName}",
customer_PAN = "${billing.customerPAN}",
customer_ADDRESS = "${billing.customerAddress}",
customer_NO = "${billing.customerNo}",
bill_date = "${date}",
amount = ${billing.amount},
discount = ${billing.discount},
total_amount = ${billing.totalAmount},
sync_with_IRD = ${billing.syncWithIRD},
is_bill_printed = ${billing.isBillPrinted},
is_bill_active = ${billing.isBillActive},
printed_time = "${date}",
entered_by = "${billing.enteredBy}",
printed_by = "${billing.printedBy}",
is_realtime = ${billing.isRealTime},
payment_method = "${billing.paymentMethod}",
vat_refund_amount = 0,
is_deleted = ${billing.isDeleted},
print_count = ${billing.printCount} 
WHERE billingId = ${billing.billingId};
    `;

    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  /**
   *
   * So according to IRD
   * Bill no delete so set is_deleted state true
   * delete bill according to invoiceId
   */
  async deleteByInvoiceId(invoiceId: string) {
    const sql = `
    UPDATE billing
    SET 
    is_deleted = true
    WHERE invoiceNo = "${invoiceId}";
    `;

    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  /**
   * increase print count with given bill id
   *
   * @params {billingId, previousCount} int given bill id
   * @return return valid db response in row
   */

  async increasePrintCount(billingId: number, previousCount: number){
    const sql = `
    UPDATE billing
    SET 
    print_count = ${previousCount + 1} 
    WHERE billingId = ${billingId};
    
    `

    try {
      const [rows, fields] = await dbPromise.execute(sql);
      return rows;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

}

export default new billingDAO();
