import { Button, Card, CardContent, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 100,
  backgroundColor: "#E3E4C4",
  border: "2px solid #000",
  boxShadow: 0,
  p: 3,
};

const DeletePopup = (props) => {
  // function to delete with Id as input
  function onYesClicked(orderId) {
    props.deleteByid(orderId);
  }

  return (
    <Modal keepMounted open={props.open} onClose={props.handleClose}>
      <Card sx={style}>
        <CardContent>
          <Card>
            <Typography fontSize={24}>DO YOU WANT TO DELETE IT ?</Typography>
            <Typography>Iam from {props.name}</Typography>
          </Card>
          <Button
            style={{ float: "left" }}
            variant="contained"
            color="warning"
            onClick={() => {
              onYesClicked(props.id);
              props.handleClose();
            }}
          >
            YES
          </Button>
          <Button
            style={{ float: "right" }}
            variant="contained"
            color="error"
            onClick={() => {
              props.handleClose();
            }}
          >
            NO
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default DeletePopup;
