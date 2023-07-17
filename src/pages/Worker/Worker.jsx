import { useEffect, useState } from "react";
import "./Worker.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchUserById } from "../../redux/slices/users";
import Loader from "../../components/loader/Loader";
import axios from "../../utils/axios";
import moment from "moment";
import "moment/locale/uk";
const Worker = () => {
  const birthDate = moment();
  const { users } = useSelector((state) => state.users);
  const { id } = useParams();
  const [zas, setZas] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const total = zas?.reduce((sum, cur) => sum + cur.SUMA, 0);
  // const totalSum = zas?.reduce((acc, next) => {
  //   return acc.SUMA + next.SUMA;
  // }, 0);
  const getZASas = async (id) => {
    try {
      const { data } = await axios.get(`zas/${id}`);
      setZas(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [id]);

  useEffect(() => {

    if (id.length > 0) {
      getZASas(id);
    }
   
  }, [id]);

  useEffect(()=>{},[id,users])
  return (
    <div className="worker">
      <button className="go__back danger" onClick={() => navigate(-1)}>
        &#8592; Повернутись на попередню сторінку
      </button>
      <h2>Інформація про працівника</h2>

      {id && users?.items.length < 1 ? null : (
        <div className={`worker__${id} worker__manager`}>
          <h3>{users.items.PIPFULL}</h3>

          <p>Дата народження: {moment(users.items.NARDAT).format("ll")}</p>
          {/* <p>Дата народження: {users.items.NARDAT}</p> */}
          {/* <p>{users.items.DB_P}</p> */}
          <p>Працює з {users.items.WORKDAT ? moment(users.items.WORKDAT).format('ll') : "Інформація не внесена"}</p>
          <p>Місто нанродження: {users.items.NAR}</p>
          <p>
            Освітній заклад:{" "}
            {users.items.OSVZAKLAD == null ? (
              <span
                style={{
                  backgroundColor: "red",
                  padding: "0.2rem",
                  borderRadius: "4px",
                }}
              >
                Інформація не внесена
              </span>
            ) : (
              users.items.OSVZAKLAD
            )}
          </p>
          <p>
            Прописка:{" "}
             {users.items.PROP == null ? (
              <span style={{ backgroundColor: "red" }}>
                Інформація не внесена
              </span>
            ) : (
              users.items.PROP
            )}
          </p>
          <p>ІПН: {users.items.IPN}</p>
          <p>Проживання: {users.items.ZH}</p>
          {users.items.ZVILDAT == null ? (
            <p style={{ backgroundColor: "lightgreen",padding:"0.4rem",borderRadius:"10px" }}>Діючий праццівник</p>
          ) : (
            <p style={{ backgroundColor: "red" }}>
              Дата звільнення: {users.items.ZVILDAT}
            </p>
          )}
        </div>
      )}
      <h3 style={{ textAlign: "left" }}>
        Засоби у використанні:{zas.length > 0 ? zas.length : "Відсутні"}
      </h3>
      <div
        style={{
          border: "2px solid red",
          padding: "0.4rem",
          borderRadius: "4px",
          boxShadow: "5px 5px 5px rgba(0,0,0,0.4)",
          marginBottom: "10px",
        }}
      >
        <b>Загальна сума становить: {Math.floor(total).toFixed(2)} грн</b>{" "}
      </div>
      {zas.length > 1 ? (
        zas.map((item, idx) => {
          return (
            <div
              className="os_items"
              style={{ display: "flex", gap: "10px" }}
              key={idx}
            >
              <div>{item.NOSZAS}</div>
              <div>{item.SUMA.toFixed(2)} грн</div>
            </div>
          );
        })
      ) : (
        <p>Засобів у використанні немає</p>
      )}
    </div>
  );
};

export default Worker;
