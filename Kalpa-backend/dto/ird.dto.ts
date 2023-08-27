export default interface irdDTO {
  username: string;
  password: string;
  seller_pan: string;
  buyer_pan: string;
  buyer_name: string;
  fiscal_year: string;
  invoice_number: string;
  invoice_date: string; // Cause Nepal goverment use . not - in date
  total_sales: number;
  taxable_sales_vat: number;
  vat: number;
  excisable_amount: number;
  excise: number;
  taxable_sales_hst: number;
  hst: number;
  amount_for_esf: number;
  esf: number;
  export_sales: number;
  tax_exempted_sales: number;
  isrealtime: boolean;
  datetimeclient: Date;
}
