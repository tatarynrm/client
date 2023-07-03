import { useEffect, useRef, useState } from "react";
import "./AddZap.scss";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { fetchZap, addReduxZap } from "../../redux/slices/zap";
import socket from "../../utils/socket";
import { beep } from "../../helpers/audio";
import { editZapAddSlice } from "../../redux/slices/edit";
// import { io } from "socket.io-client";
const AddZap = ({ selectedGroup, showAddZap, setAddZap }) => {
  const zap = useSelector((state) => state.zap.zap.items);
  const userData = useSelector((state) => state.auth.data);
  const [zav, setZav] = useState("");
  const [rozv, setRozv] = useState("");
  const [zapText, setZapText] = useState("");
  const [zapType, setZapType] = useState(null);
  const dispatch = useDispatch();
  const handleSubmitAddZap = async (e) => {
    e.preventDefault();
    const object = {
      pKodAuthor: userData.KOD,
      pKodGroup: selectedGroup,
      pZav: zav.label,
      pRozv: rozv.label,
      pZapText: zapText,
      PIP: userData.PIP,
    };
    try {
      if ((zav !== "" || rozv !== "" || zapType === null, zapText === "")) {
        alert("Заповніть усіполя");
      } else {
        const data = await axios.post("/zap/add", object);
        if (data.status === 200) {
          const dataKod = data.data.outBinds.pKodZap;
          socket.emit("newZap", { ...object, ZAP_KOD: dataKod });
          dispatch(editZapAddSlice());
        } else {
          alert("Виникла якась помилка");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [zap]);
  console.log(zav);
  return (
    <form onSubmit={handleSubmitAddZap} className="add__zap">
      <div className="form__control">
        <GooglePlacesAutocomplete
          className="okkk"
          apiKey="AIzaSyDddHSvr8KFFahBGyqLCQVxpjCsFw-p5ek"
          apiOptions={{
            language: "uk",
          }}
      
          selectProps={{
            zav,
            onChange: setZav,
            placeholder: "Місто завантаження",
          }}
        />
      </div>
      <div className="form__control">
        <GooglePlacesAutocomplete
          apiKey="AIzaSyDddHSvr8KFFahBGyqLCQVxpjCsFw-p5ek"
          apiOptions={{
            language: "uk",
          }}
          selectProps={{
            rozv,
            onChange: setRozv,
            placeholder: "Місто вивантаження",
          }}
        />
      </div>
      <div className="form__control">
        <textarea
          onChange={(e) => setZapText(e.target.value)}
          type="text"
          placeholder="Додаткова інформація по вантажу"
        />
      </div>

      <button className="normal">Добавити</button>
    </form>
  );
};

export default AddZap;
