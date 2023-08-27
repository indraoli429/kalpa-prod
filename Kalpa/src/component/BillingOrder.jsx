import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Delete from "@mui/icons-material/Delete";
import { SelectChangeEvent } from "@mui/material/Select";
import DeletePopup from "./DeletePopup";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";

export default function BillingOrder(props) {
  let orders = props.orders;

  console.log(
    `product stocks  : ${JSON.stringify(props.productStock, null, 2)}`
  );

  const [open, setOpen] = useState(false);
  const deleteOpen = () => setOpen(true);
  const deleteClose = () => setOpen(false);

  // Button and input field state
  // when need to show input filed state most be true
  const [updatedQty, setUpdatedQty] = useState();
  const [editId, setEditId] = useState(null);

  const [deleteId, setDeleteId] = useState();

  // update order qty

  function updateOrderQuantiy(orderId) {
    axios
      .patch("/order", {
        orderId: orderId,
        orderQuantity: updatedQty,
      })
      .then((data) => {
        console.log(`order is refreshed`);
        props.getOrders(props.bill.billingId);
      })
      .catch((err) => console.log(err));
  }

  function deleteOrder(orderId) {
    axios
      .delete("order", { params: { id: orderId } })
      .then((data) => {
        props.getOrders(props.bill.billingId);
        deleteClose();
      })
      .catch((err) => console.log(err));
  }

  if (orders === undefined) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <TableContainer className="billing-action-table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#D9D9D9" }}>
            <TableRow>
              <TableCell>
                <h3>Product Name</h3>
              </TableCell>
              <TableCell>
                <h3>Price</h3>
              </TableCell>
              <TableCell>
                <h3>Quantity</h3>
              </TableCell>
              <TableCell>
                <h3>Amount</h3>
              </TableCell>
              <TableCell>
                <h3>Action</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((x, index) => {
              let productQty = Number(
                props.productStock.find(
                  (stock) => stock.productStockId === x.productStockId
                ).quantity
              );

              return (
                <TableRow
                  // key={}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography>{x.productName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{x.price}</Typography>
                  </TableCell>
                  <TableCell>
                    {editId === x.orderId ? (
                      <TextField
                        type="number"
                        value={updatedQty}
                        onChange={(e) => {
                          let qty = e.target.value;

                          if (qty >= 0 && qty <= productQty) setUpdatedQty(qty);
                        }}
                      />
                    ) : (
                      <Typography>{x.orderQuantity}</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography>{x.price * x.orderQuantity}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={() => {
                        if (editId === null) {
                          setEditId(x.orderId);
                          setUpdatedQty(x.orderQuantity);
                        } else {
                          if (editId === x.orderId) {
                            setEditId(null);
                            updateOrderQuantiy(x.orderId);
                          }
                        }
                      }}
                    >
                      {editId === x.orderId ? <DoneIcon /> : <EditIcon />}
                    </Button>
                    <Button
                      onClick={() => {
                        deleteOpen();
                        setDeleteId(x.orderId);
                      }}
                      variant="outlined"
                      color="inherit"
                      startIcon={<DeleteIcon />}
                    ></Button>
                    <DeletePopup
                      open={open}
                      id={deleteId}
                      deleteByid={deleteOrder}
                      handleClose={deleteClose}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell colSpan={2} />
              <TableCell colSpan={2} align="left">
                Subtotal
              </TableCell>
              <TableCell align="left">Nrs. {props.subTotal}</TableCell>
            </TableRow>
            <Divider />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
