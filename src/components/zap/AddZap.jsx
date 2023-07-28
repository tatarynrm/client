import { useEffect, useRef, useState } from "react";
import "./AddZap.scss";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { fetchZap, addReduxZap } from "../../redux/slices/zap";
import socket from "../../utils/socket";
import { beep } from "../../helpers/audio";
import { editZapAddSlice } from "../../redux/slices/edit";
import request from 'axios'
// import { io } from "socket.io-client";
const AddZap = ({ selectedGroup, showAddZap, setAddZap }) => {
  const zap = useSelector((state) => state.zap.zap.items);
  const userData = useSelector((state) => state.auth.data);
  const [zav, setZav] = useState("");
  const [rozv, setRozv] = useState("");
  const [zapText, setZapText] = useState("");
  const [zapType, setZapType] = useState(null);
  const dispatch = useDispatch();



useEffect(()=>{
  let base_url = "https://maps.googleapis.com/maps/api/place/details/json/language=uk"
  const  place_id = "ChIJBUVa4U7P1EAR_kYBF9IxSXY"
  const api_key = "AIzaSyCL4bmZk4wwWYECFCW2wqt7X-yjU9iPG2o"
let params = {
    "place_id": place_id,
    // "fields": "name,formatted_address,rating",
    "key": api_key
}

const getByPlaceId  = async ()=>{
  try {
   const response = await request.post(base_url,params)
   console.log(response);
  } catch (error) {
    console.log(error);
  }
}
  getByPlaceId()
},[])
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
console.log(zav);
  useEffect(() => {}, [zap]);
  return (
    <form onSubmit={handleSubmitAddZap} className="add__zap">
      <div className="form__control">
        <GooglePlacesAutocomplete
          className="okkk"
          apiKey="AIzaSyCL4bmZk4wwWYECFCW2wqt7X-yjU9iPG2o"
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
          apiKey="AIzaSyCL4bmZk4wwWYECFCW2wqt7X-yjU9iPG2o"
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
