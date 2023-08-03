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
  const userData = useSelector((state) => state.auth.data);
  const [closedZap, setClosedZap] = useState([]);
  const [statusZap, setStatusZap] = useState();
  const [statusValue,setStatusValue]= useState('')
  const [filterDate, setFilterDate] = useState('');


  const filtersButton = [
    { title: "Закриті нами", value: 2 },
    { title: "Не закриті нами", value: 3 },
    { title: "Відмінені замовником", value: 4 },
    { title: "Закриті замовником", value: 5 },
    { title: "Запит ціни", value: 6 },
    { title: "Скинути усі фільтри", value: 777 },
  ];
  const handleInputChange = event => {
    setFilterDate(event.target.value);
  };
  const filterByCategory = (item) => {
    if (item.value === 777) {
      setStatusZap();
      setStatusValue('')
    } else {
      setStatusZap(item.value);
      setStatusValue(item.title)
    }
  };
  const getZap = async (KOD_OS) => {
    try {
      const data = await axios.post("/zap/closed", { KOD_OS: KOD_OS });
      if (data.status === 200) {
        setClosedZap(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getZap(userData?.KOD);
  }, [userData]);
  useEffect(() => {}, [statusZap]);
  console.log(statusZap);

  const filteredData = closedZap.filter(item => {
    if (filterDate === '') return true; // Return all items if the input date is empty

    const inputDate = new Date(filterDate);
    return item.date <= inputDate;
  });
  return (
    <div className="closed__zap container">
      <div className="closed__zap-filters">
        {filtersButton.map((item, idx) => {
          return (
            <button
              key={idx}
              onClick={() => filterByCategory(item)}
              className={`normal ${item.title === statusValue ? "active" : ""}`}
            >
              {item.title}
            </button>
          );
        })}
        <div className="date__filter">
        {/* <input
        type="date"
        value={filterDate}
        onChange={handleInputChange}
      /> */}
        </div>
      </div>
      <div className="closed">
        {closedZap ? (
          closedZap
            ?.sort((a, b) => toTimestamp(b.DAT) - toTimestamp(a.DAT))
            .filter((item) => (statusZap ? item.STATUS === statusZap : item))
            // .filter((a,b) => toTimestamp(a.DAT) === new Date(chooseDate))
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

                  {/* {userData?.KOD === item.KOD_OS ? (
                    <div className="zap__menu">
                      <RxDotsVertical />
                    </div>
                  ) : null} */}
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
