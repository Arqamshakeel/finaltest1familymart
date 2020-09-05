import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import SendIcon from "@material-ui/icons/Send";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
//import InboxIcon from "@material-ui/icons/MoveToInbox";
import MessageIcon from "@material-ui/icons/Message";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
//import MailIcon from "@material-ui/icons/Mail";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
//import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";

import { useMediaQuery } from "react-responsive";

import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";
import Home from "../home/Home";
//import CustomCarousel from "../Carousel/Carousel";
import MoreIcon from "@material-ui/icons/MoreVert";
import FormOrder from "../order/FormOrder";

import AddProduct2 from "../products/AddProduct2";

import Cart from "../cart/Cart";
import MaterialTableDemo from "../cart/CartScreen";
import productService from "../../services/ProductServices";
import { withRouter } from "react-router";
import HomeIcon from "@material-ui/icons/Home";

import { useSelector, useDispatch } from "react-redux";
//import { decrement, zero } from "../../Redux/actions/CartBadgeAction";
import { set } from "../../Redux/actions/CartBadgeAction";
import { setOrder, incrementOrder } from "../../Redux/actions/OrderBadgeAction";
//import AddressForm from "../AddressForm/AddressForm";
import Checkout from "../AddressForm/Checkout";
import SignInSide from "../LoginAndSignUp/SignInSide";
import SignUp from "../LoginAndSignUp/SignUp";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import io from "socket.io-client";
//import TestRes from "../testResponsive/TestRes";
import BottomNav from "../Bottom navigation/BottomNav";
//import Order from "../order/Order";
import OrderExpandable from "../order/OrderExpandable";

import { Button, Avatar, InputAdornment } from "@material-ui/core";
import userService from "../../services/UserService";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { switchLogin, falseLogin } from "../../Redux/actions/LoginAction";
import { red } from "@material-ui/core/colors";
import Tooltip from "@material-ui/core/Tooltip";
import CustomList from "../List/CustomList";

import UpdateProduct from "../products/UpdateProduct";
import EmptyStockProducts from "../products/EmptyStockProducts";
import ProductCategory from "../List/ProductCategory";
import ShowWithTags from "../products/ShowWithTags";
import Footer from "../footer/Footer";
import Push from "push.js";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import ShowWithSearch2 from "../products/ShowWithSearch2";
import ShowExpired from "../products/ShowExpired";
import CartScreen from "../cart/CartScreen";
const socket = io.connect("https://familymart.gq");
// axios.defaults.baseURL = "https://familymart.gq/api/";
// const socket = io.connect(
//   "http://ec2-18-224-94-239.us-east-2.compute.amazonaws.com:4001"
// );
// const socket = io.connect(
//   "http://ec2-18-221-158-145.us-east-2.compute.amazonaws.com:8080"
// );
// const socket = io.connect(
//   "http://ec2-18-221-158-145.us-east-2.compute.amazonaws.com:5000"
// );
//ec2-18-221-158-145.us-east-2.compute.amazonaws.com:5000/api/
//const socket = io.connect("https://test-express-arqam.herokuapp.com:4001");
//const socket = io.connect("https://test-express-arqam.herokuapp.com:4001");

const drawerWidth = 205;

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
  },
  customizeToolbar: {
    minHeight: 65,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    //  flexGrow: 1,
    padding: theme.spacing(0),
  },
  avatar: {
    backgroundColor: red[500],
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "36ch",
      "&:focus": {
        width: "26ch",
      },
    },
  },
  sectionDesktop: {
    display: "none",
    position: "absolute",
    right: theme.spacing(7),

    [theme.breakpoints.up("md")]: {
      display: "flex",
      //justifyContent: "flex-end",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  largeButton: {
    padding: 0,
  },
  largeIcon: {
    fontSize: "1.5em",
  },
}));

