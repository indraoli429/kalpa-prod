/**
 * Component for daily report
 */

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import splitDate from "../helperApi/splitDate";
import ReportTable from "./ReportTable";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";

export default function DailyReport(props) {

   // Snackbars
const [openS, setOpenS] = useState(false);

const snackbarClick = () => {
  setOpenS(true);
};

const snackbarClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }
  setOpenS(false);
};

  let bills = props.bills;
  let stocks = props.stocks;

  console.log(`Daily reports ...`);
  console.log(JSON.stringify(bills, null, 2));

  return (
    <div>
      <div className="heads">
        {/* <h1>Daily Report</h1> */}
        {/* <span> */}
        <Button
          className="pdf-btn"
          variant="contained"
          color="success"
          size="medium"
          onClick={() => {
            if (bills?.length !== 0) {
              let uniDate = bills[0].bill_date;
              let d = splitDate(uniDate);

              console.log(`export pdf clicked`);
              console.log(d);

              props.exportPdf(d);
              snackbarClick();
            }
          }}
        >
          Export to PDF
        </Button>
        <Snackbar
            open={openS}
            autoHideDuration={3000}
            onClose={snackbarClose}
            message="PDF Exported!"
            // action={action}
          />
      </div>
      <div>
        {
          // Case for no bills
          bills?.length !== 0 && (
            <ReportTable
              bills={bills}
              getBills={props.getBills}
              asyncGetBills={props.asyncGetBills}
            />
          )
        }
      </div>
      <div className="report-stock-container">
        <h1>Stock Remaining</h1>
        <div>
          <TableContainer className="report-action-table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#D9D9D9" }}>
                <TableRow>
                  <TableCell>
                    <h3>Stock Name</h3>
                  </TableCell>
                  <TableCell>
                    <h3>Quantity</h3>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stocks?.map((x, index) => {
                  return (
                    <TableRow
                      // key={}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>
                        <Typography>{x.productName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{x.quantity}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
