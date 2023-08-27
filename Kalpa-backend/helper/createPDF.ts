import * as fs from "fs";
import moment from "moment";
import * as path from "path";
import pdfMake from "pdfmake";
import { orderDto } from "../dto/order.dto";
import numWords from "num-words";
import { productStockDto } from "../dto/productStock.dto";
import productStock from "../db/model/ProductStock.model";

// constant variables
const fonts = {
  Roboto: {
    normal: "helper/fonts/Roboto-Regular.ttf",
    bold: "helper/fonts/Roboto-Medium.ttf",
    italics: "helper/fonts/Roboto-Italic.ttf",
    bolditalics: "helper/fonts/Roboto-MediumItalic.ttf",
  },
};

/**
 *
 * @param {any} billBoys
 * @return {Document} pdf document
 */
export default function makePDF(billBoys: any, stocks: any) {
  // for generated invoice
  var dir = 'invoice';

  if (!fs.existsSync(dir)){
    console.log('dir invoice found');
    
      fs.mkdirSync(dir);
  }
  let pdfBill = new pdfMake(fonts);

  // Customer Info
  let customerInfo: any = (
    customerName: string,
    invoiceNo: string,
    customerNo: string,
    billDate: string,
    customerAddress: string
  ) => {
    const datee = new Date(billDate);
    const date = datee.toDateString();
    const time = datee.getHours() + `:` + datee.getMinutes();
    return {
      layout: "noBorders",
      table: {
        widths: ["50%", "50%"],
        body: [
          [
            {
              text: "Customer Details",
              bold: true,
            },
            {},
          ],
          [
            "Name: " + customerName,
            {
              text: "Invoice no. " + invoiceNo,
              alignment: "right",
            },
          ],
          [
            "Customer Address: " + customerAddress,
            {
              text: "Transaction Date: " + date + " (" + time + ")",
              rowSpan: 2,
              alignment: "right",
            },
          ],
          ["Contact: " + customerNo, {}],
        ],
      },
    };
  };

  // PDF:Main Body
  let invoiceBill: any = {
    info: {
      title: moment().format("MMM Do YY") + " Invoices",
      author: "NICN Bot",
      subject: "Automated Invoice",
      keywords: "E-Billing, Restaurant, Lodge, Trek",
      creator: "NICN-EBS",
      producer: "NICN",
    },
    pageSize: "A4",
    pageMargins: [40, 150, 40, 70],
    watermark: {
      text: process.env.PDF_WATERMARK,
      opacity: 0.11,
    },
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: "center",
      },
      subheader: {
        fontSize: 16,
        alignment: "center",
      },
      text: {
        alignment: "center",
        fontSize: 10,
      },
    },
    header: {
      margin: [0, 60, 0, 0],
      columns: [
        [
          {
            text: process.env.LODGE_NAME,
            style: "text",
          },
          {
            text: process.env.LODGE_ADDRESS,
            style: "text",
          },
          {
            columns: [
              {
                text: "Tel: +977 " + process.env.LODGE_PHONE,
                link: "tel:" + process.env.LODGE_PHONE,
                alignment: "right",
                width: "45%",
              },
              {
                text: "Email: " + process.env.LODGE_EMAIL,
                link: "mailto:" + process.env.LODGE_EMAIL,
                alignment: "left",
                width: "55%",
              },
            ],
            columnGap: 10,
          },
          {
            text: "\n",
          },
          {
            text: "INVOICE",
            style: "header",
          },
          {
            text: "\n",
          },
        ],
      ],
    },
    footer: {
      margin: [0, 0, 0, 570],
      fontSize: 10,
      columns: [
        {
          with: "auto",
          alignment: "center",
          text:
            `
                      This is computer generated Invoice, no signature required.
                      Tel: +977 ` +
            process.env.LODGE_PHONE +
            ` | Email: ` +
            process.env.LODGE_EMAIL +
            `
                      ` +
            "Kalpa" +
            ` [PAN: ` +
            process.env.LODGE_PAN +
            `]`,
        },
      ],
    },
    content: [],
  };

  invoiceBill["content"].push(
    {
      text:
        "Report generated date: " + moment().format("MMMM Do YYYY, h:mm:ss a"),
      italics: true,
      alignment: "center",
    },
    {
      text: "\n",
    }
  );

  billBoys.map((billBoy: any) => {
    let customerName = billBoy.customerName;
    let customerNo = billBoy.customerNo;
    let billDate = billBoy.billDate;
    let invoiceNo = billBoy.invoiceNo;
    let customerAddress = billBoy.customerAddress;
    // billinfo
    invoiceBill["content"].push(
      customerInfo(
        customerName,
        invoiceNo,
        customerNo,
        billDate,
        customerAddress
      )
    );

    // Line Break
    invoiceBill["content"].push({
      text: "\n",
      alignment: "center",
    });

    // orders tables
    invoiceBill["content"].push({
      layout: "lightHorizontalLines",
      table: createTable(billBoy),
    });

    // PDF: Append Kalpa Signature
    invoiceBill["content"].push(
      {
        text: "\n\n\n",
      },
      {
        layout: "noBorders",
        table: {
          widths: ["60%", "40%"],
          body: [
            [
              {},
              {
                text: process.env.FOR_LODGE,
                alignment: "center",
                bold: true,
              },
            ],
            [
              {},
              {
                text: "For " + process.env.LODGE_NAME,
                alignment: "center",
              },
            ],
          ],
        },
      },
      {
        text: "",
        pageBreak: "before",
      }
    );
  });

  // Stocks tables

  invoiceBill["content"].push({
    layout: "lightHorizontalLines",
    table: createStocks(stocks),
  });

  // new page

  let pdfDoc;
  pdfDoc = pdfBill.createPdfKitDocument(invoiceBill, {});
  pdfDoc.pipe(
    fs.createWriteStream(
      "invoice/" +
        moment().format("MMM Do YY") + ` Bill Date ${billBoys[0].billDate}` +
        "_computer_generated_invoice.pdf"
    )
  );
  pdfDoc.end();
  console.log("pdf bill generated");
}

