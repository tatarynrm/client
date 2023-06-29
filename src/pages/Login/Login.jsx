import { Navigate, redirect } from "react-router-dom";
import "./Login.scss";
import { useEffect } from "react";
import LoginForm from "../../components/forms/login/LoginForm";

const Login = () => {
  return (
    <div className="login">
      <LoginForm />
    </div>
  );
};

export default Login;
