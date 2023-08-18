import { useEffect, useState } from "react";
import "./ClosedCargos.scss";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import moment from "moment";
import uk from "date-fns/locale/uk";
import { AiOutlineComment } from "react-icons/ai";
import { FaCommentSlash } from "react-icons/fa";
import toTimestamp from "../../helpers/functions";
import ClosedColors from "./ClosedColors";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ExcelFile from "../../components/Excel/ExcelFile";
import ClosedZap from "../../components/zap/ClosedZap/ClosedZap";
import ZapStatusTable from "../../components/tables/ZapStatusTable";
registerLocale("uk", uk);
const ClosedCargos = () => {
  const userData = useSelector((state) => state.auth.data);
  const [closedZap, setClosedZap] = useState([]);
  const [statusZap, setStatusZap] = useState();
  const [statusValue, setStatusValue] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [openManager, setOpenManager] = useState(false);
  const [managerFilter, setManagerFilter] = useState(null);
  const [gradient, setGradient] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [choosenUsers, setChoosenUsers] = useState([]);
  const [zapCount, setZapCount] = useState(null);
  const [closedZapForXlsx, setClosedZapForXlsx] = useState([]);
  const [showComments,setShowComments] = useState(false)

  const filterByOneManager = (item) => {
    setManagerFilter(item.PIP);
  };

  const setUsersToChosen = (item) => {
    if (choosenUsers.includes(item)) {
      setChoosenUsers(
        choosenUsers.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setChoosenUsers([...choosenUsers, item]);
    }
  };
  const filtersButton = [
    { title: "Актуальна", value: 0 },
    { title: "Закриті нами", value: 2 },
    { title: "Не закриті нами", value: 3 },
    { title: "Відмінені замовником", value: 4 },
    { title: "Закриті замовником", value: 5 },
    { title: "Запит ціни", value: 6 },
    { title: "Скинути усі фільтри", value: 777 },
  ];
  const handleInputChange = (event) => {
    setFilterDate(event.target.value);
  };
  const filterByCategory = (item) => {
    if (item.value === 777) {
      setStatusZap();
      setStatusValue("");
      setManagerFilter(null);
      setChoosenUsers([]);
      getZap(userData?.KOD);
    } else {
      setStatusZap(item.value);
      setStatusValue(item.title);
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
  const getZapByDate = async (FROM) => {
    try {
      if (endDate === undefined || endDate === null) {
        const data = await axios.post("/zap/by-date", {
          FROM: startDate?.toLocaleDateString(),
        });
        if (data.status === 200) {
          setClosedZap(data.data);
        }
      } else {
        const data = await axios.post("/zap/by-date", {
          FROM: startDate.toLocaleDateString(),
          TO: endDate.toLocaleDateString(),
        });
        if (data.status === 200) {
          setClosedZap(data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getZap(userData?.KOD);
  }, [userData]);
  useEffect(() => {}, [statusZap]);
  useEffect(() => {}, [choosenUsers]);

  const uniqueUsers = closedZap.filter((obj, index, array) => {
    return !array.slice(0, index).some((o) => o.PIP === obj.PIP);
  });

  const addGradient = () => {
    setGradient((value) => !value);
  };
  const cls = (status) => {
    switch (status) {
      case 0:
        return "actual";

      case 1:
        return "delete";

      case 2:
        return "closed_us";
      case 3:
        return "dont_close_us";
      case 4:
        return "decline_ur";
      case 5:
        return "closed_by_ur";
      case 6:
        return "zap_cina";

      default:
        break;
    }
  };
  const clsXlsxStatus = (status) => {
    switch (status) {
      case 0:
        return "Актуальна";

      case 1:
        return "Видалена";

      case 2:
        return "Закрита нами";
      case 3:
        return "Не закрита нами";
      case 4:
        return "Відмінена замовником";
      case 5:
        return "Закрита замовником";
      case 6:
        return "Запит ціни";

      default:
        break;
    }
  };
  let myArr = [];
  const repairArr = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const el = arr[i];
      const date = moment(el.DAT).format("L");
      const dateUpdate = moment(el.DATUPDATE).format("L");
      const dateClose =
        el.DATSTATUS === null
          ? "НЕ ЗАКРИТИЙ СТАТУС"
          : moment(el.DATSTATUS).format("L");
      myArr.push({
        "КОД ЗАЯВКИ": el.KOD,
        "ДАТА СТВОРЕННЯ": date,
        ПЕРЕВЕЗЕННЯ: el.KOD_GROUP === 11 ? "Міжнародні" : "Регіональні",
        ЗАВАНТАЖЕННЯ: el.ZAV,
        ВИВАНТАЖЕННЯ: el.ROZV,
        ВАНТАЖ: el.ZAPTEXT,
        СТАТУС: clsXlsxStatus(el.STATUS),
        СТВОРЕНО: el.PIP,
        "ДАТА ОНОВЛЕННЯ": dateUpdate,
        "ДАТА ЗАКРИТТЯ": dateClose,
        "КІЛЬКІСТЬ КОМЕНТАРІВ": el.COUNTCOMM,
        КОМЕНТАРІ: `dsdsa \n dasda\n123123`,
      });
    }
  };
  repairArr(closedZap);
console.log(closedZap);
  return (
    <div className="closed__zap container">
      <ExcelFile item={myArr.length > 0 ? myArr : []} userData={userData} />
      <div className="closed__zap-filters">
        <div className="closed__zap-buttons">
          {filtersButton.map((item, idx) => {
            return (
              <button
                key={idx}
                onClick={() => filterByCategory(item)}
                className={`normal ${
                  item.title === statusValue ? "active" : ""
                }`}
              >
                {item.title}
              </button>
            );
          })}
          <button className="normal" onClick={addGradient}>
            {gradient ? "Сховати градієнт" : "Додати градієнт"}
          </button>
        </div>
        <div className="closed__zap-managers">
          <button onClick={() => setOpenManager((value) => !value)}>
            {openManager ? "Приховати фільтр" : "Фільтр по менеджеру"}
          </button>

          {openManager && (
            <div className="mannager__block">
              <div className="mannagers__filters">
                {uniqueUsers?.map((item, idx) => {
                  return (
                    <div key={idx} className="choose__user">
                      <input
                        type="checkbox"
                        checked={choosenUsers.includes(item.PIP)}
                        onChange={() => setUsersToChosen(item.PIP)}
                      />
                      <button
                        className={`normal ${
                          managerFilter === item.PIP ? "active" : ""
                        }`}
                        key={idx}
                        onClick={() => filterByOneManager(item)}
                      >
                        {item.PIP}
                      </button>
                    </div>
                  );
                })}
              </div>
              {/* <button className="normal">Фільтр по вибраним</button> */}
            </div>
          )}
        </div>

        <div className="date__filter">
          <DatePicker
            showIcon
            // dateFormat={'dd-MM-yyyy'}
            locale={uk}
            placeholderText="Натисніть для вибору дати"
            selectsRange={true}
            dateFormat="dd-MM-yyyy"
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            withPortal
          />
          <button
            className="normal"
            disabled={startDate === null || undefined ? true : false}
            onClick={() => getZapByDate(startDate.toLocaleDateString())}
          >
            Сортувати по даті
          </button>
          <button className="normal" onClick={()=>setShowComments(val=>!val)}>{showComments ? "Скинути фільтр" : "Лише з коментарями"}</button>
        </div>
      </div>
      {gradient && <ClosedColors />}
      {startDate ? (
        <p className="closed__report">
          Звіт за : {startDate.toLocaleDateString()} -{" "}
          {endDate ? endDate.toLocaleDateString() : null}
        </p>
      ) : null}
      {startDate && (
        <p className="closed__report">
          Стврено запитів :{" "}
          {closedZap?.filter((item) => choosenUsers.includes(item.PIP)).length}{" "}
        </p>
      )}
      <div className="close">

        {/* {closedZap ? (
          closedZap
            ?.sort((a, b) => toTimestamp(b.DAT) - toTimestamp(a.DAT))
            .filter((item) => (statusZap ? item.STATUS === statusZap : item))
            // .filter((a,b) => toTimestamp(a.DAT) === new Date(chooseDate))
            .filter((item) =>
              managerFilter ? item.PIP === managerFilter : item
            )
            .filter((item) =>
              choosenUsers.length > 0 ? choosenUsers.includes(item.PIP) : item
            )
            .filter(item => showComments ? item.COMMENTS?.length > 0 : item)
            .map((item, idx) => {
              return (
               <ClosedZap key={idx} cls={cls} item={item} idx={idx} gradient={gradient}/>
              );
            })
        ) : (
          <p>Помилка мережі</p>
        )} */}

        {closedZap && <ZapStatusTable data={closedZap}/>}
      </div>
    </div>
  );
};

export default ClosedCargos;
