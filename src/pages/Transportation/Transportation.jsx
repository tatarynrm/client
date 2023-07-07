import { useSearchParams } from "react-router-dom";
import "./Transportation.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCargos } from "../../redux/slices/cargos";
import moment from "moment";
import "moment/locale/uk";
import TruckLoader from "../../components/loaders/TruckLoader";
const Transportation = () => {
  const { cargos } = useSelector((state) => state.cargos);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(fetchCargos());
  }, []);
  return (
    <div className="transportation">
      <div className="filters">
        <button className="normal">Актуальні перевезення</button>
        <button className="normal">Закриті перевезення</button>
        <button className="normal">Провести номери</button>
      </div>
      <div className="transportation__title">
        <div className="transportation__title-item">Дата завантаження</div>
        <div className="transportation__title-item">Пункт завантаження</div>
        <div className="transportation__title-item">Пункт розвантаження</div>
        <div className="transportation__title-item">Сума замовника</div>
        <div className="transportation__title-item">Сума перевізника</div>
        <div className="transportation__title-item">Маржа</div>
      </div>
      {cargos.items.length > 1 ? (
        cargos.items.map((item, idx) => {
          return (
            <div className="transportation__block" key={idx}>
              <div className="transportation__item">
                {moment(item.APPDAT).format("L")}
              </div>
              <div className="transportation__item">{item.PUNKTR}</div>
              <div className="transportation__item">{item.PUNKTZ}</div>
              <div className="transportation__item">
                {Math.floor(item.ZAMSUMA).toFixed(2)}
              </div>
              <div className="transportation__item">
                {Math.floor(item.PERSUMA).toFixed(2)}
              </div>
              <div className="transportation__item">
                {Math.floor(item.ZAMSUMA).toFixed(2) -
                  Math.floor(item.PERSUMA).toFixed(2)}
              </div>
            </div>
          );
        })
      ) : (
        <div className="center__div">
          <h3>Зачекайте,{userData?.IMJA},йде завантаження!</h3>
          <TruckLoader />
        </div>
      )}
    </div>
  );
};

export default Transportation;
