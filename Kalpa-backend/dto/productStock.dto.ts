import { RowDataPacket } from "mysql2";

export interface productStockDto {
  productStockId?: number;
  productName: String;
  price: number;
  quantity: number;
}
