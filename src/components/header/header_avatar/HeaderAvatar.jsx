import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuthMe,
  selectIsAuth,
  logout,
} from "./../../../redux/slices/auth";
import Button from "../../button/Button";
import { FcExpand, FcRightDown2 } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import DarkMode from "../../darkMode/DarkMode";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const HeaderAvatar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const token = window.localStorage.getItem("token");
  const userData = useSelector((state) => state.auth.data);
  const [open,setOpen] = useState(false)
  const navigate = useNavigate();
  const logoutFromAccount = () => {
    dispatch(logout());
    window.localStorage.clear();
    navigate("/login");
  };
  return (
    <div onClick={()=> setOpen(value => !value)} style={{ position: "relative" }} className="header__avatar">
      <div  className="header__avatar-icon">
        <b>{userData ? userData.IMJA?.charAt(0) : null}</b>.
        <b>{userData ? userData.PRIZV?.charAt(0) : null}</b>
      </div>
      <div className={`header__avatar-options ${open ? "open":""}`}>
        <div className="header__avatar-contacts">
          <p>Тел.моб: {userData?.TEL}</p>
          <p>E-mail: {userData?.MAIL}</p>
          <p>Код: {userData?.KOD}</p>
        </div>
        <DarkMode />
        <button onClick={logoutFromAccount} className="danger">
          Вийти з аккаунту
        </button>
      </div>
    </div>

//     <Menu>
//   <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
//     Actions
//   </MenuButton>
//   <MenuList>
//     <MenuItem>Download</MenuItem>
//     <MenuItem>Create a Copy</MenuItem>
//     <MenuItem>Mark as Draft</MenuItem>
//     <MenuItem>Delete</MenuItem>
//     <MenuItem>Attend a Workshop</MenuItem>
//   </MenuList>
// </Menu>
  );
};

export default HeaderAvatar;
