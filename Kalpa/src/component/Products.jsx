/**
 * Screen for billing
 */

import {
  Button,
  Breadcrumbs,
  Chip,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AddIcon from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import { Fab } from "@mui/material";
import ProductCss from "../css/products.module.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { Done } from "@mui/icons-material";
import logApi from "../helperApi/logApi";
import DeletePopup from "./DeletePopup";
import Snackbar from "@mui/material/Snackbar";

export default function Product() {
  const [productStock, setProductStock] = useState([]);
  const [inputName, setInputName] = useState();
  const [inputPrice, setInputPrice] = useState();
  const [editableRowId, setEditableRowId] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [updatedName, setUpdatedName] = useState();
  const [open, setOpen] = useState(false);
  const deleteOpen = () => setOpen(true);
  const deleteClose = () => setOpen(false);

  useEffect(() => {
    console.log(`use effect is ran....`);
    getProductStockList();
  }, []);
  const [deleteId, setDeleteId] = useState();

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

  // Function to add product
  function addProduct() {
    // Check if price is valid number
    if (Number(inputPrice) && inputName !== "") {
      axios
        .post("/productStock", {
          productName: inputName,
          price: inputPrice,
          quantity: 0,
        })
        .then((data) => {
          getProductStockList();

          // Logs entry
          logApi(
            `Product created with name: ${inputName} and price : ${inputPrice}`
          );
          // open snackbar
          snackbarClick();
        })
        .catch((err) => console.log(err));
    }
  }

  // Retrives product stocks list

  function getProductStockList() {
    axios
      .get("/productStock")
      .then((data) => {
        setProductStock(data.data);
      })
      .catch((err) => console.log(err));
  }

  // Update product based on id and set default quantity
  function updateProduct(productStockId, quantity) {
    if (updatedPrice >= 0) {
      let name = updatedName.trim();
      let price = updatedPrice;

      axios
        .patch("/productStock", {
          productStockId: productStockId,
          productName: name,
          price: price,
          quantity: quantity,
        })
        .then((data) => {
          getProductStockList();

          // Logs entry
          logApi(
            `Product updated  with productStockId: ${productStockId}, name: ${name} and price : ${price}`
          );
        })
        .catch((err) => console.log(err));
    }
  }

  // Delete product
  function deleteProduct(productStockId) {
    console.log("product delete api");
    console.log(productStockId);
    axios
      .delete("/productStock", { params: { id: productStockId } })
      .then((data) => {
        getProductStockList();

        // Logs entry
        logApi(`Product deleted of productStockId : ${productStockId}`);
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
          <ProductionQuantityLimitsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Product
        </Link>
        <Typography color="text.primary">Manage Product</Typography>
      </Breadcrumbs>
      <Divider>
        <Chip label="Products" color="success" />
      </Divider>
      {/* <h1>Manage</h1>
      <h5 className={ProductCss.h5}>Products</h5> */}

      <div
        className="customer-inputs"
        style={{ "align-self": "center !important", width: "fit-content" }}
      >
        <div className="billing-customer-input">
          <TextField
            sx={{ borderColor: "#D9D9D9", backgroundColor: "#FFFFFF" }}
            label="Product Name"
            variant="outlined"
            onChange={(e) => {
              setInputName(e.target.value);
            }}
          />
        </div>
        <div className="billing-customer-input">
          <TextField
            sx={{ borderColor: "#D9D9D9", backgroundColor: "#FFFFFF" }}
            type="number"
            label="Price"
            value={inputPrice}
            variant="outlined"
            onChange={(e) => {
              let value = e.target.value;
              if (value >= 0) {
                setInputPrice(value);
              } else {
                setInputPrice(0);
              }
            }}
          />
        </div>

        <div className={ProductCss.addBtnWrpr}>
          <Fab
            className={ProductCss.addBtn}
            size="large"
            color="success"
            aria-label="add"
            onClick={() => {
              addProduct();
            }}
          >
            <AddIcon />
          </Fab>
          <Snackbar
            open={openS}
            autoHideDuration={3000}
            onClose={snackbarClose}
            message="Successfully Product added!"
            // action={action}
          />
        </div>
      </div>
      <div>
        <TableContainer className={ProductCss.producttable}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#D9D9D9" }}>
              <TableRow>
                <TableCell>
                  <h3>Serail No</h3>
                </TableCell>
                <TableCell>
                  <h3>Product Name</h3>
                </TableCell>
                <TableCell>
                  <h3>Price</h3>
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
                      {x.productStockId === editableRowId ? (
                        <TextField
                          value={updatedName}
                          onChange={(e) => {
                            setUpdatedName(e.target.value);
                          }}
                        />
                      ) : (
                        <Typography>{x.productName}</Typography>
                      )}
                    </TableCell>
                    <TableCell onChange={(e) => {}}>
                      {x.productStockId === editableRowId ? (
                        <TextField
                          value={updatedPrice}
                          type="number"
                          onChange={(e) => {
                            setUpdatedPrice(e.target.value);
                          }}
                        />
                      ) : (
                        <Typography id="price-id">{x.price}</Typography>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        sx={{ color: "#000000" }}
                        onClick={() => {
                          if (editableRowId === null) {
                            setEditableRowId(x.productStockId);
                            setUpdatedName(x.productName);
                            setUpdatedPrice(x.price);
                          } else {
                            if (editableRowId === x.productStockId) {
                              setEditableRowId(null);
                              updateProduct(x.productStockId, x.quantity);
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
                      <Button
                        sx={{ color: "#000000" }}
                        onClick={() => {
                          deleteOpen();
                          setDeleteId(x.productStockId);
                        }}
                      >
                        <Delete />
                      </Button>
                      <DeletePopup
                        open={open}
                        id={deleteId}
                        deleteByid={deleteProduct}
                        handleClose={deleteClose}
                      />
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
