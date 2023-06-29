import React from "react";
import { useNavigate } from "react-router-dom";

const GoBack = () => {
  const navigate = useNavigate();
  return (
    <button className="go__back danger" onClick={() => navigate(-1)}>
      &#8592; Повернутись на попередню сторінку
    </button>
  );
};

export default GoBack;
