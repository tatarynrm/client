import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth";

const PrivateRoute = ({ children }) => {
  const token = window.localStorage.getItem("token");
  return token ? <Outlet /> : <Login />;
};

export default PrivateRoute;
