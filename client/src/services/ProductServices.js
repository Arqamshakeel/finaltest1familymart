import GenericService from "./GenericService";

class ProductServices extends GenericService {
  constructor() {
    super();
  }
  getAllProducts = (page, perPage) =>
    this.get("products?page=" + page + "&perPage=" + perPage);
  postProduct = (data) => this.post("products", data);
  getCart = (_id, counter) => this.get("products/cart/" + counter + "/" + _id);
  getAllCartData = () => this.get("products/cart/");
  deleteCartItem = (_id) => this.delete("products/cart/" + _id, _id);
  deleteProduct = (_id) => this.delete("products/delete/" + _id);

  //editProduct = (_id, data) => this.delete("products/delete/" + _id, data);
  sendOrder = (data) => this.post("products/neworder", data);
  getOrder = () => this.get("products/orders/");
  delOrder = (id) => this.delete("products/orders/" + id);
  UserLogin = (data) => this.post("users/login", data);
  UserReg = (data) => this.post("users/register", data);
  getsingleProduct = (_id) => this.get("products/single/" + _id);
  //this is not getting only single products, getting all searched products
  getsingleProductByName = (name, page, perPage) =>
    this.get(
      "products/singlename/" + name + "?page=" + page + "&perPage=" + perPage
    );
  getProductsByTag = (tag, page, perPage) =>
    this.get("products/tags/" + tag + "?page=" + page + "&perPage=" + perPage);
  getProductsname = () => this.get("products/name");
  getOutOfStock = (page, perPage) =>
    this.get("products/outofstock" + "?page=" + page + "&perPage=" + perPage);
  getExpiredProducts = (page, perPage) =>
    this.get("products/expired" + "?page=" + page + "&perPage=" + perPage);
  putProduct = (_id, data) => this.put("products/put/" + _id, data);
}

let productService = new ProductServices();
export default productService;
