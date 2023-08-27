/**
 * create invoice no
 * I used my lot of brain power for this
 * and later I drew pseudo code and it help me a lot
 */

import billingDao from "../dao/billing.dao";
import { getCurrentFiscalYear } from "./fiscalYear";

export default async function createInvoiceNO() {
  // long story names LOL
  const [prevFY, prevBillNo]: any = await billingDao.getPrevRow();

  const currentFY = getCurrentFiscalYear();

  console.log(prevFY);
  console.log(prevBillNo);

  console.log(`${currentFY}====${prevFY} `);

  if (currentFY === prevFY) {
    let billNo = Number(prevBillNo) + 1;
    let invoiceNo = `INV/${currentFY}/${billNo}`;
    return invoiceNo;
  } else {
    console.log(`else is executed
    `);

    let billNo = Number(1);
    let invoiceNo = `INV/${currentFY}/${billNo}`;
    return invoiceNo;
  }
}
