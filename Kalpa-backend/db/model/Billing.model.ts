export function Billing(db: any) {
  let query = `
  CREATE TABLE IF NOT EXISTS billing(
	billingId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	invoiceNo VARCHAR(200) , 
	fiscal_year VARCHAR(200),
	customer_name VARCHAR(200),
	customer_PAN VARCHAR(200),
	customer_address VARCHAR(200),
	customer_no VARCHAR(200),
	bill_date TIMESTAMP,
	amount INT,
	discount INT,
	taxable_amount INT,
	tax_amount INT,
	total_amount INT,
	sync_with_IRD BOOLEAN DEFAULT FALSE,
	is_bill_printed BOOLEAN DEFAULT FALSE,
	is_bill_active BOOLEAN DEFAULT FALSE,
	printed_time TIMESTAMP,
	entered_by VARCHAR(200),
	printed_by VARCHAR(200),
	is_realtime BOOLEAN,
	payment_method VARCHAR(200),
	vat_refund_amount INT,
	is_deleted BOOLEAN DEFAULT FALSE,
	copy_of_original VARCHAR(200),
	print_count INT DEFAULT 0
	);
    `;

  db.query(query, (err: any, result: any) => {
    if (err) {
      console.log(err);
    }
  });
}
