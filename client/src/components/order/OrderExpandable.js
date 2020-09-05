import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import productService from "../../services/ProductServices";
import CheckAdmin from "../../auth/CheckAdmin";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import { useSelector, useDispatch } from "react-redux";
import { setOrder } from "../../Redux/actions/OrderBadgeAction";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: "2020-01-05", customerId: "11091700", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const [show, setshow] = React.useState(true);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <IconButton
            aria-label="show 4 new mails"
            color="inherit"
            onClick={() => {
              productService
                .delOrder(row._id)
                .then((res) => {
                  // console.log("Deleted oRder");
                  props.setOrderDeleted(true);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.time}
          {" -"} {row.date}
        </TableCell>

        <TableCell component="th" scope="row">
          {row.customerData.fname}
        </TableCell>
        <TableCell align="left"> {row.customerData.address}</TableCell>
        <TableCell align="left"> {row.customerData.phone}</TableCell>
        <TableCell align="left"> {row.customerData.area}</TableCell>
        <TableCell align="right">{row.customerData.lname}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.cart.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell align="right">{item.qty}</TableCell>
                      <TableCell align="right">
                        {Number(item.qty) * Number(item.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

export default function OrderExpandable(props) {
  const isLoggedInRedux = useSelector((state) => state.login.isloggedin);
  const [order, setorder] = React.useState([]);
  const [orderDeleted, setOrderDeleted] = React.useState(false);
  const dispatch = useDispatch();
  const apiPOSTorder = () => {
    //console.log(props.product._id);
    setOrderDeleted(false);
    productService
      .getOrder()
      .then(function (order) {
        // console.log(order.order);
        setorder(order);
        dispatch(setOrder(order.length));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  React.useEffect(apiPOSTorder, [orderDeleted]);

  // React.useEffect(() => {
  //   if (!isLoggedInRedux) {
  //     props.history.push("/");
  //   }
  // }, [isLoggedInRedux]);

  //React.useEffect(handleTotal, [total]);

  return (
    <CheckAdmin>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Action</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Phone no</TableCell>
              <TableCell align="left">Area</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order
              .map((item, index) => (
                <Row key={index} row={item} setOrderDeleted={setOrderDeleted} />
              ))
              .reverse()}
          </TableBody>
        </Table>
      </TableContainer>
    </CheckAdmin>
  );
}