/**
 *
 * @param {any} billBoy one bill at a time
 * @returns {Object} table
 */
function createTable(billBoy: any) {
  const orders: [orderDto] = billBoy.orders;

  //Order Table: Bill Header
  let tableBody: any = [
    // header
    [
      {
        text: "S.N.",
        bold: true,
      },
      {
        text: "Particulars",
        bold: true,
      },
      {
        text: "Quantity",
        bold: true,
      },
      {
        text: "Rate.",
        bold: true,
      },
      {
        text: "Amount (Rs.)",
        bold: true,
      },
    ],
  ];

  //Order Table: Bill Data
  orders.forEach((e: orderDto, index: number) => {
    tableBody.push([
      index + 1,
      e.productName,
      e.orderQuantity,
      e.price,
      e.price * e.orderQuantity,
    ]);
  });

  // new line
  tableBody.push([{}, {}, {}, {}, {}]);

  //Order Table: Bill Summary
  tableBody.push(
    [
      {
        text: "\nIn words: " + numWords(billBoy.amount) + " rupees only.",
        colSpan: 2,
        rowSpan: 5,
        bold: true,
        alignment: "center",
      },
      {},
      {
        text: "Total Amount",
        colSpan: 2,
        bold: true,
      },
      {},
      {
        text: billBoy.amount,
        bold: true,
      },
    ],
    [
      {},
      {},
      {
        text: "Discount",
        colSpan: 2,
        bold: true,
      },
      {},
      billBoy.discount,
    ],
    [
      {},
      {},
      {
        text: "",
        colSpan: 2,
        bold: true,
      },
      {},
      billBoy.taxableAmount,
    ],
    [
      {},
      {},
      {
        text: ``,
        colSpan: 2,
        bold: true,
      },
      {},
      billBoy.taxAmount,
    ],
    [
      {},
      {},
      {
        text: "Grand Total",
        colSpan: 2,
        bold: true,
      },
      {},
      billBoy.totalAmount,
    ]
  );

  // Order Table
  return {
    headerRows: 1,
    widths: [25, "*", 50, 50, 80],
    body: tableBody,
  };
}

/**
 * Stock table creation
 * returns stock tables
 */

function createStocks(stocks: any) {
  let tableBody: any = [
    // header
    [
      // {
      //   text: "S.N.",
      //   bold: true,
      // },
      {
        text: "Product",
        bold: true,
      },
      {
        text: "Quantity",
        bold: true,
      },
    ],
  ];

  stocks.forEach((e: productStockDto, index: number) => {
    tableBody.push([e.productName, e.quantity]);
  });

  return {
    headerRows: 1,
    widths: ["*", "*"],
    body: tableBody,
  };
}
