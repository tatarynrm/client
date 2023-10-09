import { useEffect, useState } from "react";
import "./LoginForm.scss";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuth,
  fetchAuthMe,
  selectIsAuth,
} from "../../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import DarkMode from "../../darkMode/DarkMode";
import axios from "../../../utils/axios";
const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({});
  const [tgPass, setTgPass] = useState("");
  const [tokenData, setTokenData] = useState(null);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const [userKod, setUserKod] = useState(null);

  function setTokenDelete() {
    return setTimeout(() => {
      window.localStorage.removeItem("token");
    }, 25000000);
  }
  const showPassword = () => {
    setShowPass((prev) => !prev);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const signIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(fetchAuth(formData));
    if (!data.payload || data.payload.length === 0) {
      return alert("Не вдалось авторизуватись");
    }
    if (data.payload.token) {
      setUserKod(data.payload.rows[0].KOD);
      setTokenData(data.payload.token);
    }
  };
  const tgCheck = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/otp-code", { KOD_OS: userKod });
      const OTP_VERIFY = data.rows[0].OTPCODE;
      if (OTP_VERIFY == tgPass) {
        dispatch(fetchAuthMe());
        window.localStorage.setItem("token", tokenData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [token]);

  if (token) {
    return navigate("/");
  }
  return (
    <>
      {" "}
      {tokenData !== null ? (
        <form onSubmit={(e) => tgCheck(e)} className="login__form">
          <div className="form__control">
            <label>
              <b>TELEGRAM VERIFY</b>
            </label>
            <input
              type={"text"}
              placeholder="Пароль з телеграму"
              name="tgpassword"
              defaultValue={tgPass}
              value={tgPass}
              onChange={(e) => setTgPass(e.target.value)}
            />
          </div>
          <button className="normal">Ввести код</button>
          <DarkMode />
        </form>
      ) : (
        <form onSubmit={(e) => signIn(e)} className="login__form">
          <div className="form__control">
            <label>Логін</label>
            <input
              type="text"
              placeholder="Введіть ваш логін"
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="form__control">
            <label>Пароль</label>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Введіть ваш пароль"
              name="password"
              onChange={handleInputChange}
            />
            {showPass ? (
              <i onClick={showPassword} className="input__eye">
                <AiOutlineEye />
              </i>
            ) : (
              <i onClick={showPassword} className="input__eye">
                <AiOutlineEyeInvisible />
              </i>
            )}
          </div>
          <button className="normal">Увійти</button>
          <DarkMode />
        </form>
      )}
    </>
  );
};

export default LoginForm;
