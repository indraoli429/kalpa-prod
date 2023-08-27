export interface billingDto {
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
}
