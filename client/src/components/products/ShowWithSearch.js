import React, { Fragment } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import RecipeReviewCard from "../CustomCard";
import { useMediaQuery } from "react-responsive";
import CustomCarousel from "../Carousel/Carousel";
import productService from "../../services/ProductServices";
import Skeleton from "@material-ui/lab/Skeleton";
import OrderFab from "../OrderFAB/OrderFab";
const ShowWithSearch = (props) => {
  const [imgBuffer, setImgBuffer] = React.useState("");
  const [product, setProduct] = React.useState([]);
  const [deleted, setDeleted] = React.useState(false);
  console.log(props);
  const apiGETproducts = () => {
    productService
      .getsingleProductByName(props.match.params.name)
      .then(function (data) {
        setProduct(data.product[0]);
        setImgBuffer(data.img);
        setDeleted(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  React.useEffect(apiGETproducts, [props.match.params.name, deleted]);
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={6} lg={4}></Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper>
            <Typography
              variant="h3"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              {props.match.params.name}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}></Grid>
      </Grid>

      <Grid container spacing={1} align="center" justify="center">
        {product != null ? (
          <RecipeReviewCard
            image={imgBuffer}
            badge={props.badge}
            setbadge={props.setbadge}
            stock={product.stock}
            product={product}
            setDeleted={setDeleted}
          ></RecipeReviewCard>
        ) : (
          [1].map((val, index) => {
            return (
              <div key={index} style={{ margin: "20px" }}>
                <Skeleton variant="text" />
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="rect" width={345} height={178} />
              </div>
            );
          })
        )}
      </Grid>
    </div>
  );
};

export default ShowWithSearch;
// {products.length != 0
//   ? products.map((product, index) => {
//       return (
//         <Fragment key={index}>
//           {product.name == props.match.params.name ? (
//             <RecipeReviewCard
//               key={index}
//               badge={props.badge}
//               setbadge={props.setbadge}
//               image={product.image.data}
//               stock={product.stock}
//               product={product}
//             ></RecipeReviewCard>
//           ) : (
//             <></>
//           )}
//         </Fragment>
//       );
//     })
//   : [1, 1, 1, 1].map((val, index) => {
//       return (
//         <div key={index} style={{ margin: "20px" }}>
//           <Skeleton variant="text" />
//           <Skeleton variant="circle" width={40} height={40} />
//           <Skeleton variant="rect" width={345} height={178} />
//         </div>
//       );
//     })}
// );
