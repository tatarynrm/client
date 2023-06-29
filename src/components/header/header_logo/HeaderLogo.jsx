import { Link } from "react-router-dom";
import Button from "../../button/Button";
import "./HeaderLogo.scss";

const HeaderLogo = () => {
  const token = window.localStorage.getItem("token");
  return (
    <Link className="header__logo" to={token ? "/" : "/login"}>
      <Button text={"ICT - Захід"} cls={"normal"} />
    </Link>
  );
};

export default HeaderLogo;
