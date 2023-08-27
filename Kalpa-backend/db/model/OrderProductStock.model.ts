export default function OrderProductStock(db: any) {
  let query = `
  create table if not exists orderProductStock (
    orderProductStockId int not null primary key AUTO_INCREMENT,
    orderId int not null ,
    productStockId int not null ,
    OrderQuantity int default 0,
    FOREIGN KEY (orderId) REFERENCES orders(orderId),
    FOREIGN KEY (productStockId) REFERENCES productStock(productStockId)
    );
    `;

  db.query(query, (err: any, result: any) => {
    if (err) {
      console.log(err);
    }
  });
}
