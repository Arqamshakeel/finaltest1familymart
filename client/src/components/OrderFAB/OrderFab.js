import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavigationIcon from "@material-ui/icons/Navigation";
import { useMediaQuery } from "react-responsive";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  order: {
    position: "fixed",
    bottom: theme.spacing(7),
    right: theme.spacing(7),
  },
  ordermobile: {
    position: "fixed",
    bottom: theme.spacing(7),
    right: theme.spacing(0),
    margin: theme.spacing(1),
  },
}));

const OrderFab = (props) => {
  const classes = useStyles();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-device-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 1224px)",
  });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const cartBadge = useSelector((state) => state.counter.counter);
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
    <div className={isTabletOrMobile ? classes.ordermobile : classes.order}>
      <Fab
        variant="extended"
        color="primary"
        onClick={() => {
          cartBadge > 0
            ? props.history.push("/orderform2")
            : handleClickErrorCartSnack();
        }}
      >
        <NavigationIcon className={classes.extendedIcon} />
        Checkout
      </Fab>
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
};

export default withRouter(OrderFab);
