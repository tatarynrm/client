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
import HeaderNotifications from "./header_push/HeaderNotifications";
import HeaderBurger from "./header_burger/HeaderBurger";
import snow from '../../assets/snow.png'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
const Header = ({snowShow}) => {
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
const [openBurger,setOpenBurger] = useState(false)
const [snowActive,setSnowActive] = useState(false)
const snowStorage = window.localStorage.getItem('snow');
const snowAppear = ()=>{

  if (snowShow === 'yes') {
    setSnowActive(false)
    window.localStorage.removeItem('snow')
    window.location.reload()
  }else {
    setSnowActive(true)
    window.localStorage.setItem('snow',"yes")
    window.location.reload()
  }
}
  const onClickLogout = () => {
    if (window.confirm("Ви впенені що хочете вийти?")) {
      window.localStorage.removeItem("token");
      dispatch(logout());
      return navigate("/login");
    }
  };
  useEffect(()=>{

  },[snowShow])

  return (
    <header className="header">
      <div className="header__wrapper container">
        <HeaderLogo />
        {token ? <HeaderTime /> : null}
        {token ? <HeaderNav openBurger={openBurger} setOpenBurger={setOpenBurger} /> : null}
        {token ? <HeaderNotifications /> : null}
        {token ? 
        
        <div  data-tooltip-id="my-tooltip" data-tooltip-content={`Включити снігопад`} onClick={snowAppear} style={{position:"relative",cursor:"pointer"}}>
          <img src={snow} alt="snow" style={{width:"40px",position:"absolute",right:"0px",top:"0px"}} />
          <Tooltip  id="my-tooltip" />
        </div>
        : null}
        {token ? <HeaderAvatar /> : null}
        {token ? <HeaderBurger openBurger={openBurger} setOpenBurger={setOpenBurger}/> : null}
       
      </div>
    </header>
  );
};

export default Header;
