const escpos = require("escpos");
escpos.Network = require("escpos-network");

export default function printFromMachine(billInfo: any, orders: any) {
  console.log('printer addresses not available');
  
  console.log(process.env.PRINTER_IP);
  
  const device = new escpos.Network(process.env.PRINTER_IP, 9100);
  const options = { encoding: "GB18030" };
  const printer = new escpos.Printer(device, options);

  const datee = new Date(billInfo.printDate)
  const date = datee.toDateString();
  const time = datee.getHours() +`:`+ datee.getMinutes();

  device.open(function () {
    printer.align("CT").text(`Kalpa Production`) + 
    printer.align("CT").text(`ad: `+ process.env.LODGE_ADDRESS + ` ph:` + process.env.LODGE_PHONE);
    printer.drawLine();
    printer.align("CT").text(`PURCHASE`);
    printer.align("CT").text(`Invoice no. ` +billInfo.invoiceNo);
    printer.align("CT").text(`Date: `+date + ` (`+time + `)`);
    printer.align("CT").text(`Customer: ` +billInfo.customerName);

    printer.drawLine();
    printer.align("CT").tableCustom([
      { text: "Item", align: "LEFT", width: 0.40 },
      { text: "Qty", align: "CENTER", width: 0.1 },
      { text: "Price", align: "CENTER", width: 0.15 },
      { text: "Amount", align: "RIGHT", width: 0.15 },
    ]);

    printer.drawLine();
    orders.map((order: any) => {
      let item = order.productName;
      let rate = order.price;
      let qty = order.orderQuantity;
      let amount = rate * qty;

      return printer.tableCustom([
        { text: item, align: "LEFT", width: 0.40 },
        { text: qty, align: "CENTER", width: 0.1 },
        { text: rate, align: "CENTER", width: 0.15 },
        { text: amount, align: "CENTER", width: 0.15 },
      ]);
    });

    printer.align("RT").text(`Subtotal: ` +billInfo.subTotal);
    printer.align("RT").text(`Discount: ` +billInfo.discount);
    printer.align("RT").text(`Grand Total: ` +billInfo.totalAmount);

    printer.drawLine();
    printer.newLine().align("RT").text(`Checked by: ` +billInfo.staffName);

    // printer.align("CT").drawLine();
    // printer.newLine().align("RT").text("Grand total: Rs./-");
    // printer.align("CT").drawLine();
    printer
      .style("I")
      .text("*This is not intended as invoice");
    
    printer.align("CT")
      .style("I")
      .text("Thank you!")
    printer.newLine().cut().close();      
  });
}
