import "./CurrentTransportation.scss";
import { current } from "../../data/current_transportation";
import { Link, useParams } from "react-router-dom";
import TruckLoader from "../../components/loaders/TruckLoader";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import InternalDownloads from "../../components/forms/downloads/InternalDownloads";
import moment from "moment";
import TrnasportationItem from "./TrnasportationItem";
const CurrentTransportation = () => {
  const [downloads, setDownloads] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const getAllInternalDownloads = async () => {
    try {
      const { data } = await axios.get("/internal-downloads");
      setDownloads(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllInternalDownloads();
  }, []);

  return (
    <div className="current__transportation container">
      {showForm ? (
        <InternalDownloads
          getAllInternalDownloads={getAllInternalDownloads}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      ) : null}
      {/* <div className="add__download"> */}
      {showForm ? (
        <button onClick={() => setShowForm((prev) => !prev)} className="normal">
          Приховати форму
        </button>
      ) : (
        <button onClick={() => setShowForm((prev) => !prev)} className="normal">
          Додати завантаження
        </button>
      )}
      {/* </div> */}
      {downloads.length > 0 ? (
        downloads
          ?.sort((a, b) => b.ID - a.ID)
          .map((item, idx) => {
            return <TrnasportationItem item={item} />;
          })
      ) : (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <h3>Актуальних завантажень немає</h3>
          <TruckLoader />
        </div>
      )}
    </div>
  );
};

export default CurrentTransportation;
