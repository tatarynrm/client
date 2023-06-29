import { useEffect, useState } from "react";
import "./CommentsForm.scss";

const CommentsForm = ({ comments }) => {
  const [text, setText] = useState("на завра бууд мати 2 авто по 23000");
  const handleSubmitComments = (e) => {
    e.preventDefault();
    const arr = {
      text: text,
      author: "Татарин Р.",
    };
    comments.push(...comments, arr);
    console.log(comments);
  };

  return (
    <form onSubmit={handleSubmitComments} className="comments__form">
      <input type="textarea" />
      <button>Надіслати</button>
    </form>
  );
};

export default CommentsForm;
