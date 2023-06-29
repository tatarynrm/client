import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { useEffect, useState } from "react";
import HeaderAvatar from "./header_avatar/HeaderAvatar";
import Button from "../button/Button";
import HeaderNav from "./header_nav/HeaderNav";
import HeaderLogo from "./header_logo/HeaderLogo";

import HeaderTime from "./header_time/HeaderTime";
const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogout = () => {
    if (window.confirm("Ви впенені що хочете вийти?")) {
      window.localStorage.removeItem("token");
      dispatch(logout());
      return navigate("/login");
    }
  };

  return (
    <header className="header">
      <div className="header__wrapper container">
        <HeaderLogo />
        {token ? <HeaderTime /> : null}
        {token ? <HeaderNav /> : null}
        {token ? <HeaderAvatar /> : null}
      </div>
    </header>
  );
};

export default Header;
