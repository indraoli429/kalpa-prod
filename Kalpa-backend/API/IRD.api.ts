import irdDTO from "../dto/ird.dto";
import axios from "axios";
import { billingDto } from "../dto/billing.dto";
import moment from "moment";
import NepaliDate from "nepali-date-converter";

export default async function IRDApi(dbBill: any) {
  const IRDPATH = "https://cbapi.ird.gov.np/api/bill";
  const mDate = moment().format();
  const splitDate = mDate.split("T");

  const clientDatesSplit = mDate.split("+");
  const clientDate = clientDatesSplit[0];

  console.log(`IRDs..`);
  console.log(dbBill);

  // Mapping db props to DTO props

  let billing: billingDto = dbBill;
  billing.fiscalYear = dbBill.fiscal_year;
  billing.invoiceNo = dbBill.invoiceNo;
  billing.totalAmount = dbBill.total_amount;

  let fYear = billing.fiscalYear.replace(/-/g, ".");

  let cNepaliDate = new NepaliDate();
  let nDate = cNepaliDate.format("YYYY.MM.DD");

  

  const IRD = {
    username: "999999999",
    password: "999999999",
    seller_pan: "999999999",
    buyer_pan: "",
    buyer_name: "",
    fiscal_year: fYear,
    invoice_number: billing.invoiceNo,
    invoice_date: nDate,
    total_sales: billing.totalAmount,
    taxable_sales_vat: 0,
    vat: 0,
    excisable_amount: 0,
    excise: 0,
    taxable_sales_hst: 0,
    hst: 0,
    amount_for_esf: 0,
    esf: 0,
    export_sales: 0,
    tax_exempted_sales: 0,
    isrealtime: true,
    datetimeclient: clientDate,
  };

  try {
    const res = await axios.post(IRDPATH, IRD);
    console.log(res);

    return res.data;
  } catch (err) {
    console.log(err);
    return;
  }
}
