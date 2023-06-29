import React from "react";

const Button = ({ cls, text, func }) => {
  return (
    <button onClick={func} className={cls}>
      {text}
    </button>
  );
};

export default Button;
