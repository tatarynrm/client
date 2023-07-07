import { current } from "../../data/current_transportation";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CurrentTransportationComments from "../Comments/CurrentTransportationComments/CurrentTransportationComments";
import CommentsForm from "../../components/forms/comments/CommentsForm";
import axios from "../../utils/axios";
import GoBack from "../../components/button/goBack/GoBack";
const CurrentTransportationItem = () => {
  const [donwload, setDownload] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getOneDownload = async (id) => {
      try {
        const { data } = await axios.get(`/internal-downloads/${id}`);
        setDownload(data);
      } catch (error) {
        console.log(error);
      }
    };
    getOneDownload(id);
  }, []);
  return (
    <div className="current__transportation_item container">
      <GoBack />
      {donwload ? (
        <div className="current__cargo">
          <div>{donwload.ID}</div>
          <div>{donwload.TEXT}</div>
        </div>
      ) : null}
    </div>
  );
};

export default CurrentTransportationItem;