function ResponsiveDrawer(props) {
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

  const { window } = props;

  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  //const [cartBadge, setCartBadge] = React.useState("0");
  const cartBadge = useSelector((state) => state.counter.counter);
  const orderBadge = useSelector((state) => state.order.order);
  const isMenuOpen = Boolean(anchorEl);
  const [searchTextField, setSearchTextField] = React.useState("");
  const [top100Films, setTop100Films] = React.useState([]);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const isLoggedInRedux = useSelector((state) => state.login.isloggedin);
  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      props.history.push("/search/" + searchTextField);
    }
  };
  // const buttonClick = () => {
  //   console.log("Notification");
  //   addNotification({
  //     title: "Family Mart",
  //     subtitle: "This is a subtitle",
  //     message: "New Order",
  //     // theme: "darkblue",
  //     native: true, // when using native, your OS will handle theming.
  //   });
  // };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  if (isTabletOrMobile) {
  } else {
  }
  const classes = useStyles(isTabletOrMobile);

  React.useEffect(() => {
    productService
      .getAllCartData()
      .then(function (cart) {
        dispatch(set(cart.length));
        //setCartBadge(cart.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [cartBadge, orderBadge]);
  React.useEffect(() => {
    productService
      .getOrder()
      .then(function (order) {
        //console.log(cart);

        dispatch(setOrder(order.length));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [cartBadge, orderBadge]);

  React.useEffect(() => {
    socket.on("client", (data) => {
      dispatch(incrementOrder());

      //if (userService.isAdmin()) buttonClick();
      //Pus
      if (userService.isAdmin())
        Push.create("Family Mart", {
          body: "You got new order!",
          icon: "/icon.png",
          requireInteraction: true,
          //timeout: 5000,
          onClick: function () {
            window.focus();
            this.close();
          },
        });
      // dispatch(incrementOrder());
    });
  }, []);
  React.useEffect(() => {
    if (userService.isLoggedin()) {
      dispatch(switchLogin());
    }
  }, []);
  React.useEffect(() => {
    productService.getProductsname().then((res) => {
      setTop100Films(res);
    });
  }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          props.history.push("/cart");
          handleMobileMenuClose();
        }}
      >
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={cartBadge} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          props.setDark(!props.dark);
          handleMobileMenuClose();
        }}
      >
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Brightness4Icon />
        </IconButton>
        <p>Dark mode</p>
      </MenuItem>

      <Divider />

      {userService.isLoggedin() ? (
        <MenuItem
          onClick={() => {
            //props.history.push("/signup");
            userService.logout();
            dispatch(falseLogin());
            handleMobileMenuClose();
          }}
        >
          <IconButton aria-label="show 4 new mails" color="inherit">
            <ExitToAppIcon />
          </IconButton>
          <p>Sign out</p>
        </MenuItem>
      ) : (
        <MenuItem
          onClick={() => {
            props.history.push("/signin");
            handleMobileMenuClose();
          }}
        >
          <IconButton aria-label="show 4 new mails" color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <p>Sign in</p>
        </MenuItem>
      )}
      <Divider />
      <MenuItem
        onClick={() => {
          props.history.push("/signup");
          handleMobileMenuClose();
        }}
      >
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge color="secondary">
            <AccountCircleIcon />
          </Badge>
        </IconButton>
        <p>Register</p>
      </MenuItem>

      <Divider />
      {userService.isAdmin() ? (
        <MenuItem
          onClick={() => {
            props.history.push("/allorders");
            handleMobileMenuClose();
          }}
        >
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={orderBadge} color="secondary">
              <MessageIcon />
            </Badge>
          </IconButton>
          <p>Orders</p>
        </MenuItem>
      ) : (
        <MenuItem
          onClick={() => {
            props.history.push("/orderform2");
            handleMobileMenuClose();
          }}
        >
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <SendIcon />
          </IconButton>
          <p>Send Order</p>
        </MenuItem>
      )}
    </Menu>
  );
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            props.history.push("/");

            if (isTabletOrMobile) handleDrawerToggle();
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <Divider />

        <ListItem
          button
          onClick={() => {
            props.history.push("/orderform2");
            if (isTabletOrMobile) handleDrawerToggle();
          }}
        >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary={"Order Form"} />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            props.history.push("/signin");
            if (isTabletOrMobile) handleDrawerToggle();
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={"Sign in"} />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            props.history.push("/signup");
            if (isTabletOrMobile) handleDrawerToggle();
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={"Register"} />
        </ListItem>
        <Divider />
        {userService.isAdmin() ? (
          <CustomList
            isTabletOrMobile={isTabletOrMobile}
            handleDrawerToggle={handleDrawerToggle}
          />
        ) : (
          <></>
        )}
        <ProductCategory
          isTabletOrMobile={isTabletOrMobile}
          handleDrawerToggle={handleDrawerToggle}
        />
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.customizeToolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Family Mart
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Autocomplete
              className={classes.inputInput}
              options={top100Films}
              getOptionLabel={(option) => option.name}
              onInputChange={(event, value) => {
                setSearchTextField(value);
              }}
              renderInput={(params) => (
                <TextField
                  onChange={(e) => {
                    setSearchTextField(e.target.value);
                  }}
                  value={searchTextField}
                  onKeyDown={handleKeyDown}
                  placeholder="Search…"
                  {...params}
                  // renderInput={(params) => (
                  //   <InputBase
                  //     placeholder="Search…"
                  //     ref={params.ref}
                  //     ref={params.InputProps.ref}
                  //     inputProps={params.inputProps}
                  //     inputProps={{ "aria-label": "search" }}
                  //   />
                  // )}
                />
              )}
            />
            {/* <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            ></InputBase> */}
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isLoggedInRedux ? (
              <span>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    userService.logout();
                    dispatch(falseLogin());
                  }}
                >
                  <Typography variant="button" variant="h6">
                    Sign out
                  </Typography>
                </Button>
              </span>
            ) : (
              <div>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    props.history.push("/signin");
                  }}
                >
                  <Typography variant="button" variant="h6">
                    Sign in
                  </Typography>
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    props.history.push("/signup");
                  }}
                  variant="outlined"
                  color="secondary"
                  style={{ marginLeft: "8px" }}
                >
                  <Typography variant="button" variant="h6">
                    Register
                  </Typography>
                </Button>
              </div>
            )}
            {isLoggedInRedux ? (
              <IconButton
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  props.history.push("/allorders");
                }}
              >
                <Badge badgeContent={orderBadge} color="secondary">
                  <MessageIcon />
                </Badge>
              </IconButton>
            ) : (
              <></>
            )}
            <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => {
                props.history.push("/cart");
              }}
            >
              <Badge badgeContent={cartBadge} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => {
                props.setDark(!props.dark);
              }}
            >
              <Badge color="secondary">
                <Brightness4Icon />
              </Badge>
            </IconButton>
            {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
            {isLoggedInRedux ? (
              <Tooltip title={userService.getloggedinuser().name}>
                <span style={{ margin: "auto", marginLeft: "10px" }}>
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {userService.getloggedinuser().name
                      ? userService.getloggedinuser().name[0].toUpperCase()
                      : null}
                  </Avatar>
                </span>
              </Tooltip>
            ) : (
              <></>
            )}
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              className={classes.largeButton}
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon className={classes.largeIcon} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/orderform" exact component={FormOrder} />
          <Route path="/orderform2" exact component={Checkout} />
          {/* <Route path="/addproduct" exact component={AddProduct} /> */}
          <Route path="/addproductform" exact component={AddProduct2} />
          {/* first from */}
          {/* <Route path="/addproductform2" exact component={AddProductForm} /> */}
          <Route path="/cart" exact component={CartScreen} />
          <Route path="/cart2" exact component={MaterialTableDemo} />
          <Route path="/signin" exact component={SignInSide} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/allorders" exact component={OrderExpandable} />
          {/* <Route path="/editproduct" exact component={EditProducts} /> */}
          <Route path="/tags/:name" exact component={ShowWithTags} />
          {/* <Route path="/search/:name" exact component={ShowWithSearch} /> */}
          <Route path="/search/:name" exact component={ShowWithSearch2} />
          <Route path="/updateproduct/:id" exact component={UpdateProduct} />
          <Route path="/outofstock" exact component={EmptyStockProducts} />
          <Route path="/expired" exact component={ShowExpired} />
        </Switch>
        <Footer />
        {isTabletOrMobileDevice && isPortrait ? <BottomNav /> : <></>}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default withRouter(ResponsiveDrawer);
