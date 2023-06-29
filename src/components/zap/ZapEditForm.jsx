import { useEffect, useState } from "react";
import "./ZapEditForm.scss";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { editZapRedux } from "../../redux/slices/edit";
import axios from "../../utils/axios";
import socket from "../../utils/socket";
const ZapEditForm = () => {
  const dispatch = useDispatch();
  const [zav, setZav] = useState("");
  const [rozv, setRozv] = useState("");
  const [zapText, setZapText] = useState("");
  const zapEditData = useSelector((state) => state.edit.zapEditData);
  const userData = useSelector((state) => state.auth.data);
  const handleEditForm = async (e) => {
    e.preventDefault();
    const obj = {
      pKodAuthor: zapEditData.zapKodOs,
      pKodZap: zapEditData.zapKod,
      pZav: zav.label,
      pRozv: rozv.label,
      pZapText: zapText,
    };
    try {
      if (zav === "" || rozv === "" || zapText === "") {
        window.alert("Заповніть усі поля");
      } else {
        const data = await axios.post(`/zap/edit`, {
          pKodAuthor: zapEditData.zapKodOs,
          pKodZap: zapEditData.zapKod,
          pZav: zav.label,
          pRozv: rozv.label,
          pZapText: zapText,
        });
        if (data.status === 200) {
          socket.emit("editZap", obj);
          alert(`Ви успішно редагувати заявку № ${obj.pKodZap} `);
          dispatch(editZapRedux());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setZav(zapEditData?.zav);
    setRozv(zapEditData?.rozv);
    setZapText(zapEditData?.zapText);
  }, [zapEditData]);
  return (
    <div className="zap__edit-form">
      {zapEditData && (
        <form className="zap__edit_form" onSubmit={handleEditForm}>
          <h3 style={{ color: "brown" }}>
            Необхідно знову внести місто завантаження та вивантаження. <br />
            Або натисніть кнопку Відхилити
          </h3>
          <div className="form__control">
            <GooglePlacesAutocomplete
              className="okkk"
              apiKey="AIzaSyDddHSvr8KFFahBGyqLCQVxpjCsFw-p5ek"
              apiOptions={{
                language: "uk",
              }}
              value={zav}
              selectProps={{
                defaultInputValue: zav,
                isClearable: true,
                value: zav,
                onChange: setZav,
                placeholder: "Введіть місто завантаження",
              }}
            />
          </div>
          <div className="form__control">
            <GooglePlacesAutocomplete
              className="okkk"
              apiKey="AIzaSyDddHSvr8KFFahBGyqLCQVxpjCsFw-p5ek"
              apiOptions={{
                language: "uk",
              }}
              selectProps={{
                defaultInputValue: rozv,
                isClearable: true,
                value: rozv,
                onChange: setRozv,
                placeholder: "Введіть місто вивантаження",
              }}
            />
          </div>
          <div className="form__control">
            <textarea
              value={zapText}
              onChange={(e) => setZapText(e.target.value)}
              type="text"
              placeholder="Додаткова інформація по вантажу"
              name="download"
              cols="10"
              rows="5"
              style={{
                resize: "none",
                fontSize: "20px",
                outline: "none",
                border: "none",
                borderRadius: "10px",
                padding: "0.4rem",
              }}
            />
          </div>
          <div className="zap__edit_form-buttons">
            <button className="normal">Редагувати</button>
            <button onClick={() => dispatch(editZapRedux())} className="danger">
              Відхилити
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ZapEditForm;
