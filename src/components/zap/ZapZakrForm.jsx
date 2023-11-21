import React, { useEffect } from "react";
import "./ZapZakrForm.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editZapDeleteStatus,
  editZapZakrStatus,
} from "../../redux/slices/edit";
import axios from "../../utils/axios";
import socket from "../../utils/socket";
const ZapZakrForm = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("3");
  const [textOption, setTextOption] = useState("Не закрита нами");
  const zapDeleteData = useSelector((state) => state.edit.zapDeleteData);
  const zapEditData = useSelector(state =>state.edit.zapEditData )
  const userData = useSelector((state) => state.auth.data);
  const [usersToClose, setUsersToClose] = useState([]);
  const [userToClose, setUserToClose] = useState(null);
  const [carCount, setCarCount] = useState(1);
  const [usersToWarn, setUsersToWarn] = useState([]);
  const zakrZap = async () => {
    const obj = {
      pKodAutor: userData?.KOD,
      pKodZap: zapDeleteData.pKodZap,
      pKodMen: +userToClose,
      pKilAmZakr: +carCount,
      userToWarn: usersToWarn.length > 0 ? usersToWarn : null,
      zapDeleteData
    };
    try {
      if (userToClose == 0) {
        alert("Оберіть менеджера!");
      } else {
        const data = await axios.post("/zap/zakr-zap", obj);
        if (data.status === 200) {
          dispatch(editZapZakrStatus());
          socket.emit("changeCountAm", obj);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const usersClose = async () => {
      try {
        const { data } = await axios.get("/users/close-zap");
        if (data.length > 0) {
          setUsersToClose(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    usersClose();
  }, [userToClose]);
  useEffect(() => {
    const userToWarn = async () => {
      try {
        const data = await axios.post("/zap/coments-in-zap", {
          KOD_ZAP: zapDeleteData.pKodZap,
        });
        if (data.status === 200) {
          setUsersToWarn(data.data);
        } else {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    userToWarn();
  }, []);
  console.log(userToClose);
  return (
    <div className="zap__delete-form zap__edit-form">
      <div className="form__delete-zap">
        <h3>Оберіть</h3>
        <p>Менеджера який надав транспорт</p>
        <p>К-сть транспорту запропонованого менеджером</p>
        <div className="form__control">
          <select onChange={(e) => setUserToClose(e.target.value)}>
            <option value="0">Оберіть менеджера</option>
            {usersToClose.length > 0 &&
              usersToClose
                .sort((a, b) => a.PIP.localeCompare(b.PIP))
                .map((item, idx) => {
                  return (
                    <option key={idx} defaultValue={item.KOD} value={item.KOD}>
                      {item.PIP}
                    </option>
                  );
                })}
          </select>
        </div>
        <div className="form__control">
          <label>К-сть авто</label>
          <input
            type="number"
            min="1"
            max="20"
            value={carCount}
            onChange={(e) => setCarCount(e.target.value)}
          />
        </div>
        <div className="form__control button__control">
          <button onClick={zakrZap} className="normal delete">
            Закрити перевезення
          </button>
          <button
            onClick={(e) => dispatch(editZapZakrStatus())}
            className="normal"
          >
            Відхилити
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZapZakrForm;
