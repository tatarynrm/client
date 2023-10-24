import React from "react";
import "./ZapDeleteForm.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editZapDeleteStatus } from "../../redux/slices/edit";
import axios from "../../utils/axios";
import socket from "../../utils/socket";
const ZapDeleteForm = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("3");
  const [textOption, setTextOption] = useState("Не закрита нами");
  const zapDeleteData = useSelector((state) => state.edit.zapDeleteData);
  const userData = useSelector(state => state.auth.data)
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    setTextOption(e.target.selectedOptions[0].text);
  };

  const deleteZap = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (selectedOption === false) {
      alert("Оберіть причину видалення");
    } else {
      try {
          const data = await axios.post("/zap/delete", {
            pKodAuthor: userData?.KOD,
            pStatus: selectedOption,
            pKodZap: zapDeleteData.pKodZap,
          });
      
          if (data.status === 200) {
            socket.emit("deleteZap", zapDeleteData.pKodZap);
            dispatch(editZapDeleteStatus())
          }

      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="zap__delete-form zap__edit-form">
      <div className="form__delete-zap">
        <h3>Оберіть причину видалення</h3>
        <div className="form__control">
          <select value={selectedOption} onChange={handleSelectChange}>
            <option value="3">Не закрита нами</option>
            <option value="4">Відмінена замовником</option>
            <option value="5">Закрита замовником</option>
          </select>
        </div>
        <div className="form__control button__control">
          <button onClick={deleteZap} className="normal delete">
            Закрити перевезення
          </button>
          <button
            onClick={(e) => dispatch(editZapDeleteStatus())}
            className="normal"
          >
            Відхилити
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZapDeleteForm;
