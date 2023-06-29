import "./HeaderNav.scss";
import { navbar_menu } from "../../../data/navbar_menu";
import MenuItem from "./MenuItem";
import { useState } from "react";
import Dropdown from "react-multilevel-dropdown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const HeaderNav = () => {
  const [showSub, setShowSub] = useState(false);
  const userData = useSelector((state) => state.auth.data);
  const showSubMenu = () => {
    setShowSub((prev) => !prev);
  };
  return (
    <div className="header__menu">
      {/* {navbar_menu.map((item, idx) => (
        <MenuItem key={idx} item={item} />
      ))} */}
      {userData?.ISDIR === 1 ||
      userData?.KOD === 38231 ||
      userData?.KOD === 24011 ||
      userData?.KOD === 4611
        ? navbar_menu.map((item, idx) => <MenuItem key={idx} item={item} />)
        : navbar_menu
            .filter((dir) => dir.isDir !== true)
            .map((item, idx) => <MenuItem key={idx} item={item} />)}
    </div>
  );
};

export default HeaderNav;
