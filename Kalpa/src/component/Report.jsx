/**
 * Report screen component
 */

import {
  Box,
  Breadcrumbs,
  Chip,
  Divider,
  Link,
  Switch,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import "../css/main.css";
import DailyReport from "./DailyReport";
import DateReport from "./DateReport";

// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";

import axios from "axios";

export default function Report() {
  /**
   * Toogle false show <DailyReport>
   * <DateReport/>
   */

  const [value, setValue] = useState("1");
  const [bills, setBills] = useState([]);
  const [productStocks, setProductStocks] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Using use effect to render bills and productStocks
  // Based on current date

  useEffect(() => {
    // get current date to set current dates bills

    let dateArray = moment().format().split("T");
    let currentDate = dateArray[0];

    console.log(`useEffect in effect...`);
    console.log(bills);
    getBills(currentDate);
    getProductStocks();
  }, [value]);

  // Retrive bills by date
  function getBills(date) {
    axios
      .get("/report", { params: { date: date } })
      .then((data) => {
        console.log("api report");
        console.log(data.data);
        setBills(data.data);
      })
      .catch((err) => console.log(err));
  }

  function getProductStocks() {
    axios
      .get("/productStock")
      .then((data) => setProductStocks(data.data))
      .catch((err) => console.log(err));
  }

  /**
   *
   * @param {date } date
   * returns {bills} list of bills on input date
   */

  function asyncGetBill(date) {
    console.log(`async inside getBIlls`);
    console.log(date);
    return axios.get("/report", { params: { date: date } });
  }

  /**
   * export pdf Input given date without time
   */

  function exportPdf(givenDate) {
    axios
      .post("/report/exportPdf", {
        date: givenDate,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div>
        <Breadcrumbs>
          <Link
            underline="hover"
            color="inherit"
            sx={{ display: "flex", alignItems: "center" }}
            href="/"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            EBS
          </Link>
          <Link
            underline="hover"
            color="inherit"
            sx={{ display: "flex", alignItems: "center" }}
            href="/report"
          >
            <AssessmentIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Report
          </Link>
          <Typography color="text.primary">Manage Report</Typography>
        </Breadcrumbs>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                centered
                aria-label="lab API tabs example"
              >
                <Tab label="Daily report" value="1" />
                <Tab label="Date wise report" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <DailyReport
                getBills={getBills}
                asyncGetBills={asyncGetBill}
                bills={bills}
                stocks={productStocks}
                exportPdf={exportPdf}
              />
            </TabPanel>
            <TabPanel value="2">
              <DateReport
                getBills={getBills}
                bills={bills}
                asyncGetBills={asyncGetBill}
                exportPdf={exportPdf}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
}
