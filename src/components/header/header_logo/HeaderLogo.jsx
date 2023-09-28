import { Link } from "react-router-dom";
import Button from "../../button/Button";
import "./HeaderLogo.scss";
import mainLogo from '../../../assets/logo.png'
const HeaderLogo = () => {
  const token = window.localStorage.getItem("token");
  return (
    <Link className="header__logo" to={token ? "/" : "/login"}>
      <img style={{width:"10vh",height:"10vh"}} src={mainLogo} alt="logo" />
      {/*  */}
    </Link>
  );
};

export default HeaderLogo;
