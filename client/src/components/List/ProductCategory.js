import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { withRouter } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ProductCategory = (props) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-device-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 700px)",
  });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const names = [
    "Diaper and Baby items",
    "Ditergents",
    "Tissues",
    "Sausages",
    "Biscuits",
    "Vegetables",
    "Pulses",
    "Packing of pulses and spices",
    "House Holds",
    "Milk and Powder",
    "Baked items",
    "Spices",
    "Medicines",
    "Confictionery",
    "Dry Fruits",
    "Oil and Ghee",
    "Toys",
    "Disposible items",
    "Electric Items",
    "Chocolates",
    "Snacks",
  ];
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          All Categories
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {names.map((item, index) => {
          return (
            <List component="div" disablePadding key={index}>
              <ListItem
                button
                className={classes.nested}
                onClick={() => {
                  props.history.push("/tags/" + item);
                  if (isTabletOrMobile) props.handleDrawerToggle();
                }}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            </List>
          );
        })}
      </Collapse>
    </List>
  );
};
export default withRouter(ProductCategory);
