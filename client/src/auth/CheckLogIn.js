import React from "react";
import userService from "../services/UserService";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
const CheckLogIn = (props) => {
  const isLoggedInRedux = useSelector((state) => state.login.isloggedin);

  const func = () => {
    if (userService.isLoggedin()) {
      props.history.push("/");
    }
  };
  React.useEffect(func, [isLoggedInRedux]);
  return <>{props.children}</>;
};

export default withRouter(CheckLogIn);
