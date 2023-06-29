import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../utils/axios";
const InternalDownloads = ({
  showForm,
  setShowForm,
  getAllInternalDownloads,
}) => {
  const [text, setText] = useState("");
  const userData = useSelector((state) => state.auth.data);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/internal-downloads", {
        TEXT: text,
        KOD_OS: userData.KOD,
        MANAGER: `${userData.IMJA} ${userData.PRIZV}`,
      });
      console.log(data);
      setShowForm((prev) => !prev);
      if (data) {
        getAllInternalDownloads();
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(text);
  return (
    <form onSubmit={handleFormSubmit} className="download__form">
      <div className="form__control">
        <label>Завантаження</label>
        <textarea
          name="download"
          cols="10"
          rows="5"
          style={{ resize: "none", fontSize: "20px" }}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <button style={{ width: "100px" }} className="">
        Додати
      </button>
    </form>
  );
};

export default InternalDownloads;
