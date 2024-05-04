import React, {memo} from "react";
import { Navigate } from "react-router-dom";
import CommonLayout from "./CommonLayout";
import navConfig from "./CommonLayout/NavConfig";

const PrivateRoute = ({ navConfig }) => {
  const token = localStorage.getItem("token") || "";
  return token ? <CommonLayout navConfig={navConfig}/> :  <CommonLayout navConfig={navConfig}/>;
  // return token ? <CommonLayout navConfig={navConfig} /> : <Navigate to="/login" />;
};

export default memo(PrivateRoute);
