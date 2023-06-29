import { useEffect, useState } from "react";
import "./ClosedCargos.scss";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import moment from "moment";
import "moment/locale/uk";
import "moment/locale/uk";
import { copyTextToClipboard } from "../../helpers/navigator";
import { RxDotsVertical } from "react-icons/rx";
import { AiOutlineComment } from "react-icons/ai";
import { FaCommentSlash } from "react-icons/fa";
import ZapEdit from "../../components/zap/ZapEdit";
import toTimestamp from "../../helpers/functions";
const ClosedCargos = () => {
  const [closedCargos, setClosedCargos] = useState([]);
  const userData = useSelector((state) => state.auth.data);
  const getZap = async (KOD_OS) => {
    try {
      const data = await axios.post("/zap/closed", { KOD_OS: KOD_OS });
      if (data.status === 200) {
        setClosedCargos(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getZap(userData?.KOD);
  }, [userData]);
  return (
    <div className="closed__cargos container">
      <div className="closed">
        {closedCargos ? (
          closedCargos
            ?.sort((a, b) => toTimestamp(b.DAT) - toTimestamp(a.DAT))
            .map((item, idx) => {
              return (
                <div key={idx} className={`zap zap-${item.KOD}`}>
                  {item.KOD_GROUP === 11 ? (
                    <div className="decor__line-div-zap-mizh"></div>
                  ) : (
                    <div className="decor__line-div-zap-region"></div>
                  )}
                  <div className="zap__author">
                    <div className="zap__author-name">{item.PIP}</div>
                    <div className="zap__comments-length">
                      <div className="zap__comments-counter">
                        {item.COUNTCOMM <= 0 ? (
                          <FaCommentSlash
                            title="Коментарів немає"
                            className="comments__tooltip"
                          />
                        ) : (
                          <AiOutlineComment />
                        )}

                        <span>
                          {item.COUNTCOMM <= 0 ? null : item.COUNTCOMM}
                        </span>
                        {item.COUNTNEWCOMM <= 0 ? null : (
                          <span className="new__comments">
                            {item.COUNTNEWCOMM}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="zap__author-time">{`${moment(item.DAT)
                      .startOf("minute")
                      .fromNow()}`}</div>
                  </div>
                  <div className="zap__cities">
                    <div>
                      {item.ZAV} <br /> - <br />
                      {item.ROZV}
                    </div>
                  </div>
                  <div className="zap__text">{item.ZAPTEXT}</div>

                  {userData?.KOD === item.KOD_OS ? (
                    <div className="zap__menu">
                      <RxDotsVertical />
                    </div>
                  ) : null}
                </div>
              );
            })
        ) : (
          <p>Помилка мережі</p>
        )}
      </div>
    </div>
  );
};

export default ClosedCargos;
