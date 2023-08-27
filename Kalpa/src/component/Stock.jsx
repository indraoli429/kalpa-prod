/**
 * Screen for Stock
 */

import {
  Button,
  Breadcrumbs,
  Chip,
  Divider,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import logApi from "../helperApi/logApi";

export default function Billing() {
  const [productStock, setProductStock] = useState([]);
  const [editableRowId, setEditableRowId] = useState(null);
  const [updateQty, setUpdateQty] = useState(0);

  useEffect(() => {
    getProductList();
  }, []);

  // Retrive producStock list

  function getProductList() {
    axios
      .get("/productStock")
      .then((data) => {
        setProductStock(data.data);
      })
      .catch((err) => console.log(err));
  }

  // update product quantity by Id with others value default

  function updateQuantity(id, productName, price) {
    axios
      .patch("/productStock", {
        productStockId: id,
        productName: productName,
        price: price,
        quantity: updateQty,
      })
      .then((data) => {
        getProductList();
        logApi(
          `Stock of productId: ${id}, product name: ${productName}, quantity is changed to ${updateQty}`
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
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
          href="/stock"
        >
          <InventoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Stock
        </Link>
        <Typography color="text.primary">Manage stock</Typography>
      </Breadcrumbs>
      <Divider>
        <Chip label="Stock table" color="success" />
      </Divider>
      {/* <h1>Manage</h1>
      <h2>Stock</h2> */}

      <div>
        <TableContainer
          className="billing-action-table"
          component={Paper}
          style={{ height: "auto" }}
        >
          <Table sx aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#D9D9D9" }}>
              <TableRow>
                <TableCell>
                  <h3>Serial No</h3>
                </TableCell>
                <TableCell>
                  <h3>Stock Name</h3>
                </TableCell>
                <TableCell>
                  <h3>Quantity</h3>
                </TableCell>
                <TableCell>
                  <h3>Action</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productStock.map((x, index) => {
                return (
                  <TableRow
                    // key={}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Typography>{index + 1}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{x.productName}</Typography>
                    </TableCell>
                    <TableCell>
                      {editableRowId === x.productStockId ? (
                        <TextField
                          value={updateQty}
                          type="number"
                          InputProps={{
                            inputProps: { min: 0 },
                          }}
                          onChange={(e) => {
                            setUpdateQty(e.target.value);
                          }}
                        />
                      ) : (
                        <Typography>{x.quantity}</Typography>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        sx={{ color: "#000000" }}
                        onClick={() => {
                          if (editableRowId === null) {
                            setEditableRowId(x.productStockId);
                            setUpdateQty(x.quantity);
                          } else {
                            if (editableRowId === x.productStockId) {
                              setEditableRowId(null);

                              updateQuantity(
                                x.productStockId,
                                x.productName,
                                x.price
                              );
                            }
                          }
                        }}
                      >
                        {editableRowId === x.productStockId ? (
                          <DoneIcon />
                        ) : (
                          <EditIcon />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div></div>
    </div>
  );
}
