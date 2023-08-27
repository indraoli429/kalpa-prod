export default function Orders(db: any) {
  let query = `
  create table if not exists orders(
    orderId int not null primary key AUTO_INCREMENT,
    billingId int not null,
    productStockId int not null,
    productName VARCHAR(200) not null,
    price INT NOT NULL,
    orderQuantity int default 0,
    FOREIGN KEY (billingId) REFERENCES billing(billingId)
    );
    `;

  db.query(query, (err: any, result: any) => {
    if (err) {
      console.log(err);
    }
  });
}
