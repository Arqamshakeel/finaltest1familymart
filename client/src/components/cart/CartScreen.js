import React from "react";
import MaterialTable from "material-table";
import productService from "../../services/ProductServices";
import Cart from "./Cart";
import { Grid, Button, makeStyles } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  root: {
    width: "100%",
    // display: "relative",
    // position: "fixed",
    // bottom: "0px",
  },
});
export default function CartScreen(props) {
  const cartBadge = useSelector((state) => state.counter.counter);
  const classes = useStyles();
  const [openCartEmptyError, setOpenCartEmptyError] = React.useState(false);
  const handleClickErrorCartSnack = () => {
    setOpenCartEmptyError(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenCartEmptyError(false);
  };
  return (
    <div>
      {" "}
      <Cart />
      <Grid container>
        <Grid item xs={12} md={2} lg={2}></Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Button
            onClick={() => {
              cartBadge > 0
                ? props.history.push("/orderform2")
                : handleClickErrorCartSnack();
            }}
            variant="contained"
            color="primary"
            style={{ float: "right" }}
          >
            {" "}
            Checkout?
          </Button>
        </Grid>
        <Grid item xs={12} md={2} lg={2}></Grid>
      </Grid>
      <div className={classes.root}>
        <Snackbar
          open={openCartEmptyError}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            Please add items to you cart.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
