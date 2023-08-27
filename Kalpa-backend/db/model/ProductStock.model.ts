export default function productStock(db: any) {
  let query = `
  CREATE TABLE IF NOT EXISTS productStock(
	productStockId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	productName VARCHAR(200) NOT NULL UNIQUE,
	price INT NOT NULL,
	quantity INT DEFAULT 0
);
    `;

  db.query(query, (err: any, result: any) => {
    if (err) {
      console.log(err);
    }
  });

  /**
   * SELECT ALL command
   */

  // let retrieve = ` select * from productStock;`
  // db.query(retrieve, (err: any, result : any) => {
  //   if (err) throw err;
  // })

  /**
   * INSERT command
   */
// let insert = ` insert into productStock (productStockId, productName, price, quantity) values (2, 'satu', 50, 2);`
// db.query(insert, (err: any, result : any) => {
//   if (err) throw err;
// })

}
