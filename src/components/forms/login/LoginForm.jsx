import { useState } from "react";
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
const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
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
      dispatch(fetchAuthMe());
      window.localStorage.setItem("token", data.payload.token);

      function setTokenDelete() {
        return setTimeout(() => {
          window.localStorage.removeItem("token");
        }, 7200000);
      }
      setTokenDelete();
    }
  };

  if (token) {
    return navigate("/");
  }
  return (
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
      <DarkMode/>
    </form>
  );
};

export default LoginForm;
