import { useSearchParams } from "react-router-dom";
import "./Transportation.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCargos } from "../../redux/slices/cargos";
import moment from "moment";
import "moment/locale/uk";
import TruckLoader from "../../components/loaders/TruckLoader";
import toTimestamp from "../../helpers/functions";
const Transportation = () => {
  const  cargos  = useSelector((state) => state.cargos.cargos.items);
  console.log(cargos);
  // const [isLoading, setIsLoading] = useState(false);
  // const [searchParams, setSearchParams] = useSearchParams();
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  // const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(fetchCargos({
      KOD_OS:userData?.KOD,
      REC_START:0,
      REC_END:100
    }));
  }, []);
  console.log(cargos);
  return (
    <div className="transportation container">
      {/* <div className="filters">
        <button className="normal">Актуальні перевезення</button>
        <button className="normal">Закриті перевезення</button>
        <button className="normal">Провести номери</button>
      </div> */}
      <div className="transportation__title">
        <div className="transportation__title-item">Дата завантаження</div>
        <div className="transportation__title-item">Пункт завантаження</div>
        <div className="transportation__title-item">Пункт розвантаження</div>
        <div className="transportation__title-item">Замовник</div>
        <div className="transportation__title-item">Мен. перевізника</div>
        <div className="transportation__title-item">Мен.замовника</div>
        <div className="transportation__title-item">Перевізник</div>
        <div className="transportation__title-item">Водій</div>
        <div className="transportation__title-item">Авто / Причіп</div>
      </div>
      {cargos ? (
        cargos.slice()
        .sort((a,b) => toTimestamp(b.DATZAV) - toTimestamp(a.DATZAV))
        .map((item, idx) => {
          return (
            <div className="transportation__block" key={idx}>
              <div className="transportation__item">
                {moment(item.DATZAV).format("L")}
                {/* {item.DATZAV} */}
              </div>
              <div className="transportation__item">{item.ZAV}</div>
              <div className="transportation__item">{item.ROZV}</div>
              <div className="transportation__item">
                {item.ZAM}
              </div>
              <div className="transportation__item">
           {item.MENZ}
              </div>
              <div className="transportation__item">
           {item.MENP}
              </div>
              <div className="transportation__item">
                {item.PER}
              </div>
              <div className="transportation__item">
                {item.VOD1} <br /> {item.VOD1TEL}
              </div>
              <div className="transportation__item">
                {item.AM} / {item.PR}
              </div>
            </div>
          );
        })
      ) : (
        <div className="center__div">
          <h3>Зачекайте,{userData?.IMJA},йде завантаження!</h3>
          <TruckLoader />
        </div>
      ) }
    </div>
  );
};

export default Transportation;
