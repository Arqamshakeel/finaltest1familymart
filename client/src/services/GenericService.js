import axios from "axios";

// axios.defaults.baseURL = "https://test-express-arqam.herokuapp.com/api/";
//axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.baseURL = "https://familymart.gq/api/";
// axios.defaults.baseURL =
//   "http://ec2-18-221-158-145.us-east-2.compute.amazonaws.com:5000/api/";
// //amazon working
// axios.defaults.baseURL =
//   "http://ec2-18-224-94-239.us-east-2.compute.amazonaws.com:5000/api/";
//amazon working2
//("http://ec2-18-224-94-239.us-east-2.compute.amazonaws.com:5000/api/");
//amazon working
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
axios.defaults.withCredentials = true;
// axios.defaults.headers.append(
//   "Access-Control-Allow-Origin",
//   "http://localhost:3000"
// );
// axios.defaults.headers.common["Access-Control-Allow-Origin"] =
//   "http://localhost:3000";
class GenericService {
  constructor() {}

  get = (url) =>
    new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });

  delete = (url, id) =>
    new Promise((resolve, reject) => {
      axios
        .delete(url, id)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });

  post = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });

  put = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .put(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
}

export default GenericService;
