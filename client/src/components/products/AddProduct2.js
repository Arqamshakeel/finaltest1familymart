import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import fileUpload from "fuctbase64";
import productService from "../../services/ProductServices";
import CustomTags from "../chips/tags/CustomTags";
import CustomBackdrop from "../backdrop/CustomBackdrop";
import DateFnsUtils from "@date-io/date-fns";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Paper,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import CheckAdmin from "../../auth/CheckAdmin";

const AddProduct2 = (props) => {
  const [tags, settags] = React.useState("");
  const [name, setName] = React.useState("");
  const [stock, setStock] = React.useState(0);
  const [img2, setImg2] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [company, setCompany] = React.useState("");
  const [check2, setCheck2] = React.useState(false);
  const [productTags, setProductTags] = React.useState([]);
  const [loginProgress, setLoginProgress] = React.useState(false);
  const [img, setImg] = React.useState({
    file: "",
  });
  const [imgBase64, setImgBase64] = React.useState(null);
  var buffer = null;
  let check = 0;
  const handleImage = (event) => {
    fileUpload(event).then((data) => {
      //imgBase64 = data.base64;
      setImgBase64(data.base64);
      setCheck2(true);
      //buffer = Buffer.from(imgBase64, "utf-8");
      console.log(buffer + "buffer");
      var lengthInKB = data.size / 1000;
      console.log(data.size / 1000);
      //console.log(imgBase64);
      if (lengthInKB > 600) {
        alert("File size should not be greater than 600KB.");
        setImg({ file: "" });
      }
    });

    setImg({
      file: URL.createObjectURL(event.target.files[0]),
    });
    check = 1;
  };

  // const apiGETsingleproduct = () => {
  //   productService
  //     .getsingleProduct(props.match.params.id)
  //     .then(function (data) {
  //       console.log(data);
  //       setName(data.name);
  //       setStock(data.stock);
  //       setPrice(data.price);
  //       //setName(data.name);
  //       setCompany(data.company);
  //       setImg({ file: data.image.data });
  //       setImg2(data.image.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const apiPutproduct = () => {
    setLoginProgress(true);
    productService
      .postProduct({
        name: name,
        price: price,
        stock: stock,
        tags: productTags,
        img: "data:image/jpeg;base64," + imgBase64,
        company: company,
        // expiry:
        //   selectedDate.getDate() +
        //   "/" +
        //   (selectedDate.getMonth() + 1) +
        //   "/" +
        //   selectedDate.getFullYear(),
        expiry: selectedDate,
      })
      .then(function (data) {
        setLoginProgress(false);
        setName("");
        setPrice(0);
        setStock(0);
        setProductTags([]);
        setImg({ file: "" });
        setCompany("");
        //setImgBuffer(data);
        // console.log("Posted");
        //console.log(imgBase64);
      })
      .catch(function (error) {
        setLoginProgress(false);
        console.log(error);
      });
  };
  //React.useEffect(apiGETsingleproduct, []);

  return (
    <CheckAdmin>
      <Paper style={{ margin: "30px", padding: "20px" }}>
        <Grid container align="center" justify="center">
          <Grid item xs={12} md={6} lg={3}></Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h6" gutterBottom>
              Add product's information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="Product name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type="number"
                  label="Stock"
                  fullWidth
                  value={stock}
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name="address2"
                  type="number"
                  label="Price"
                  fullWidth
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  autoComplete="shipping cc-number"
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    label="Expiry Date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e);
                      console.log(e);
                      console.log(e.getMonth() + 1);
                      console.log(e.getDate());
                      console.log(e.getFullYear());
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name="address2"
                  label="Brand"
                  fullWidth
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                  autoComplete="shipping cc-number"
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTags
                  setProductTags={setProductTags}
                  productTags={productTags}
                ></CustomTags>
                <FormControl fullWidth>
                  {/* <InputLabel id="demo-simple-select-outlined-label">
                  Tags
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={tags}
                  onChange={(e) => {
                    settags(e.target.value);
                  }}
                  label="Area"
                >
                  <MenuItem value={"wapdatown"}>Snacks</MenuItem>
                  <MenuItem value={"citi"}>Drinks</MenuItem>
                  <MenuItem value={"canal"}>Chocolates</MenuItem>
                </Select> */}
                  <Button
                    style={{ marginTop: "10px" }}
                    variant="contained"
                    component="label"
                    //   className={classes.TextFieldMarginTop}
                  >
                    Upload Picture
                    <input
                      type="file"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={(event) => {
                        handleImage(event);
                      }}
                    />
                  </Button>
                </FormControl>
                <br />
                <br />

                <img src={img.file} alt="" width="350px" />
              </Grid>

              <Grid item xs={12}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={3}></Grid>
          <Grid container align="center" justify="center">
            <Grid item xs={12} md={6} lg={3}></Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Button
                variant="contained"
                color="primary"
                style={{ float: "right" }}
                onClick={apiPutproduct}
              >
                Add
              </Button>
              <CustomBackdrop open={loginProgress} setOpen={setLoginProgress} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}></Grid>
          </Grid>
        </Grid>
      </Paper>
    </CheckAdmin>
  );
};
export default AddProduct2;
