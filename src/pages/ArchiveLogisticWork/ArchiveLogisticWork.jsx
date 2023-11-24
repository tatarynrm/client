import "./ArchiveLogisticWork.scss";
import axios from "../../utils/axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import toTimestamp from "../../helpers/functions";
import moment from "moment/moment";
const ArchiveLogisticWork = () => {
  const userData = useSelector((state) => state.auth.data);
  console.log(userData);
  const [archiveZap, setArchiveZap] = useState([]);
  const getAllArchive = async (KOD_OS) => {
    try {
      const data = await axios.post("/zap-archive", { KOD_OS: userData?.KOD });
      if (data.status === 200) {
        setArchiveZap(data.data);
      } else {
        alert("Виникла помилка на сервері");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllArchive();
  }, []);
  return (
    <div className="page archive">
      <div className="archive__inner container">
        <div className="archive__nav"></div>

        <div className="archive__list">
          {archiveZap.length > 0
            ? archiveZap
            .sort((a,b) => toTimestamp(b.DAT) -  toTimestamp(a.DAT)  )
            .map((item, idx) => {
                return (
                  <div key={idx} className="archive__item">
                    <div className="info">
                    <span>{item.ZAPNUM}</span> <br />
                    <span>{moment(item.DAT).format('LL')}</span> <br />
                      {item.ZAV}- {item.ROZV}
                     
                    </div>
                    <div className="managers__who_close">
                      {item.CLOSEMANAGER.map((item,idx)=>{
                        return <div key={idx}>
                          {item.MENZAKR} - {item.COUNT}
                        </div>
                      })}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default ArchiveLogisticWork;
